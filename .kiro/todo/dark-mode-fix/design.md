# ダークモード対応の設計書

## 概要

このドキュメントでは、スペル検索サイトのダークモードにおけるスペルボードの数字枠の表示問題を修正するための設計を定義します。現在、ダークモードに切り替えた際にスペルボードの数字枠のスタイルが適切に変更されておらず、視認性に問題があります。

## アーキテクチャ

現在のアプリケーションでは、テーマ（ライトモード/ダークモード）は以下の方法で管理されています：

1. CSS変数を使用したテーマ定義（`src/app/globals.css`）
2. メディアクエリ `prefers-color-scheme: dark` を使用したダークモード検出
3. コンポーネント内でのテーマ依存のスタイル適用

問題のあるコンポーネントは以下の通りです：

1. `KanaBoard.tsx` - スペルボードの表示を担当するコンポーネント

## コンポーネントとインターフェース

### 1. KanaBoard コンポーネント

KanaBoardコンポーネントは、スペルボードの表示を担当しています。現在、数字枠のスタイルはハードコードされており、ダークモードに対応していません。

```tsx
<td
  className={`py-2 px-3 border-b border-r border-gray-300 font-extrabold text-center text-base sm:text-lg md:text-xl cursor-pointer
    ${highlightedRows.includes(row.id)
      ? activeNumberButtons.includes(row.id)
        ? 'bg-yellow-200 text-black ring-2 ring-red-500 ring-inset' // ハイライト状態かつ所持状態
        : 'bg-yellow-200 text-black ring-2 ring-yellow-400 ring-inset' // ハイライト状態のみ
      : activeNumberButtons.includes(row.id)
        ? 'bg-gray-100 text-gray-800 ring-2 ring-red-500 ring-inset' // 所持状態のみ
        : 'bg-gray-100 text-gray-800'}`}
  onClick={() => onRowNumberClick && onRowNumberClick(row.id)}
>
  {row.id}
</td>
```

## データモデル

この機能では新しいデータモデルは必要ありません。既存のCSSテーマ変数を活用します。

## 修正アプローチ

### 1. CSS変数の拡張

`globals.css`に新しいテーマ変数を追加して、スペルボードの数字枠のスタイルをテーマに応じて変更できるようにします。

```css
:root {
  /* 既存の変数 */
  --background: #f5f7fa;
  --foreground: #1a202c;
  /* 新しい変数 */
  --number-cell-bg: #f1f1f1;
  --number-cell-text: #1a202c;
  --number-cell-border: #e2e8f0;
  /* 他の変数 */
}

@media (prefers-color-scheme: dark) {
  :root {
    /* 既存の変数 */
    --background: #1a202c;
    --foreground: #f7fafc;
    /* 新しい変数 */
    --number-cell-bg: #2d3748;
    --number-cell-text: #f7fafc;
    --number-cell-border: #4a5568;
    /* 他の変数 */
  }
}
```

### 2. KanaBoardコンポーネントの修正

KanaBoardコンポーネントを修正して、数字枠のスタイルにCSSテーマ変数を使用するようにします。

```tsx
<td
  className={`py-2 px-3 border-b border-r border-gray-300 font-extrabold text-center text-base sm:text-lg md:text-xl cursor-pointer
    ${highlightedRows.includes(row.id)
      ? activeNumberButtons.includes(row.id)
        ? 'bg-yellow-200 text-black ring-2 ring-red-500 ring-inset' // ハイライト状態かつ所持状態
        : 'bg-yellow-200 text-black ring-2 ring-yellow-400 ring-inset' // ハイライト状態のみ
      : activeNumberButtons.includes(row.id)
        ? 'dark:bg-gray-700 dark:text-gray-200 bg-gray-100 text-gray-800 ring-2 ring-red-500 ring-inset' // 所持状態のみ
        : 'dark:bg-gray-700 dark:text-gray-200 bg-gray-100 text-gray-800'}`}
  onClick={() => onRowNumberClick && onRowNumberClick(row.id)}
  style={{
    backgroundColor: highlightedRows.includes(row.id) ? undefined : 'var(--number-cell-bg)',
    color: highlightedRows.includes(row.id) ? undefined : 'var(--number-cell-text)',
    borderColor: 'var(--number-cell-border)'
  }}
>
  {row.id}
</td>
```

### 3. テーブルスタイルの修正

テーブル全体のスタイルもダークモードに対応するように修正します。

```tsx
<table className="min-w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm sm:text-base">
```

## エラー処理

この修正はUIの見た目のみに関わるものであり、特別なエラー処理は必要ありません。

## テスト戦略

1. **視覚的テスト**：
   - ライトモードとダークモードの両方でスペルボードの表示を確認
   - 数字枠のスタイルが適切に変更されることを確認
   - ハイライト状態と所持状態の組み合わせが正しく表示されることを確認

2. **レスポンシブテスト**：
   - 異なる画面サイズでの表示を確認
   - モバイルデバイスでの表示を確認

3. **ブラウザ互換性テスト**：
   - 主要なブラウザ（Chrome、Firefox、Safari、Edge）での表示を確認

## 依存関係

この修正は既存のコードベースに依存しており、新しい外部依存関係は必要ありません。
