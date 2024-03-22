# [`Easy`] 手寫 compact

🔸 題目描述

請實作一個 `compact` 效用函式。 `compact` 能將輸入的陣列中的 `false`、`null`、`0`、`''`、`undefined` 和 `NaN` 都去除，並輸出一個新的陣列。請實作此 `compact` 函式。

```javascript
// 範例一
compact([0, 1, false, 2, '', 3, 'hello'])
// => [1, 2, 3, 'hello']

// 範例二
compact([null, undefined, NaN, ' '])
// =>[' ']

// 範例三
compact([{ name: 'Alice' }, null, { age: 30 }, undefined])
// =>[{ name: 'Alice' }, { age: 30 }]
```

💭 分析與思路

首先撰寫 Test Cases：

```javascript
import { describe, expect, it } from 'vitest'
import * as utils from './compact'

describe('compact', () => {
  it('should return an array that all falsy values are removed', () => {
    expect(utils.compact([0, 1, false, 2, '', 3, 'hello'])).toEqual([1, 2, 3, 'hello'])
  })

  it('should return an array that all falsy values are removed', () => {
    expect(utils.compact([null, undefined, NaN, ' '])).toEqual([' '])
  })

  it('should return an array that all falsy values are removed', () => {
    expect(utils.compact([{ name: 'Alice' }, null, { age: 30 }, undefined])).toEqual([
      { name: 'Alice' },
      { age: 30 },
    ])
  })
})
```

一開始先想到的其實是利用原生的 `Array.prototype.filter` 來處理：

```typescript
function compactWithFilter(array: unknown[]) {
  return array.filter(Boolean)
}
```

利用 `Boolean` 作為 `callbackFn` 可以很輕鬆地過濾掉 falsy 元素。

但也可以比較辛苦（？？？）地透過 [for...of loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) 來遍歷元素的值，確認 truthy 後再推進一個陣列中一起回傳。

```typescript
function compact(array: unknown[]) {
  const result: unknown[] = []

  for (const value of array) {
    if (value) {
      result.push(value)
    }
  }

  return result
}
```

## 💫 延伸思考

到了第三天，開始想要透過 Git Hooks 工具來讓遠端的程式碼品質更好，所以花了點時間處理 Husky 相關的設定，也將過程更新在 README 中了✨！
