// solution 1.
function cloneDeep<T>(obj: T) {
  if (typeof obj !== 'object' || !obj) {
    return obj
  }

  const clonedObj: any = Array.isArray(obj) ? [] : {}

  for (const [key, val] of Object.entries(obj)) {
    clonedObj[key] = cloneDeep(val)
  }

  return clonedObj
}

// solution 2.
function cloneDeepAdvanced<T extends Record<string, any>>(obj: T, cache = new WeakMap()) {
  if (cache.has(obj)) {
    return cache.get(obj)
  }

  if (typeof obj !== 'object' || !obj) {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj)
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }

  const clonedObj = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj))

  cache.set(obj, clonedObj)

  for (const key of Reflect.ownKeys(obj)) {
    const val = obj[key as keyof T]
    clonedObj[key as keyof T] = cloneDeepAdvanced(val, cache)
  }

  return clonedObj
}

// solution 3. (RESTRICTED)
function cloneDeepWithStringify<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj))
}

// solution 4.
function cloneDeepWithStructuredClone<T>(obj: T) {
  return structuredClone(obj)
}

export { cloneDeep, cloneDeepAdvanced, cloneDeepWithStringify, cloneDeepWithStructuredClone }
