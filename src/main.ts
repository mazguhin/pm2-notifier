import {NestFactory} from '@nestjs/core';
import {ConfigService} from "@nestjs/config";
import * as pm2 from 'pm2';
import {AppModule} from './app.module';
import {ErrorService} from "./module/pm2/error.service";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const errorService = await app.get(ErrorService);
    const configService = app.get(ConfigService);

    pm2.launchBus((err, bus) => {
        bus.on('log:err', data => errorService.add(data));
    });

    const notificationInterval = configService.get('NOTIFICATION_INTERVAL') || 30;
    setInterval(() => errorService.send(), notificationInterval * 1000);

    console.log('App started');
}

bootstrap();
