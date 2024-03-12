import { ConflictException, Body, Controller, Post } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

interface CreateAccountBodySchema {
  name: string
  email: string
  password: string
}

@Controller('/accounts')
export class CreateAccountController {
  constructor(private readonly prisma: PrismaService) { }

  @Post()
  async hadle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const athleteWithSameEmail = await this.prisma.athlete.findFirst({
      where: {
        email,
      }
    })

    if (athleteWithSameEmail)
      throw new ConflictException("Athelete with same email already exists!")

    const athlete = await this.prisma.athlete.create({
      data: {
        name,
        email,
        password,
      },
    })

    return athlete;
  }
}
