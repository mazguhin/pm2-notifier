import {CacheModule, Module} from '@nestjs/common';
import {AppService} from './app.service';
import {NotifierModule} from './module/notifier/notifier.module';
import {ConfigModule} from "@nestjs/config";
import {RecipientModule} from './module/recipient/recipient.module';
import {ErrorRepository} from "./repository/error.repository";
import {ActiveProcessRepository} from "./repository/active-process.repository";

@Module({
    imports: [
        ConfigModule.forRoot(),
        CacheModule.register(),
        NotifierModule,
        RecipientModule,
    ],
    providers: [AppService, ErrorRepository, ActiveProcessRepository],
})
export class AppModule {
}
