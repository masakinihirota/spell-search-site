import React, { useMemo } from 'react';
import { KanaBoard as KanaBoardType, HighlightedCell } from '@/types';
import { kanaBoard } from '@/data/kanaBoard';

interface KanaBoardProps {
  highlightedRows?: number[];
  highlightedColumns?: number[];
  highlightedCells?: Array<{rowId: number, columnIndex: number}>; // 呪文名の文字に対応するセルをハイライトするためのプロパティ
  onCellClick?: (rowId: number, columnIndex: number) => void;
}

/**
 * カナボードコンポーネント
 * スペルトナエルの呪文ボードを表示する
 */
const KanaBoard: React.FC<KanaBoardProps> = ({
  highlightedRows = [],
  highlightedColumns = [],
  highlightedCells = [],
  onCellClick
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
  const tableHeader = useMemo(() => (
    <thead>
      <tr className="bg-gray-100">
        <th className="py-2 px-3 border-b border-r border-gray-300 text-center">行</th>
        {Array.from({ length: 10 }, (_, i) => (
          <th key={i} className="py-2 px-3 border-b border-r border-gray-300 text-center">
            {i + 1}
          </th>
        ))}
      </tr>
    </thead>
  ), []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white">
        {tableHeader}
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
                      : highlightedRows.includes(row.id) && highlightedColumns.includes(columnIndex)
                      ? 'bg-yellow-300 font-bold'
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

// メモ化したコンポーネントをエクスポート
export default React.memo(KanaBoard);
