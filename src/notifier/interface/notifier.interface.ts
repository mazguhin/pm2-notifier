import {ErrorNotificationInterface} from "./error-notification.interface";
import {RecipientEntity} from "../../recipient/entity/recipient.entity";

export interface NotifierInterface {
    error(recipient: RecipientEntity, data: ErrorNotificationInterface);
}
