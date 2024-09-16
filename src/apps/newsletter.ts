import { Projection } from '../core/projection.js'
import { periodically } from '../data/io.js'
import { TodoEvent } from '../todos/index.js'

function renderBody(titles: string[]) {
  const listItems = titles.map((title, i) => `${i + 1}) ${title}`)
  const lines = [
    'Dear User,',
    'Here are some of the latest todos added to the platform:',
    ...listItems,
  ]
  return lines.join('\n')
}

export class NewsletterService {
  db: Projection<string[], TodoEvent>
  constructor(db: Projection<string[], TodoEvent>) {
    this.db = db
  }
  run() {
    return periodically(() => {
      const titles = this.db.getState()
      if (titles.length) {
        const email = {
          from: 'news@todos.com',
          to: 'user@example.com',
          body: renderBody(titles),
        }
        // eslint-disable-next-line no-console
        console.log(
          `[Newsletter Service]: ${JSON.stringify(email, null, '  ')}`
        )
      }
    }, 1000 * 15)
  }
}
