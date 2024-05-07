import { InMemoryAppointmentsRepository } from 'test/repositories/in-memory-appointmensts-repository'
import { InMemoryArenasRepository } from 'test/repositories/in-memory-arenas-repository'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { makeArena } from 'test/factories/make-arena'
import { FetchMonthAvailabilityUseCase } from './fetch-arena-month-availability.use-case'

let appointmentsRepository: InMemoryAppointmentsRepository
let arenasRepository: InMemoryArenasRepository
let sut: FetchMonthAvailabilityUseCase

describe('Fetch Month Availability Use Case', () => {
  beforeAll(() => {
    const date = new Date(2024, 4, 6)
    vi.useFakeTimers()
    vi.setSystemTime(date)
  })

  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentsRepository()
    arenasRepository = new InMemoryArenasRepository()
    sut = new FetchMonthAvailabilityUseCase(
      appointmentsRepository,
      arenasRepository,
    )
  })

  afterEach(() => {
    appointmentsRepository.clear()
    arenasRepository.clear()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should return available days for a given arena, year, and month', async () => {
    const arena = makeArena()
    arenasRepository.create(arena)

    const year = 2024
    const month = 4 // May
    const result = await sut.execute({
      arenaId: arena.id.toString(),
      year,
      month,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.availableDays).toEqual([
        6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        25, 26, 27, 28, 29, 30, 31,
      ])
    }
  })

  it('should return a ResourceNotFoundError if the arena is not found', async () => {
    const year = 2024
    const month = 4 // May
    const result = await sut.execute({
      arenaId: 'nonexistent-arena-id',
      year,
      month,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
