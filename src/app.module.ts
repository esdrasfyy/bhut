import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as ImportModules from './modules/modules';
import * as ImportRepositories from './repositories/repositories.module';
import { RabbitMQConsumer } from './comsumer/rabbitmq.consumer';

import * as dotenv from 'dotenv';
dotenv.config();

const modules = Object.values(ImportModules);
const repositories = Object.values(ImportRepositories);

@Module({
  imports: [
    ...modules,
    ...repositories,
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [AppService, RabbitMQConsumer],
})
export class AppModule {}
