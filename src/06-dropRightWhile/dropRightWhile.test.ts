import { describe, expect, it } from 'vitest'
import * as utils from './dropRightWhile'

describe('dropRightWhile', () => {
  it('should return the slice of the array once the predicate returns false from the right', () => {
    type T = string

    const array: T[] = ['hello', 'world', 'today', 'isGood']
    const predicate = (value: T) => value.length > 5
    const result = utils.dropRightWhile(array, predicate)
    const resultForLoop = utils.dropRightWhileWithForLoop(array, predicate)
    const resultForLoopAndSingleReturn = utils.dropRightWhileWithForLoopAndSingleReturn(
      array,
      predicate
    )

    expect(array).toEqual(['hello', 'world', 'today', 'isGood'])
    expect(result).toEqual(['hello', 'world', 'today'])
    expect(resultForLoop).toEqual(['hello', 'world', 'today'])
    expect(resultForLoopAndSingleReturn).toEqual(['hello', 'world', 'today'])
  })

  it('should return the slice of the array once the predicate returns false from the right', () => {
    type T = { name: string; age: number }

    const array: T[] = [
      { name: 'Alice', age: 25 },
      { name: 'Charlie', age: 20 },
      { name: 'Bob', age: 30 },
    ]
    const predicate = (obj: T) => obj.age > 25
    const result = utils.dropRightWhile(array, predicate)
    const resultForLoop = utils.dropRightWhileWithForLoop(array, predicate)
    const resultForLoopAndSingleReturn = utils.dropRightWhileWithForLoopAndSingleReturn(
      array,
      predicate
    )

    expect(array).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Charlie', age: 20 },
      { name: 'Bob', age: 30 },
    ])
    expect(result).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Charlie', age: 20 },
    ])
    expect(resultForLoop).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Charlie', age: 20 },
    ])
    expect(resultForLoopAndSingleReturn).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Charlie', age: 20 },
    ])
  })

  it('should return the slice of the array if every elements of the array passes the predicate', () => {
    type T = number

    const array: T[] = [10, 20, 30, 40, 50, 10]
    const predicate = (value: T) => value !== 10
    const result = utils.dropRightWhile(array, predicate)
    const resultForLoop = utils.dropRightWhileWithForLoop(array, predicate)
    const resultForLoopAndSingleReturn = utils.dropRightWhileWithForLoopAndSingleReturn(
      array,
      predicate
    )

    expect(array).toEqual([10, 20, 30, 40, 50, 10])
    expect(result).toEqual([10, 20, 30, 40, 50, 10])
    expect(resultForLoop).toEqual([10, 20, 30, 40, 50, 10])
    expect(resultForLoopAndSingleReturn).toEqual([10, 20, 30, 40, 50, 10])
  })

  it('should return an empty array if no elements of the array passed the predicate', () => {
    type T = number

    const array: T[] = [1]
    const predicate = (value: T) => value > 0
    const result = utils.dropRightWhile(array, predicate)
    const resultForLoop = utils.dropRightWhileWithForLoop(array, predicate)
    const resultForLoopAndSingleReturn = utils.dropRightWhileWithForLoopAndSingleReturn(
      array,
      predicate
    )

    expect(array).toEqual([1])
    expect(result).toEqual([])
    expect(resultForLoop).toEqual([])
    expect(resultForLoopAndSingleReturn).toEqual([])
  })
})
