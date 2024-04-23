import { InMemoryAthletesRepository } from 'test/repositories/in-memory-athletes-repository'
import { makeAthlete } from 'test/factories/make-athlete'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { EditAthleteProfileUseCase } from './edit-athlete-profile-use-case'

let athletesRepository: InMemoryAthletesRepository
let sut: EditAthleteProfileUseCase
describe('Edit Athlete Profile', () => {
  beforeEach(() => {
    athletesRepository = new InMemoryAthletesRepository()
    sut = new EditAthleteProfileUseCase(athletesRepository)
  })

  afterEach(() => {
    athletesRepository.clean()
  })
  it('should be able to edit the athlete profile', async () => {
    const athlete = makeAthlete()

    athletesRepository.create(athlete)

    const result = await sut.execute({
      athleteId: athlete.id.toString(),
      name: 'John Doe',
      email: 'JohnDoe@example.com',
      phone: athlete.phone,
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
      name: 'John Doe',
      email: 'JohnDoe@example.com',
      phone: '999999999',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(ResourceNotFoundError)
  })
})
