import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { Role } from '../../enterprise/entities/enums/role'
import { NotAllowedError } from '@/core/errors/types/not-allowed-error'
import { PromoveUserToCoachUseCase } from './promove-user-to-coach.use-case'

let usersRepository: InMemoryUsersRepository
let sut: PromoveUserToCoachUseCase
describe('Promove user to coach', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new PromoveUserToCoachUseCase(usersRepository)
  })

  afterEach(() => {
    usersRepository.clear()
  })

  it('should be able to promove a user to coach', async () => {
    const user = makeUser()
    const editor = makeUser({ role: Role.ADMIN })

    usersRepository.create(user)
    usersRepository.create(editor)

    const result = await sut.execute({
      userId: user.id.toString(),
      editorId: editor.id.toString(),
    })

    const promovedUser = usersRepository.items.find((item) =>
      item.id.equals(user.id),
    )

    expect(result.isRight()).toBe(true)
    expect(promovedUser).toBeDefined()
    expect(promovedUser?.role).toBe(Role.COACH)
  })

  it('should not be able, non admin user user, promote user to coach', async () => {
    const athlete1 = makeUser()
    const athlete2 = makeUser()

    usersRepository.create(athlete1)
    usersRepository.create(athlete2)

    const result = await sut.execute({
      userId: athlete1.id.toString(),
      editorId: athlete2.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to promove a inexistent athlete profile', async () => {
    const result = await sut.execute({
      userId: '2',
      editorId: '1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(ResourceNotFoundError)
  })
})
