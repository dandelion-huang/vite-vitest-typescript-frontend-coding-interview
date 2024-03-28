# [`Easy`] 手寫 dropWhile

🔸 題目描述

請實作一個 `dropWhile` 函式。此函式接受兩個參數，第一個是參數是一個陣列，它可以是任何類型的陣列；第二個是一個 `predicate` 函式，會接受陣列中的元素，如果返回為真，則表示該元素應該被丟棄，直到返回的不為真則停止。

`dropWhile` 會回傳一個新的陣列，且不應改動到原始陣列。回傳的陣列從原始陣列的第一個不滿足 `predicate` 條件的元素開始，直到陣列中的最後一個元素，若每個元素皆滿足 `predicate` 函式，則回傳空陣列。

```javascript
// 範例一
dropWhile([1, 2, 3, 4, 5, 6], (value) => value < 4);
// => [4, 5, 6]

// 範例二
dropWhile([0, 1, 2], (value) => value < 5);
// => []

// 範例三
dropWhile([0, 6, 1, 2], (value) => value < 5))
// => [6, 1, 2]
```

💭 分析與思路

首先撰寫 Test Cases：

```javascript
import { describe, expect, it } from 'vitest'
import * as utils from './dropWhile'

describe('dropWhile', () => {
  it('should return the slice of the array once the predicate returns false', () => {
    const array = [1, 2, 3, 4, 5, 6]
    const predicate = (value: number) => value < 4
    const result = utils.dropWhile(array, predicate)

    expect(array).toEqual([1, 2, 3, 4, 5, 6])
    expect(result).toEqual([4, 5, 6])
  })

  it('should return an empty array if all elements of the array pass the predicate', () => {
    const array = [0, 1, 2]
    const predicate = (value: number) => value < 5
    const result = utils.dropWhile(array, predicate)

    expect(array).toEqual([0, 1, 2])
    expect(result).toEqual([])
  })

  it('should return the slice of the array once the predicate returns false', () => {
    const array = [0, 6, 1, 2]
    const predicate = (value: number) => value < 5
    const result = utils.dropWhile(array, predicate)

    expect(array).toEqual([0, 6, 1, 2])
    expect(result).toEqual([6, 1, 2])
  })
})
```

核心需求就是透過遍歷 `array` 的每個元素，如果 `predicate` 返回為真，則跳過該元素，直到 `predicate` 返回為假，才回傳剩下的元素。為此可能會需要記下 `index` 的值，以便在遍歷完 `array` 後，可以透過 [`Array.prototype.slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 從 `index` 開始取出剩下的元素。

使用 [while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while) 迴圈可能會比較簡潔。

```typescript
function dropWhile<T>(array: T[], predicate: (value: T) => boolean) {
  let index = 0

  while (index < array.length && predicate(array[index])) {
    ++index
  }

  return array.slice(index)
}
```

也可以用 [for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) 迴圈來改寫。

```typescript
function dropWhileWithForLoop<T>(array: T[], predicate: (value: T) => boolean) {
  for (let i = 0; i < array.length; ++i) {
    if (!predicate(array[i])) {
      return array.slice(i)
    }
  }

  return []
}
```

在參考解答的時候發現，有些程式語言會推崇 Single Point of Exit 這種原則。在這種情況下，可以另外用一個變數 `droppedIndex` 來記錄已經跳過的元素的數量。這樣就不會在迴圈中直接 `return` 了。

> 雖然 Single Point of Exit 的原則可以提高程式碼的可靠性，但是在一些情況下，可能會增加程式碼的複雜度。在以前學習 JavaScript 也經常聽到利用 Early Return 來簡化程式碼的做法。
>
> 我自己是覺得每種做法都有道理，在這種狀況下遵循整個團隊的方式可能會比較好。

```typescript
function dropWhileWithForLoopAndSingleReturn<T>(array: T[], predicate: (value: T) => boolean) {
  let droppedIndex = 0

  for (let i = 0; i < array.length; ++i) {
    if (!predicate(array[i])) {
      break
    }

    ++droppedIndex
  }

  return array.slice(droppedIndex)
}
```

## 💫 延伸思考

今天發現原本撰寫自動化測試的部分，在只有更改 `.ts` 檔案的時候，會抓不到應該執行的測試檔 `.test.ts`。

此外，有時候更改某隻檔案，可能會影響到其他的檔案使其測試失敗，所以目前決定採用每次 `pre-commit` 都執行所有測試的方式。
