import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { DeleteAthleteUseCase } from './delete-athlete.use-case'
import { makeUser } from 'test/factories/make-user'
import { NotAllowedError } from '@/core/errors/types/not-allowed-error'
import { Role } from '../../enterprise/entities/enums/role'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: DeleteAthleteUseCase
describe('Delete Athlete Profile', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteAthleteUseCase(usersRepository)
  })

  afterEach(() => {
    usersRepository.clear()
  })

  it('should be able to delete the athlete profile', async () => {
    const athlete = makeUser({
      name: 'John Doe',
      email: 'JohnDoe@example.com',
    })

    usersRepository.create(athlete)

    const result = await sut.execute({
      editorId: athlete.id.toString(),
      athleteEmail: 'JohnDoe@example.com',
    })

    expect(result.isRight()).toBe(true)
    expect(usersRepository.items).toHaveLength(0)
  })

  it('should be able to admin delete the athlete profile', async () => {
    const athlete = makeUser({
      name: 'John Doe',
      email: 'JohnDoe@example.com',
    })

    const admin = makeUser({
      role: Role.ADMIN,
    })

    usersRepository.create(athlete)
    usersRepository.create(admin)

    const result = await sut.execute({
      editorId: admin.id.toString(),
      athleteEmail: 'JohnDoe@example.com',
    })

    expect(result.isRight()).toBe(true)
    expect(usersRepository.items).toHaveLength(1)
  })

  it('should not be able to delete a other athlete profile', async () => {
    const athlete1 = makeUser()
    usersRepository.create(athlete1)
    const athlete2 = makeUser()
    usersRepository.create(athlete2)

    const result = await sut.execute({
      editorId: athlete1.id.toString(),
      athleteEmail: athlete2.email,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(NotAllowedError)
  })

  it('should not be able to get a inexistent athlete profile', async () => {
    const result = await sut.execute({
      editorId: 'new UniqueEntityID',
      athleteEmail: 'JohnDoe@example.com',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(ResourceNotFoundError)
  })
})
