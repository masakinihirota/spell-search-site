# Design Document

## Overview

このドキュメントでは、スペルトナエルの検索サイトに数字ボタン（1-8）の隣にリセットボタンを追加する機能の設計について説明します。リセットボタンは、ユーザーが選択した数字ボタンをワンクリックですべてクリアできるようにするものです。

## Architecture

この機能は既存のReact/Next.jsアプリケーションに統合されます。主な変更点は以下の通りです：

1. **UI変更**: 数字ボタンエリアにリセットボタンを追加
2. **状態管理**: 既存の`activeNumberButtons`状態を利用し、リセット機能を追加
3. **スタイリング**: Tailwind CSSを使用した一貫性のあるデザイン

## Components and Interfaces

### 変更が必要なコンポーネント

1. **Home コンポーネント** (`src/app/page.tsx`)
   - 数字ボタンエリアにリセットボタンを追加
   - リセット機能を実装する新しい関数を追加

### 新しい関数

```typescript
// リセットボタンのクリックハンドラー
const handleResetNumberButtons = useCallback(() => {
  setActiveNumberButtons([]);
}, []);
```

### コンポーネントの変更点

```tsx
// 数字ボタンエリアの変更
<div className="mb-4">
  <div className="text-center mb-2 text-sm font-medium text-gray-700">呪文の所持状態</div>
  <div className="flex justify-center gap-2">
    {/* 既存の数字ボタン */}
    {Array.from({ length: 8 }, (_, i) => i + 1).map(num => (
      <button
        key={num}
        className={`w-10 h-10 rounded-full font-bold ${
          activeNumberButtons.includes(num)
            ? 'bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-2 shadow-lg transform scale-110'
            : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
        } transition-all duration-200`}
        onClick={() => toggleNumberButton(num)}
      >
        {num}
      </button>
    ))}

    {/* 新しいリセットボタン */}
    <button
      className={`w-10 h-10 rounded-full font-bold flex items-center justify-center ${
        activeNumberButtons.length > 0
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
      } transition-all duration-200`}
      onClick={handleResetNumberButtons}
      disabled={activeNumberButtons.length === 0}
      title="選択をクリア"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  </div>
  <div className="text-center mt-2 text-xs text-gray-500">
    {activeNumberButtons.length > 0
      ? `所持中: ${activeNumberButtons.sort((a, b) => a - b).join(', ')}`
      : '数字をクリックして所持状態を切り替えてください'}
  </div>
</div>
```

## Data Models

この機能では新しいデータモデルは必要ありません。既存の状態を利用します：

```typescript
// 数字ボタンの状態を管理（1-8のボタンがONかOFFか）
const [activeNumberButtons, setActiveNumberButtons] = useState<number[]>([]);
```

## Error Handling

リセットボタンの主なエラー処理は、ボタンの無効化です：

1. 数字ボタンが選択されていない場合（`activeNumberButtons.length === 0`）、リセットボタンは無効化されます
2. 無効化されたボタンはクリックできず、視覚的にも無効状態であることが分かるようにスタイリングされます

## Testing Strategy

### 単体テスト

1. リセットボタンのクリックハンドラー関数（`handleResetNumberButtons`）が正しく動作することを確認
2. 数字ボタンが選択されていない場合、リセットボタンが無効化されることを確認
3. 数字ボタンが選択されている場合、リセットボタンが有効化されることを確認

### 統合テスト

1. 数字ボタンを選択した後、リセットボタンをクリックすると選択がクリアされることを確認
2. リセットボタンをクリックした後、数字ボタンの表示が正しく更新されることを確認

### ユーザーテスト

1. リセットボタンの視認性と理解しやすさを確認
2. ボタンのホバー効果とクリック効果が適切に表示されることを確認
3. モバイルデバイスでの操作性を確認

## UI/UX Design

### リセットボタンのデザイン

1. **サイズ**: 数字ボタンと同じサイズ（w-10 h-10）
2. **形状**: 数字ボタンと同じ円形（rounded-full）
3. **色**:
   - 有効時: 赤色（bg-red-500）、ホバー時は濃い赤色（hover:bg-red-600）
   - 無効時: 薄いグレー（bg-gray-200）、テキストは暗いグレー（text-gray-400）
4. **アイコン**: ×（バツ）アイコンを使用
5. **ツールチップ**: 「選択をクリア」というテキストを表示

### アニメーション

1. 色の変化にはトランジション効果を適用（transition-all duration-200）
2. クリック時には軽微な押し込み効果を表示

### アクセシビリティ

1. ボタンには適切な`title`属性を設定
2. 無効状態の場合は`disabled`属性を設定
3. アイコンには適切なaria属性を設定
