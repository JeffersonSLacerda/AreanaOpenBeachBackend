import { InMemoryArenasRepository } from 'test/repositories/in-memory-arenas-repository'
import { EditArenaUseCase } from './edit-arena.use-case'
import { makeArena } from 'test/factories/make-arena'

let arenasRepository: InMemoryArenasRepository
let sut: EditArenaUseCase
describe('Edit Arena', () => {
  beforeEach(() => {
    arenasRepository = new InMemoryArenasRepository()
    sut = new EditArenaUseCase(arenasRepository)
  })

  afterEach(() => {
    arenasRepository.clear()
  })
  it('should be able to edit a arena', async () => {
    const arena = makeArena()

    arenasRepository.create(arena)

    const result = await sut.execute({
      arenaId: arena.id.toString(),
      name: 'Edited Arena',
      isAvailable: true,
      state: arena.state,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      arena: expect.objectContaining({
        name: 'Edited Arena',
        isAvailable: true,
      }),
    })
  })
})
