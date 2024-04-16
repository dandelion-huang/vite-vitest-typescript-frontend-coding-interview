import { describe, expect, it } from 'vitest'
import * as utils from './fromPairs'

describe('fromPairs', () => {
  it('should return an object if all pair in pairs are valid', () => {
    const pairs = [
      ['explain', 'this'],
      ['help', 'you'],
      ['keep', 'growing'],
    ]

    expect(utils.fromPairs(pairs)).toEqual({ explain: 'this', help: 'you', keep: 'growing' })
    expect(utils.fromPairsWithReduce(pairs)).toEqual({
      explain: 'this',
      help: 'you',
      keep: 'growing',
    })
    expect(utils.fromPairsWithObjectFromEntries(pairs)).toEqual({
      explain: 'this',
      help: 'you',
      keep: 'growing',
    })
  })

  it('should filter invalid keys if the first element of any pair is not able to be converted to string', () => {
    const pairs = [
      [null, 'null'],
      [undefined, 'undefined'],
      [0, 'zero'],
      [3.14, 'floating number'],
    ]

    expect(utils.fromPairs(pairs)).toEqual({ '0': 'zero', '3.14': 'floating number' })
    expect(utils.fromPairsWithReduce(pairs)).toEqual({ '0': 'zero', '3.14': 'floating number' })
  })

  it('should filter invalid pair if the length of any pair is not 2', () => {
    const pairs = [['happy', 'coding'], ['?'], ['hello', 'world', '!']]

    expect(utils.fromPairs(pairs)).toEqual({ happy: 'coding' })
    expect(utils.fromPairsWithReduce(pairs)).toEqual({ happy: 'coding' })
  })

  describe('special primitive types', () => {
    it('should handle Symbol if the pairs include Symbol', () => {
      const pairs = [
        [Symbol.for('symbol'), 'symbol1'], // global symbol
        [Symbol('symbol'), 'symbol2'], // local symbol
        ['Symbol', 'is unique'],
      ]

      expect(utils.fromPairs(pairs)).toEqual({
        'Symbol(symbol)': 'symbol2',
        Symbol: 'is unique',
      })
      expect(utils.fromPairsWithReduce(pairs)).toEqual({
        'Symbol(symbol)': 'symbol2',
        Symbol: 'is unique',
      })
    })

    it('should handle BigInt if the pairs include BigInt', () => {
      const pairs = [
        [BigInt('1234567890'), 'bigint1'],
        [BigInt('9876543210'), 'bigint2'],
      ]

      expect(utils.fromPairs(pairs)).toEqual({
        '1234567890': 'bigint1',
        '9876543210': 'bigint2',
      })
      expect(utils.fromPairsWithReduce(pairs)).toEqual({
        '1234567890': 'bigint1',
        '9876543210': 'bigint2',
      })
      expect(utils.fromPairsWithObjectFromEntries(pairs)).toEqual({
        1234567890: 'bigint1',
        9876543210: 'bigint2',
      })
    })
  })

  describe('object.fromEntries', () => {
    it('should handle null and undefined', () => {
      const pairs = [
        [null, 'null'],
        [undefined, 'undefined'],
        [0, 'zero'],
        [3.14, 'floating number'],
      ]

      expect(utils.fromPairsWithObjectFromEntries(pairs)).toEqual({
        null: 'null',
        undefined: 'undefined',
        0: 'zero',
        3.14: 'floating number',
      })
    })

    it("should handle multiple Symbol and won't overwrite", () => {
      const pairs = [
        [Symbol.for('symbol'), 'symbol1'],
        [Symbol.for('symbol'), 'symbol2'],
        ['ObjectFromEntries', "won't be overwritten"],
      ]

      expect(utils.fromPairsWithObjectFromEntries(pairs)).toEqual({
        [Symbol.for('symbol')]: 'symbol1',
        [Symbol.for('symbol')]: 'symbol2',
        ObjectFromEntries: "won't be overwritten",
      })
    })

    it('should filter invalid pair if the length of any pair is not 2', () => {
      const pairs = [['oh', 'my', 'god'], ['?']]

      expect(utils.fromPairsWithObjectFromEntries(pairs)).toEqual({
        oh: 'my',
      })
    })
  })
})
