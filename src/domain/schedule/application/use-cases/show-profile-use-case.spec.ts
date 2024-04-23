import { InMemoryAthletesRepository } from 'test/repositories/in-memory-athletes-repository'
import { makeAthlete } from 'test/factories/make-athlete'
import { ShowProfileUseCase } from './show-profile-use-case'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'

let athletesRepository: InMemoryAthletesRepository
let sut: ShowProfileUseCase
describe('Show Profile', () => {
  beforeEach(() => {
    athletesRepository = new InMemoryAthletesRepository()
    sut = new ShowProfileUseCase(athletesRepository)
  })

  afterEach(() => {
    athletesRepository.clean()
  })
  it('should be able to show the athlete profile', async () => {
    const athlete = makeAthlete({
      name: 'John Doe',
      email: 'JohnDoe@example.com',
    })

    athletesRepository.create(athlete)

    const result = await sut.execute({
      athleteId: athlete.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      athlete: expect.objectContaining({
        name: 'John Doe',
        email: 'JohnDoe@example.com',
      }),
    })
  })

  it('should not be able to get a inexistent athlete profile', async () => {
    const result = await sut.execute({
      athleteId: new UniqueEntityID().toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(ResourceNotFoundError)
  })
})
