import * as pm2 from 'pm2';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {AppService} from './app.service';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const appService = await app.get(AppService);
    const configService = app.get(ConfigService);

    pm2.launchBus((err, bus) => {
        bus.on('log:err', data => appService.addError(data));
    });

    const notificationInterval = configService.get('NOTIFICATION_INTERVAL') || 30;
    setInterval(() => appService.sendErrors(), notificationInterval * 1000);

    console.log('App started');
}

bootstrap();
