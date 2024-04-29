import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { ListAthletesUseCase } from './list-athlete.use-case'
import { makeUser } from 'test/factories/make-user'
import { Role } from '../../enterprise/entities/enums/role'

let usersRepository: InMemoryUsersRepository
let sut: ListAthletesUseCase

describe('List Athletes', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new ListAthletesUseCase(usersRepository)
  })

  afterEach(() => {
    usersRepository.clear()
  })

  it('should be able to list the athletes', async () => {
    for (let i = 0; i < 5; i++) {
      const user = makeUser()
      usersRepository.create(user)
    }

    usersRepository.create(makeUser({ role: Role.ADMIN }))

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(usersRepository.items).toHaveLength(6)
    expect(result.value?.athletes).toHaveLength(5)
  })
})
