import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/types/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { UsersRepository } from '../repositories/users-repository'
import { Role } from '../../enterprise/entities/enums/role'

interface DeleteAdminUseCaseRequest {
  editorId: string
  adminId: string
}

type DeleteAdminUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  null
>

export class DeleteAdminUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    editorId,
    adminId,
  }: DeleteAdminUseCaseRequest): Promise<DeleteAdminUseCaseResponse> {
    const adminToDelete = await this.usersRepository.getById(adminId)
    const editor = await this.usersRepository.getById(editorId)
    const adminsOnSystem = await this.usersRepository.countAdminsUsers()

    if (!adminToDelete || !editor) return left(new ResourceNotFoundError())

    if (
      editor.role === Role.ADMIN &&
      adminsOnSystem > 0 &&
      !editor.equals(adminToDelete)
    ) {
      await this.usersRepository.delete(adminToDelete)

      return right(null)
    }

    return left(new NotAllowedError())
  }
}
