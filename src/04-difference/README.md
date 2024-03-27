# [`Easy`] 手寫 difference

🔸 題目描述

請實作一個名為 `difference` 的函式，該函式接收兩個陣列作為參數。函式的功能是回傳只在第一個陣列中存在、在第二個陣列中不存在的元素，並且避免對重複值進行多餘的操作。

```javascript
difference([], []) // []
difference([1, 1, 2, 3], [2, 3]) // [1, 1]
difference([1, 2, 3], [1, 2, 3, 4]) // []
difference([4, 3, 2, 1], [1, 2, 3]) // [4]
```

💭 分析與思路

首先撰寫 Test Cases：

```javascript
import { describe, expect, it } from 'vitest'
import * as utils from './difference'

describe('difference', () => {
  it('should return an array if the first array is empty', () => {
    expect(utils.difference([], [])).toEqual([])
  })

  it('should return an array that only contains elements in the array but not in the values', () => {
    expect(utils.difference([1, 1, 2, 3], [2, 3])).toEqual([1, 1])
  })

  it('should return an array if all elements in the array are in the values', () => {
    expect(utils.difference([1, 2, 3], [1, 2, 3, 4])).toEqual([])
  })

  it('should return an array that only contains elements in the array but not in the values', () => {
    expect(utils.difference([4, 3, 2, 1], [1, 2, 3])).toEqual([4])
  })
})
```

最直覺的做法一樣是透過 [for...of loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) 來遍歷第一個陣列 `array` 的值，如果不存在在第二個陣列 `values` 中，就推進一個陣列中一起回傳。

```typescript
function difference(array: unknown[], values: unknown[]) {
  const result: unknown[] = []

  for (const value of array) {
    if (!values.includes(value)) {
      result.push(value)
    }
  }

  return result
}
```

也可以利用 [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 來簡化代碼，只要在第一個陣列中找到不在第二個陣列中的值就可以直接推進。

```typescript
function differenceWithFilter(array: unknown[], values: unknown[]) {
  return array.filter((value) => !values.includes(value))
}
```

考慮到每次都要遍歷 `values` 會有點繁瑣，可以一開始先將 `values` 轉成 `Set` 來快速的判斷是否存在某個值。

```typescript
function differenceWithSet(array: unknown[], values: unknown[]) {
  const valuesSet = new Set(values)
  return array.filter((value) => !valuesSet.has(value))
}
```

## 💫 延伸思考

最近發現 Cursor + Supermaven 在撰寫測試方面更好用！所以從這天開始會以 Cursor + Supermaven 為主，Codium AI 為輔來撰寫測試。除此之外，目前也覺得 Cursor 和 Supermaven 這個組合比 VS Code + GitHub Copilot 好用。

此外，這次也把測試指令放進 Husky 的 `pre-commit` 裡，這樣就可以在每次 commit 前自動執行測試。

```

```
