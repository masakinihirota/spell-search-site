import React from 'react';
import { SpellCast } from '@/types';

interface SearchResultsProps {
  results: SpellCast[];
  onSpellSelect: (spell: SpellCast) => void;
  isLoading: boolean;
  searchQuery: string;
}

/**
 * 検索結果表示コンポーネント
 * 検索結果のスペルリストを表示する
 */
const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onSpellSelect,
  isLoading,
  searchQuery
}) => {
  // 検索結果が空の場合
  if (!isLoading && results.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-lg text-gray-600">
          {searchQuery
            ? `"${searchQuery}" に一致する呪文は見つかりませんでした`
            : '呪文が登録されていません'}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          別のキーワードで検索してみてください
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-lg text-gray-600">検索中...</p>
        </div>
      ) : (
        <div>
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold">
              検索結果: <span className="text-blue-600">{results.length}</span> 件
            </h2>
          </div>

          <ul className="divide-y divide-gray-200">
            {results.map((spell) => (
              <li
                key={spell.id}
                className="hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => onSpellSelect(spell)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{spell.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">{spell.effect}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                        {spell.category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span className="mr-4">
                      <span className="font-medium">必要な歌の段:</span> {spell.requiredSong}
                    </span>
                    <span>
                      <span className="font-medium">唱える段の順番:</span> {spell.castOrder}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {spell.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
