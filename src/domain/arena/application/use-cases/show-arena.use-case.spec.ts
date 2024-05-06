import { InMemoryArenasRepository } from 'test/repositories/in-memory-arenas-repository'
import { ShowArenaUseCase } from './show-arena.use-case'
import { makeArena } from 'test/factories/make-arena'

let arenasRepository: InMemoryArenasRepository
let sut: ShowArenaUseCase
describe('Show Arena', () => {
  beforeEach(() => {
    arenasRepository = new InMemoryArenasRepository()
    sut = new ShowArenaUseCase(arenasRepository)
  })

  afterEach(() => {
    arenasRepository.clear()
  })

  it('should be able to show a arena', async () => {
    const arena = makeArena({
      name: 'Beach Tennis 1',
    })

    arenasRepository.create(arena)

    const result = await sut.execute({
      arenaId: arena.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(arenasRepository.items).toHaveLength(1)
    expect(result.value).toMatchObject({
      arena: expect.objectContaining({
        name: 'Beach Tennis 1',
      }),
    })
  })
})
