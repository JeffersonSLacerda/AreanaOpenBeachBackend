import { Either, left, right } from '@/core/either'
import { EmailAlreadyExistsError } from '@/core/errors/types/email-already-exists'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'
import { Role } from '../../enterprise/entities/enums/role'

interface RegisterAtheleteUseCaseRequest {
  name: string
  email: string
  password: string
  phone?: string
}

type RegisterAthleteUseCaseResponse = Either<
  EmailAlreadyExistsError,
  { athlete: User }
>

export class RegisterAthleteUseCase {
  constructor(private readonly usersRepoistory: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
  }: RegisterAtheleteUseCaseRequest): Promise<RegisterAthleteUseCaseResponse> {
    const emailAlreadyExists = await this.usersRepoistory.findByEmail(email)

    if (emailAlreadyExists) return left(new EmailAlreadyExistsError())

    const athlete = User.create({
      name,
      email,
      password,
      phone,
      role: Role.ATHLETE,
    })

    await this.usersRepoistory.create(athlete)

    return right({ athlete })
  }
}
