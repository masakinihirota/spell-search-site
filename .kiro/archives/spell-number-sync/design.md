# 設計書

## 概要

この設計書では、スペルトナエルの呪文検索サイトにおける所持呪文の数字（1-8）とスペルボードの行番号を同期させる機能の実装方法について詳述します。ユーザーが所持している呪文の数字とスペルボードの行番号を視覚的に同期させ、スペルボードの行番号をクリックすることで所持状態を変更できるようにします。

## アーキテクチャ

既存のアーキテクチャを拡張し、以下のコンポーネント間で状態を共有します：

1. `Home.tsx` - アプリケーションのメインコンポーネント、所持呪文の状態（`activeNumberButtons`）を管理
2. `KanaBoard.tsx` - スペルボードコンポーネント、行番号のクリックイベントを処理

## コンポーネントとインターフェース

### KanaBoardコンポーネント

KanaBoardコンポーネントの変更点：

1. 新しいプロパティの追加：
   ```typescript
   interface KanaBoardProps {
     // 既存のプロパティ
     highlightedRows?: number[];
     highlightedColumns?: number[];
     highlightedCells?: Array<{rowId: number, columnIndex: number}>;
     onCellClick?: (rowId: number, columnIndex: number) => void;

     // 新しいプロパティ
     activeNumberButtons?: number[]; // 所持している呪文の数字
     onRowNumberClick?: (rowId: number) => void; // 行番号クリック時のコールバック
   }
   ```

2. 行番号セルのクリックイベント処理の追加
3. 所持呪文に基づく行番号のスタイリング

### Homeコンポーネント

Homeコンポーネントの変更点：

1. `handleRowNumberClick` 関数の追加：
   ```typescript
   const handleRowNumberClick = useCallback((rowId: number) => {
     toggleNumberButton(rowId);
   }, [toggleNumberButton]);
   ```

2. KanaBoardコンポーネントへの新しいプロパティの受け渡し：
   ```tsx
   <KanaBoard
     // 既存のプロパティ
     highlightedRows={...}
     highlightedColumns={...}
     highlightedCells={...}
     onCellClick={...}

     // 新しいプロパティ
     activeNumberButtons={activeNumberButtons}
     onRowNumberClick={handleRowNumberClick}
   />
   ```

## データフロー

1. ユーザーが数字ボタン（1-8）をクリックすると、`toggleNumberButton` 関数が呼び出され、`activeNumberButtons` 状態が更新される
2. 更新された `activeNumberButtons` が KanaBoard コンポーネントに渡される
3. KanaBoard コンポーネントは `activeNumberButtons` に基づいて行番号のスタイリングを変更する
4. ユーザーがスペルボードの行番号をクリックすると、`onRowNumberClick` コールバックが呼び出され、`toggleNumberButton` 関数が実行される
5. `activeNumberButtons` 状態が更新され、両方の表示（数字ボタンとスペルボード行番号）が同期して更新される

## スタイリング

1. 所持している呪文の行番号のスタイリング：
   ```tsx
   <td
     className={`py-2 px-3 border-b border-r border-gray-300 font-extrabold text-center text-base sm:text-lg md:text-xl cursor-pointer
       ${highlightedRows.includes(row.id)
         ? 'bg-yellow-200 text-black ring-2 ring-yellow-400 ring-inset'
         : activeNumberButtons?.includes(row.id)
           ? 'bg-gray-100 text-gray-800 ring-2 ring-red-500 ring-inset'
           : 'bg-gray-100 text-gray-800'}`}
     onClick={() => onRowNumberClick && onRowNumberClick(row.id)}
   >
     {row.id}
   </td>
   ```

## エラーハンドリング

特別なエラーハンドリングは必要ありませんが、以下の点に注意します：

1. `activeNumberButtons` が undefined の場合のフォールバック処理
2. `onRowNumberClick` が undefined の場合のエラー防止

## テスト戦略

1. 単体テスト
   - KanaBoard コンポーネントの新しいプロパティとイベントハンドラのテスト
   - Home コンポーネントの新しい関数のテスト

2. 統合テスト
   - 数字ボタンとスペルボード行番号の同期のテスト
   - スペルボード行番号クリックによる所持状態変更のテスト
