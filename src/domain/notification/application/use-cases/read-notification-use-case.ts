import { Either, left, right } from '@/core/either'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/types/not-allowed-error'
import { Notification } from '../../enterprise/entities/notifications'

export interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private readonly notification: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notification.findById(notificationId)

    if (!notification) return left(new ResourceNotFoundError())

    if (recipientId !== notification.recipientId.toString())
      return left(new NotAllowedError())

    notification.read()

    await this.notification.save(notification)

    return right({
      notification,
    })
  }
}
