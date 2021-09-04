import {CacheModule, Module} from '@nestjs/common';
import {NotifierModule} from "../notifier/notifier.module";
import {RecipientModule} from "../recipient/recipient.module";
import {ErrorService} from "./error.service";
import {ActiveProcessRepository} from "./repository/active-process.repository";
import {ErrorRepository} from "./repository/error.repository";

@Module({
    imports: [
        CacheModule.register(),
        NotifierModule,
        RecipientModule,
    ],
    providers: [ErrorService, ActiveProcessRepository, ErrorRepository],
    exports: [ErrorService, ActiveProcessRepository, ErrorRepository],
})
export class Pm2Module {
}
