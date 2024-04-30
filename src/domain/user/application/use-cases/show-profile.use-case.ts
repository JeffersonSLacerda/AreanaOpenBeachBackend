import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'

interface ShowProfileUseCaseRequest {
  userId: string
}

type ShowProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class ShowProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: ShowProfileUseCaseRequest): Promise<ShowProfileUseCaseResponse> {
    const user = await this.usersRepository.getById(userId)

    if (!user) return left(new ResourceNotFoundError())

    return right({ user })
  }
}
