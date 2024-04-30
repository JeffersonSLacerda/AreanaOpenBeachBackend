import { InMemoryArenasRepository } from 'test/repositories/in-memory-courts-repository'
import { CreateArenaUseCase } from './create-arena.use-case'
import { Modalities } from '../../enterprise/entities/enums/modalities'
import { State } from '../../enterprise/entities/enums/state'

let arenasRepository: InMemoryArenasRepository
let sut: CreateArenaUseCase
describe('Create Arena', () => {
  beforeEach(() => {
    arenasRepository = new InMemoryArenasRepository()
    sut = new CreateArenaUseCase(arenasRepository)
  })

  afterEach(() => {
    arenasRepository.clear()
  })

  it('should be able to create a new Arena', async () => {
    const result = await sut.execute({
      name: 'Beach Tennis 1',
      modality: Modalities.BEACHTENNIS,
      isAvailable: true,
      state: State.AVAILABLE,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      arena: expect.objectContaining({
        name: 'Beach Tennis 1',
        modality: Modalities.BEACHTENNIS,
        isAvailable: true,
        state: State.AVAILABLE,
      }),
    })
  })
})
