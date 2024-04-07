// solution 1.
function dropRightWhile<T>(array: T[], predicate: (value: T) => boolean) {
  let index = array.length - 1

  while (index >= 0 && predicate(array[index])) {
    --index
  }

  return array.slice(0, index + 1)
}

// solution 2.
function dropRightWhileWithForLoop<T>(array: T[], predicate: (value: T) => boolean) {
  for (let i = array.length - 1; i >= 0; --i) {
    if (!predicate(array[i])) {
      return array.slice(0, i + 1)
    }
  }

  return []
}

// solution 3.
function dropRightWhileWithForLoopAndSingleReturn<T>(array: T[], predicate: (value: T) => boolean) {
  const rev = array.slice().reverse()
  let droppedIndex = array.length - 1

  for (const element of rev) {
    if (!predicate(element)) {
      break
    }

    --droppedIndex
  }

  return array.slice(0, droppedIndex + 1)
}

export { dropRightWhile, dropRightWhileWithForLoop, dropRightWhileWithForLoopAndSingleReturn }
