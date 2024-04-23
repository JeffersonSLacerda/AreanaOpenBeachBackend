import { DeleteCourtUseCase } from './delete-court-use-case'
import { InMemoryCourtsRepository } from 'test/repositories/in-memory-courts-repository'
import { makeCourt } from 'test/factories/make-court'

let courtsRepository: InMemoryCourtsRepository
let sut: DeleteCourtUseCase
describe('Delete Court', () => {
  beforeEach(() => {
    courtsRepository = new InMemoryCourtsRepository()
    sut = new DeleteCourtUseCase(courtsRepository)
  })

  afterEach(() => {
    courtsRepository.clean()
  })
  it('should be able to delete a court', async () => {
    const court = makeCourt({
      name: 'Beach Tennis 1',
    })

    courtsRepository.create(court)

    const result = await sut.execute({
      courtId: court.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(courtsRepository.items).toHaveLength(0)
  })
})
