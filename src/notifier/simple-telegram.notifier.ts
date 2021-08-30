import { Injectable } from '@nestjs/common';
import { NotifierInterface } from './interface/notifier.interface';

@Injectable()
export class SimpleTelegramNotifier implements NotifierInterface {
  public async notify(data: any) {
    console.log(data);
  }
}
