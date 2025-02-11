import { Global, Module } from '@nestjs/common';
import * as ImportRepository from './index';
import { Log, LogSchema } from 'src/schemas/log.schema';
import { MongooseModule } from '@nestjs/mongoose';

const repositories = Object.values(ImportRepository);

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
