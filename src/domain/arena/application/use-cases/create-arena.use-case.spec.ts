import { InMemoryArenasRepository } from 'test/repositories/in-memory-arenas-repository'
import { Modalities } from '../../../arena/enterprise/entities/enums/modalities'
import { State } from '../../../arena/enterprise/entities/enums/state'
import { CreateArenaUseCase } from './create-areana.use-case'

let arenasRepository: InMemoryArenasRepository
let sut: CreateArenaUseCase
describe('Create Arena', () => {
  beforeEach(() => {
    arenasRepository = new InMemoryArenasRepository()
    sut = new CreateArenaUseCase(arenasRepository)
  })

  afterEach(() => {
    arenasRepository.clean()
  })
  it('should be able to create a new Arena', async () => {
    const result = await sut.execute({
      name: 'Beach Tennis 1',
      modality: Modalities.BeachTennis,
      isAvailable: true,
      state: State.Available,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      arena: expect.objectContaining({
        name: 'Beach Tennis 1',
        modality: Modalities.BeachTennis,
        isAvailable: true,
        state: State.Available,
      }),
    })
  })
})
