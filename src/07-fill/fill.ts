function fill<T, V>(array: (T | V)[], value: V, start = 0, end = array.length) {
  if (start < 0) {
    start += array.length

    if (start < 0) {
      start = 0
    }
  }

  if (end < 0) {
    end += array.length

    if (end < 0) {
      end = 0
    }
  }

  if (end > array.length) {
    end = array.length
  }

  if (start > end) {
    return array
  }

  for (let i = start; i < end; ++i) {
    array[i] = value
  }

  return array
}

export { fill }
