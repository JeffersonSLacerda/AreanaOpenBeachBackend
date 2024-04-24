import { NotificationRepository } from '@/domain/notification/application/repositories/notification-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notifications'

export class InMemoryNotificationsRepository implements NotificationRepository {
  public items: Notification[] = []

  async findById(id: string): Promise<Notification | null> {
    return (
      this.items.find((notification) => notification.id.toString() === id) ??
      null
    )
  }

  async create(notification: Notification) {
    this.items.push(notification)
  }

  async save(notification: Notification) {
    const notificationIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )

    this.items[notificationIndex] = notification
  }

  async clear() {
    this.items.splice(0, this.items.length)
  }
}
