import {Module} from '@nestjs/common';
import {RecipientService} from './recipient.service';
import {ConfigModule} from "@nestjs/config";
import recipientConfig from "../../config/recipient";

@Module({
    imports: [
        ConfigModule.forFeature(recipientConfig),
    ],
    providers: [RecipientService],
    exports: [RecipientService],
})
export class RecipientModule {
}
