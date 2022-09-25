import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import configuration from '../config/configuration';
import { json, urlencoded } from 'express';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(configuration().port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
