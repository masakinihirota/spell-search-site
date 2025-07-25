'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from '@/components/Header';
import SearchContainer from '@/components/search/SearchContainer';
import SearchResults from '@/components/search/SearchResults';
import KanaBoard from '@/components/MainContent/KanaBoard';
import { useSpellBoard } from '@/hooks/useSpellBoard'; // 追加
import { SpellCast, SpellData } from '@/types'; // 追加
import { getHighlightedCellsFromSpellName } from '@/lib/spellUtils'; // 追加
import { kanaBoard } from '@/data/kanaBoard'; // 追加
import { usePossessionManager } from '@/hooks/usePossession'; // 追加
import { spellMatchingCache } from '@/lib/spellMatchingCache'; // 追加
import SongMatchingDisplay, { getBackgroundColor } from '@/components/spellDetail/SongMatchingDisplay';
import { calculateSongMatching } from '@/lib/songUtils';

/**
 * ホームページコンポーネント
 * スペルトナエル検索サイトのメインページ
 */
export default function Home() {
  const [spells, setSpells] = useState<SpellData[]>([]);
  const [filteredSpells, setFilteredSpells] = useState<SpellData[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteSpells, setFavoriteSpells] = useState<SpellData[]>([]);
  const [highlightedSpell, setHighlightedSpell] = useState<SpellData | null>(null);

  // 歌の所持状態とキャッシュを管理するカスタムフック
  const { possessedSong, updatePossessedSong, isCalculating, isCacheReady } = usePossessionManager();

  // ダークモードの状態を管理
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // スペルデータの取得とキャッシュの初期化
  useEffect(() => {
    const fetchSpellsAndInitCache = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/spells');
        const data = await response.json();

        if (data.spells) {
          const spellData: SpellData[] = data.spells;

          setSpells(spellData);
          setFilteredSpells(spellData);

          // SpellData[] を SpellCast[] に変換してキャッシュを初期化
          const castDataForCache: SpellCast[] = spellData.map(d => ({
            id: d.id,
            name: d.名前 || '',
            requiredSong: d.必要な歌の段 || '',
            castOrder: d.唱える段の順番 || '',
            category: d.カテゴリ || '',
            tags: d.タグ || [],
            // その他のSpellCastプロパティはここでは不要なため省略
          }));
          await spellMatchingCache.initialize(castDataForCache);
          // 初期化後に再レンダリングをトリガーするためにダミーの更新
          updatePossessedSong('');
        }
      } catch (error) {
        console.error('スペルデータの取得に失敗しました', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpellsAndInitCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 検索結果の更新処理
  const handleSearchResults = useCallback((results: SpellData[]) => {
    setFilteredSpells(results);
  }, []);

  // スペルハイライト処理
  const handleSpellHighlight = useCallback((spell: SpellData) => {
    setHighlightedSpell(spell);
  }, []);

  // お気に入りトグル処理
  const handleToggleFavorite = useCallback((spell: SpellData) => {
    setFavoriteSpells(prev => {
      if (prev.some(fav => fav.id === spell.id)) {
        return prev.filter(fav => fav.id !== spell.id);
      }
      if (prev.length >= 20) {
        if (window.confirm('お気に入りは最大20個までです。最も古いお気に入りを削除して追加しますか？')) {
          return [...prev.slice(1), spell];
        } else {
          return prev;
        }
      }
      return [...prev, spell];
    });
  }, []);

  // 数字ボタンのトグル処理
  const toggleNumberButton = useCallback((num: number) => {
    const currentSongSet = new Set(possessedSong.split(''));
    const numStr = String(num);
    if (currentSongSet.has(numStr)) {
      currentSongSet.delete(numStr);
    } else {
      currentSongSet.add(numStr);
    }
    const newSong = Array.from(currentSongSet).sort().join('');
    updatePossessedSong(newSong);
  }, [possessedSong, updatePossessedSong]);

  // リセットボタンのクリックハンドラー
  const handleResetNumberButtons = useCallback(() => {
    updatePossessedSong('');
  }, [updatePossessedSong]);

  // スペルボードのカスタムフック
  const {
    highlightedRows,
    highlightedColumns,
    highlightedCells,
    handleCellSelect,
  } = useSpellBoard(spells);

  // 行番号クリック時のハンドラ
  const handleRowNumberClick = useCallback((rowId: number) => {
    toggleNumberButton(rowId);
  }, [toggleNumberButton]);

  const activeNumberButtons = useMemo(() => possessedSong.split('').map(Number), [possessedSong]);

  const memoizedKanaBoard = useMemo(() => {
    const spellName = highlightedSpell ? (highlightedSpell.名前) : '';
    const requiredSong = highlightedSpell ? (highlightedSpell.必要な歌の段) : '';

    return (
      <KanaBoard
        highlightedRows={highlightedSpell && requiredSong ? requiredSong.split('').map(Number) : highlightedRows}
        highlightedColumns={highlightedSpell ? [] : highlightedColumns}
        highlightedCells={highlightedSpell && spellName ? getHighlightedCellsFromSpellName(spellName, kanaBoard) : highlightedCells}
        onCellClick={handleCellSelect}
        activeNumberButtons={activeNumberButtons}
        onRowNumberClick={handleRowNumberClick}
      />
    );
  }, [highlightedSpell, highlightedRows, highlightedColumns, highlightedCells, handleCellSelect, activeNumberButtons, handleRowNumberClick]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchContainer
            spells={spells}
            onSearchResults={handleSearchResults}
            isLoading={loading}
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {favoriteSpells.length > 0 && (
              <div className="mb-8 max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">購入した魔法</h2>
                    <button
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                      onClick={() => setFavoriteSpells([])}
                    >
                      リセット
                    </button>
                  </div>
                  <div className="space-y-2">
                    {favoriteSpells.map((spell) => (
                      <div
                        key={spell.id}
                        className={`flex justify-between items-center p-3 rounded-lg transition-colors
                          ${getBackgroundColor(calculateSongMatching(spell.必要な歌の段 || '', possessedSong).matchingPercentage, isDarkMode)}
                        `}
                        onMouseEnter={() => handleSpellHighlight(spell)}
                      >
                        <div className="flex items-center">
                          <span className="font-medium text-gray-800 dark:text-gray-200">{spell.名前}</span>
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            {spell.必要な歌の段} {spell.唱える段の順番}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {isCacheReady && <SongMatchingDisplay spell={spell} possessedSong={possessedSong} isDarkMode={isDarkMode} />}
                          <button
                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFavorite(spell);
                            }}
                          >
                            削除
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-1">
                <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <div className="text-center mb-2 text-sm font-medium">呪文の所持状態 {isCalculating && <span className="text-xs text-blue-500">(更新中...)</span>}</div>
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: 8 }, (_, i) => i + 1).map(num => (
                      <button
                        key={num}
                        className={`w-10 h-10 rounded-full font-bold ${
                          activeNumberButtons.includes(num)
                            ? 'bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-2 shadow-lg transform scale-110'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600'
                        } transition-all duration-200`}
                        onClick={() => toggleNumberButton(num)}
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      className={`w-10 h-10 rounded-full font-bold flex items-center justify-center ${
                        possessedSong.length > 0
                          ? 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 active:transform active:scale-95 shadow-md hover:shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      } transition-all duration-200 ease-in-out`}
                      onClick={handleResetNumberButtons}
                      disabled={possessedSong.length === 0}
                      title="選択をクリア"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                </div>

                {isCacheReady && (
                  <SearchResults
                    spells={filteredSpells}
                    onSpellSelect={handleSpellHighlight}
                    onToggleFavorite={handleToggleFavorite}
                    favoriteSpells={favoriteSpells}
                    isLoading={loading}
                    possessedSong={possessedSong}
                    isDarkMode={isDarkMode} // isDarkMode を追加
                  />
                )}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col h-full">
                <div className="flex-grow">
                  {memoizedKanaBoard}
                </div>
                <div className="ml-auto mt-auto p-4">
                  <h2 className="text-xl font-bold mb-0">スペルボード</h2>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

