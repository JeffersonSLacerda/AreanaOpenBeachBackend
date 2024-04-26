import { Either, right } from '@/core/either'
import { Arena } from '../../enterprise/entities/arena'
import { ArenasRepository } from '../repositories/arenas-repository'

type ListArenaUseCaseResponse = Either<
  null,
  {
    arenas: Arena[]
  }
>

export class ListArenaUseCase {
  constructor(private readonly arenasRepository: ArenasRepository) {}

  async execute(): Promise<ListArenaUseCaseResponse> {
    const arenas = await this.arenasRepository.fetchAll()

    return right({
      arenas,
    })
  }
}
