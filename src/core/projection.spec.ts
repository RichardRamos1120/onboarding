import { Projection, Reducer } from './projection.js'

const sum: Reducer<number, number> = (acc, a) => acc + a

describe('Projection', function () {
  it('has the same result as Array.reduce', function () {
    const testData = [1, 4, 3, 0]
    const projection = Projection(sum)(0)
    testData.forEach(projection.processEvent)
    const left = projection.getState()
    const right = testData.reduce(sum, 0)
    expect(left).toEqual(right)
  })
})
