import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class QueueService {
  private readonly queueName = 'car_creation_queue';
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async connect() {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queueName, { durable: true });
  }

  async publishMessage(message: any) {
    if (!this.channel) await this.connect();
    this.channel.sendToQueue(
      this.queueName,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
      },
    );
  }
}
