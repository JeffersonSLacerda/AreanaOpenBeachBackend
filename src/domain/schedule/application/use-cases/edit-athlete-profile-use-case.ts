import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { Athlete } from '../../enterprise/entities/athlete'
import { AthletesRepository } from '../repositories/athletes-repository'

interface EditAthleteProfileRequest {
  athleteId: string
  name: string
  email: string
  phone: string
}

type EditAthleteProfileResponse = Either<
  ResourceNotFoundError,
  { athlete: Athlete }
>

export class EditAthleteProfileUseCase {
  constructor(private readonly athletesRepository: AthletesRepository) {}

  async execute({
    athleteId,
    name,
    email,
    phone,
  }: EditAthleteProfileRequest): Promise<EditAthleteProfileResponse> {
    const athlete = await this.athletesRepository.findById(athleteId)

    if (!athlete) return left(new ResourceNotFoundError())

    athlete.name = name
    athlete.email = email
    athlete.phone = phone

    await this.athletesRepository.save(athlete)

    return right({ athlete })
  }
}
