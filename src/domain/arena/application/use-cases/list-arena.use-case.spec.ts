import { InMemoryArenasRepository } from 'test/repositories/in-memory-arenas-repository'
import { ListArenaUseCase } from './list-arena.use-cases'
import { makeArena } from 'test/factories/make-arena'

let arenasRepository: InMemoryArenasRepository
let sut: ListArenaUseCase
describe('List Arena', () => {
  beforeEach(() => {
    arenasRepository = new InMemoryArenasRepository()
    sut = new ListArenaUseCase(arenasRepository)
  })

  afterEach(() => {
    arenasRepository.clean()
  })
  it('should be able to list a arena', async () => {
    const arena1 = makeArena({
      name: 'Beach Tennis 1',
    })
    arenasRepository.create(arena1)

    const arena2 = makeArena({
      name: 'Beach Soccer 1',
    })
    arenasRepository.create(arena2)

    const arena3 = makeArena({
      name: 'Futvolley 1',
    })
    arenasRepository.create(arena3)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(arenasRepository.items).toHaveLength(3)
    expect(result.value?.arenas).toHaveLength(3)
  })
})
