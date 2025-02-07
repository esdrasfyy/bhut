import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as ImportModules from './modules/modules';
import { RabbitMQConsumer } from './comsumer/rabbitmq.consumer';

const modules = Object.values(ImportModules);

@Module({
  imports: [
    ...modules,
    MongooseModule.forRoot('mongodb://localhost:27017/nestdb'),
  ],
  controllers: [AppController],
  providers: [AppService, RabbitMQConsumer],
})
export class AppModule {}
