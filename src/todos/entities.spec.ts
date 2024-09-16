import { Todo } from './entities.js'

describe('Todo', function () {
  it('constructs a valid todo', function () {
    const result = Todo({ id: '0', title: 'write test', done: true })
    expect(result).toStrictEqual({
      tag: 'Todo',
      id: '0',
      title: 'write test',
      done: true,
    })
  })
})
