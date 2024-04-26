import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'

type DomainEventCallback = (event: unknown) => void

export class DomainEvents {
  private static handlersMap: Record<string, DomainEventCallback[]> = {}
  private static markedAggregates: AggregateRoot<unknown>[] = []

  public static markAggregateForDispatch(aggregate: AggregateRoot<unknown>) {
    if (!this.findMarkedAggregateById(aggregate.id))
      this.markedAggregates.push(aggregate)
  }

  public static findMarkedAggregateById(
    id: UniqueEntityID,
  ): AggregateRoot<unknown> | undefined {
    return this.markedAggregates.find((aggregate) => aggregate.id.equals(id))
  }

  public static dispatchAggregateEvents(aggregate: AggregateRoot<unknown>) {
    aggregate.domainEvents.forEach((event: DomainEvent) => this.dispatch(event))
  }

  public static dispatch(event: DomainEvent) {
    const eventClassName: string = event.constructor.name

    if (eventClassName in this.handlersMap) {
      const handlers = this.handlersMap[eventClassName]

      for (const handler of handlers) handler(event)
    }
  }

  public static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<unknown>,
  ) {
    const index = this.markedAggregates.findIndex((agg) =>
      agg.equals(aggregate),
    )

    this.markedAggregates.splice(index, 1)
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID) {
    const aggregate = this.findMarkedAggregateById(id)

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate)
      aggregate.clearEvents()
      this.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  public static register(
    callback: DomainEventCallback,
    eventClassName: string,
  ) {
    const wasEventRegisteredBefore = eventClassName in this.handlersMap

    if (!wasEventRegisteredBefore) this.handlersMap[eventClassName] = []

    this.handlersMap[eventClassName].push(callback)
  }

  public static clearHandlers() {
    this.handlersMap = {}
  }

  public static clearMarkedAggregates() {
    this.markedAggregates.splice(0, this.markedAggregates.length)
  }
}
