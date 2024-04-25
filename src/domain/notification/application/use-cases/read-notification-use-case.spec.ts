import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { ReadNotificationUseCase } from './read-notification-use-case'
import { makeNotification } from 'test/factories/make-notification'
import { NotAllowedError } from '@/core/errors/types/not-allowed-error'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  afterEach(() => {
    inMemoryNotificationsRepository.clear()
  })

  it('should be able to read a new notification', async () => {
    const notification = makeNotification()

    inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0].readedAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a other user notification', async () => {
    const notification = makeNotification()

    inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: '1',
      notificationId: notification.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryNotificationsRepository.items.length).toEqual(1)
  })
})
