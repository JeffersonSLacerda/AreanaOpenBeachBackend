import { Either, right } from '@/core/either'
import { ArenasRepository } from '../repositories/arenas-repository'
import { Arena } from '../../enterprise/entities/arena'

type ListAvailableArenaUseCaseResponse = Either<
  null,
  {
    arenas: Arena[]
  }
>

export class ListAvailableArenaUseCase {
  constructor(private readonly arenasRepository: ArenasRepository) {}

  async execute(): Promise<ListAvailableArenaUseCaseResponse> {
    const arenas = await this.arenasRepository.fetchAllAvailable()

    return right({ arenas })
  }
}
