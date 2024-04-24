import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { SendNotificationUseCase } from './send-notification.use-case'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be ablet to send a new notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'New Notification',
      content: 'Content of notification',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      notification: expect.objectContaining({
        title: 'New Notification',
        content: 'Content of notification',
      }),
    })
  })
})
