import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as ImportModules from './modules/modules';
import * as ImportRepositories from './repositories/repositories.module';
import { RabbitMQConsumer } from './comsumer/rabbitmq.consumer';

const modules = Object.values(ImportModules);
const repositories = Object.values(ImportRepositories);

const mongo_url =
  process.env.MONGO_URL ??
  'mongodb://root:root_password@localhost:27017/bhut?authSource=admin';
@Module({
  imports: [...modules, ...repositories, MongooseModule.forRoot(mongo_url)],
  controllers: [AppController],
  providers: [AppService, RabbitMQConsumer],
})
export class AppModule {}
