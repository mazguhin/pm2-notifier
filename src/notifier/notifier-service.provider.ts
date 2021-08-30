import { SimpleTelegramNotifier } from './simple-telegram.notifier';

export const NOTIFIER_SERVICE = 'notifier_service';

export const NotifierService = {
  provide: NOTIFIER_SERVICE,
  useClass: SimpleTelegramNotifier,
};
