import React, { useState, useCallback } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

/**
 * 検索ボックスコンポーネント
 * インクリメンタル検索のための入力フィールドを提供
 */
const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // 検索クエリが変更されたときのハンドラー
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  }, [onSearch]);

  // 検索フォームの送信ハンドラー
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="スペル名や番号で検索..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="スペルトナエル検索"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label="検索"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
      </form>
    </div>
  );
};

export default SearchBox;
