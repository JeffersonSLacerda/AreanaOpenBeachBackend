import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Court, CourtProps } from '@/domain/schedule/enterprise/entities/court'
import { Modalities } from '@/domain/schedule/enterprise/entities/enums/modalities'
import { State } from '@/domain/schedule/enterprise/entities/enums/state'

export function makeCourt(
  override: Partial<CourtProps> = {},
  id?: UniqueEntityID,
) {
  const modalitiesArray = Object.values(Modalities)
  const randomModality =
    modalitiesArray[Math.floor(Math.random() * modalitiesArray.length)]

  const court = Court.create(
    {
      name: faker.person.fullName(),
      isAvailable: true,
      modality: randomModality as Modalities,
      state: State.Available,
      ...override,
    },
    id,
  )

  return court
}
