import React from 'react';
import { SpellData } from '@/types';

interface SearchResultsProps {
  results: SpellData[];
  onSpellSelect: (spell: SpellData) => void;
  onSpellPurchase: (spell: SpellData) => void;
  purchasedSpells: SpellData[];
  isLoading?: boolean;
}

/**
 * 検索結果表示コンポーネント
 */
const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onSpellSelect,
  onSpellPurchase,
  purchasedSpells,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">検索結果を読み込み中...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">検索条件に一致する呪文が見つかりませんでした。</p>
      </div>
    );
  }

  // 購入済みかどうかを判定する関数
  const isPurchased = (spell: SpellData): boolean => {
    return purchasedSpells.some(p => p.id === spell.id);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">検索結果</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((spell) => {
          const purchased = isPurchased(spell);
          return (
            <div
              key={spell.id}
              className={`p-4 rounded-lg shadow cursor-pointer transition-colors duration-200 ${
                purchased ? 'bg-green-50 border border-green-200' : 'bg-white hover:bg-gray-50'
              }`}
              onMouseEnter={() => onSpellSelect(spell)}
              onClick={() => onSpellPurchase(spell)}
            >
              <div className="flex justify-between items-start">
                <h3 className={`text-lg font-semibold ${purchased ? 'text-green-800' : 'text-blue-700'}`}>
                  {spell.名前}
                </h3>
                {purchased && (
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    購入済み
                  </span>
                )}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">必要な歌の段:</span> {spell.必要な歌の段}
                </p>
                <p>
                  <span className="font-medium">唱える段の順番:</span> {spell.唱える段の順番}
                </p>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {spell.タグ?.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      purchased
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
