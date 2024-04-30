import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/types/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { UsersRepository } from '../repositories/users-repository'
import { Role } from '../../enterprise/entities/enums/role'

interface PromoveUserToAdminUseCaseRequest {
  userId: string
  editorId: string
}

type PromoveUserToAdminUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class PromoveUserToAdminUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    userId,
    editorId,
  }: PromoveUserToAdminUseCaseRequest): Promise<PromoveUserToAdminUseCaseResponse> {
    const userToPromove = await this.usersRepository.getById(userId)
    const editor = await this.usersRepository.getById(editorId)

    if (!userToPromove || !editor) return left(new ResourceNotFoundError())

    if (editor.role !== Role.ADMIN) return left(new NotAllowedError())

    userToPromove.role = Role.ADMIN

    await this.usersRepository.save(userToPromove)

    return right(null)
  }
}
