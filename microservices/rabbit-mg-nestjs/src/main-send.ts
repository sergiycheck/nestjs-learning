import { NestFactory } from '@nestjs/core';
import { AppSendModule } from './send/app-send.module';
import { AppSenderService } from './send/app-sender.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppSendModule);

  const service = app
    .select(AppSendModule)
    .get(AppSenderService, { strict: true });

  service.sendReplaceEmojiMsg('my message').subscribe((result) => {
    console.log('result', result);
  });

  console.log(`Standalone app is running `);

  // await app.close();
}
bootstrap();
