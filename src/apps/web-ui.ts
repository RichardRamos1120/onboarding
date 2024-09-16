import { Projection } from '../core/projection.js'
import { periodically } from '../data/io.js'
import { Todo, TodoEvent, TodoTable } from '../todos/index.js'

// The web ui will periodically generate a home page
// from the database of todos

const renderListItem = (todo: Todo) => `    <li>
      <h5>${todo.title}</h5>
      <checkbox checked="${todo.done}"/>
    </li>`

const renderPage = (listItems: string[]) => `
<html>
  <h4>Todos</h4>
  <ul>
${listItems.join('\n')}
  </ul>
</html>`

export class WebUIService {
  db: Projection<TodoTable, TodoEvent>
  constructor(db: Projection<TodoTable, TodoEvent>) {
    this.db = db
  }
  run() {
    return periodically(() => {
      const table = this.db.getState()
      const todoItems = Object.values(table).map(renderListItem)
      const page = renderPage(todoItems)
      // eslint-disable-next-line no-console
      console.log(`[Web UI]: ${page}`)
    }, 1000 * 10)
  }
}
