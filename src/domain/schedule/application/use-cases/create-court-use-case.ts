import { Either, right } from '@/core/either'
import { Modalities } from '../../enterprise/entities/enums/modalities'
import { State } from '../../enterprise/entities/enums/state'
import { CourtsRepository } from '../repositories/courts-repository'
import { Court } from '../../enterprise/entities/court'

interface CreateCourtRequest {
  name: string
  modality: Modalities
  isAvailable: boolean
  capacity?: number
  state: State
}

type CreateCourtResponse = Either<null, { court: Court }>

export class CreateCourtUseCase {
  constructor(private readonly courtsRepository: CourtsRepository) {}

  async execute({
    name,
    modality,
    isAvailable,
    capacity,
    state,
  }: CreateCourtRequest): Promise<CreateCourtResponse> {
    const court = Court.create({
      name,
      modality,
      isAvailable,
      capacity,
      state,
    })

    await this.courtsRepository.create(court)

    return right({ court })
  }
}
