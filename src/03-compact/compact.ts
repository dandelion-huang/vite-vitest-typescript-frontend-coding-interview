// solution 1.
function compact(array: unknown[]) {
  const result: unknown[] = []

  for (const value of array) {
    if (value) {
      result.push(value)
    }
  }

  return result
}

// solution 2.
function compactWithFilter(array: unknown[]) {
  return array.filter(Boolean)
}

export { compact, compactWithFilter }
