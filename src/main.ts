import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dotenv from 'dotenv';
import cors from 'cors';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription(
      'API documentation for the Ecommerce Whitelabel platform, providing endpoints for managing products, orders, and user accounts.',
    )
    .setVersion('0.0.1')
    .addTag(
      'Car',
      'Endpoints related to car management, including adding and retrieving items.',
    )
    .setContact(
      'Creator',
      'contatoesdrasoficial@gmail.com',
      'https://esdras.dev',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(
    cors({
      origin: ['https://www.urbanvogue.cloud', 'http://localhost:3000'],
      credentials: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
