import { insertAt, removeAt, updateAt } from './struct.js'

describe('Struct', function () {
  describe('insertAt', function () {
    it('inserts a new value', function () {
      const result = insertAt({}, 'propA', 10)
      expect(result).toStrictEqual({ propA: 10 })
    })
    it('overwrites an existing value', function () {
      const result = insertAt({ propA: 10 }, 'propA', 20)
      expect(result).toStrictEqual({ propA: 20 })
    })
  })
  describe('removeAt', function () {
    it('removes an existing value', function () {
      const result = removeAt({ propA: 10 }, 'propA')
      expect(result).toStrictEqual({})
    })
    it('does nothing if the key does not exist', function () {
      const result = removeAt({ propA: 10 }, 'propB')
      expect(result).toStrictEqual({ propA: 10 })
    })
  })
  describe('updateAt', function () {
    it('updates an existing value', function () {
      const result = updateAt({ propA: 10 }, 'propA', (a) => a * 3)
      expect(result).toStrictEqual({ propA: 30 })
    })
    it('does nothing if the key does not exist', function () {
      const result = updateAt({ propA: 10 }, 'propB', (a) => a * 3)
      expect(result).toStrictEqual({ propA: 10 })
    })
  })
})
