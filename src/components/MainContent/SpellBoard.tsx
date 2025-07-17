import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SpellData } from '@/types';

interface SpellBoardProps {
  spells: SpellData[];
  selectedSpellId: string | null;
  onSpellSelect: (spell: SpellData) => void;
  favoriteSpells?: SpellData[];
  onToggleFavorite?: (spell: SpellData) => void;
}

/**
 * スペルボードコンポーネント
 * スペルトナエルのリストを表形式で表示（無限スクロール対応）
 */
const SpellBoard: React.FC<SpellBoardProps> = ({ spells, selectedSpellId, onSpellSelect, favoriteSpells = [], onToggleFavorite }) => {
  // 表示するアイテム数の状態
  const [visibleItemCount, setVisibleItemCount] = useState(20);
  // 表示するスペルのリスト
  const [visibleSpells, setVisibleSpells] = useState<SpellData[]>([]);
  // スクロール検出用の参照
  const loaderRef = useRef<HTMLDivElement>(null);

  // スペルリストが変更されたら表示するスペルを更新
  useEffect(() => {
    setVisibleSpells(spells.slice(0, visibleItemCount));
  }, [spells, visibleItemCount]);

  // Intersection Observerを使用してスクロール位置を検出
  useEffect(() => {
    const options = {
      root: null, // ビューポートをルートとして使用
      rootMargin: '0px',
      threshold: 0.1, // 10%が見えたらコールバックを実行
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleItemCount < spells.length) {
        // 表示アイテム数を増やす（次の20件を読み込む）
        setVisibleItemCount(prev => Math.min(prev + 20, spells.length));
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [visibleItemCount, spells.length]);

  if (!spells || spells.length === 0) {
    return <div className="text-center py-8">スペルが見つかりません</div>;
  }

  return (
    <div className="shadow-md rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200 text-gray-700 sticky top-0">
            <tr>
              <th className="py-3 px-2 sm:px-4 border-b border-gray-300 text-center w-10 sm:w-12">購入</th>
              <th className="py-3 px-2 sm:px-4 border-b border-gray-300 text-left">必要な歌の段</th>
              <th className="py-3 px-2 sm:px-4 border-b border-gray-300 text-left">唱える段の順番</th>
              <th className="py-3 px-2 sm:px-4 border-b border-gray-300 text-left">名前</th>
              <th className="py-3 px-2 sm:px-4 border-b border-gray-300 text-left hidden sm:table-cell">カテゴリ</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {visibleSpells.map((spell) => (
              <tr
                key={spell.id}
                className={`border-b border-gray-300 hover:bg-blue-50 ${
                  selectedSpellId === spell.id ? 'bg-blue-100' : ''
                }`}
              >
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-center" onClick={(e) => {
                  e.stopPropagation();
                  if (onToggleFavorite) onToggleFavorite(spell);
                }}>
                  <input
                    type="checkbox"
                    className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer accent-blue-500"
                    checked={favoriteSpells?.some(fav => fav.id === spell.id) || false}
                    onChange={() => {}} // React requires onChange handler for controlled components
                  />
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 cursor-pointer text-sm sm:text-base" onClick={() => onSpellSelect(spell)}>{spell.必要な歌の段}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 cursor-pointer text-sm sm:text-base" onClick={() => onSpellSelect(spell)}>{spell.唱える段の順番}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium cursor-pointer text-sm sm:text-base" onClick={() => onSpellSelect(spell)}>{spell.名前}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 cursor-pointer hidden sm:table-cell text-sm sm:text-base" onClick={() => onSpellSelect(spell)}>{spell.カテゴリ}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* スクロール検出用の要素 */}
      {visibleItemCount < spells.length && (
        <div ref={loaderRef} className="py-4 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">さらに読み込み中...</p>
        </div>
      )}
    </div>
  );
};

export default SpellBoard;
