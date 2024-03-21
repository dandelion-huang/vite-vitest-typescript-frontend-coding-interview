// solution 1.
function inRange(value: number, a: number, b = 0) {
  let start = a
  let end = b

  if (start > end) {
    start = b
    end = a
  }

  return start <= value && value < end
}

// solution 2. slower but concise
function inRangeWithDestructuringAssignment(value: number, a: number, b = 0) {
  let [start, end] = [a, b]

  if (start > end) {
    ;[start, end] = [end, start]
  }

  return start <= value && value < end
}

// solution 3.
function inRangeWithMath(value: number, a: number, b = 0) {
  return Math.min(a, b) <= value && value < Math.max(a, b)
}

export { inRange, inRangeWithDestructuringAssignment, inRangeWithMath }
