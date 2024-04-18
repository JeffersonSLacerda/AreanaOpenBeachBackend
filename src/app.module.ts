import { CreateAthleteController } from './controllers/create-athlete.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AuthModule } from './auth/auth.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [
    CreateAthleteController,
    AuthenticateController,
    CreateAccountController],
  providers: [PrismaService],
})
export class AppModule { }
