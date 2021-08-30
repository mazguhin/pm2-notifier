import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { NotifierModule } from './notifier/notifier.module';

@Module({
  imports: [NotifierModule],
  providers: [AppService],
})
export class AppModule {}
