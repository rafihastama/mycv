/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(
    cookieSession({
      keys: ['asdasd'],
    }),
  )
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
