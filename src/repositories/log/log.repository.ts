import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from 'src/schemas/log.schema';

@Injectable()
export class LogRepository {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  async create(dto: Log.Create) {
    const newLog = new this.logModel({ ...dto });
    return newLog.save();
  }

  async findAllLogs(): Promise<Partial<Log>[]> {
    return this.logModel
      .find({}, '_id car_id data_hora_criacao data_hora_processamento')
      .exec();
  }
}
