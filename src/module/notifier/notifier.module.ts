import {Module} from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";
import {NotifierService} from './notifier-service.provider';
import notifierConfig from "../../config/notifier";

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
