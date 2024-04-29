import { makeUser } from 'test/factories/make-user'
import { RegisterAthleteUseCase } from './register-athlete.use-case'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: RegisterAthleteUseCase
describe('Create Athlete', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterAthleteUseCase(usersRepository)
  })

  afterEach(() => {
    usersRepository.clear()
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
    const athlete = makeUser({ email: 'email@test.com' })

    usersRepository.create(athlete)

    const result = await sut.execute({
      name: 'John Doe',
      email: athlete.email,
      password: '12345',
      phone: '999999999',
    })

    expect(result.isLeft()).toBe(true)
  })
})
