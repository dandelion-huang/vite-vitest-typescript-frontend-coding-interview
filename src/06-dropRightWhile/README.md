# [`Easy`] 手寫 dropRightWhile

🔸 題目描述

請實作一個名為 `dropRightWhile` 的函式，該函式接收兩個參數。第一個參數是一個陣列；第二個參數是一個 `predicate` 函式，用於指定條件。

`dropRightWhile` 函式會從陣列的末端開始遍歷，移除符合指定條件的元素，直到遇到不符合條件的元素為止。然後，它會回傳剩餘的元素所組成的新陣列，同時確保原始陣列保持不變。

```javascript
// 範例一
dropRightWhile(['hello', 'world', 'today', 'isGood'], (value) => value.length > 5)
// => ['hello', 'world', 'today']

// 範例二
dropRightWhile(
  [
    { name: 'Alice', age: 25 },
    { name: 'Charlie', age: 20 },
    { name: 'Bob', age: 30 },
  ],
  (obj) => obj.age > 25
)
// => [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 20 }]

// 範例三
dropRightWhile([10, 20, 30, 40, 50, 10], (value) => value !== 10)
// => [10, 20, 30, 40, 50, 10]

// 範例四
dropRightWhile([1], (value) => value > 0)
// => []
```

💭 分析與思路

首先撰寫 Test Cases：

```javascript
import { describe, expect, it } from 'vitest'
import * as utils from './dropRightWhile'

describe('dropRightWhile', () => {
  it('should return the slice of the array once the predicate returns false from the right', () => {
    type T = string

    const array: T[] = ['hello', 'world', 'today', 'isGood']
    const predicate = (value: T) => value.length > 5
    const result = utils.dropRightWhile(array, predicate)

    expect(array).toEqual(['hello', 'world', 'today', 'isGood'])
    expect(result).toEqual(['hello', 'world', 'today'])
  })

  it('should return the slice of the array once the predicate returns false from the right', () => {
    type T = { name: string; age: number }

    const array: T[] = [
      { name: 'Alice', age: 25 },
      { name: 'Charlie', age: 20 },
      { name: 'Bob', age: 30 },
    ]
    const predicate = (obj: T) => obj.age > 25
    const result = utils.dropRightWhile(array, predicate)

    expect(array).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Charlie', age: 20 },
      { name: 'Bob', age: 30 },
    ])
    expect(result).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Charlie', age: 20 },
    ])

  it('should return the slice of the array if every elements of the array passes the predicate', () => {
    type T = number

    const array: T[] = [10, 20, 30, 40, 50, 10]
    const predicate = (value: T) => value !== 10
    const result = utils.dropRightWhile(array, predicate)

    expect(array).toEqual([10, 20, 30, 40, 50, 10])
    expect(result).toEqual([10, 20, 30, 40, 50, 10])
  })

  it('should return an empty array if no elements of the array passed the predicate', () => {
    type T = number

    const array: T[] = [1]
    const predicate = (value: T) => value > 0
    const result = utils.dropRightWhile(array, predicate)

    expect(array).toEqual([1])
    expect(result).toEqual([])
  })
})

```

基本上，只要注意調整邊界條件，從尾部向前遍歷即可，從索引 `array.length - 1` 開始，直到 `predicate` 返回 `false` 或是索引為 `0` 為止。使用 [`Array.prototype.slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 來取得淺拷貝（shallow copy）的時候要記得不包含第二個參數的對應的元素，所以第二個參數會是 `index + 1`。

```typescript
function dropRightWhile<T>(array: T[], predicate: (value: T) => boolean) {
  let index = array.length - 1

  while (index >= 0 && predicate(array[index])) {
    --index
  }

  return array.slice(0, index + 1)
}
```

使用 [for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) 迴圈也很簡單。

```typescript
function dropRightWhileWithForLoop<T>(array: T[], predicate: (value: T) => boolean) {
  for (let i = array.length - 1; i >= 0; --i) {
    if (!predicate(array[i])) {
      return array.slice(0, i + 1)
    }
  }

  return []
}
```

但是改寫第三種解法的時候要注意，[for...of loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) 沒辦法從尾部開始遍歷，如果硬要這樣寫的話就要先透過 [`Array.prototype.slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 來取得淺拷貝，再利用 [`Array.prototype.reverse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) 來就地（in-place）反轉，然後遍歷這個反轉的陣列。

```typescript
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
```

## 💫 延伸思考

最近在社群遇到 Summer，得知她們最近有舉辦私人的讀書會，主題是 The Art of Unit Testing, 3e - The Basics of Unit Testing 這本書。在[閱讀筆記](https://www.cythilya.tw/2024/03/28/the-basics-of-unit-testing/)中提到好的測試應該：

> - 目標明確、提示清楚明確
>   - (O) should get 3 when 1 + 2 這就很明確表達 1 + 2 = 3，通常會用 Given-When-Then 或 it should 搭配 3A Pattern（Arrange → Act → Assert）來命名測試。
>   - (X) get correct answer when execute sum 這樣就是很不清楚的、沒有效率的表達方式。

其實以前我也有想要用這樣的方式撰寫測試敘述，但是後來發現每次更改測試內容的時候都要去改外面的敘述，變得有點麻煩。當然我相信有去更改到 Test Cases 的時候，應該去調整敘述內容是一件好事，感覺也比較嚴謹。但在這篇文章中 Summer 也有提到：

> 儘管是這樣，TDD 始終沒有成為我待過的任何一個組織的常態工作流程，大多成為個人愛好或習慣而已。

我想這樣的方式成本應該是相當巨大的。

另外一個覺得還是先維持目前這樣的敘述方式的原因是，我覺得如果寫得這麼明確的話，敘述很有可能變成只是把 Test Cases 重寫一次，像這樣：

```typescript
describe('dropRightWhile', () => {
  it("should return ['hello', 'world', 'today'] if the input array is ['hello', 'world', 'today', 'isGood'] and the input array should not be changed", () => {
    type T = string

    const array: T[] = ['hello', 'world', 'today', 'isGood']
    const predicate = (value: T) => value.length > 5
    const result = utils.dropRightWhile(array, predicate)

    expect(array).toEqual(['hello', 'world', 'today', 'isGood'])
    expect(result).toEqual(['hello', 'world', 'today'])
  })
})
```

我想在軟體工程中肯定有各種做法，但也要在各種狀況下和團隊取得共識。目前我覺得這樣的寫法雖然稍微含糊，但也不會佔用太多時間去想測試的敘述。
