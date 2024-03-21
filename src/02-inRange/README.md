# [`Easy`] 手寫 inRange

## 🔸 題目描述

請實作一個函式 `inRange` 。此函式接受三個參數：

- `value`：要檢查的數值
- `start`：範圍的下限 (範圍包含 `start`)，預設為 0
- `end`：範圍的上限 (範圍不包含 `end`)

在實作時，要同時考量以下條件：

- 預設行為：如果僅提供兩個參數，則第二個參數被視為 `end`，而 `start` 此時預設為 0，這樣會讓使用該函式的人，在正數範圍內能更簡易地使用。
- 負數範圍：如果 `start` 大於 `end`，`inRange` 會交換參數以正確處理負數範圍，確保在正負數都能被處理。
- 輸出：`inRange` 函式輸出會是一個 `Boolean`。

```javascript
inRange(3, 2, 4) // => true
inRange(4, 8) // => true
inRange(4, 2) // => false
inRange(2, 2) // => false
inRange(1.2, 2) // => true
```

## 💭 分析與思路

首先撰寫 Test Cases：

```typescript
import { describe, expect, it } from 'vitest'
import * as utils from './inRange'

describe('inRange', () => {
  describe('two arguments, with the start being 0', () => {
    it('should return false if the value is NaN', () => {
      expect(utils.inRange(NaN, 8)).toBe(false)
    })

    it('should return false if the end is NaN', () => {
      expect(utils.inRange(4, NaN)).toBe(false)
    })

    it('should return false if the value is NaN and the end is NaN', () => {
      expect(utils.inRange(NaN, NaN)).toBe(false)
    })

    it('should return true if the value is within the range', () => {
      expect(utils.inRange(2, 4)).toBe(true)
    })

    it('should return false if the value is not within the range', () => {
      expect(utils.inRange(4, 2)).toBe(false)
    })

    it('should return false if the value equals the end', () => {
      expect(utils.inRange(4, 4)).toBe(false)
    })

    it('should return true if the value is a floating-point number and the value is within the range', () => {
      expect(utils.inRange(1.2, 2)).toBe(true)
    })

    it('should return false if the value is negative and the value is not within the range', () => {
      expect(utils.inRange(-4, 4)).toBe(false)
    })

    it('should return false if the start is negative and the value is not within the range', () => {
      expect(utils.inRange(4, -4)).toBe(false)
    })

    it('should return true if the start is negative and the value is within the range', () => {
      expect(utils.inRange(-4, -10)).toBe(true)
    })

    it('should return true if the value is a negative floating-point number and the value is within the range', () => {
      expect(utils.inRange(-4.4, -10)).toBe(true)
    })

    it('should return true if the start is a negative floating-point number and the value is within the range', () => {
      expect(utils.inRange(-4, -10.4)).toBe(true)
    })
  })

  describe('three arguments', () => {
    it('should return true if the value is within the range', () => {
      expect(utils.inRange(3, 2, 4)).toBe(true)
    })

    it('should return false if the value is not within the range', () => {
      expect(utils.inRange(3, 4, 5)).toBe(false)
    })

    it('should return true if the value equals the start', () => {
      expect(utils.inRange(2, 2, 4)).toBe(true)
    })

    it('should return false if the value equals the end', () => {
      expect(utils.inRange(4, 2, 4)).toBe(false)
    })

    it('should return true if the start is greater than the end', () => {
      expect(utils.inRange(3, 4, 2)).toBe(true)
    })

    it('should return false if the value is negative and the value is not within the range', () => {
      expect(utils.inRange(-1, 0, 4)).toBe(false)
    })

    it('should return false if the start is negative and the value is not within the range', () => {
      expect(utils.inRange(3, -3, 0)).toBe(false)
    })

    it('should return true if the value is negative and the value is within the range', () => {
      expect(utils.inRange(-4, -10, -3)).toBe(true)
    })

    it('should return true if the value is a floating-point number and the value is within the range', () => {
      expect(utils.inRange(3.5, 2, 4)).toBe(true)
    })

    it('should return true if the start is a floating-point number and the value is within the range', () => {
      expect(utils.inRange(3, 2.5, 4)).toBe(true)
    })

    it('should return true if the end is a floating-point number and the value is within the range', () => {
      expect(utils.inRange(3, 2, 4.5)).toBe(true)
    })
  })
})
```

很直覺的可以想到透過[參數預設值 (default parameters)](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Default_parameters) 來指定 `start` 的值的解法。

```typescript
function inRange(value: number, a: number, b = 0) {
  let start = a
  let end = b

  if (start > end) {
    start = b
    end = a
  }

  return start <= value && value < end
}
```

現在我們也可以利用 [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 來做變數宣告以及交換變數的值。雖然因為過程中要動態分配一個陣列，所以效能會比較差，但其實平時不需要特別關心這種效能差異，可讀性也非常重要。

```typescript
function inRangeWithDestructuringAssignment(value: number, a: number, b = 0) {
  let [start, end] = [a, b]

  if (start > end) {
    ;[start, end] = [end, start]
  }

  return start <= value && value < end
}
```

最後我們也可以像是第一天的手寫 clamp 一樣，嘗試透過原生的 `Math.max` 和 `Math.min` 來實作：

```typescript
function inRangeWithMath(value: number, a: number, b = 0) {
  return Math.min(a, b) <= value && value < Math.max(a, b)
}
```

## 💫 延伸思考

- 除了使用參數預設值之外，其實我們也可以透過 [nullish coalescing operator (??)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) 來指定 `start` 的值，在這種狀況下就要在引數宣告的時候加上 `?` 來表示這個引數是 optional 的，而且要標示型別。

```typescript
function inRange(value: number, a: number, b?: number) {
  let [start, end] = [a, b ?? 0]

  // 省略以下部分
}
```
