import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configDocumentation = new DocumentBuilder()
    .setTitle('Arena Open Beach Documentation')
    .setDescription('This is a documentation to backend services from Arena Open Beach App')
    .setVersion('1.0')
    .addTag('athlete')
    .build()

  const document = SwaggerModule.createDocument(app, configDocumentation)
  SwaggerModule.setup('api', app, document)

  const configService = app.get<ConfigService<Env, true>>(ConfigService)

  const port = configService.get('PORT', { infer: true })
  await app.listen(port)
}
bootstrap()
