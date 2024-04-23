import { Either, left, right } from '@/core/either'
import { AthletesRepository } from '../repositories/athletes-repository'
import { Athlete } from '../../enterprise/entities/athlete'
import { EmailAlreadyExistsError } from '@/core/errors/types/email-already-exists'

interface RegisterAthleteRequest {
  name: string
  email: string
  password: string
  phone: string
}

type RegisterAthleteResponse = Either<
  EmailAlreadyExistsError,
  { athlete: Athlete }
>

export class RegisterAthleteUseCase {
  constructor(private readonly athletesRepository: AthletesRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
  }: RegisterAthleteRequest): Promise<RegisterAthleteResponse> {
    const emailAlreadyExists = await this.athletesRepository.findByEmail(email)

    if (emailAlreadyExists) return left(new EmailAlreadyExistsError())

    const athlete = Athlete.create({
      name,
      email,
      password,
      phone,
    })

    await this.athletesRepository.create(athlete)

    return right({ athlete })
  }
}
