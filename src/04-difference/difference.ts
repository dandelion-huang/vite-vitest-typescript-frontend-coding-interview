// solution 1.
function difference(array: unknown[], values: unknown[]) {
  const result: unknown[] = []

  for (const value of array) {
    if (!values.includes(value)) {
      result.push(value)
    }
  }

  return result
}

// solution 2.
function differenceWithFilter(array: unknown[], values: unknown[]) {
  return array.filter((value) => !values.includes(value))
}

// solution 3. faster
function differenceWithSet(array: unknown[], values: unknown[]) {
  const valuesSet = new Set(values)
  return array.filter((value) => !valuesSet.has(value))
}

export { difference, differenceWithFilter, differenceWithSet }
