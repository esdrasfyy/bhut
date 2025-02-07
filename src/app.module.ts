import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as ImportModules from './modules/modules';

const modules = Object.values(ImportModules);

@Module({
  imports: [
    ...modules,
    MongooseModule.forRoot('mongodb://localhost:27017/nestdb'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
