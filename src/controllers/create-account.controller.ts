import {
  ConflictException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { hash } from 'bcrypt'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async hadle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const athleteWithSameEmail = await this.prisma.athlete.findFirst({
      where: {
        email,
      },
    })

    if (athleteWithSameEmail)
      throw new ConflictException('Athelete with same email already exists!')

    const HASH_SALTS = 8

    const hashedPassword = await hash(password, HASH_SALTS)

    const athlete = await this.prisma.athlete.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return athlete
  }
}
