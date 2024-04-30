import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Modalities } from './enums/modalities'
import { State } from './enums/state'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface ArenaProps {
  name: string
  modality: Modalities
  isAvailable: boolean
  capacity?: number
  state: State

  createdAt: Date
  updatedAt?: Date
}

export class Arena extends AggregateRoot<ArenaProps> {
  static create(props: Optional<ArenaProps, 'createdAt'>, id?: UniqueEntityID) {
    const arena = new Arena(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return arena
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
