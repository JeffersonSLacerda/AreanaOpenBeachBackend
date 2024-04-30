import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/types/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { UsersRepository } from '../repositories/users-repository'
import { Role } from '../../enterprise/entities/enums/role'

interface PromoveUserToCoachUseCaseRequest {
  userId: string
  editorId: string
}

type PromoveUserToCoachUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class PromoveUserToCoachUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    userId,
    editorId,
  }: PromoveUserToCoachUseCaseRequest): Promise<PromoveUserToCoachUseCaseResponse> {
    const userToPromove = await this.usersRepository.findById(userId)
    const editor = await this.usersRepository.findById(editorId)

    if (!userToPromove || !editor) return left(new ResourceNotFoundError())

    if (editor.role !== Role.ADMIN || userToPromove.role !== Role.ATHLETE)
      return left(new NotAllowedError())

    userToPromove.role = Role.COACH

    await this.usersRepository.save(userToPromove)

    return right(null)
  }
}
