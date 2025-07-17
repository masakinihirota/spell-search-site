import { useState, useCallback } from 'react';
import { SpellData } from '../types';

interface UseSearchProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

interface UseSearchResult {
  query: string;
  setQuery: (query: string) => void;
  searchResults: SpellData[];
  isLoading: boolean;
  error: Error | null;
  performSearch: (searchQuery: string) => Promise<void>;
}

/**
 * 検索機能を提供するカスタムフック
 *
 * @param initialQuery 初期検索クエリ
 * @param onSearch 検索実行時のコールバック関数
 * @returns 検索状態と関数
 */
const useSearch = ({ initialQuery = '', onSearch }: UseSearchProps = {}): UseSearchResult => {
  // 検索クエリの状態
  const [query, setQuery] = useState(initialQuery);
  // 検索結果の状態
  const [searchResults, setSearchResults] = useState<SpellData[]>([]);
  // ローディング状態
  const [isLoading, setIsLoading] = useState(false);
  // エラー状態
  const [error, setError] = useState<Error | null>(null);

  /**
   * 検索を実行する関数
   *
   * @param searchQuery 検索クエリ
   */
  const performSearch = useCallback(async (searchQuery: string) => {
    // 検索クエリを更新
    setQuery(searchQuery);

    // コールバック関数があれば呼び出す
    if (onSearch) {
      onSearch(searchQuery);
    }

    try {
      setIsLoading(true);
      setError(null);

      // APIから検索結果を取得
      const response = await fetch(`/api/spells?q=${encodeURIComponent(searchQuery)}`);

      if (!response.ok) {
        throw new Error(`検索に失敗しました: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('検索中に予期せぬエラーが発生しました'));
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [onSearch]);

  return {
    query,
    setQuery,
    searchResults,
    isLoading,
    error,
    performSearch
  };
};

export default useSearch;
