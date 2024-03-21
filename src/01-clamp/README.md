# [`Easy`] 手寫 clamp

## 🔸 題目描述

你正在開發一個處理數值資料的系統。請寫一個名為 `clamp` 的函式，它需要三個參數：

- 一個數值 `number`
- 一個最小值 `lower`
- 一個最大值 `upper`

此函式應確保輸出的 `number` 始終落在指定的範圍内，包括最小值和最大值本身。你會如何實作這個 `clamp` 呢?

```javascript
// 在範圍中，返回原值
clamp(7, 0, 9) // => 7

// 小於 lower，返回 lower
clamp(-12, -4, 5) // => -4

// 大於 upper，返回 upper
clamp(18, 3, 9) // => 9
```

## 💭 分析與思路

首先撰寫 Test Cases：

```typescript
import { describe, expect, it } from 'vitest'
import * as utils from './clamp'

describe('clamp', () => {
  it('should return NaN if the number is NaN', () => {
    expect(utils.clamp(NaN, 0, 9)).toBe(NaN)
  })

  it('should return the number if it is within the range', () => {
    expect(utils.clamp(7, 0, 9)).toBe(7)
  })

  it('should return the lower bound if the number is less than the lower bound', () => {
    expect(utils.clamp(-12, -4, 5)).toBe(-4)
  })

  it('should return the upper bound if the number is greater than the upper bound', () => {
    expect(utils.clamp(18, 3, 9)).toBe(9)
  })
})
```

最簡單的做法，當然就是直接透過 `if/else` 做條件輸出：

```typescript
function clamp(number: number, lower: number, upper: number) {
  if (number < lower) {
    return lower
  } else if (number > upper) {
    return upper
  } else {
    return number
  }
}
```

觀察上面的解法，可以發現實際上是透過兩次條件式來決定輸出：

1. 比較 `lower` 和 `number` 取較大值。
2. 比較 `upper` 和 `lower` 取較小值。

因此可以精簡出第二種做法，可以透過原生的 `Math.max` 和 `Math.min` 來實作：

```typescript
function clampWithMath(number: number, lower: number, upper: number) {
  return Math.min(Math.max(number, lower), upper)
}
```

## 💫 延伸思考

- `clamp` 是 Lodash/Underscore 等實用函式庫中常見的功能，在 [You-Dont-Need-Lodash-Underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore?tab=readme-ov-file#_clamp) 這個 repo 中整理了許多相關的原生實作。
