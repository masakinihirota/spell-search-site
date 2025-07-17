import React, { useState, useEffect, useCallback } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  debounceTime?: number;
}

/**
 * 検索ボックスコンポーネント
 *
 * ユーザーが入力した検索クエリをデバウンスして親コンポーネントに通知します。
 *
 * @param onSearch 検索クエリが変更された時に呼び出されるコールバック関数
 * @param placeholder プレースホルダーテキスト
 * @param initialValue 初期値
 * @param debounceTime デバウンス時間（ミリ秒）
 */
const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder = 'スペルを検索...',
  initialValue = '',
  debounceTime = 300
}) => {
  // 入力値の状態
  const [inputValue, setInputValue] = useState(initialValue);

  // デバウンス処理を行う関数
  const debouncedSearch = useCallback(
    (value: string) => {
      const handler = setTimeout(() => {
        onSearch(value);
      }, debounceTime);

      // クリーンアップ関数を返す
      return () => {
        clearTimeout(handler);
      };
    },
    [onSearch, debounceTime]
  );

  // 入力値が変更されたときにデバウンス処理を実行
  useEffect(() => {
    const cleanup = debouncedSearch(inputValue);
    return cleanup;
  }, [inputValue, debouncedSearch]);

  // 入力値の変更ハンドラ
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // フォームの送信ハンドラ（デフォルトの送信動作を防止）
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search-box"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          aria-label="検索ボックス"
          autoComplete="off"
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          検索
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
