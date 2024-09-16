import { Observable } from '../data/observable.js'
import { periodically } from '../data/io.js'
import { TodoEvent } from '../todos/index.js'

export class WebAPIService {
  events: TodoEvent[]
  eventBus: Observable<TodoEvent>
  constructor(events: TodoEvent[], eventBus: Observable<TodoEvent>) {
    this.events = events
    this.eventBus = eventBus
  }
  run() {
    return periodically(() => {
      const a = this.events.shift()
      if (a) {
        this.eventBus.dispatch(a)
        // eslint-disable-next-line no-console
        console.log(`[Web API]: ${JSON.stringify(a, null, '  ')}`)
      }
    }, 1000 * 7)
  }
}
