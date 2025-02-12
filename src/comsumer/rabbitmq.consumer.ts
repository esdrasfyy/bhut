import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { LogRepository } from 'src/repositories/log/log.repository';
import axios from 'axios';

@Injectable()
export class RabbitMQConsumer implements OnModuleInit {
  constructor(private readonly logRepostory: LogRepository) {}

  private readonly queueName = 'car_creation_queue';
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onModuleInit() {
    await this.connect();
  }

  async connect() {
    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queueName, { durable: true });

      this.channel.consume(this.queueName, async (message) => {
        if (message) {
          const dto = JSON.parse(message.content.toString()) as Log.Create;
          await this.processMessage(dto);
          this.channel.ack(message);
        }
      });
    } catch (error) {
      console.error('❌ Erro ao conectar ao RabbitMQ:', error);
    }
  }

  async processMessage(dto: Log.Create) {
    await this.logRepostory.create(dto);

    await axios.post(process.env.WEBHOOK_URL, { dto });

  }
}
