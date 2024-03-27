import { describe, expect, it } from 'vitest'
import * as utils from './difference'

describe('difference', () => {
  it('should return an array if the first array is empty', () => {
    expect(utils.difference([], [])).toEqual([])
    expect(utils.differenceWithFilter([], [])).toEqual([])
    expect(utils.differenceWithSet([], [])).toEqual([])
  })

  it('should return an array that only contains elements in the array but not in the values', () => {
    expect(utils.difference([1, 1, 2, 3], [2, 3])).toEqual([1, 1])
    expect(utils.differenceWithFilter([1, 1, 2, 3], [2, 3])).toEqual([1, 1])
    expect(utils.differenceWithSet([1, 1, 2, 3], [2, 3])).toEqual([1, 1])
  })

  it('should return an array if all elements in the array are in the values', () => {
    expect(utils.difference([1, 2, 3], [1, 2, 3, 4])).toEqual([])
    expect(utils.differenceWithFilter([1, 2, 3], [1, 2, 3, 4])).toEqual([])
    expect(utils.differenceWithSet([1, 2, 3], [1, 2, 3, 4])).toEqual([])
  })

  it('should return an array that only contains elements in the array but not in the values', () => {
    expect(utils.difference([4, 3, 2, 1], [1, 2, 3])).toEqual([4])
    expect(utils.differenceWithFilter([4, 3, 2, 1], [1, 2, 3])).toEqual([4])
    expect(utils.differenceWithSet([4, 3, 2, 1], [1, 2, 3])).toEqual([4])
  })
})
