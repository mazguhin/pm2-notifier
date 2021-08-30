import * as pm2 from 'pm2';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {AppService} from './app.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const appService = await app.get(AppService);

    pm2.launchBus(function (err, bus) {
        bus.on('log:err', async data => {
            await appService.handleError(data);
        });
    });

    console.log('App started');
}

bootstrap();
