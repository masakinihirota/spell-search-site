import React, { useState, useEffect } from 'react';
import SearchBox from '@/components/Header/SearchBox';
import useSearchBox from '@/hooks/useSearchBox';
import { SpellCast } from '@/types';
import { searchSpells } from '@/lib/searchUtils';

/**
 * 検索ボックスの使用例を示すコンポーネント
 */
const SearchExample: React.FC = () => {
  // スペルデータの状態
  const [spells, setSpells] = useState<SpellCast[]>([]);
  // 検索結果の状態
  const [searchResults, setSearchResults] = useState<SpellCast[]>([]);
  // ローディング状態
  const [loading, setLoading] = useState(true);

  // カスタムフックを使用して検索機能を実装
  const {
    query,
    setQuery,
    debouncedQuery,
    isSearching,
    searchHistory
  } = useSearchBox({
    debounceTime: 300,
    onSearch: (q) => {
      // 検索結果を更新
      const results = searchSpells(spells, q);
      setSearchResults(results);
    }
  });

  // スペルデータの取得
  useEffect(() => {
    const fetchSpells = async () => {
      try {
        setLoading(true);
        // APIからデータを取得
        const response = await fetch('/api/spells');
        const data = await response.json();

        if (data.spells) {
          setSpells(data.spells);
          setSearchResults(data.spells);
        }
      } catch (error) {
        console.error('スペルデータの取得に失敗しました', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpells();
  }, []);

  // 検索ボックスの変更ハンドラ
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">検索ボックスの使用例</h1>

      {/* 検索ボックスコンポーネント */}
      <SearchBox
        onSearch={handleSearch}
        initialValue={query}
        placeholder="呪文名、必要な歌の段、効果などで検索..."
        debounceTime={300}
        showHint={true}
        className="mb-6"
      />

      {/* 検索状態の表示 */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          現在の検索クエリ: <span className="font-medium">{query}</span>
        </p>
        <p className="text-sm text-gray-600">
          デバウンス後のクエリ: <span className="font-medium">{debouncedQuery}</span>
        </p>
        <p className="text-sm text-gray-600">
          検索状態: <span className="font-medium">{isSearching ? '検索中...' : '検索完了'}</span>
        </p>
      </div>

      {/* 検索履歴の表示 */}
      {searchHistory.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">検索履歴</h2>
          <ul className="list-disc pl-5">
            {searchHistory.map((item, index) => (
              <li key={index} className="mb-1">
                <button
                  onClick={() => handleSearch(item)}
                  className="text-blue-600 hover:underline"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 検索結果の表示 */}
      <div>
        <h2 className="text-lg font-semibold mb-2">検索結果 ({searchResults.length}件)</h2>

        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {searchResults.slice(0, 10).map((spell) => (
              <li key={spell.id} className="py-3">
                <div className="font-medium">{spell.name}</div>
                <div className="text-sm text-gray-600">必要な歌の段: {spell.requiredSong}</div>
                <div className="text-sm text-gray-600">効果: {spell.effect}</div>
              </li>
            ))}
            {searchResults.length > 10 && (
              <li className="py-3 text-center text-gray-500">
                他 {searchResults.length - 10} 件の結果があります
              </li>
            )}
            {searchResults.length === 0 && (
              <li className="py-3 text-center text-gray-500">
                検索結果がありません
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchExample;
