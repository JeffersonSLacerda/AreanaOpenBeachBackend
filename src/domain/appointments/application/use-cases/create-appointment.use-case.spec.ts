import { makeArena } from 'test/factories/make-arena'
import { CreateAppointmentUseCase } from './create-appointment.use-case'
import { InMemoryAppointmentsRepository } from 'test/repositories/in-memory-appointmensts-repository'
import { InMemoryArenasRepository } from 'test/repositories/in-memory-arenas-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { Modalities } from '../../enterprise/entities/enums/modalities'
import { AppointmentOnPastDateError } from '@/core/errors/types/appointment-on-past-date'
import { makeAppointment } from 'test/factories/make-appointment'
import { AppointmentAlreadyBooked } from '@/core/errors/types/appointment-already-booked'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'

let appointmentsRepository: InMemoryAppointmentsRepository
let arenasRepoistory: InMemoryArenasRepository
let usersReposiotry: InMemoryUsersRepository
let sut: CreateAppointmentUseCase

describe('Create Appointments', () => {
  beforeAll(() => {
    const date = new Date(2024, 4, 6)
    vi.useFakeTimers()
    vi.setSystemTime(date)
  })

  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentsRepository()
    arenasRepoistory = new InMemoryArenasRepository()
    usersReposiotry = new InMemoryUsersRepository()
    sut = new CreateAppointmentUseCase(
      appointmentsRepository,
      usersReposiotry,
      arenasRepoistory,
    )
  })

  afterEach(() => {
    appointmentsRepository.clear()
    arenasRepoistory.clear()
    usersReposiotry.clear()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should be able to create a new appointment', async () => {
    const arena = makeArena()
    const user = makeUser()

    arenasRepoistory.create(arena)
    usersReposiotry.create(user)

    const appointment = await sut.execute({
      arenaId: arena.id.toString(),
      userId: user.id.toString(),
      modality: Modalities.BEACHTENNIS,
      date: new Date(2024, 4, 6, 13),
    })

    expect(appointment.isRight()).toBe(true)
    expect(appointmentsRepository.items).toHaveLength(1)
  })

  it('should not be able to create a new appointment on past date', async () => {
    const arena = makeArena()
    const user = makeUser()

    arenasRepoistory.create(arena)
    usersReposiotry.create(user)

    const appointment = await sut.execute({
      arenaId: arena.id.toString(),
      userId: user.id.toString(),
      modality: Modalities.BEACHTENNIS,
      date: new Date(2024, 4, 5, 13),
    })

    expect(appointment.isLeft()).toBe(true)
    expect(appointmentsRepository.items).toHaveLength(0)
    expect(appointment.value).instanceOf(AppointmentOnPastDateError)
  })

  it('should not be able to create two appointments on the same date', async () => {
    const arena = makeArena()
    const user = makeUser()

    arenasRepoistory.create(arena)
    usersReposiotry.create(user)

    const appointment = makeAppointment({
      userId: user.id,
      arenaId: arena.id,
      date: new Date(2024, 5, 6, 13),
    })

    appointmentsRepository.create(appointment)

    const secondAppointment = await sut.execute({
      arenaId: arena.id.toString(),
      userId: user.id.toString(),
      modality: Modalities.BEACHTENNIS,
      date: new Date(2024, 5, 6, 13),
    })

    expect(secondAppointment.isLeft()).toBe(true)
    expect(appointmentsRepository.items).toHaveLength(1)
    expect(secondAppointment.value).instanceOf(AppointmentAlreadyBooked)
  })

  it('should not be able to create a new appointment with invalid user', async () => {
    const arena = makeArena()

    arenasRepoistory.create(arena)

    const appointment = await sut.execute({
      arenaId: arena.id.toString(),
      userId: 'user id',
      modality: Modalities.BEACHTENNIS,
      date: new Date(2024, 4, 6, 13),
    })

    expect(appointment.isLeft()).toBe(true)
    expect(appointmentsRepository.items).toHaveLength(0)
    expect(appointment.value).instanceOf(ResourceNotFoundError)
  })

  it('should not be able to create a new appointment on invalid arena', async () => {
    const user = makeUser()

    usersReposiotry.create(user)

    const appointment = await sut.execute({
      arenaId: 'arena id',
      userId: user.id.toString(),
      modality: Modalities.BEACHTENNIS,
      date: new Date(2024, 4, 6, 13),
    })

    expect(appointment.isLeft()).toBe(true)
    expect(appointmentsRepository.items).toHaveLength(0)
    expect(appointment.value).instanceOf(ResourceNotFoundError)
  })
})
