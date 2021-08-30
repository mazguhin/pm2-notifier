import {Injectable} from '@nestjs/common';
import {NotifierInterface} from './interface/notifier.interface';
import {ErrorNotificationInterface} from "./interface/error-notification.interface";
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {RecipientEntity} from "../recipient/entity/recipient.entity";

@Injectable()
export class SimpleTelegramNotifier implements NotifierInterface {
    constructor(
        private httpService: HttpService,
        private configService: ConfigService
    ) {
    }

    public async error(recipient: RecipientEntity, data: ErrorNotificationInterface) {
        const token = this.configService.get('notifier.telegram.botToken');

        const text = `
<b>Project</b>: ${data.project}
<b>Data</b>: ${data.datetime}
<b>Text</b>: <code>${data.text}</code>
`;

        const chat = recipient.identifier;
        const url = `https://api.telegram.org/bot${token}/sendMessage?text=${text}&chat_id=${chat}&parse_mode=HTML`;

        await this.httpService.get(encodeURI(url)).toPromise();

        console.log(`Message sent to ${chat}`);
    }
}
