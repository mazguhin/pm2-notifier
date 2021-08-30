import {Module} from '@nestjs/common';
import {NotifierService} from './notifier-service.provider';
import {ConfigModule} from "@nestjs/config";
import notifierConfig from "../config/notifier";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [
        ConfigModule.forFeature(notifierConfig),
        HttpModule,
    ],
    providers: [NotifierService],
    exports: [NotifierService],
})
export class NotifierModule {
}
