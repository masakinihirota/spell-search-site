# Design Document

## Overview

このデザインドキュメントでは、スペルトナエル検索サイトのヘッダーに次回作のURLリンクを追加する機能の設計について詳細を記述します。この機能は、既存のヘッダーコンポーネントを拡張し、Betaラベルの隣に次回作のリンクを配置します。

## Architecture

この機能は既存のReact/Next.jsアプリケーションのコンポーネント構造内に実装されます。具体的には、`Header`コンポーネントを修正して新しいリンク要素を追加します。

### 影響を受けるコンポーネント

- `Header` コンポーネント (`src/components/Header/index.tsx`)

## Components and Interfaces

### Header コンポーネントの変更

現在のHeaderコンポーネントは以下の構造になっています：

```tsx
<header className="bg-white shadow-md">
  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    <div className="flex items-center">
      <h1 className="text-2xl font-bold text-blue-600">スペルトナエル検索</h1>
      <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Beta</span>
    </div>
    <nav>
      <ul className="flex space-x-4">
        <li>...</li>
      </ul>
    </nav>
  </div>
</header>
```

変更後の構造は以下のようになります：

```tsx
<header className="bg-white shadow-md">
  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    <div className="flex items-center">
      <h1 className="text-2xl font-bold text-blue-600">スペルトナエル検索</h1>
      <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Beta</span>
      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">ver1.9.0に対応</span>
      <a
        href="https://vns-masakinihirota.vercel.app/"
        className="ml-2 text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="次回作: masakinihirota"
      >
        <span className="text-xs text-gray-500 mr-1">次回作:</span>
        masakinihirota
      </a>
    </div>
    <nav>
      <ul className="flex space-x-4">
        <li>...</li>
      </ul>
    </nav>
  </div>
</header>
```

### 新しいリンク要素の詳細

新しく追加するリンク要素は以下の特徴を持ちます：

1. `<a>` タグを使用して外部リンクを作成
2. `href` 属性に「https://vns-masakinihirota.vercel.app/」を設定
3. `target="_blank"` と `rel="noopener noreferrer"` を設定して新しいタブで開く
4. アクセシビリティのために `aria-label` を設定
5. Tailwind CSSを使用したスタイリング
   - `ml-2`: 左マージンを追加してBetaラベルとの間隔を確保
   - `text-sm`: 小さめのフォントサイズ
   - `text-gray-600`: グレーのテキスト色
   - `hover:text-blue-600`: ホバー時の色変更
   - `transition-colors`: 色の変化をスムーズにするトランジション
   - `flex items-center`: 「次回作:」テキストとリンクテキストを縦方向に中央揃え

## Responsive Design

レスポンシブデザインについては、既存のヘッダーコンポーネントのレスポンシブ対応を継承します。モバイル画面では、スペースが限られる場合があるため、以下の対応を検討します：

1. 小さな画面サイズでは「次回作:」のラベルを非表示にする可能性
2. 必要に応じて、モバイル向けのメニューに統合する可能性

```tsx
// モバイル対応の例
<a
  href="https://vns-masakinihirota.vercel.app/"
  className="ml-2 text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="次回作: masakinihirota"
>
  <span className="text-xs text-gray-500 mr-1 hidden sm:inline">次回作:</span>
  masakinihirota
</a>
```

## Error Handling

この機能はシンプルなHTMLリンクの追加であるため、特別なエラーハンドリングは必要ありません。ただし、以下の点に注意します：

1. リンク先が存在しない場合でも、アプリケーションの動作に影響を与えない
2. 外部リンクのセキュリティリスクを軽減するために `rel="noopener noreferrer"` を設定

## Testing Strategy

### 単体テスト

1. Headerコンポーネントのレンダリングテスト
   - リンクが正しくレンダリングされることを確認
   - リンクのテキストが「masakinihirota」であることを確認
   - リンクのURLが「https://vns-masakinihirota.vercel.app/」であることを確認

### 視覚的テスト

1. 異なる画面サイズでのレイアウト確認
   - デスクトップ、タブレット、モバイルでの表示確認
   - ヘッダー内での配置が適切であることを確認

### アクセシビリティテスト

1. スクリーンリーダーでの読み上げテスト
   - aria-labelが正しく設定されていることを確認
   - キーボードでのナビゲーションが可能であることを確認

## 実装計画

1. Headerコンポーネント（`src/components/Header/index.tsx`）を修正
2. 新しいリンク要素を追加
3. スタイリングを適用
4. レスポンシブデザインの確認
5. テスト実行
