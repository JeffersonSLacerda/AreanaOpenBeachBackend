import { FetchArenaDayAvailabilityUseCase } from './fetch-arena-day-availability.use-case'
import { InMemoryAppointmentsRepository } from 'test/repositories/in-memory-appointmensts-repository'
import { InMemoryArenasRepository } from 'test/repositories/in-memory-arenas-repository'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { makeArena } from 'test/factories/make-arena'

let appointmentsRepository: InMemoryAppointmentsRepository
let arenasRepository: InMemoryArenasRepository
let sut: FetchArenaDayAvailabilityUseCase

describe('Fetch Arena Day Availability', () => {
  beforeAll(() => {
    const date = new Date(2024, 4, 6)
    vi.useFakeTimers()
    vi.setSystemTime(date)
  })

  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentsRepository()
    arenasRepository = new InMemoryArenasRepository()
    sut = new FetchArenaDayAvailabilityUseCase(
      arenasRepository,
      appointmentsRepository,
    )
  })

  afterEach(() => {
    appointmentsRepository.clear()
    arenasRepository.clear()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should return available times for a given arena and date', async () => {
    const arena = makeArena()
    arenasRepository.create(arena)

    const date = new Date(2024, 4, 6)
    const result = await sut.execute({
      arenaId: arena.id.toString(),
      date,
    })

    // Assuming a mock implementation for AvailableTimes
    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.availableTimes).toEqual([
        6, 7, 8, 9, 10, 14, 15, 16, 18, 19, 20, 21, 22, 23,
      ])
    }
  })

  it('should return a ResourceNotFoundError if the arena is not found', async () => {
    const date = new Date(2024, 4, 6)
    const availableTimes = await sut.execute({
      arenaId: 'nonexistent-arena-id',
      date,
    })

    expect(availableTimes.isLeft()).toBe(true)
    expect(availableTimes.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
