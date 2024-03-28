// solution 1.
function dropWhile<T>(array: T[], predicate: (value: T) => boolean) {
  let index = 0

  while (index < array.length && predicate(array[index])) {
    ++index
  }

  return array.slice(index)
}

// solution 2.
function dropWhileWithForLoop<T>(array: T[], predicate: (value: T) => boolean) {
  for (let i = 0; i < array.length; ++i) {
    if (!predicate(array[i])) {
      return array.slice(i)
    }
  }

  return []
}

// solution 3.
function dropWhileWithForLoopAndSingleReturn<T>(array: T[], predicate: (value: T) => boolean) {
  let droppedIndex = 0

  for (let i = 0; i < array.length; ++i) {
    if (!predicate(array[i])) {
      break
    }

    ++droppedIndex
  }

  return array.slice(droppedIndex)
}

export { dropWhile, dropWhileWithForLoop, dropWhileWithForLoopAndSingleReturn }
