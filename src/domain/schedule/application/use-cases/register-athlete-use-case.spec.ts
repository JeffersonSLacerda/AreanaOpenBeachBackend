import { InMemoryAthletesRepository } from 'test/repositories/in-memory-athletes-repository'
import { RegisterAthleteUseCase } from './register-athlete-use-case'
import { makeAthlete } from 'test/factories/make-athlete'

let athletesRepository: InMemoryAthletesRepository
let sut: RegisterAthleteUseCase
describe('Create Athlete', () => {
  beforeEach(() => {
    athletesRepository = new InMemoryAthletesRepository()
    sut = new RegisterAthleteUseCase(athletesRepository)
  })

  afterEach(() => {
    athletesRepository.clean()
  })
  it('should be able to register a new Athlete', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'JohnDoe@example.com',
      password: '12345',
      phone: '999999999',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      athlete: expect.objectContaining({
        name: 'John Doe',
        email: 'JohnDoe@example.com',
        phone: '999999999',
      }),
    })
  })

  it('should not be able register tow athletes with the same email', async () => {
    const athlete = makeAthlete({ email: 'email@test.com' })

    athletesRepository.create(athlete)

    const result = await sut.execute({
      name: 'John Doe',
      email: athlete.email,
      password: '12345',
      phone: '999999999',
    })

    expect(result.isLeft()).toBe(true)
  })
})
