import { InMemoryArenasRepository } from 'test/repositories/in-memory-arenas-repository'
import { EditArenaUseCase } from './edit-arena.use-case'
import { Modalities } from '../../enterprise/entities/enums/modalities'
import { State } from '../../enterprise/entities/enums/state'
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

  it('should be able to edit a Arena', async () => {
    const arena = makeArena({
      name: 'Beach Volleyball',
    })

    await arenasRepository.create(arena)

    const result = await sut.execute({
      arenaId: arena.id.toString(),
      name: 'Beach Tennis 1',
      modality: Modalities.BEACHTENNIS,
      isAvailable: true,
      state: State.AVAILABLE,
    })

    expect(result.isRight()).toBe(true)
    expect(arenasRepository.items).toHaveLength(1)
  })

  it('should not be able to delete a inexistent arena', async () => {
    const result = await sut.execute({
      arenaId: 'areana 1',
      name: 'Beach Tennis 1',
      modality: Modalities.BEACHTENNIS,
      isAvailable: true,
      state: State.AVAILABLE,
    })

    expect(result.isLeft()).toBe(true)
  })
})
