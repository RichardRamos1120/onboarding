/* eslint-disable no-console */
import {
  LatestTodoTitlesProjection,
  TodosTableProjection,
  TodoAdded,
  TodoDone,
  TodoEvent,
  TodoRemoved,
} from './todos/index.js'
import { Observable } from './data/observable.js'
import { NewsletterService } from './apps/newsletter.js'
import { WebAPIService } from './apps/web-api.js'
import { WebUIService } from './apps/web-ui.js'

// The main function demonstrates how to wire up
// several independent services to an event bus
// Read more about event driven architecture:
// https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven

function main() {
  // Create event bus
  const eventBus = Observable<TodoEvent>([])
  // Create projections
  const todosDb = TodosTableProjection({})
  const titlesCache = LatestTodoTitlesProjection([])
  // Wire projections up to event bus
  eventBus.addListener(todosDb.processEvent)
  eventBus.addListener(titlesCache.processEvent)
  // Create some mock events to simulate user
  // interactions
  const mockEvents = [
    TodoAdded({ id: '0', title: 'learn fp' }),
    TodoAdded({ id: '1', title: 'separate reads and writes' }),
    TodoDone({ id: '0' }),
    TodoAdded({ id: '2', title: 'leverage ts type system' }),
    TodoAdded({ id: '3', title: 'find carmen san diego' }),
    TodoDone({ id: '1' }),
    TodoRemoved({ id: '3' }),
    TodoDone({ id: '2' }),
  ]
  // Create some services and inject appropriate dependencies
  const webAPI = new WebAPIService(mockEvents, eventBus)
  const webUI = new WebUIService(todosDb)
  const newsletter = new NewsletterService(titlesCache)
  // Run all services in parallel
  return Promise.all([webUI.run(), webAPI.run(), newsletter.run()])
}

// Dont forget to run main!
main()
