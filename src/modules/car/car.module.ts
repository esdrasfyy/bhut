import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { QueueService } from 'src/libs/queue.lib';

@Module({
  imports: [],
  controllers: [CarController],
  providers: [CarService, QueueService],
})
export class CartModule {}
