'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import SearchContainer from '@/components/search/SearchContainer';
import SearchResults from '@/components/search/SearchResults';
import KanaBoard from '@/components/MainContent/KanaBoard';
import { useSpellBoard } from '@/hooks/useSpellBoard';
import { SpellData } from '@/types';

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
  // 数字ボタンの状態を管理（1-8のボタンがONかOFFか）
  const [activeNumberButtons, setActiveNumberButtons] = useState<number[]>([]);

  // 数字ボタンのトグル処理
  const toggleNumberButton = useCallback((num: number) => {
    setActiveNumberButtons(prev =>
      prev.includes(num)
        ? prev.filter(n => n !== num)
        : [...prev, num]
    );
  }, []);

  // リセットボタンのクリックハンドラー
  const handleResetNumberButtons = useCallback(() => {
    setActiveNumberButtons([]);
  }, []);

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
          setFilteredSpells(data.spells);
        }
      } catch (error) {
        console.error('スペルデータの取得に失敗しました', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpells();
  }, []);

  // 検索結果の更新処理
  const handleSearchResults = useCallback((results: SpellData[]) => {
    setFilteredSpells(results);
  }, []);

  // スペルハイライト処理（ボードに表示するだけ）
  const handleSpellHighlight = useCallback((spell: SpellData) => {
    setHighlightedSpell(spell);
  }, []);

  // お気に入りトグル処理
  const handleToggleFavorite = useCallback((spell: SpellData) => {
    setFavoriteSpells(prev => {
      // すでにお気に入りに追加されている場合は削除
      if (prev.some(fav => fav.id === spell.id)) {
        return prev.filter(fav => fav.id !== spell.id);
      }

      // お気に入りの上限（20個）を確認
      if (prev.length >= 20) {
        if (window.confirm('お気に入りは最大20個までです。最も古いお気に入りを削除して追加しますか？')) {
          // 最も古いお気に入りを削除して新しいお気に入りを追加
          return [...prev.slice(1), spell];
        } else {
          return prev;
        }
      }

      // お気に入りに追加
      return [...prev, spell];
    });
  }, []);

  // スペルボードのカスタムフックを使用
  const {
    highlightedRows,
    highlightedColumns,
    handleCellSelect
  } = useSpellBoard(spells);

  return (
    <main className="min-h-screen bg-gray-50">
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
            {/* 購入した魔法のリスト */}
            {favoriteSpells.length > 0 && (
              <div className="mb-8 max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">購入した魔法</h2>
                    <button
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm font-medium transition-colors"
                      onClick={() => setFavoriteSpells([])}
                    >
                      リセット
                    </button>
                  </div>
                  <div className="space-y-2">
                    {favoriteSpells.map((spell) => (
                      <div
                        key={spell.id}
                        className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg"
                        onMouseEnter={() => handleSpellHighlight(spell)}
                      >
                        <div className="flex items-center">
                          <span className="font-medium text-green-800">{spell.名前}</span>
                          <span className="ml-2 text-sm text-gray-600">
                            {spell.必要な歌の段} {spell.唱える段の順番}
                          </span>
                        </div>
                        <button
                          className="text-red-500 hover:text-red-700 px-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorite(spell);
                          }}
                        >
                          削除
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {/* 数字ボタン (1-8) - 呪文の所持状態を表す */}
                <div className="mb-4">
                  <div className="text-center mb-2 text-sm font-medium text-gray-700">呪文の所持状態</div>
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: 8 }, (_, i) => i + 1).map(num => (
                      <button
                        key={num}
                        className={`w-10 h-10 rounded-full font-bold ${
                          activeNumberButtons.includes(num)
                            ? 'bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-2 shadow-lg transform scale-110'
                            : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                        } transition-all duration-200`}
                        onClick={() => toggleNumberButton(num)}
                      >
                        {num}
                      </button>
                    ))}

                    {/* リセットボタン */}
                    <button
                      className={`w-10 h-10 rounded-full font-bold flex items-center justify-center ${
                        activeNumberButtons.length > 0
                          ? 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 active:transform active:scale-95 shadow-md hover:shadow-lg'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      } transition-all duration-200 ease-in-out`}
                      onClick={handleResetNumberButtons}
                      disabled={activeNumberButtons.length === 0}
                      title="選択をクリア"
                      aria-label="選択した数字をすべてリセット"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-center mt-2 text-xs text-gray-500">
                    {activeNumberButtons.length > 0
                      ? `所持中: ${activeNumberButtons.sort((a, b) => a - b).join(', ')}`
                      : '数字をクリックして所持状態を切り替えてください'}
                  </div>
                </div>

                <SearchResults
                  results={filteredSpells}
                  onSpellSelect={handleSpellHighlight}
                  onSpellPurchase={handleToggleFavorite}
                  purchasedSpells={favoriteSpells}
                  isLoading={loading}
                />
              </div>

              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-bold mb-4">スペルボード</h2>
                <KanaBoard
                  highlightedRows={highlightedSpell ? highlightedSpell.必要な歌の段.split('').map(Number) : highlightedRows}
                  highlightedColumns={highlightedSpell ? highlightedSpell.唱える段の順番.split('').map(Number).map(n => n - 1) : highlightedColumns}
                  onCellClick={handleCellSelect}
                />
                <div className="mt-4 text-sm text-gray-600">
                  <p>※ セルをクリックすると、その行/列を使用する呪文が表示されます</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
