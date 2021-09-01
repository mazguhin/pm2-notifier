import {Injectable} from '@nestjs/common';
import {NotifierInterface} from './interface/notifier.interface';
import {ErrorNotificationInterface} from "./interface/error-notification.interface";
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {RecipientEntity} from "../recipient/entity/recipient.entity";

@Injectable()
export class SimpleTelegramNotifier implements NotifierInterface {
    private readonly token: string;
    private messageMaxSize = 3000;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService
    ) {
        this.token = this.configService.get('notifier.telegram.botToken');
    }

    public async error(recipient: RecipientEntity, errors: Array<ErrorNotificationInterface>) {
        const chat = recipient.identifier;
        const messages = this.groupErrorsInMessages(errors);
        messages.forEach(message => this.sendMessage(chat, message));
    }

    private groupErrorsInMessages(errors: Array<ErrorNotificationInterface>): Array<string> {
        const messages = [];
        let totalChars = 0;
        let accumText = '';

        for (const error of errors) {
            let text = this.formatError(error);
            text = this.getSlice(text);

            if ((totalChars + text.length) > this.messageMaxSize) {
                messages.push(accumText);
                accumText = text;
                totalChars = 0;
            } else {
                totalChars += text.length;
                accumText += text;
            }
        }

        if (accumText !== '') {
            messages.push(accumText);
        }

        return messages;
    }

    private formatError(error: ErrorNotificationInterface): string {
        return `<b>Project</b>: ${error.project}
<b>Data</b>: ${error.datetime}
<b>Text</b>: <code>${error.text}</code>
`;
    }

    private getSlice(text: string): string {
        if (text.length > this.messageMaxSize) {
            return text.slice(0, this.messageMaxSize - 3) + '...';
        }

        return text;
    }

    private async sendMessage(chat: string, text: string) {
        const url = `https://api.telegram.org/bot${this.token}/sendMessage?text=${text}&chat_id=${chat}&parse_mode=HTML`;
        return this.httpService.get(encodeURI(url)).toPromise();
    }
}
