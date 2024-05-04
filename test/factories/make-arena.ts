import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Arena, ArenaProps } from '@/domain/arena/enterprise/entities/arena'
import { State } from '@/domain/arena/enterprise/entities/enums/state'

export function makeArena(
  override: Partial<ArenaProps> = {},
  id?: UniqueEntityID,
) {
  const arena = Arena.create(
    {
      name: faker.person.fullName(),
      isAvailable: true,
      state: State.AVAILABLE,
      ...override,
    },
    id,
  )

  return arena
}
