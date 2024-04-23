import { FetchArenasController } from './controllers/fetch-arenas.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthModule } from './auth/auth.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { CreateArenaController } from './controllers/create-arena.controller'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [
    FetchArenasController,
    AuthenticateController,
    CreateAccountController,
    CreateArenaController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
