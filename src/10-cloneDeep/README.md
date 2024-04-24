# [`Medium`] 手寫 cloneDeep

🔸 題目描述

在 JavaScript 複製值時，當複製的是非原始型別 (primitive type) 的資料型別時，例如：物件(object)、陣列 (array) 等，會遇到淺拷貝 (shallow copy) 和深拷貝 (deep copy) 的差異。在面試時被很常會要你當場手寫深拷貝，也就是手寫 Lodash 常見的 `cloneDeep`。

所謂的深拷貝是指在拷貝時，物件 A 與物件 B 不同，兩者在原型鏈上僅是結構相同，但其屬性實際的地址不同。在拷貝值時，有可能會遇到變數是多層的情境，例如是一個物件裡還有物件，深拷貝的定義會是每一層的值都不會共享址 (reference)。

具體來說，以 lodash 這個套件提供的效用函式為例，有分成 `clone` 和 `cloneDeep` 兩種不同效用函式，`clone` 只用於淺拷貝 (第一層拷貝)，但 `cloneDeep` 可用於深拷貝。下面的例子說明兩者的區別：

```javascript
// lodash 的淺拷貝 clone
var objects = [{ a: 1 }, { b: 2 }]
var shallow = _.clone(objects)
console.log(objects === shallow) // false
console.log(shallow[0] === objects[0]) // true

// lodash 的深拷貝 cloneDeep
var objects = [{ a: 1 }, { b: 2 }]
var deep = _.cloneDeep(objects)
console.log(objects === deep) // false
console.log(deep[0] === objects[0]) // false
```

💭 分析與思路

首先撰寫 Test Cases：

```javascript
import { describe, expect, test } from 'vitest'
import * as utils from './cloneDeep'

const basicCases = [
  { obj: [{ a: 1 }, { b: 2 }], expected: [{ a: 1 }, { b: 2 }] },
  {
    obj: { employee: { name: 'Dandelion Huang', age: 38, skills: ['JavaScript', 'TypeScript'] } },
    expected: {
      employee: { name: 'Dandelion Huang', age: 38, skills: ['JavaScript', 'TypeScript'] },
    },
  },
]

const edgeCases = [
  { obj: 'Dandelion Huang', expected: 'Dandelion Huang' },
  { obj: 38, expected: 38 },
  { obj: true, expected: true },
  { obj: null, expected: null },
  { obj: undefined, expected: undefined },
  { obj: NaN, expected: NaN },
]

describe('cloneDeep', () => {
  test.each(basicCases)('should pass basic test cases - %s', ({ obj, expected }) => {
    const result = utils.cloneDeep(obj)
    expect(result).toEqual(expected)
  })

  test.each(edgeCases)('should pass edge cases - %s', ({ obj, expected }) => {
    const result = utils.cloneDeep(obj)
    expect(result).toBe(expected)
  })
})
```

大致的思路如下：

- 如果傳入的不是物件，就直接回傳傳入的值。
- 如果是物件的話：
  - 如果是物件，創建一個新物件，然後遞迴地拷貝。
  - 如果是陣列，創建一個新陣列，然後遞迴地拷貝。
- 最後回傳拷貝後的結果。

這樣就可以照著思路實作出第一種解法：

```typescript
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
```

## 💫 延伸思考

在之前 [[`Easy`] 手寫 fromPairs](src/08-fromPairs) 的時候，我們注意到應該處理 `Symbol` 等狀況，我們可以試著釐清現在的盲點：

- 需要確保 `Symbol` 作為 `key` 的值時也要能夠處理。
- 需要快取機制來防止無窮遞迴呼叫導致 call stack overflow 的問題。
- 需要確認 [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) 和 `RegExp` 這種特殊型態是否也能被處理。
- 需要確認原型鏈也能一併被複製。

為此我們需要新增以下的 Test Cases：

```typescript
describe('advanced edge cases', () => {
  it('should handle symbol', () => {
    const symbol = Symbol('Dandelion Huang')
    const obj = { [symbol]: 'Symbol of Dandelion Huang' }
    const expected = { [symbol]: 'Symbol of Dandelion Huang' }
    const result = utils.cloneDeepAdvanced(obj)

    expect(obj).toEqual(expected)
    expect(result).toEqual(expected)
  })

  it('should handle recursive reference', () => {
    const obj: any = {}
    obj.recursion = { this: obj }

    const expected: any = {}
    expected.recursion = { this: expected }

    const result = utils.cloneDeepAdvanced(obj)

    expect(obj).toEqual(expected)
    expect(result).toEqual(expected)
  })

  it('should handle Date() and RegExp()', () => {
    const obj = { date: new Date('2024-04-24'), regexp: /^Dandelion Huang$/ }
    const expected = { date: new Date('2024-04-24'), regexp: /^Dandelion Huang$/ }
    const result = utils.cloneDeepAdvanced(obj)

    expect(obj).toEqual(expected)
    expect(result).toEqual(expected)
  })

  it('should handle prototype chain', () => {
    class Dandelion {
      constructor() {}
    }

    const obj = new Dandelion()
    const expected = new Dandelion()
    const result = utils.cloneDeepAdvanced(obj)

    expect(obj).toEqual(expected)
    expect(result).toEqual(expected)
  })
})
```

接下來讓我們一一解決前述的盲點：

```typescript
function cloneDeepAdvanced<T extends Record<string, any>>(obj: T, cache = new WeakMap()) {
  // use cache to handle recursive reference
  if (cache.has(obj)) {
    return cache.get(obj)
  }

  if (typeof obj !== 'object' || !obj) {
    return obj
  }

  // hanel Date() and RegExp()
  if (obj instanceof Date) {
    return new Date(obj)
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }

  const clonedObj = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj))

  // save cache
  cache.set(obj, clonedObj)

  // use Reflect.ownKeys to handle Symbol as key
  for (const key of Reflect.ownKeys(obj)) {
    const val = obj[key as keyof T]
    clonedObj[key as keyof T] = cloneDeepAdvanced(val, cache)
  }

  return clonedObj
}
```

> 值得注意的是這裡我們選擇使用的是 `WeakMap` 而不是 `Map`。
>
> `WeakMap` 採用弱引用，可以被垃圾回收 (Garbage Collection)，因此可以有效地回收記憶體。

如果想要盡量使用原生方法的話，很容易就可以想到透過 `JSON.parse(JSON.stringify(obj))` 來實作。

```typescript
function cloneDeepWithStringify<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj))
}
```

> 但其實這可以處理的狀況是很有限的，比方說 `function` 等不可序列化的資料，都會導致程式出錯。

因此其實現在有個很好用的原生方法，是透過 [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) 來實作：

```typescript
function cloneDeepWithStructuredClone<T>(obj: T) {
  return structuredClone(obj)
}
```

> 但 `structuredClone` 也有缺點，就是他不能處理 `Symbol`。
