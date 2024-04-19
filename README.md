# 前端程式題挑戰

## 前言

前陣子 ExplainThis 彙整出了 [50 題前端程式題大補帖](https://explainthisio.notion.site/ExplainThis-50-8fe7055e22d5467586f7d2c22719684f)，剛好最近也有朋友開始準備面試，所以決定也來挑戰這個題庫。

自從轉職成前端工程師以後，一開始當然就是刻了很多版（因為公司是做 Marketing 所以更動也很頻繁），這讓我一開始把目標放在像設計模式這樣的方法上，希望可以用更有效率的方式解決各種 context。這樣急促的方式會導致公司有時候不願意導入測試，在沒有得到同意的狀況下也不能自己寫，這部分也會希望可以用這個專案來練習。（自從在水球軟體學院認識了 TDD 以後一直很嚮往，這次就要來試試看✨。）

## 技術棧

- Vite
- Vitest
- TypeScript
- Husky
- Prettier

原本是使用 [Codium AI](https://www.codium.ai/) 的 [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=Codium.codium) 來協助產生 Test Cases。

但後來發現 [Cursor](https://cursor.sh/) + [Supermaven](https://supermaven.com/) 在撰寫測試方面更好用！所以目前 Codium AI 只是輔助性質。

## 環境設定

首先透過 pnpm 建立專案：

```shell
pnpm create vite
```

接下來進到專案資料夾中安裝套件：

```shell
pnpm i
```

安裝 Vitest 以及 Prettier：

```shell
pnpm add -D vitest
pnpm add -D -E prettier
```

其中 `-E` 是 `--save-exact` 的 short｀hand。

因為 formatter 每次更動都有可能會改變一些設定，建議用這個指令把版本鎖住。

## 撰寫指令

首先處理 Vitest 的部分。

為了避免看到不相干的測試內容，所以會將測試每個專案的指令直接透過 `package.json` 寫成 script 來執行：

```json
"scripts": {
  "test:all": "vitest",
  "test": "vitest --dir",
  "test-01": "vitest --dir ./src/01-clamp"
},
```

這樣就可以透過以下的指令來測試指定的資料夾：

```shell
pnpm test-01
```

接下來補上 Prettier 相關的部分。

因為測試指令會一直增加，建議寫在測試用 script 的前面。

```json
"scripts": {
  "format": "prettier --write --cache .",
},
```

## 程式碼品質

因為想要讓遠端的程式碼品質更可靠，決定花一點時間加上 Git Hooks，要使用的工具是 Husky。

首先在終端機中執行：

```shell
pnpm dlx husky-init
```

這個指令會自動新增 `.husky` 資料夾，並在 `package.json` 中添加一些內容：

```json
"scripts": {
  "prepare": "husky install"
},
"devDependencies": {
  "husky": "^8.0.0"
},
```

接下來再安裝 lint-staged：

```shell
pnpm add -D lint-staged
```

接下來我們需要稍微修改一下 `.husky/pre-commit` 的內容：

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

然後在 `package.json` 中補上相關的設定：

```json
"lint-staged": {
  "*.{ts,json,md}": [
    "prettier --write --cache"
  ],
  "*.ts": [
    "npm run test:staged"
  ]
},
```

這樣就會自動在 commit 前將程式碼排版乾淨，同時執行測試囉。

## 題目列表

- Day01 - [[`Easy`] 手寫 clamp](src/01-clamp)
- Day02 - [[`Easy`] 手寫 inRange](src/02-inRange)
- Day03 - [[`Easy`] 手寫 compact](src/03-compact)
- Day04 - [[`Easy`] 手寫 difference](src/04-difference)
- Day05 - [[`Easy`] 手寫 dropWhile](src/05-dropWhile)
- Day06 - [[`Easy`] 手寫 dropRightWhile](src/06-dropRightWhile)
- Day07 - [[`Easy`] 手寫 fill](src/07-fill)
- Day08 - [[`Easy`] 手寫 fromPairs](src/08-fromPairs)
- Day09 - [[`Medium`] 手寫 get](src/09-get)
