import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {NotifierModule} from './notifier/notifier.module';
import {ConfigModule} from "@nestjs/config";
import {RecipientModule} from './recipient/recipient.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        NotifierModule,
        RecipientModule,
    ],
    providers: [AppService],
})
export class AppModule {
}
