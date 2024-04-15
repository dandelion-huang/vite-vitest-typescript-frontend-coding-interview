import { describe, expect, it } from 'vitest'
import * as utils from './fill'

describe('fill', () => {
  it('should return an array all filled with the value if the start and the end are undefined', () => {
    expect(utils.fill([1, 2, 3], '*')).toEqual(['*', '*', '*'])
  })

  it('should return an unchanged array if the start and the end are larger than the length of the array', () => {
    expect(utils.fill([1, 2], '*', 2, 3)).toEqual([1, 2])
  })

  it('should return an unchanged array if the start and the end are the same', () => {
    expect(utils.fill([1, 2, 3], '*', 0, 0)).toEqual([1, 2, 3])
    expect(utils.fill([1, 2, 3], '*', 1, 1)).toEqual([1, 2, 3])
    expect(utils.fill([1, 2, 3], '*', -1, -1)).toEqual([1, 2, 3])
  })

  it('should return an unchanged array if the start is smaller than the end', () => {
    expect(utils.fill([1, 2, 3], '*', 2, 1)).toEqual([1, 2, 3])
  })

  it('should return the filled array if the start is smaller than 0 and it is treated as 0', () => {
    expect(utils.fill([1, 2, 3], '*', -5, -1)).toEqual(['*', '*', 3])
  })

  it('should return an array filled with the value except for the first and the last element', () => {
    expect(utils.fill([1, 2, 3, 4, 5], '*', 1, -1)).toEqual([1, '*', '*', '*', 5])
  })

  it('should return the reference of the original array', () => {
    const arr = [1, 2, 3]

    expect(utils.fill(arr, '*')).toBe(arr)
  })

  it('should return an unchanged array if the start and the end are NaN', () => {
    expect(utils.fill([1, 2, 3], '*', NaN, NaN)).toEqual([1, 2, 3])
  })

  it('should return an empty array is the input array is empty', () => {
    expect(utils.fill([], '*')).toEqual([])
  })

  it('should return an array filled with the same object reference', () => {
    const arr: { [key: string]: any }[] = utils.fill(Array(3), {})

    arr[0].helloWorld = 'Hello, world!'

    expect(arr).toEqual([
      { helloWorld: 'Hello, world!' },
      { helloWorld: 'Hello, world!' },
      { helloWorld: 'Hello, world!' },
    ])
  })
})
