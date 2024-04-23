import { InMemoryAthletesRepository } from 'test/repositories/in-memory-athletes-repository'
import { makeAthlete } from 'test/factories/make-athlete'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { DeleteAthleteProfileUseCase } from './delete-athlete-profile-use-case'
import { NotAllowedError } from '@/core/errors/types/not-allowed-error'

let athletesRepository: InMemoryAthletesRepository
let sut: DeleteAthleteProfileUseCase
describe('Delete Athlete Profile', () => {
  beforeEach(() => {
    athletesRepository = new InMemoryAthletesRepository()
    sut = new DeleteAthleteProfileUseCase(athletesRepository)
  })

  afterEach(() => {
    athletesRepository.clean()
  })
  it('should be able to delete the athlete profile', async () => {
    const athlete = makeAthlete({
      name: 'John Doe',
      email: 'JohnDoe@example.com',
    })

    athletesRepository.create(athlete)

    const result = await sut.execute({
      editorId: athlete.id,
      email: 'JohnDoe@example.com',
    })

    expect(result.isRight()).toBe(true)
    expect(athletesRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a other athlete profile', async () => {
    const athlete = makeAthlete(
      {
        name: 'John Doe',
        email: 'JohnDoe@example.com',
      },
      new UniqueEntityID('athlete-2'),
    )
    athletesRepository.create(athlete)
    const result = await sut.execute({
      editorId: new UniqueEntityID('athlete-1'),
      email: athlete.email,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(NotAllowedError)
  })

  it('should not be able to get a inexistent athlete profile', async () => {
    const result = await sut.execute({
      editorId: new UniqueEntityID(),
      email: 'JohnDoe@example.com',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(ResourceNotFoundError)
  })
})
