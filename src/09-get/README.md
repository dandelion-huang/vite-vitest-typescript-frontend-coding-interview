# [`Medium`] 手寫 get

🔸 題目描述

實作一個 `get` 效用函式。它接收三個參數：

- 一個物件
- 某個路徑
- 預設值

而此函式最後會返回路徑的值；如果該路徑不存在於給定的物件，則返回預設值。透過例子會比較好理解：

```javascript
// 範例
const object = { a: [{ b: { c: 3 } }] }

//=> 3
get(object, 'a[0].b.c')

//=> 3
get(object, 'a[0][b][c]')

//=> 'default'
get(object, 'a[100].b.c', 'default')
```

> 根據 [lodash.get](https://lodash.com/docs/4.17.15#get) 的文件，`path` 參數可以是字串或陣列。預設值 `defaultValue` 是一個可選的參數。。

💭 分析與思路

首先撰寫 Test Cases：

```javascript
import { describe, expect, it } from 'vitest'
import * as utils from './get'

const object = { a: [{ b: { c: 3 } }] }

describe('get', () => {
  it('should return the value if the path is valid', () => {
    expect(utils.get(object, 'a[0].b.c')).toBe(3)
    expect(utils.get(object, 'a[0][b][c]')).toBe(3)
  })

  it('should return defaultValue if the path is invalid', () => {
    expect(utils.get(object, 'a[100].b.c', {})).toEqual({})
  })
})
```

感覺大致的思路如下：

- 根據是否有傳入 `defaultValue` 值決定返回 `defaultValue` 或者查找路徑後取得的值（以下稱為 `result`）。
- 首先判斷 `object` 是否為 `null` 或 `undefined`，如果是就直接返回 `defaultValue`（未傳入時 `defaultValue` 為 `undefined`）。
- 解析路徑為陣列方便迭代：
  - 如果是陣列可以直接使用。
  - 如果是字串，則利用 [`String.prototype.split`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) 和 [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) `/[.\[\]]/` 去除所有的 `.` 和 `[` 和 `]`，將字串分割成陣列。
- 遍歷解析路徑後的陣列返回 `result`。這部分可以利用 [`in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in) 運算子來檢查物件是否有指定的 `key`。

> 實務上，如果 `path` 是字串，應該要將 `path` 做 [`String.prototype.trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)，以避免有前後空白的情況。但為了避免模糊焦點，這裡就假設這個 `path` 是經過 `trim` 才傳入 `get` 的。

首先先讓我們寫一個幫忙將 `path` 轉換成陣列的 helper function：

```typescript
function handlePath(path: string | string[]): (number | string)[] {
  if (Array.isArray(path)) {
    return path
  }

  if (typeof path === 'string') {
    return path.split(/[.\[\]]/).filter((str) => str !== '')
  }

  throw new Error('[get] path must be a string or a string array')
}
```

然後就可以簡單地寫出第一種解法：

```typescript
function get<T, D>(object: T, path: string | string[], defaultValue?: D): any | D {
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
```

> 這裏要注意的是，如果 `keys` 為空陣列也要直接返回 `defaultValue`。

可以在第一種解法的基礎上，利用 [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) 來實作第二種解法：

```typescript
// solution 2.
function getWithReduce<T, D>(object: T, path: string | string[], defaultValue?: D): any | D {
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
```

## 💫 延伸思考

找參考資料的的時候，看到 [codefarmertw](https://github.com/codefarmertw) 也有進行這個挑戰，所以也參考了他進行測試以及定義 Test Cases 的方式。

由於測試資料中有些不符合原本題意的資料，所以也修改了函數簽名讓 `path` 可能可以是 `number`，並實作相關的 Type Guard。

以往我寫測試可能會使用多層 `describe` 來描述各種狀況並分組，但使用 `test` 可能也是一種不錯的方式，做這樣的練習最有趣的部分就是可以嘗試各種平常較少使用的寫法 🙌！
