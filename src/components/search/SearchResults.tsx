import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SpellData } from '@/types';
import SongMatchingDisplay from '../spellDetail/SongMatchingDisplay';

interface SearchResultsProps {
  spells: SpellData[];
  onSpellSelect: (spell: SpellData) => void;
  onToggleFavorite: (spell: SpellData) => void;
  favoriteSpells?: SpellData[];
  isLoading?: boolean;
  possessedSong: string;
  isDarkMode: boolean; // isDarkMode を props として追加
}

const SearchResults: React.FC<SearchResultsProps> = ({
  spells,
  onSpellSelect,
  onToggleFavorite,
  favoriteSpells = [],
  isLoading = false,
  possessedSong,
  isDarkMode, // isDarkMode を受け取る
}) => {
  // SpellBoard からコピーする状態と参照
  const [visibleItemCount, setVisibleItemCount] = useState(20);
  const [visibleSpells, setVisibleSpells] = useState<SpellData[]>([]);
  const loaderRef = useRef<HTMLDivElement>(null);

  // SpellBoard からコピーする useEffect
  useEffect(() => {
    setVisibleSpells(spells.slice(0, visibleItemCount));
  }, [spells, visibleItemCount]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleItemCount < spells.length) {
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

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">検索結果を読み込み中...</p>
      </div>
    );
  }

  if (spells.length === 0) { // results を spells に変更
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">検索条件に一致する呪文が見つかりませんでした。</p>
      </div>
    );
  }

  const isPurchased = (spell: SpellData): boolean => {
    return favoriteSpells.some(fav => fav.id === spell.id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4"> {/* gap-4 を gap-2 に変更 */}
      {visibleSpells.map((spell) => {
        const purchased = isPurchased(spell);
        return (
          <div
            key={spell.id}
            className={`relative max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-200 ease-in-out
              ${purchased ? 'border-2 border-blue-500 ring-2 ring-blue-300' : 'hover:shadow-lg'}
            `}
            onClick={() => {
              onToggleFavorite(spell);
            }}
            onMouseEnter={() => onSpellSelect(spell)}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{spell.名前}</h3> {/* text-lg を text-xl に変更 */}
            <p className="text-base text-gray-700 dark:text-gray-300 mb-1"> {/* text-sm を text-base に変更 */}
              <span className="font-medium">必要な歌の段:</span> {spell.必要な歌の段}
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300 mb-1"> {/* text-sm を text-base に変更 */}
              <span className="font-medium">唱える段の順番:</span> {spell.唱える段の順番}
            </p>
            {purchased && (
              <div className="absolute top-2 right-2 text-blue-600 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            <div className="absolute bottom-2 right-2">
              <SongMatchingDisplay spell={spell} possessedSong={possessedSong} isDarkMode={isDarkMode} />
            </div>
          </div>
        );
      })}

      {/* スクロール検出用の要素 */}
      {visibleItemCount < spells.length && (
        <div ref={loaderRef} className="col-span-full py-4 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">さらに読み込み中...</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
