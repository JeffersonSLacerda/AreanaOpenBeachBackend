import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Appointment,
  AppointmentProps,
} from '@/domain/appointments/enterprise/entities/appointment'
import { makeArena } from './make-arena'
import { makeUser } from './make-user'

export function makeAppointment(
  override: Partial<AppointmentProps> = {},
  id?: UniqueEntityID,
) {
  const arena = makeArena()
  const user = makeUser()

  const appointment = Appointment.create(
    {
      arenaId: arena.id,
      userId: user.id,
      date: new Date(),
      ...override,
    },
    id,
  )

  return appointment
}
