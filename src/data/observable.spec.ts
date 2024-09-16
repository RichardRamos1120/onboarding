import { Observable } from './observable.js'

describe('Observable', function () {
  it('passes values to observer in order', function () {
    const result: number[] = []
    const observable = Observable<number>([])
    observable.addListener((a) => result.push(a))
    observable.dispatch(10)
    observable.dispatch(20)
    observable.dispatch(30)
    expect(result).toStrictEqual([10, 20, 30])
  })
  it('works with multiple observers', function () {
    const resultA: number[] = []
    const resultB: number[] = []
    const observable = Observable<number>([])
    observable.addListener((a) => resultA.push(a))
    observable.addListener((a) => resultB.push(a))
    observable.dispatch(10)
    expect(resultA).toStrictEqual([10])
    expect(resultB).toStrictEqual([10])
  })
  it('works with initial values', function () {
    const result: number[] = []
    const observable = Observable<number>([10, 20, 30])
    observable.addListener((a) => result.push(a))
    expect(result).toStrictEqual([10, 20, 30])
  })
  it('replays old values', function () {
    const result: number[] = []
    const observable = Observable<number>([])
    observable.dispatch(10)
    observable.dispatch(20)
    observable.dispatch(30)
    observable.addListener((a) => result.push(a))
    expect(result).toStrictEqual([10, 20, 30])
  })
})
