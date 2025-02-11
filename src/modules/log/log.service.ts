import { LogRepository } from './../../repositories/log/log.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LogService {
  constructor(private readonly logRepository: LogRepository) {}
  async getLogs() {
    return await this.logRepository.findAllLogs();
  }
}
