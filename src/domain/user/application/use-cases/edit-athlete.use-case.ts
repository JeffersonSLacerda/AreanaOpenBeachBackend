import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/types/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'
import { Role } from '../../enterprise/entities/enums/role'

interface EditAthleteProfileUseCaseRequest {
  athleteId: string
  editorId: string
  name: string
  email: string
  phone: string
}

type EditAthleteProfileUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { athlete: User }
>

export class EditAthleteProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    athleteId,
    editorId,
    name,
    email,
    phone,
  }: EditAthleteProfileUseCaseRequest): Promise<EditAthleteProfileUseCaseResponse> {
    const athlete = await this.usersRepository.getById(athleteId)
    const editor = await this.usersRepository.getById(editorId)

    if (!athlete || !editor) return left(new ResourceNotFoundError())

    if (editor.role === Role.ADMIN || athlete.equals(editor)) {
      athlete.name = name
      athlete.email = email
      athlete.phone = phone

      await this.usersRepository.save(athlete)

      return right({ athlete })
    }

    return left(new NotAllowedError())
  }
}
