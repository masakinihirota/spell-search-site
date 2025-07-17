import React from 'react';
import { KanaBoard as KanaBoardType } from '@/types';
import { kanaBoard } from '@/data/kanaBoard';

interface KanaBoardProps {
  highlightedRows?: number[];
  highlightedColumns?: number[];
  onCellClick?: (rowId: number, columnIndex: number) => void;
}

/**
 * カナボードコンポーネント
 * スペルトナエルの呪文ボードを表示する
 */
const KanaBoard: React.FC<KanaBoardProps> = ({
  highlightedRows = [],
  highlightedColumns = [],
  onCellClick
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white">
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
                    highlightedRows.includes(row.id) && highlightedColumns.includes(columnIndex)
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

export default KanaBoard;
