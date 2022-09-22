import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import configuration from '../config/configuration';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(configuration().port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
