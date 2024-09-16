import { EventConstructor } from './event.js'

describe('EventConstructor', function () {
  it('creates a constructor that constructs a valid event', function () {
    const MyEvent = EventConstructor('MyEvent')<{ propA: string }>()
    const result = MyEvent({ propA: 'test' })
    expect(result).toStrictEqual({
      tag: 'MyEvent',
      payload: {
        propA: 'test',
      },
    })
  })
})
