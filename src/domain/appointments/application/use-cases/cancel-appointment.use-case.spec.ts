import { CancelAppointmentUseCase } from './cancel-appointment.use-case'
import { InMemoryAppointmentsRepository } from 'test/repositories/in-memory-appointmensts-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { makeAppointment } from 'test/factories/make-appointment'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'

let appointmentsRepository: InMemoryAppointmentsRepository
let usersReposiotry: InMemoryUsersRepository
let sut: CancelAppointmentUseCase

describe('Cancel Appointments', () => {
  beforeAll(() => {
    const date = new Date(2024, 4, 6)
    vi.useFakeTimers()
    vi.setSystemTime(date)
  })

  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentsRepository()
    usersReposiotry = new InMemoryUsersRepository()
    sut = new CancelAppointmentUseCase(appointmentsRepository, usersReposiotry)
  })

  afterEach(() => {
    appointmentsRepository.clear()
    usersReposiotry.clear()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should be able to cancel a new appointment', async () => {
    const user = makeUser()

    await usersReposiotry.create(user)

    const appointment = makeAppointment({
      userId: user.id,
    })

    await appointmentsRepository.create(appointment)

    const result = await sut.execute({
      appointmentId: appointment.id.toString(),
      userId: user.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(appointmentsRepository.items).toHaveLength(1)
  })

  it('should not be able to cancel a new appointment with invalid user', async () => {
    const appointment = makeAppointment()

    await appointmentsRepository.create(appointment)

    const result = await sut.execute({
      appointmentId: appointment.id.toString(),
      userId: '12345',
    })

    expect(result.isLeft()).toBe(true)
    expect(appointmentsRepository.items).toHaveLength(1)
    expect(result.value).instanceOf(ResourceNotFoundError)
  })
})
