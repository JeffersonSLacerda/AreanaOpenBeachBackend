import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Arena, ArenaProps } from '@/domain/arena/enterprise/entities/arena'
import { Modalities } from '@/domain/arena/enterprise/entities/enums/modalities'
import { State } from '@/domain/arena/enterprise/entities/enums/state'

export function makeArena(
  override: Partial<ArenaProps> = {},
  id?: UniqueEntityID,
) {
  const modalitiesArray = Object.values(Modalities)
  const randomModality =
    modalitiesArray[Math.floor(Math.random() * modalitiesArray.length)]

  const arena = Arena.create(
    {
      name: faker.person.fullName(),
      isAvailable: true,
      modality: randomModality as Modalities,
      state: State.AVAILABLE,
      ...override,
    },
    id,
  )

  return arena
}
