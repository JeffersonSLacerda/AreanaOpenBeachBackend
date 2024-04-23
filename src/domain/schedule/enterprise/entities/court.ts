import { Entity } from '@/core/entities/entity'
import { Modalities } from './enums/modalities'
import { State } from './enums/state'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

// TODO Change Court to Arena

export interface CourtProps {
  name: string
  modality: Modalities
  isAvailable: boolean
  capacity?: number
  state: State

  createdAt: Date
  updatedAt?: Date
}

export class Court extends Entity<CourtProps> {
  static create(props: Optional<CourtProps, 'createdAt'>, id?: UniqueEntityID) {
    const court = new Court(
      {
        ...props,
        isAvailable: props.isAvailable ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return court
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get modality(): Modalities {
    return this.props.modality
  }

  set modality(modality: Modalities) {
    this.props.modality = modality
    this.touch()
  }

  get isAvailable(): boolean {
    return this.props.isAvailable
  }

  set isAvailable(isAvailable: boolean) {
    this.props.isAvailable = isAvailable
    this.touch()
  }

  get capacity(): number | null {
    return this.props.capacity || null
  }

  set capacity(capacity: number) {
    this.props.capacity = capacity
    this.touch()
  }

  get state(): State {
    return this.props.state
  }

  set state(state: State) {
    this.props.state = state
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt || null
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
