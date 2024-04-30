import { Either, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'

type ListAthletesUseCaseResponse = Either<null, { athletes: User[] }>

export class ListAthletesUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<ListAthletesUseCaseResponse> {
    const athletes = await this.usersRepository.fetchAthletes()

    return right({
      athletes,
    })
  }
}
