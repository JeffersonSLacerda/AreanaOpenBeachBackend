import { makeArena } from 'test/factories/make-arena'
import { InMemoryArenasRepository } from 'test/repositories/in-memory-arenas-repository'
import { ListAvailableArenaUseCase } from './list-available-arena.use-case'

let arenasRepository: InMemoryArenasRepository
let sut: ListAvailableArenaUseCase
describe('ListAvailable Arena', () => {
  beforeEach(() => {
    arenasRepository = new InMemoryArenasRepository()
    sut = new ListAvailableArenaUseCase(arenasRepository)
  })

  afterEach(() => {
    arenasRepository.clear()
  })
  it('should be able to listavailable a arena', async () => {
    const arena1 = makeArena()
    arenasRepository.create(arena1)

    const arena2 = makeArena()
    arenasRepository.create(arena2)

    const inavailableArena = makeArena({
      isAvailable: false,
    })

    arenasRepository.create(inavailableArena)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(arenasRepository.items).toHaveLength(3)
    expect(result.value?.arenas).toHaveLength(2)
  })
})
