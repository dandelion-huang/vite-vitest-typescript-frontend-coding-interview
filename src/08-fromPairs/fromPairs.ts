// solution 1.
function fromPairs<T>(pairs: T[][]) {
  const obj: Record<string, T> = {}

  for (const pair of pairs) {
    if (pair.length !== 2) {
      continue
    }

    const [key, value] = pair

    if (key?.toString) {
      obj[key.toString()] = value
    }
  }

  return obj
}

// solution 2.
function fromPairsWithReduce<T>(pairs: T[][]) {
  return pairs.reduce<Record<string, T>>((accum, cur) => {
    if (cur.length !== 2) {
      return accum
    }

    const [key, value] = cur

    if (key?.toString) {
      accum[key.toString()] = value
    }

    return accum
  }, {})
}

// solution 3.
function fromPairsWithObjectFromEntries<T>(pairs: T[][]) {
  return Object.fromEntries(pairs)
}

export { fromPairs, fromPairsWithReduce, fromPairsWithObjectFromEntries }
