# 設計書：呪文名カタカナハイライト機能

## 概要

スペルトナエルの呪文検索サイトにおいて、ユーザーが呪文を選択した際に、その呪文名に含まれるカタカナ文字をスペルボード上でハイライト表示する機能を実装します。現在の実装では行と列をハイライトしていますが、新しい実装では呪文名の実際のカタカナ文字そのものをハイライトします。

## アーキテクチャ

現在のアプリケーションは React と Next.js を使用した SPA（Single Page Application）として構築されています。この構造を維持しながら、以下のコンポーネントを修正します：

1. **KanaBoard コンポーネント**：スペルボードの表示を担当するコンポーネント
2. **useSpellBoard フック**：スペルボードの状態管理を行うカスタムフック
3. **Home コンポーネント**：メインページのコンポーネント

## コンポーネントとインターフェース

### 1. KanaBoard コンポーネント

現在の KanaBoard コンポーネントは行と列のハイライトを受け取りますが、新しい実装では特定のセル（カタカナ文字）をハイライトするための機能を追加します。

```typescript
interface KanaBoardProps {
  highlightedRows?: number[];
  highlightedColumns?: number[];
  highlightedCells?: Array<{rowId: number, columnIndex: number}>; // 新しいプロパティ
  onCellClick?: (rowId: number, columnIndex: number) => void;
}
```

### 2. useSpellBoard フック

スペルボードの状態管理を行うカスタムフックを拡張して、呪文名からハイライトするセルを特定する機能を追加します。

```typescript
interface UseSpellBoardReturn {
  selectedSpell: SpellCast | null;
  highlightedRows: number[];
  highlightedColumns: number[];
  highlightedCells: Array<{rowId: number, columnIndex: number}>; // 新しいプロパティ
  handleSpellSelect: (spell: SpellCast) => void;
  handleClearSelection: () => void;
  handleCellSelect: (rowId: number, columnIndex: number) => void;
}
```

### 3. Home コンポーネント

メインページのコンポーネントで、選択された呪文に基づいてハイライトするセルを特定し、KanaBoard コンポーネントに渡します。

## データモデル

既存のデータモデルを活用します。特に以下のデータ構造が重要です：

1. **SpellData**：呪文のデータを表す型
2. **KanaBoard**：カナボードの構造を表す型

新たに追加するデータ型：

```typescript
// ハイライトするセルの位置を表す型
interface HighlightedCell {
  rowId: number;
  columnIndex: number;
}
```

## 実装詳細

### 1. 呪文名からハイライトするセルを特定する関数

呪文名に含まれるカタカナ文字をスペルボード上で特定するための関数を実装します。

```typescript
/**
 * 呪文名からハイライトするセルを特定する関数
 * @param spellName 呪文名
 * @param kanaBoard カナボードのデータ
 * @returns ハイライトするセルの配列
 */
function getHighlightedCellsFromSpellName(
  spellName: string,
  kanaBoard: KanaBoard
): HighlightedCell[] {
  const highlightedCells: HighlightedCell[] = [];

  // 呪文名の各文字について
  for (const char of spellName) {
    // カナボードの各行をチェック
    for (let rowIndex = 0; rowIndex < kanaBoard.rows.length; rowIndex++) {
      const row = kanaBoard.rows[rowIndex];

      // 行内の各列をチェック
      for (let colIndex = 0; colIndex < row.characters.length; colIndex++) {
        if (row.characters[colIndex] === char) {
          // 一致する文字が見つかった場合、セルの位置を記録
          highlightedCells.push({
            rowId: row.id,
            columnIndex: colIndex
          });
        }
      }
    }
  }

  return highlightedCells;
}
```

### 2. useSpellBoard フックの拡張

useSpellBoard フックを拡張して、呪文選択時にハイライトするセルを特定する機能を追加します。

```typescript
export function useSpellBoard(initialSpells: SpellCast[] = []) {
  // 既存の状態
  const [selectedSpell, setSelectedSpell] = useState<SpellCast | null>(null);
  const [highlightedRows, setHighlightedRows] = useState<number[]>([]);
  const [highlightedColumns, setHighlightedColumns] = useState<number[]>([]);

  // 新しい状態：ハイライトするセル
  const [highlightedCells, setHighlightedCells] = useState<HighlightedCell[]>([]);

  // スペル選択処理
  const handleSpellSelect = useCallback((spell: SpellCast) => {
    setSelectedSpell(spell);

    // 呪文名からハイライトするセルを特定
    const cells = getHighlightedCellsFromSpellName(spell.名前, kanaBoard);
    setHighlightedCells(cells);

    // 横方向のみのハイライト（行のみ）
    const rowIds = [...new Set(cells.map(cell => cell.rowId))];
    setHighlightedRows(rowIds);

    // 縦方向のハイライトは行わない
    setHighlightedColumns([]);
  }, []);

  // 選択解除処理
  const handleClearSelection = useCallback(() => {
    setSelectedSpell(null);
    setHighlightedRows([]);
    setHighlightedColumns([]);
    setHighlightedCells([]);
  }, []);

  // セル選択処理（既存の実装を維持）
  const handleCellSelect = useCallback((rowId: number, columnIndex: number) => {
    // 既存の実装
  }, [initialSpells]);

  return {
    selectedSpell,
    highlightedRows,
    highlightedColumns,
    highlightedCells,
    handleSpellSelect,
    handleClearSelection,
    handleCellSelect
  };
}
```

