import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Appointment,
  AppointmentProps,
} from '@/domain/appointments/enterprise/entities/appointment'
import { makeArena } from './make-arena'
import { makeUser } from './make-user'
import { Modalities } from '@/domain/appointments/enterprise/entities/enums/modalities'

export function makeAppointment(
  override: Partial<AppointmentProps> = {},
  id?: UniqueEntityID,
) {
  const arena = makeArena()
  const user = makeUser()

  const modalitiesArray = Object.values(Modalities)
  const randomModality =
    modalitiesArray[Math.floor(Math.random() * modalitiesArray.length)]

  const appointment = Appointment.create(
    {
      arenaId: arena.id,
      userId: user.id,
      modality: randomModality,
      date: new Date(),
      ...override,
    },
    id,
  )

  return appointment
}
