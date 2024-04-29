import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { EditAthleteProfileUseCase } from './edit-athlete.use-case'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { Role } from '../../enterprise/entities/enums/role'
import { NotAllowedError } from '@/core/errors/types/not-allowed-error'

let usersRepository: InMemoryUsersRepository
let sut: EditAthleteProfileUseCase
describe('Edit Athlete Profile', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new EditAthleteProfileUseCase(usersRepository)
  })

  afterEach(() => {
    usersRepository.clear()
  })

  it('should be able to edit the athlete profile', async () => {
    const athlete = makeUser()

    usersRepository.create(athlete)

    const result = await sut.execute({
      athleteId: athlete.id.toString(),
      editorId: athlete.id.toString(),
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

  it('should be able to edit the athlete profile when the editor is admin', async () => {
    const athlete = makeUser()

    usersRepository.create(athlete)

    const admin = makeUser({
      role: Role.ADMIN,
    })

    usersRepository.create(admin)

    const result = await sut.execute({
      athleteId: athlete.id.toString(),
      editorId: admin.id.toString(),
      name: 'John Doe admin',
      email: 'JohnDoe@example.com',
      phone: athlete.phone,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      athlete: expect.objectContaining({
        name: 'John Doe admin',
        email: 'JohnDoe@example.com',
      }),
    })
  })

  it('should not be able to edit a other athlete profile', async () => {
    const athlete1 = makeUser()
    usersRepository.create(athlete1)
    const athlete2 = makeUser()
    usersRepository.create(athlete2)

    const result = await sut.execute({
      athleteId: athlete1.id.toString(),
      editorId: athlete2.id.toString(),
      name: 'John Doe',
      email: 'JohnDoe@example.com',
      phone: '999999999',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(NotAllowedError)
  })

  it('should not be able to get a inexistent athlete profile', async () => {
    const result = await sut.execute({
      athleteId: new UniqueEntityID().toString(),
      editorId: '1',
      name: 'John Doe',
      email: 'JohnDoe@example.com',
      phone: '999999999',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(ResourceNotFoundError)
  })
})
