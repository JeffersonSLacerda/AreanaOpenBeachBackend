import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Role } from './enums/role'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PasswordHelper } from '@/domain/schedule/enterprise/entities/value-objects/password'

export interface UserProps {
  name: string
  email: string
  password: string
  phone?: string
  role: Role

  createdAt: Date
  updatedAt?: Date
}

export class User extends AggregateRoot<UserProps> {
  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const hashedPassword = PasswordHelper.hashSyncPassword(props.password)

    const user = new User(
      {
        ...props,
        password: hashedPassword,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
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

  get phone(): string | null {
    return this.props.phone || null
  }

  set phone(phone: string) {
    this.props.phone = phone
    this.touch()
  }

  get role(): Role {
    return this.props.role
  }

  set role(role: Role) {
    this.props.role = role
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
