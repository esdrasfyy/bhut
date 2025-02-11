import { Module } from '@nestjs/common';
import { LogRepository } from 'src/repositories';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from 'src/schemas/log.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  controllers: [LogController],
  providers: [LogService, LogRepository],
})
export class LogModule {}
