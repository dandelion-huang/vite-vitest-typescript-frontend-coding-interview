import { describe, expect, it } from 'vitest'
import * as utils from './inRange'

describe('inRange', () => {
  describe('two arguments, with the start being 0', () => {
    it('should return false if the value is NaN', () => {
      expect(utils.inRange(NaN, 8)).toBe(false)
      expect(utils.inRangeWithMath(NaN, 8)).toBe(false)
      expect(utils.inRangeWithDestructuringAssignment(NaN, 8)).toBe(false)
    })

    it('should return false if the end is NaN', () => {
      expect(utils.inRange(4, NaN)).toBe(false)
      expect(utils.inRangeWithMath(4, NaN)).toBe(false)
      expect(utils.inRangeWithDestructuringAssignment(4, NaN)).toBe(false)
    })

    it('should return false if the value is NaN and the end is NaN', () => {
      expect(utils.inRange(NaN, NaN)).toBe(false)
      expect(utils.inRangeWithMath(NaN, NaN)).toBe(false)
      expect(utils.inRangeWithDestructuringAssignment(NaN, NaN)).toBe(false)
    })

    it('should return true if the value is within the range', () => {
      expect(utils.inRange(2, 4)).toBe(true)
      expect(utils.inRangeWithMath(2, 4)).toBe(true)
      expect(utils.inRangeWithDestructuringAssignment(2, 4)).toBe(true)
    })

    it('should return false if the value is not within the range', () => {
      expect(utils.inRange(4, 2)).toBe(false)
      expect(utils.inRangeWithMath(4, 2)).toBe(false)
      expect(utils.inRangeWithDestructuringAssignment(4, 2)).toBe(false)
    })

    it('should return false if the value equals the end', () => {
      expect(utils.inRange(4, 4)).toBe(false)
      expect(utils.inRangeWithMath(4, 4)).toBe(false)
      expect(utils.inRangeWithDestructuringAssignment(4, 4)).toBe(false)
    })

    it('should return true if the value is a floating-point number and the value is within the range', () => {
      expect(utils.inRange(1.2, 2)).toBe(true)
      expect(utils.inRangeWithMath(1.2, 2)).toBe(true)
      expect(utils.inRangeWithDestructuringAssignment(1.2, 2)).toBe(true)
    })

    it('should return false if the value is negative and the value is not within the range', () => {
      expect(utils.inRange(-4, 4)).toBe(false)
      expect(utils.inRangeWithMath(-4, 4)).toBe(false)
      expect(utils.inRangeWithDestructuringAssignment(-4, 4)).toBe(false)
    })

    it('should return false if the start is negative and the value is not within the range', () => {
      expect(utils.inRange(4, -4)).toBe(false)
      expect(utils.inRangeWithMath(4, -4)).toBe(false)
      expect(utils.inRangeWithDestructuringAssignment(4, -4)).toBe(false)
    })

    it('should return true if the start is negative and the value is within the range', () => {
      expect(utils.inRange(-4, -10)).toBe(true)
      expect(utils.inRangeWithMath(-4, -10)).toBe(true)
      expect(utils.inRangeWithDestructuringAssignment(-4, -10)).toBe(true)
    })

    it('should return true if the value is a negative floating-point number and the value is within the range', () => {
      expect(utils.inRange(-4.4, -10)).toBe(true)
      expect(utils.inRangeWithMath(-4.4, -10)).toBe(true)
      expect(utils.inRangeWithDestructuringAssignment(-4.4, -10)).toBe(true)
    })

    it('should return true if the start is a negative floating-point number and the value is within the range', () => {
      expect(utils.inRange(-4, -10.4)).toBe(true)
      expect(utils.inRangeWithMath(-4, -10.4)).toBe(true)
      expect(utils.inRangeWithDestructuringAssignment(-4, -10.4)).toBe(true)
    })
  })

  describe('three arguments', () => {
    it('should return true if the value is within the range', () => {
      expect(utils.inRange(3, 2, 4)).toBe(true)
      expect(utils.inRangeWithMath(3, 2, 4)).toBe(true)
      expect(utils.inRangeWithDestructuringAssignment(3, 2, 4)).toBe(true)
    })

    it('should return false if the value is not within the range', () => {
      expect(utils.inRange(3, 4, 5)).toBe(false)
      expect(utils.inRangeWithMath(3, 4, 5)).toBe(false)
      expect(utils.inRangeWithDestructuringAssignment(3, 4, 5)).toBe(false)
    })

    it('should return true if the value equals the start', () => {
      expect(utils.inRange(2, 2, 4)).toBe(true)
      expect(utils.inRangeWithMath(2, 2, 4)).toBe(true)
      expect(utils.inRangeWithDestructuringAssignment(2, 2, 4)).toBe(true)
    })

    it('should return false if the value equals the end', () => {
      expect(utils.inRange(4, 2, 4)).toBe(false)
      expect(utils.inRangeWithMath(4, 2, 4)).toBe(false)
      expect(utils.inRangeWithDestructuringAssignment(4, 2, 4)).toBe(false)
    })

    it('should return true if the start is greater than the end', () => {
      expect(utils.inRange(3, 4, 2)).toBe(true)
      expect(utils.inRangeWithMath(3, 4, 2)).toBe(true)
      expect(utils.inRangeWithDestructuringAssignment(3, 4, 2)).toBe(true)
    })

    it('should return false if the value is negative and the value is not within the range', () => {
      expect(utils.inRange(-1, 0, 4)).toBe(false)
      expect(utils.inRangeWithMath(-1, 0, 4)).toBe(false)
      expect(utils.inRangeWithDestructuringAssignment(-1, 0, 4)).toBe(false)
    })

    it('should return false if the start is negative and the value is not within the range', () => {
      expect(utils.inRange(3, -3, 0)).toBe(false)
      expect(utils.inRangeWithMath(3, -3, 0)).toBe(false)
      expect(utils.inRangeWithDestructuringAssignment(3, -3, 0)).toBe(false)
    })

    it('should return true if the value is negative and the value is within the range', () => {
      expect(utils.inRange(-4, -10, -3)).toBe(true)
      expect(utils.inRangeWithMath(-4, -10, -3)).toBe(true)
      expect(utils.inRangeWithDestructuringAssignment(-4, -10, -3)).toBe(true)
    })

    it('should return true if the value is a floating-point number and the value is within the range', () => {
      expect(utils.inRange(3.5, 2, 4)).toBe(true)
      expect(utils.inRangeWithMath(3.5, 2, 4)).toBe(true)
      expect(utils.inRangeWithDestructuringAssignment(3.5, 2, 4)).toBe(true)
    })

    it('should return true if the start is a floating-point number and the value is within the range', () => {
      expect(utils.inRange(3, 2.5, 4)).toBe(true)
      expect(utils.inRangeWithMath(3, 2.5, 4)).toBe(true)
      expect(utils.inRangeWithDestructuringAssignment(3, 2.5, 4)).toBe(true)
    })

    it('should return true if the end is a floating-point number and the value is within the range', () => {
      expect(utils.inRange(3, 2, 4.5)).toBe(true)
      expect(utils.inRangeWithMath(3, 2, 4.5)).toBe(true)
      expect(utils.inRangeWithDestructuringAssignment(3, 2, 4.5)).toBe(true)
    })
  })
})
