import { NestFactory } from '@nestjs/core';
import { GameModule } from './game/game.module';

async function bootstrap() {
  const app = await NestFactory.create(GameModule);
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
