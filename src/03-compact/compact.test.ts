import { describe, expect, it } from 'vitest'
import * as utils from './compact'

describe('compact', () => {
  it('should return an array that all falsy values are removed', () => {
    expect(utils.compact([0, 1, false, 2, '', 3, 'hello'])).toEqual([1, 2, 3, 'hello'])
    expect(utils.compactWithFilter([0, 1, false, 2, '', 3, 'hello'])).toEqual([1, 2, 3, 'hello'])
  })

  it('should return an array that all falsy values are removed', () => {
    expect(utils.compact([null, undefined, NaN, ' '])).toEqual([' '])
    expect(utils.compactWithFilter([null, undefined, NaN, ' '])).toEqual([' '])
  })

  it('should return an array that all falsy values are removed', () => {
    expect(utils.compact([{ name: 'Alice' }, null, { age: 30 }, undefined])).toEqual([
      { name: 'Alice' },
      { age: 30 },
    ])
    expect(utils.compactWithFilter([{ name: 'Alice' }, null, { age: 30 }, undefined])).toEqual([
      { name: 'Alice' },
      { age: 30 },
    ])
  })
})
