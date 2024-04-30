import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { NotAllowedError } from '@/core/errors/types/not-allowed-error'
import { Role } from '../../enterprise/entities/enums/role'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { DeleteAdminUseCase } from './delete-admin.use-case'

let usersRepository: InMemoryUsersRepository
let sut: DeleteAdminUseCase
describe('Delete Admin Profile', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteAdminUseCase(usersRepository)
  })

  afterEach(() => {
    usersRepository.clear()
  })

  it('should be able to delete the admin profile', async () => {
    const adminToDelete = makeUser({
      role: Role.ADMIN,
    })

    const editor = makeUser({
      role: Role.ADMIN,
    })

    usersRepository.create(adminToDelete)
    usersRepository.create(editor)

    const result = await sut.execute({
      editorId: editor.id.toString(),
      adminId: adminToDelete.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(usersRepository.items).toHaveLength(1)
  })

  it('should not be able to delete a the same admin profile', async () => {
    const adminToDelte = makeUser({ role: Role.ADMIN })
    usersRepository.create(adminToDelte)
    const otherAdmin = makeUser({ role: Role.ADMIN })
    usersRepository.create(otherAdmin)

    const result = await sut.execute({
      editorId: adminToDelte.id.toString(),
      adminId: adminToDelte.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(usersRepository.items).toHaveLength(2)
    expect(result.value).instanceOf(NotAllowedError)
  })

  it('should not be able to delete a inexistent admin profile', async () => {
    const result = await sut.execute({
      editorId: 'new UniqueEntityID',
      adminId: 'JohnDoe@example.com',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(ResourceNotFoundError)
  })
})
