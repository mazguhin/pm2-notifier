import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {RecipientEntity} from "./entity/recipient.entity";

@Injectable()
export class RecipientService {
    constructor(
        private configService: ConfigService
    ) {
    }

    public getByProject(project: string): Array<RecipientEntity> {
        const projects = this.configService.get('recipients');

        return projects[project].map(identifier => {
            const recipient = new RecipientEntity();
            recipient.identifier = identifier;
            return recipient;
        });
    }
}
