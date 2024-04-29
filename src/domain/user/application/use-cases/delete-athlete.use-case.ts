import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/types/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { UsersRepository } from '../repositories/users-repository'
import { Role } from '../../enterprise/entities/enums/role'

interface DeleteAthleteUseCaseRequest {
  editorId: string
  athleteEmail: string
}

type DeleteAthleteUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  null
>

export class DeleteAthleteUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    editorId,
    athleteEmail,
  }: DeleteAthleteUseCaseRequest): Promise<DeleteAthleteUseCaseResponse> {
    const athlete = await this.usersRepository.findByEmail(athleteEmail)
    const editor = await this.usersRepository.findById(editorId)

    if (!athlete || !editor) return left(new ResourceNotFoundError())

    if (athlete.equals(editor) || editor.role === Role.ADMIN) {
      await this.usersRepository.delete(athlete)

      return right(null)
    }

    return left(new NotAllowedError())
  }
}
