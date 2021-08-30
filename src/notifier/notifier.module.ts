import { Module } from '@nestjs/common';
import { NotifierService } from './notifier-service.provider';

@Module({
  providers: [NotifierService],
  exports: [NotifierService],
})
export class NotifierModule {}
