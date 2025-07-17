import React, { useState, useEffect, useCallback, useRef } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  debounceTime?: number;
  showHint?: boolean;
  className?: string;
  showNumberButtons?: boolean;
}

/**
 * 検索ボックスコンポーネント
 * インクリメンタル検索機能を提供する
 *
 * 要件: 1.1, 1.3, 3.2, 4.3
 * - リアルタイムで検索結果を更新
 * - 入力に応じて即座に検索結果を絞り込む
 * - 検索ボックスがページの上部に目立つように配置
 * - 検索入力の遅延処理（デバウンス）を実装
 */
const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder = '呪文名、必要な歌の段、効果などで検索...',
  initialValue = '',
  debounceTime = 300,
  showHint = true,
  className = '',
  showNumberButtons = true
}) => {
  // 検索クエリの状態
  const [query, setQuery] = useState(initialValue);
  // 入力フォーカス状態
  const [isFocused, setIsFocused] = useState(false);
  // 検索履歴
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  // 選択された数字ボタン
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  // 入力フィールドへの参照
  const inputRef = useRef<HTMLInputElement>(null);
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

  // 検索クエリの変更をデバウンスして処理する
  const debouncedSearch = useCallback((value: string) => {
    // 既存のタイマーをクリア
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 検索クエリが空の場合は即時実行
    if (value === '') {
      onSearch('');
      return;
    }

    // デバウンスタイマーを設定
    timerRef.current = setTimeout(() => {
      onSearch(value);
    }, debounceTime);
  }, [onSearch, debounceTime]);

  // 検索クエリまたは選択された数字が変更されたときにデバウンス処理を実行
  useEffect(() => {
    // 選択された数字を検索クエリに追加
    let finalQuery = query;
    if (selectedNumbers.length > 0) {
      // 既存のクエリに数字を追加（重複を避ける）
      const numbersQuery = selectedNumbers.join('');
      if (!finalQuery.includes(numbersQuery)) {
        finalQuery = finalQuery.trim() ? `${finalQuery} ${numbersQuery}` : numbersQuery;
      }
    }

    debouncedSearch(finalQuery);

    // クリーンアップ関数
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, selectedNumbers, debouncedSearch]);

  // 検索クエリの変更ハンドラ
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // ひらがなをカタカナに変換（オプション）
    const value = e.target.value;
    // const convertedValue = value.replace(/[\u3041-\u3096]/g,
    //   match => String.fromCharCode(match.charCodeAt(0) + 0x60)
    // );

    setQuery(value);
  }, []);

  // 検索フォームの送信ハンドラ
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    saveToHistory(query);
  }, [query, onSearch, saveToHistory]);

  // 検索クエリのクリアハンドラ
  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [onSearch]);

  // 履歴項目選択ハンドラ
  const handleHistorySelect = useCallback((historyItem: string) => {
    setQuery(historyItem);
    onSearch(historyItem);
    setIsFocused(false);
  }, [onSearch]);

  // キーボードナビゲーション処理
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Escキーでフォーカスを外す
    if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  }, []);

  // 数字ボタンのクリックハンドラ
  const handleNumberClick = useCallback((number: number) => {
    setSelectedNumbers(prev => {
      // すでに選択されている場合は削除、そうでなければ追加
      if (prev.includes(number)) {
        return prev.filter(n => n !== number);
      } else {
        return [...prev, number];
      }
    });
  }, []);

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative mb-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            ref={inputRef}
            type="search"
            id="spell-search"
            value={query}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
            aria-label="スペル検索"
            className="w-full py-3 px-4 pl-10 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="検索をクリア"
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          <button
            type="submit"
            aria-label="検索を実行"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* 検索履歴ドロップダウン */}
      {isFocused && searchHistory.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
          <ul className="py-1">
            {searchHistory.map((item, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleHistorySelect(item)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                >
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {item}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 数字ボタン */}
      {showNumberButtons && (
        <div className="mt-3 mb-2">
          <div className="flex flex-wrap gap-2 justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
              <button
                key={number}
                type="button"
                onClick={() => handleNumberClick(number)}
                aria-label={`数字${number}でフィルター`}
                aria-pressed={selectedNumbers.includes(number)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-colors
                  ${selectedNumbers.includes(number)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {number}
              </button>
            ))}
            {selectedNumbers.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedNumbers([])}
                aria-label="数字フィルターをクリア"
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          <div className="mt-2 text-xs text-center text-gray-500">
            数字をクリックして、必要な歌の段でフィルター
          </div>
        </div>
      )}

      {/* ヒントテキスト */}
      {showHint && (
        <div className="mt-2 text-sm text-gray-500">
          <span>ヒント: 呪文名、必要な歌の段（例: "356"）、効果などで検索できます</span>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
