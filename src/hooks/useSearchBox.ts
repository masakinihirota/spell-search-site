import { useState, useCallback, useRef, useEffect } from 'react';

interface UseSearchBoxProps {
  initialQuery?: string;
  debounceTime?: number;
  onSearch?: (query: string) => void;
}

interface UseSearchBoxResult {
  query: string;
  setQuery: (query: string) => void;
  debouncedQuery: string;
  isSearching: boolean;
  searchHistory: string[];
  clearQuery: () => void;
  saveToHistory: (query: string) => void;
}

/**
 * 検索ボックスの状態と機能を管理するカスタムフック
 *
 * 要件: 1.1, 1.3, 4.3
 * - リアルタイムで検索結果を更新
 * - 入力に応じて即座に検索結果を絞り込む
 * - 検索入力の遅延処理（デバウンス）を実装
 *
 * @param initialQuery 初期検索クエリ
 * @param debounceTime デバウンス時間（ミリ秒）
 * @param onSearch 検索実行時のコールバック関数
 * @returns 検索ボックスの状態と機能
 */
const useSearchBox = ({
  initialQuery = '',
  debounceTime = 300,
  onSearch
}: UseSearchBoxProps = {}): UseSearchBoxResult => {
  // 検索クエリの状態
  const [query, setQuery] = useState(initialQuery);
  // デバウンス後のクエリ
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  // 検索中の状態
  const [isSearching, setIsSearching] = useState(false);
  // 検索履歴
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  // デバウンスタイマーへの参照
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // コンポーネントマウント時に検索履歴を読み込む
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('spellSearchHistory');
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory).slice(0, 5));
      }
    } catch (error) {
      console.error('検索履歴の読み込みに失敗しました', error);
    }
  }, []);

  // 検索クエリの変更をデバウンスして処理する
  useEffect(() => {
    // 既存のタイマーをクリア
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 検索クエリが空の場合は即時実行
    if (query === '') {
      setDebouncedQuery('');
      setIsSearching(false);
      if (onSearch) onSearch('');
      return;
    }

    setIsSearching(true);

    // デバウンスタイマーを設定
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
      if (onSearch) onSearch(query);
    }, debounceTime);

    // クリーンアップ関数
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, debounceTime, onSearch]);

  // 検索クエリをクリアする関数
  const clearQuery = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
    if (onSearch) onSearch('');
  }, [onSearch]);

  // 検索履歴を保存する関数
  const saveToHistory = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setSearchHistory(prevHistory => {
      // 重複を除去して先頭に追加
      const newHistory = [
        searchQuery,
        ...prevHistory.filter(item => item !== searchQuery)
      ].slice(0, 5);

      try {
        localStorage.setItem('spellSearchHistory', JSON.stringify(newHistory));
      } catch (error) {
        console.error('検索履歴の保存に失敗しました', error);
      }

      return newHistory;
    });
  }, []);

  return {
    query,
    setQuery,
    debouncedQuery,
    isSearching,
    searchHistory,
    clearQuery,
    saveToHistory
  };
};

export default useSearchBox;