### 3. KanaBoard コンポーネントの拡張

KanaBoard コンポーネントを拡張して、特定のセルをハイライトする機能を追加します。

```tsx
const KanaBoard: React.FC<KanaBoardProps> = ({
  highlightedRows = [],
  highlightedColumns = [],
  highlightedCells = [],
  onCellClick
}) => {
  // セルがハイライトされているかどうかを判定する関数
  const isCellHighlighted = (rowId: number, columnIndex: number): boolean => {
    return highlightedCells.some(
      cell => cell.rowId === rowId && cell.columnIndex === columnIndex
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          {/* 既存のヘッダー部分 */}
        </thead>
        <tbody>
          {kanaBoard.rows.map((row) => (
            <tr
              key={row.id}
              className={`${
                highlightedRows.includes(row.id) ? 'bg-yellow-100' : ''
              }`}
            >
              <td className="py-2 px-3 border-b border-r border-gray-300 font-bold text-center">
                {row.id}
              </td>
              {row.characters.map((char, columnIndex) => (
                <td
                  key={columnIndex}
                  className={`py-2 px-3 border-b border-r border-gray-300 text-center cursor-pointer ${
                    isCellHighlighted(row.id, columnIndex)
                      ? 'bg-yellow-300 font-bold' // 呪文名の文字をハイライト
                      : highlightedRows.includes(row.id)
                      ? 'bg-yellow-100'
                      : highlightedColumns.includes(columnIndex)
                      ? 'bg-yellow-50'
                      : ''
                  }`}
                  onClick={() => onCellClick && onCellClick(row.id, columnIndex)}
                >
                  {char}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

### 4. Home コンポーネントの修正

Home コンポーネントを修正して、新しいハイライト機能を使用します。

```tsx
export default function Home() {
  // 既存の状態と関数

  // スペルボードのカスタムフックを使用
  const {
    highlightedRows,
    highlightedColumns,
    highlightedCells,
    handleCellSelect
  } = useSpellBoard(spells);

  // スペルハイライト処理
  const handleSpellHighlight = useCallback((spell: SpellData) => {
    setHighlightedSpell(spell);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 既存のコンポーネント */}

      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">スペルボード</h2>
        <KanaBoard
          highlightedRows={highlightedRows}
          highlightedColumns={highlightedColumns}
          highlightedCells={highlightedCells}
          onCellClick={handleCellSelect}
        />
      </div>
    </main>
  );
}
```

## エラーハンドリング

1. **文字が見つからない場合**：呪文名に含まれるカタカナ文字がスペルボード上に見つからない場合は、そのカタカナ文字をスキップします。
2. **重複文字の処理**：呪文名に同じカタカナ文字が複数回出現する場合は、それらすべての出現箇所を同じ色でハイライト表示します。

## テスト戦略

1. **単体テスト**：
   - `getHighlightedCellsFromSpellName` 関数のテスト
   - `useSpellBoard` フックのテスト

2. **統合テスト**：
   - 呪文選択時のハイライト表示のテスト
   - 複数の呪文を連続して選択した場合のテスト

3. **ユーザーテスト**：
   - 実際のユーザーが呪文を選択した際に、正しくハイライト表示されるかを確認

## パフォーマンス考慮事項

1. **メモ化**：
   - `getHighlightedCellsFromSpellName` 関数の結果をメモ化して、同じ呪文名に対する計算を繰り返し行わないようにします。
   - `useCallback` と `useMemo` を適切に使用して、不要な再レンダリングを防ぎます。

2. **効率的な実装**：
   - 呪文名の文字とカナボードの文字のマッピングをキャッシュして、検索を高速化します。

## まとめ

この設計では、呪文名に含まれるカタカナ文字をスペルボード上でハイライト表示する機能を実装します。既存のコンポーネント構造とフックを活用しながら、新しいハイライト機能を追加します。これにより、ユーザーは呪文の構成要素を視覚的に理解しやすくなります。
