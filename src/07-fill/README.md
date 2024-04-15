# [`Easy`] 手寫 fill

🔸 題目描述

實作 `fill` 函式，此函式接收四個參數：

- 一個陣列
- 要替換的 `value`
- `start` 索引
- `end` 索引

該函式會從 `start` 到 `end` 索引 (包含 `start` 但不包含 `end`) 來把陣列的元素換成 `value`。如果未提供 `start` 索引，則應預設為 `0`。如果未提供 `end` 索引，則剩餘元素會被替換為 `value`。

```javascript
fill([1, 2, 3], '*')
// => ['*', '*', '*']

fill([1, 2], '*', 2, 3)
// => [1, 2]

fill([1, 2, 3, 4, 5], '*', 1, -1)
// => [1, '*', '*', '*', 5]
```

💭 分析與思路

首先撰寫 Test Cases：

```javascript
import { describe, expect, it } from 'vitest'
import * as utils from './fill'

describe('fill', () => {
  it('should return an array all filled with the value if the start and the end are undefined', () => {
    expect(utils.fill([1, 2, 3], '*')).toEqual(['*', '*', '*'])
  })

  it('should return an unchanged array if the start and the end are larger than the length of the array', () => {
    expect(utils.fill([1, 2], '*', 2, 3)).toEqual([1, 2])
  })

  it('should return an unchanged array if the start and the end are the same', () => {
    expect(utils.fill([1, 2, 3], '*', 0, 0)).toEqual([1, 2, 3])
    expect(utils.fill([1, 2, 3], '*', 1, 1)).toEqual([1, 2, 3])
    expect(utils.fill([1, 2, 3], '*', -1, -1)).toEqual([1, 2, 3])
  })

  it('should return an unchanged array if the start is smaller than the end', () => {
    expect(utils.fill([1, 2, 3], '*', 2, 1)).toEqual([1, 2, 3])
  })

  it('should return the filled array if the start is smaller than 0 and it is treated as 0', () => {
    expect(utils.fill([1, 2, 3], '*', -5, -1)).toEqual(['*', '*', 3])
  })

  it('should return an array filled with the value except for the first and the last element', () => {
    expect(utils.fill([1, 2, 3, 4, 5], '*', 1, -1)).toEqual([1, '*', '*', '*', 5])
  })

  it('should return the reference of the original array', () => {
    const arr = [1, 2, 3]

    expect(utils.fill(arr, '*')).toBe(arr)
  })

  it('should return an unchanged array if the start and the end are NaN', () => {
    expect(utils.fill([1, 2, 3], '*', NaN, NaN)).toEqual([1, 2, 3])
  })

  it('should return an empty array is the input array is empty', () => {
    expect(utils.fill([], '*')).toEqual([])
  })

  it('should return an array filled with the same object reference', () => {
    const arr: { [key: string]: any }[] = utils.fill(Array(3), {})

    arr[0].helloWorld = 'Hello, world!'

    expect(arr).toEqual([
      { helloWorld: 'Hello, world!' },
      { helloWorld: 'Hello, world!' },
      { helloWorld: 'Hello, world!' },
    ])
  })
})
```

雖然 Test Cases 寫得很繁雜，但主要要測試的狀況也就是：

- `start` 的預設值為 `0`，`end` 的預設值為 `array.length`。
- `start` 和 `end` 小於 `0` 的時候，會先被加上一次 `array.length`。如果依然小於 `0`，會被視為 `0`。
- `end` 大於 `array.length` 的時候，會被視為 `array.length`。
- `start` 大於 `end` 的時候，可以直接回傳原陣列，因為 `start` 和 `end` 之間沒有任何元素要填充。
- `start` 和 `end` 都是 `NaN` 的時候，由於 `NaN` 和任何數值進行比較結果都是 `false`，會回傳原陣列。
- 如果對 `array` 填充物件的話，這個物件會全部使用同一個參考。

根據上面的步驟釐清，除了最後一點只應用在測試之外，可以直接寫出答案：

```typescript
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
```
