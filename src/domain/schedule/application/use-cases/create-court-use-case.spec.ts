import { InMemoryCourtsRepository } from 'test/repositories/in-memory-courts-repository'
import { CreateCourtUseCase } from './create-court-use-case'
import { Modalities } from '../../enterprise/entities/enums/modalities'
import { State } from '../../enterprise/entities/enums/state'

let courtsRepository: InMemoryCourtsRepository
let sut: CreateCourtUseCase
describe('Create Athlete', () => {
  beforeEach(() => {
    courtsRepository = new InMemoryCourtsRepository()
    sut = new CreateCourtUseCase(courtsRepository)
  })

  afterEach(() => {
    courtsRepository.clean()
  })
  it('should be able to create a new Court', async () => {
    const result = await sut.execute({
      name: 'Beach Tennis 1',
      modality: Modalities.BeachTennis,
      isAvailable: true,
      state: State.Available,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      court: expect.objectContaining({
        name: 'Beach Tennis 1',
        modality: Modalities.BeachTennis,
        isAvailable: true,
        state: State.Available,
      }),
    })
  })
})
