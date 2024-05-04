import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { State } from './enums/state'

export interface ArenaProps {
  name: string
  isAvailable: boolean
  state: State

  createdAt: Date
  updatedAt?: Date
}

export class Arena extends Entity<ArenaProps> {
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

  get isAvailable(): boolean {
    return this.props.isAvailable
  }

  set isAvailable(isAvailable: boolean) {
    this.props.isAvailable = isAvailable
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
