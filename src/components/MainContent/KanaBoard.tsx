import React, { useMemo } from 'react';
import { kanaBoard } from '@/data/kanaBoard';

interface KanaBoardProps {
  highlightedRows?: number[];
  highlightedColumns?: number[];
  highlightedCells?: Array<{rowId: number, columnIndex: number}>; // 呪文名の文字に対応するセルをハイライトするためのプロパティ
  onCellClick?: (rowId: number, columnIndex: number) => void;
  activeNumberButtons?: number[]; // 所持している呪文の数字
  onRowNumberClick?: (rowId: number) => void; // 行番号クリック時のコールバック
}

/**
 * カナボードコンポーネント
 * スペルトナエルの呪文ボードを表示する
 */
const KanaBoard: React.FC<KanaBoardProps> = ({
  highlightedRows = [],
  highlightedColumns = [],
  highlightedCells = [],
  onCellClick,
  activeNumberButtons = [],
  onRowNumberClick
}) => {
  // ハイライトセルのマップをメモ化（効率的なルックアップのため）
  const highlightedCellsMap = useMemo(() => {
    const map = new Map<string, boolean>();

    highlightedCells.forEach(cell => {
      const key = `${cell.rowId}-${cell.columnIndex}`;
      map.set(key, true);
    });

    return map;
  }, [highlightedCells]);

  // セルがハイライトされているかどうかを判定する関数（最適化版）
  const isCellHighlighted = (rowId: number, columnIndex: number): boolean => {
    // 高速なルックアップのためにマップを使用
    const key = `${rowId}-${columnIndex}`;
    return highlightedCellsMap.has(key);
  };

  // ヘッダー行をメモ化
		const tableHeader = useMemo(
			() => (
				<thead>
					<tr className="bg-gray-100 dark:bg-gray-800">
						<th className="py-2 px-3 border-b border-r border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-center font-bold text-base sm:text-lg">
							行
						</th>
						{Array.from({ length: 10 }, (_, i) => (
							<th
								key={i}
								className="py-2 px-3 border-b border-r border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-center"
							>
								{i + 1}
							</th>
						))}
					</tr>
				</thead>
			),
			[],
		);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm sm:text-base">
        {tableHeader}
        <tbody>
          {kanaBoard.rows.map((row) => (
            <tr
              key={row.id}
              className={`${
                highlightedRows.includes(row.id) ? 'bg-yellow-100' : ''
              }`}
            >
              <td
                className={`py-2 px-3 border-b border-r border-gray-300 dark:border-gray-600 font-extrabold text-center text-base sm:text-lg md:text-xl cursor-pointer
                  ${highlightedRows.includes(row.id)
                    ? activeNumberButtons.includes(row.id)
                      ? 'bg-yellow-200 dark:bg-yellow-800 text-black dark:text-white kana-board-number-active' // ハイライト状態かつ所持状態
                      : 'bg-yellow-200 dark:bg-yellow-800 text-black dark:text-white ring-2 ring-yellow-400 dark:ring-yellow-300 ring-inset' // ハイライト状態のみ
                    : activeNumberButtons.includes(row.id)
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 kana-board-number-active' // 所持状態のみ
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                onClick={() => onRowNumberClick && onRowNumberClick(row.id)}
              >
                {row.id}
              </td>
              {row.characters.map((char, columnIndex) => (
                <td
                  key={columnIndex}
                  className={`py-2 px-3 border-b border-r border-gray-300 dark:border-gray-600 text-center cursor-pointer text-gray-800 dark:text-gray-200 font-medium ${
                    isCellHighlighted(row.id, columnIndex)
                      ? 'bg-yellow-300 dark:bg-yellow-700 font-bold text-black dark:text-white' // 呪文名の文字をハイライト（文字を濃く）
                      : highlightedRows.includes(row.id) && highlightedColumns.includes(columnIndex)
                      ? 'bg-yellow-300 dark:bg-yellow-700 font-bold text-black dark:text-white' // 行と列の交差点（文字を濃く）
                      : highlightedRows.includes(row.id)
                      ? 'bg-yellow-100 dark:bg-yellow-900' // 行のハイライト
                      : highlightedColumns.includes(columnIndex)
                      ? 'bg-yellow-50 dark:bg-yellow-950' // 列のハイライト
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

// メモ化したコンポーネントをエクスポート
export default React.memo(KanaBoard);
