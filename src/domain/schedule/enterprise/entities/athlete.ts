import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PasswordHelper } from './value-objects/password'

export interface AthleteProps {
  name: string
  email: string
  password: string
  phone: string
  // modalities?: Modalities

  createdAt: Date
  updatedAt?: Date
}

export class Athlete extends Entity<AthleteProps> {
  static create(
    props: Optional<AthleteProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const hashedPassword = PasswordHelper.hashSyncPassword(props.password)

    const athlete = new Athlete(
      {
        ...props,
        password: hashedPassword,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return athlete
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get email(): string {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get password(): string {
    return this.props.password
  }

  set password(password: string) {
    PasswordHelper.hashPassword(password).then((hashedPassword) => {
      this.password = hashedPassword
    })

    this.touch()
  }

  get phone(): string {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
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
