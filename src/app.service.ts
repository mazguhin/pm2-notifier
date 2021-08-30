import * as dayjs from 'dayjs'
import {Inject, Injectable} from '@nestjs/common';
import {Pm2ErrorInterface} from './interfaces/pm2-error.interface';
import {NotifierInterface} from './notifier/interface/notifier.interface';
import {NOTIFIER_SERVICE} from './notifier/notifier-service.provider';
import {RecipientService} from "./recipient/recipient.service";

@Injectable()
export class AppService {
    constructor(
        @Inject(NOTIFIER_SERVICE) private notifierService: NotifierInterface,
        private recipientService: RecipientService
    ) {
    }

    public async handleError(error: Pm2ErrorInterface) {
        const notification = {
            text: error.data,
            project: error.process.name,
            datetime: dayjs(error.at).format('DD.MM.YYYY HH:mm:ss')
        };

        const recipients = this.recipientService.getByProject(error.process.name);
        const recipientsPromises = recipients.map(recipient => {
            return this.notifierService.error(recipient, notification)
        });

        await Promise.all(recipientsPromises);
    }
}
