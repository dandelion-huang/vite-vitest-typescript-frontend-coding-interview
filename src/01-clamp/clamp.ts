// solution 1.
function clamp(number: number, lower: number, upper: number) {
  if (number < lower) {
    return lower
  } else if (number > upper) {
    return upper
  } else {
    return number
  }
}

// solution 2.
function clampWithMath(number: number, lower: number, upper: number) {
  return Math.min(Math.max(number, lower), upper)
}

export { clamp, clampWithMath }
