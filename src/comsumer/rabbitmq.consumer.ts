import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQConsumer implements OnModuleInit {
  private readonly queueName = 'car_creation_queue';
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onModuleInit() {
    await this.connect();
  }

  async connect() {
    try {
      this.connection = await amqp.connect(
        process.env.RABBITMQ_URL || 'amqp://localhost',
      );
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queueName, { durable: true });

      console.log(`✅ RabbitMQ Consumer conectado na fila: ${this.queueName}`);

      this.channel.consume(this.queueName, async (message) => {
        if (message) {
          const content = JSON.parse(message.content.toString());
          console.log('📩 Mensagem recebida:', content);

          // Processa os dados da mensagem recebida
          await this.processMessage(content);

          // Confirma a mensagem como processada
          this.channel.ack(message);
        }
      });
    } catch (error) {
      console.error('❌ Erro ao conectar ao RabbitMQ:', error);
    }
  }

  async processMessage(content: any) {
    console.log('📌 Processando mensagem...', content);

    // Simulação do envio de webhook
    console.log('🔔 Enviando webhook para notificar novo carro criado...');

    // Aqui você pode chamar um serviço para salvar logs no MongoDB
  }
}
