import { Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string()
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService
  ) { }

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() { email, password }: AuthenticateBodySchema) {
    const athlete = await this.prisma.athlete.findUnique({ where: { email } })

    if (!athlete) throw new UnauthorizedException("User credentials does not match")

    const validPassword = await compare(password, athlete.password)

    if (!validPassword) throw new UnauthorizedException("User credentials does not match")

    const accessToken = this.jwt.sign({
      sub: athlete.id
    })

    return {
      access_token: accessToken
    }
  }
}
