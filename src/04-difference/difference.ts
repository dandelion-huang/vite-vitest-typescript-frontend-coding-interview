// solution 1.
function difference<T>(array: T[], values: T[]) {
  const result: T[] = []

  for (const value of array) {
    if (!values.includes(value)) {
      result.push(value)
    }
  }

  return result
}

// solution 2.
function differenceWithFilter<T>(array: T[], values: T[]) {
  return array.filter((value) => !values.includes(value))
}

// solution 3. faster
function differenceWithSet<T>(array: T[], values: T[]) {
  const valuesSet = new Set(values)
  return array.filter((value) => !valuesSet.has(value))
}

export { difference, differenceWithFilter, differenceWithSet }
