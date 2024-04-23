import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const modalitiesSchema = z.enum([
  'BEACHTENNIS',
  'BEACHVOLLEYBALL',
  'FOOTVOLEY',
  'NONE',
])

const stateSchema = z.enum(['AVAILABLE', 'RESERVED', 'DAYUSE', 'MAINTENANCE'])

const createArenaBodySchema = z.object({
  name: z.string(),
  modality: modalitiesSchema,
  isAvailable: z.boolean(),
  capacity: z.number().optional(),
  state: stateSchema,
})

type CreateArenaBodySchema = z.infer<typeof createArenaBodySchema>

@Controller('/arenas')
@UseGuards(AuthGuard('jwt'))
export class CreateArenaController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createArenaBodySchema))
    body: CreateArenaBodySchema,
  ) {
    const { name, modality, isAvailable, state, capacity } = body

    await this.prisma.arena.create({
      data: {
        name,
        modalities: modality,
        isAvailable,
        state,
        capacity,
      },
    })

    return 'ok'
  }
}
