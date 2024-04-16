# [`Easy`] 手寫 fromPairs

🔸 題目描述

實作一個 `fromPairs` 函式。 `fromPairs` 會接受一個參數 `pairs`，這個參數是一個包含多個兩元素子陣列的陣列。每個子陣列代表一個鍵值對 (key-value pair)，其中第一個元素是鍵 (key)，第二個元素是值 (value)。

`fromPairs` 最後會返回一個新的物件，每個來自 `pairs` 陣列的鍵值對 (key-value pair)，都會是這個新物件的鍵值對 (key-value pair)。

```javascript
// 範例
const pairs = [
  ['explain', 'this'],
  ['help', 'you'],
  ['keep', 'growing'],
]

fromPairs(pairs)
// => { explain: 'this', help: 'you', keep: 'growing' }
```

💭 分析與思路

這次先釐清一下題目的要求：

- 如果 `pairs` 中的某個子陣列的長度不等於 `2`，則跳過。
- 如果 `pairs` 中的某個子陣列的第一個值無法被 `toString` 轉換成字串，則跳過。
- 應該有能力處理像是 `Symbol` 和 `BigInt` 這類特殊的 Primitive Types。

首先撰寫 Test Cases：

```javascript
import { describe, expect, it } from 'vitest'
import * as utils from './fromPairs'

describe('fromPairs', () => {
  it('should return an object if all pair in pairs are valid', () => {
    const pairs = [
      ['explain', 'this'],
      ['help', 'you'],
      ['keep', 'growing'],
    ]

    expect(utils.fromPairs(pairs)).toEqual({ explain: 'this', help: 'you', keep: 'growing' })
  })

  it('should filter invalid keys if the first element of any pair is not able to be converted to string', () => {
    const pairs = [
      [null, 'null'],
      [undefined, 'undefined'],
      [0, 'zero'],
      [3.14, 'floating number'],
    ]

    expect(utils.fromPairs(pairs)).toEqual({ 0: 'zero', 3.14: 'floating number' })
  })

  it('should filter invalid pair if the length of any pair is not 2', () => {
    const pairs = [['happy', 'coding'], ['?'], ['hello', 'world', '!']]

    expect(utils.fromPairs(pairs)).toEqual({ happy: 'coding' })
  })

  describe('special primitive types', () => {
    it('should handle Symbol if the pairs include Symbol', () => {
      const pairs = [
        [Symbol.for('symbol'), 'symbol1'], // global symbol
        [Symbol('symbol'), 'symbol2'], // local symbol
        ['Symbol', 'is unique'],
      ]

      expect(utils.fromPairs(pairs)).toEqual({
        'Symbol(symbol)': 'symbol2',
        Symbol: 'is unique',
      })
    })

    it('should handle BigInt if the pairs include BigInt', () => {
      const pairs = [
        [BigInt('1234567890'), 'bigint1'],
        [BigInt('9876543210'), 'bigint2'],
      ]

      expect(utils.fromPairs(pairs)).toEqual({
        1234567890: 'bigint1',
        9876543210: 'bigint2',
      })
    })
  })
})
```

接下來就按照需求實作吧！

剛好前陣子在閱讀開源函式庫原始碼的時候，讀到了很多 TypeScript 的 [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)，所以就試著用它來實作看看。這邊就先直接把解法寫出來，關於 Record 的部份在延伸思考中再解釋吧！

只要檢查每個子陣列的長度是否等於 `2`，以及第一個元素是否能被 `toString` 轉換成字串，都通過的話直接放入一個物件，最後回傳就可以囉：

```typescript
function fromPairs<T>(pairs: T[][]) {
  const obj: Record<string, T> = {}

  for (const pair of pairs) {
    if (pair.length !== 2) {
      continue
    }

    const [key, value] = pair

    if (key?.toString) {
      obj[key.toString()] = value
    }
  }

  return obj
}
```

以前在學習 JavaScript 的時候也在 MDN 上看到一個很經典的例子，是使用 [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) 來實作：

```typescript
function fromPairsWithReduce<T>(pairs: T[][]) {
  return pairs.reduce<Record<string, T>>((accum, cur) => {
    if (cur.length !== 2) {
      return accum
    }

    const [key, value] = cur

    if (key?.toString) {
      accum[key.toString()] = value
    }

    return accum
  }, {})
}
```

## 💫 延伸思考

> Record 可以用來對物件的鍵和值進行嚴格的類型控制。

可以簡單寫出如下的範例：

```typescript
type Employees = Record<string, number>

const employees: Employees = {
  Alice: 10,
  Bob: 20,
  Charlie: 30,
}
```

也可以用來搭配 [`enum`](https://www.typescriptlang.org/docs/handbook/enums.html)：

```typescript
enum Permission {
  Create,
  Read,
  Update,
  Delete,
}

type PermissionMap = Record<Permission, boolean>

const userPermissions: PermissionMap = {
  [Permission.Create]: true,
  [Permission.Read]: true,
  [Permission.Update]: false,
  [Permission.Delete]: false,
}
```

> ES10 的 [`Object.fromEntries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries) 也可以用來更簡潔地實作。

要注意 `Object.fromEntries` 有些特別之處：

- 可以處理 `null`、`undefined`。
- 對 `Symbol.for` 也能正確地處理其唯一性不會覆蓋（但是不能處理 `Symbol`）。
- 會忽略不足 `1` 個元素的 `pair`，但正確處理超過 `2` 個元素的 `pair`（忽略剩餘元素）。

所以要稍微調整一下 Test Cases：

```typescript
// ...

describe('object.fromEntries', () => {
  it('should handle null and undefined', () => {
    const pairs = [
      [null, 'null'],
      [undefined, 'undefined'],
      [0, 'zero'],
      [3.14, 'floating number'],
    ]

    expect(utils.fromPairsWithObjectFromEntries(pairs)).toEqual({
      null: 'null',
      undefined: 'undefined',
      0: 'zero',
      3.14: 'floating number',
    })
  })

  it("should handle multiple Symbol and won't overwrite", () => {
    const pairs = [
      [Symbol.for('symbol'), 'symbol1'],
      [Symbol.for('symbol'), 'symbol2'],
      ['ObjectFromEntries', "won't be overwritten"],
    ]

    expect(utils.fromPairsWithObjectFromEntries(pairs)).toEqual({
      [Symbol.for('symbol')]: 'symbol1',
      [Symbol.for('symbol')]: 'symbol2',
      ObjectFromEntries: "won't be overwritten",
    })
  })

  it('should filter invalid pair if the length of any pair is not 2', () => {
    const pairs = [['oh', 'my', 'god'], ['?']]

    expect(utils.fromPairsWithObjectFromEntries(pairs)).toEqual({
      oh: 'my',
    })
  })
})
```

簡單地封裝這個原生方法即可：

```typescript
function fromPairsWithObjectFromEntries<T>(pairs: T[][]) {
  return Object.fromEntries(pairs)
}
```
