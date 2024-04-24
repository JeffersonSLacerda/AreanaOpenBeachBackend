import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface NotificationProps {
  recipientId: UniqueEntityID
  title: string
  content: string
  createdAt: Date
  readedAt?: Date
}

export class Notification extends Entity<NotificationProps> {
  static create(
    props: Optional<NotificationProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return notification
  }

  read() {
    this.props.readedAt = new Date()
  }

  get recipientId(): UniqueEntityID {
    return this.props.recipientId
  }

  set recipientId(recipientId: UniqueEntityID) {
    this.props.recipientId = recipientId
  }

  get title(): string {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
  }

  get content(): string {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get readedAt(): Date | null {
    return this.props.readedAt || null
  }

  set readedAt(readNow: Date) {
    this.props.readedAt = readNow
  }
}
