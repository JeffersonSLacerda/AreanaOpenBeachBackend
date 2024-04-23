import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Athlete,
  AthleteProps,
} from '@/domain/schedule/enterprise/entities/athlete'

export function makeAthlete(
  override: Partial<AthleteProps> = {},
  id?: UniqueEntityID,
) {
  const athlete = Athlete.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: '123456',
      phone: faker.phone.number(),
      ...override,
    },
    id,
  )

  return athlete
}
