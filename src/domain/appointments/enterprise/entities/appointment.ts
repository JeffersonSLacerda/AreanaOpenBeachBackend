import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Modalities } from './enums/modalities'

export interface AppointmentProps {
  arenaId: UniqueEntityID
  userId: UniqueEntityID
  modality: Modalities
  date: Date

  createdAt: Date
  updatedAt?: Date
}

export class Appointment extends AggregateRoot<AppointmentProps> {
  static create(
    props: Optional<AppointmentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const appointment = new Appointment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return appointment
  }

  get arenaId(): UniqueEntityID {
    return this.props.arenaId
  }

  set arenaId(id: UniqueEntityID) {
    this.props.arenaId = id
    this.touch()
  }

  get userId(): UniqueEntityID {
    return this.props.userId
  }

  set userId(id: UniqueEntityID) {
    this.props.userId = id
    this.touch()
  }

  get modality(): Modalities {
    return this.props.modality
  }

  set modality(modality: Modalities) {
    this.props.modality = modality
    this.touch()
  }

  get date(): Date {
    return this.props.date
  }

  set date(date: Date) {
    this.props.date = date
    this.touch()
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
