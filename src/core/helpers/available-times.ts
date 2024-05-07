import { eachHourOfInterval, endOfDay, startOfDay } from 'date-fns'
import { Weekday } from './enums/days-of-week'

export class AvailableTimes {
  private weekdayTimes: number[][] = [
    [6, 7, 8, 9, 10],
    [14, 15, 16],
    [18, 19, 20, 21, 22, 23],
  ]

  private weekendTimes: number[][] = [
    [8, 9, 10, 11],
    [13, 14, 15, 16],
    [18, 19, 20, 21, 22, 23],
  ]

  constructor() {}

  public getAvailableTimes(date: Date): number[] {
    const weekday = date.getDay()
    const isWeekend = weekday === Weekday.Saturday || weekday === Weekday.Sunday

    const timesOfDay = isWeekend ? this.weekendTimes : this.weekdayTimes

    const availableTimes: number[] = []

    const start = startOfDay(date)
    const end = endOfDay(date)

    const hoursOfDay = eachHourOfInterval({ start, end })

    hoursOfDay.forEach((hour) => {
      const hourOfDay = hour.getHours()
      if (timesOfDay.some((period) => period.includes(hourOfDay)))
        availableTimes.push(hourOfDay)
    })

    return availableTimes
  }
}
