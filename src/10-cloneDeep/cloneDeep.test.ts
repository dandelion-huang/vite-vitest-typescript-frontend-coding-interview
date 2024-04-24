import { describe, expect, it, test } from 'vitest'
import * as utils from './cloneDeep'

const basicCases = [
  { obj: [{ a: 1 }, { b: 2 }], expected: [{ a: 1 }, { b: 2 }] },
  {
    obj: { employee: { name: 'Dandelion Huang', age: 38, skills: ['JavaScript', 'TypeScript'] } },
    expected: {
      employee: { name: 'Dandelion Huang', age: 38, skills: ['JavaScript', 'TypeScript'] },
    },
  },
]

const edgeCases = [
  { obj: 'Dandelion Huang', expected: 'Dandelion Huang' },
  { obj: 38, expected: 38 },
  { obj: true, expected: true },
  { obj: null, expected: null },
  { obj: undefined, expected: undefined },
  { obj: NaN, expected: NaN },
]

describe('cloneDeep', () => {
  test.each(basicCases)('should pass basic test cases - %s', ({ obj, expected }) => {
    const result = utils.cloneDeep(obj)
    const resultWithStringify = utils.cloneDeepWithStringify(obj)
    const resultWithStructuredClone = utils.cloneDeepWithStructuredClone(obj)

    expect(obj).toEqual(expected)
    expect(result).toEqual(expected)
    expect(resultWithStringify).toEqual(expected)
    expect(resultWithStructuredClone).toEqual(expected)
  })

  test.each(edgeCases)('should pass edge cases - %s', ({ obj, expected }) => {
    const result = utils.cloneDeep(obj)
    const resultWithStructuredClone = utils.cloneDeepWithStructuredClone(obj)

    expect(obj).toBe(expected)
    expect(result).toBe(expected)
    expect(resultWithStructuredClone).toBe(expected)
  })

  describe('advanced edge cases', () => {
    it('should handle symbol', () => {
      const symbol = Symbol('Dandelion Huang')
      const obj = { [symbol]: 'Symbol of Dandelion Huang' }
      const expected = { [symbol]: 'Symbol of Dandelion Huang' }
      const result = utils.cloneDeepAdvanced(obj)

      expect(obj).toEqual(expected)
      expect(result).toEqual(expected)
    })

    it('should handle recursive reference', () => {
      const obj: any = {}
      obj.recursion = { this: obj }

      const expected: any = {}
      expected.recursion = { this: expected }

      const result = utils.cloneDeepAdvanced(obj)
      const resultWithStructuredClone = utils.cloneDeepWithStructuredClone(obj)

      expect(obj).toEqual(expected)
      expect(result).toEqual(expected)
      expect(resultWithStructuredClone).toEqual(expected)
    })

    it('should handle Date() and RegExp()', () => {
      const obj = { date: new Date('2024-04-24'), regexp: /^Dandelion Huang$/ }
      const expected = { date: new Date('2024-04-24'), regexp: /^Dandelion Huang$/ }
      const result = utils.cloneDeepAdvanced(obj)
      const resultWithStructuredClone = utils.cloneDeepWithStructuredClone(obj)

      expect(obj).toEqual(expected)
      expect(result).toEqual(expected)
      expect(resultWithStructuredClone).toEqual(expected)
    })

    it('should handle prototype chain', () => {
      class Dandelion {
        constructor() {}
      }

      const obj = new Dandelion()
      const expected = new Dandelion()
      const result = utils.cloneDeepAdvanced(obj)
      const resultWithStructuredClone = utils.cloneDeepWithStructuredClone(obj)

      expect(obj).toEqual(expected)
      expect(result).toEqual(expected)
      expect(resultWithStructuredClone).toEqual(expected)
    })
  })
})
