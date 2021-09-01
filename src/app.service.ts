import * as dayjs from 'dayjs'
import {Inject, Injectable} from '@nestjs/common';
import {Pm2ErrorInterface} from './interface/pm2-error.interface';
import {NotifierInterface} from './module/notifier/interface/notifier.interface';
import {NOTIFIER_SERVICE} from './module/notifier/notifier-service.provider';
import {RecipientService} from "./module/recipient/recipient.service";
import {ActiveProcessRepository} from "./repository/active-process.repository";
import {ErrorRepository} from "./repository/error.repository";

@Injectable()
export class AppService {
    constructor(
        @Inject(NOTIFIER_SERVICE) private notifierService: NotifierInterface,
        private activeProcessRepository: ActiveProcessRepository,
        private errorRepository: ErrorRepository,
        private recipientService: RecipientService
    ) {
    }

    public async addError(error: Pm2ErrorInterface) {
        return Promise.all([
            this.errorRepository.add(error),
            this.activeProcessRepository.add(error.process.name)
        ]);
    }

    public async sendErrors() {
        const activeProcesses = await this.activeProcessRepository.all();
        await this.activeProcessRepository.reset();

        return activeProcesses.map(async processName => {
            const errors = (await this.errorRepository.getByProcess(processName))
                .map(error => ({
                    text: error.data,
                    project: error.process.name,
                    datetime: dayjs(error.at).format('DD.MM.YYYY HH:mm:ss')
                }));

            await this.errorRepository.resetByProcess(processName);

            const recipients = this.recipientService.getByProject(processName);
            const recipientsPromises = recipients.map(recipient => {
                return this.notifierService.error(recipient, errors)
            });

            return await Promise.all(recipientsPromises);
        });
    }
}
