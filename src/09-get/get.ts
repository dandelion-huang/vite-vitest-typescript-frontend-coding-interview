function handlePath(path: string | string[]): (number | string)[] {
  if (Array.isArray(path)) {
    return path
  }

  if (typeof path === 'string') {
    return path.split(/[.[\]]/).filter((str) => str !== '')
  }

  throw new Error('[get] path must be a string or a string array')
}

// solution 1.
function get<T, D>(object: T, path: number | string | string[], defaultValue?: D): any | D {
  if (typeof path === 'number') {
    return defaultValue
  }

  if (!object || !path || path.length === 0) {
    return defaultValue
  }

  const keys = handlePath(path)

  let res: any = object

  for (const key of keys) {
    if (typeof res !== 'object' || !(key in res)) {
      return defaultValue
    }

    res = res?.[key]
  }

  return res
}

// solution 2.
function getWithReduce<T, D>(
  object: T,
  path: number | string | string[],
  defaultValue?: D
): any | D {
  if (typeof path === 'number') {
    return defaultValue
  }

  if (!object || !path || path.length === 0) {
    return defaultValue
  }

  const keys = handlePath(path)

  return keys.reduce<any>((accum, key) => {
    if (typeof accum !== 'object' || !(key in accum)) {
      return defaultValue
    }

    return accum?.[key]
  }, object)
}

export { get, getWithReduce }
