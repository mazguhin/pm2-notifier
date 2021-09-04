import {CacheModule, Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {NotifierModule} from './module/notifier/notifier.module';
import {RecipientModule} from './module/recipient/recipient.module';
import {Pm2Module} from './module/pm2/pm2.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        CacheModule.register(),
        NotifierModule,
        RecipientModule,
        Pm2Module,
    ],
    providers: [],
})
export class AppModule {
}
