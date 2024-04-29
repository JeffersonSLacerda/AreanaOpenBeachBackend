import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/user/enterprise/entities/user'
import { Role } from '@/domain/user/enterprise/entities/enums/role'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: '123456',
      phone: faker.phone.number(),
      role: Role.ATHLETE,
      ...override,
    },
    id,
  )

  return user
}
