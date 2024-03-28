import { describe, expect, it } from 'vitest'
import * as utils from './dropWhile'

describe('dropWhile', () => {
  it('should return the slice of the array once the predicate returns false', () => {
    const array = [1, 2, 3, 4, 5, 6]
    const predicate = (value: number) => value < 4
    const result = utils.dropWhile(array, predicate)
    const resultForLoop = utils.dropWhileWithForLoop(array, predicate)
    const resultForLoopAndSingleReturn = utils.dropWhileWithForLoopAndSingleReturn(array, predicate)

    expect(array).toEqual([1, 2, 3, 4, 5, 6])
    expect(result).toEqual([4, 5, 6])
    expect(resultForLoop).toEqual([4, 5, 6])
    expect(resultForLoopAndSingleReturn).toEqual([4, 5, 6])
  })

  it('should return an empty array if all elements of the array pass the predicate', () => {
    const array = [0, 1, 2]
    const predicate = (value: number) => value < 5
    const result = utils.dropWhile(array, predicate)
    const resultForLoop = utils.dropWhileWithForLoop(array, predicate)
    const resultForLoopAndSingleReturn = utils.dropWhileWithForLoopAndSingleReturn(array, predicate)

    expect(array).toEqual([0, 1, 2])
    expect(result).toEqual([])
    expect(resultForLoop).toEqual([])
    expect(resultForLoopAndSingleReturn).toEqual([])
  })

  it('should return the slice of the array once the predicate returns false', () => {
    const array = [0, 6, 1, 2]
    const predicate = (value: number) => value < 5
    const result = utils.dropWhile(array, predicate)
    const resultForLoop = utils.dropWhileWithForLoop(array, predicate)
    const resultForLoopAndSingleReturn = utils.dropWhileWithForLoopAndSingleReturn(array, predicate)

    expect(array).toEqual([0, 6, 1, 2])
    expect(result).toEqual([6, 1, 2])
    expect(resultForLoop).toEqual([6, 1, 2])
    expect(resultForLoopAndSingleReturn).toEqual([6, 1, 2])
  })
})
