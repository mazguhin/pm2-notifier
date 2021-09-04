import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {RecipientService} from './recipient.service';
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
