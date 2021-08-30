import { Inject, Injectable } from '@nestjs/common';
import { Pm2ErrorInterface } from './interfaces/pm2-error.interface';
import { NotifierInterface } from './notifier/interface/notifier.interface';
import { NOTIFIER_SERVICE } from './notifier/notifier-service.provider';

@Injectable()
export class AppService {
  constructor(
    @Inject(NOTIFIER_SERVICE) private notifierService: NotifierInterface,
  ) {}

  public async handleError(error: Pm2ErrorInterface) {
    await this.notifierService.notify(error);
  }
}
