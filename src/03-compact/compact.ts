// solution 1.
function compact<T>(array: T[]) {
  const result: T[] = []

  for (const value of array) {
    if (value) {
      result.push(value)
    }
  }

  return result
}

// solution 2.
function compactWithFilter<T>(array: T[]) {
  return array.filter(Boolean)
}

export { compact, compactWithFilter }
