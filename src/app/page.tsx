'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import SearchBox from '@/components/Header/SearchBox';
import QuickAccessButtons from '@/components/Header/QuickAccessButtons';
import SpellBoard from '@/components/MainContent/SpellBoard';
import SpellDetail from '@/components/MainContent/SpellDetail';
import { SpellCast } from '@/types';

/**
 * ホームページコンポーネント
 * スペルトナエル検索サイトのメインページ
 */
export default function Home() {
  const [spells, setSpells] = useState<SpellCast[]>([]);
  const [filteredSpells, setFilteredSpells] = useState<SpellCast[]>([]);
  const [selectedSpell, setSelectedSpell] = useState<SpellCast | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteSpells, setFavoriteSpells] = useState<SpellCast[]>([]);

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

  // 検索処理
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredSpells(spells);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = spells.filter(spell =>
      spell.name.toLowerCase().includes(lowerQuery) ||
      spell.number.includes(lowerQuery) ||
      spell.effect.toLowerCase().includes(lowerQuery) ||
      spell.category.toLowerCase().includes(lowerQuery) ||
      spell.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );

    setFilteredSpells(filtered);
  }, [spells]);

  // スペル選択処理
  const handleSpellSelect = useCallback((spell: SpellCast) => {
    setSelectedSpell(spell);
  }, []);

  // 詳細表示から戻る処理
  const handleBack = useCallback(() => {
    setSelectedSpell(null);
  }, []);

  // お気に入りトグル処理
  const handleToggleFavorite = useCallback((spell: SpellCast) => {
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

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBox onSearch={handleSearch} />
          <QuickAccessButtons onButtonClick={handleSearch} favoriteSpells={favoriteSpells} />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="w-full">
            <SpellBoard
              spells={filteredSpells}
              selectedSpellId={null}
              onSpellSelect={() => {}} // 詳細表示機能を無効化
              favoriteSpells={favoriteSpells}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        )}
      </div>
    </main>
  );
}
