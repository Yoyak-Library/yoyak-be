import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as fs from 'fs';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const domain = process.env.APP_DOMAIN || 'http://localhost';
  const port = process.env.PORT || 3000;
  console.log(`${port}번 포트에서 대기 중`);

  app.use(cors({
    origin: ['http://localhost:3000', 'https://yoyaklery.site'],
    methods: 'GET, POST, DELETE, PATCH, PUT, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  }));

  // swagger-output.json을 읽어와서 Swagger 적용
  const swaggerFile = './swagger/swagger-output.json';
  if (fs.existsSync(swaggerFile)) {
    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFile, 'utf8'));
    SwaggerModule.setup('api-docs', app, swaggerDocument);
    console.log(`Swagger UI: ${domain}:${port}/api-docs`);
  } else {
    console.error('swagger-output.json 파일을 찾을 수 없습니다.');
  }

  await app.listen(port, () => {
    console.log(`Application is running on: ${domain}:${port}`);
  });
}
bootstrap();
