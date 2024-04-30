import { InMemoryArenasRepository } from 'test/repositories/in-memory-arenas-repository'
import { DeleteArenaUseCase } from './delete-arena.use-case'
import { makeArena } from 'test/factories/make-arena'

let arenasRepository: InMemoryArenasRepository
let sut: DeleteArenaUseCase
describe('Delete Arena', () => {
  beforeEach(() => {
    arenasRepository = new InMemoryArenasRepository()
    sut = new DeleteArenaUseCase(arenasRepository)
  })

  afterEach(() => {
    arenasRepository.clear()
  })
  it('should be able to delete a arena', async () => {
    const arena = makeArena({
      name: 'Beach Tennis 1',
    })

    arenasRepository.create(arena)

    const result = await sut.execute({
      arenaId: arena.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(arenasRepository.items).toHaveLength(0)
  })
})
