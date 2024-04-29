import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { ShowProfileUseCase } from './show-profile.use-case'
import { makeUser } from 'test/factories/make-user'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: ShowProfileUseCase
describe('Show Profile', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new ShowProfileUseCase(usersRepository)
  })

  afterEach(() => {
    usersRepository.clear()
  })
  it('should be able to show the athlete profile', async () => {
    const user = makeUser({
      name: 'John Doe',
      email: 'JohnDoe@example.com',
    })

    usersRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      user: expect.objectContaining({
        name: 'John Doe',
        email: 'JohnDoe@example.com',
      }),
    })
  })

  it('should not be able to get a inexistent athlete profile', async () => {
    const result = await sut.execute({
      userId: '2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(ResourceNotFoundError)
  })
})
