import React, { useState, useEffect } from 'react';
import { KanaBoard as KanaBoardType, KanaBoardRow } from '@/types';

interface KanaBoardProps {
  selectedRowIds: number[];
  onRowSelect: (rowId: number) => void;
  highlightedCharacters?: { rowId: number; columnIndex: number }[];
}

/**
 * カナボードコンポーネント
 * 50音順のボードを表示し、行の選択と文字のハイライトを行う
 */
const KanaBoard: React.FC<KanaBoardProps> = ({
  selectedRowIds,
  onRowSelect,
  highlightedCharacters = []
}) => {
  const [board, setBoard] = useState<KanaBoardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ボードデータの取得
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/kana-board.json');
        if (!response.ok) {
          throw new Error('カナボードデータの取得に失敗しました');
        }
        const data = await response.json();
        setBoard(data);
      } catch (err) {
        setError('カナボードデータの読み込みに失敗しました');
        console.error('カナボードデータの読み込みエラー:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, []);

  // 文字がハイライトされているかチェック
  const isHighlighted = (rowId: number, columnIndex: number) => {
    return highlightedCharacters.some(
      h => h.rowId === rowId && h.columnIndex === columnIndex
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !board) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error || 'カナボードデータを読み込めませんでした'}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">50音ボード</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="px-2 py-1 border bg-gray-100 text-center">行</th>
              {Array.from({ length: 10 }, (_, i) => (
                <th key={i} className="px-2 py-1 border bg-gray-100 text-center">
                  {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {board.rows.map((row) => (
              <tr
                key={row.id}
                className={`${
                  selectedRowIds.includes(row.id) ? 'bg-blue-100' : ''
                } hover:bg-gray-50 cursor-pointer`}
                onClick={() => onRowSelect(row.id)}
              >
                <td className="px-2 py-1 border font-bold text-center">
                  {row.id}
                </td>
                {row.characters.map((char, index) => (
                  <td
                    key={index}
                    className={`px-2 py-1 border text-center ${
                      isHighlighted(row.id, index) ? 'bg-yellow-200 font-bold' : ''
                    }`}
                  >
                    {char}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KanaBoard;
