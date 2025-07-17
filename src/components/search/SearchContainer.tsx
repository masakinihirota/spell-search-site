import React, { useState, useEffect } from 'react';
import { SpellData } from '@/types';
import SearchBox from './SearchBox';
import TagFilterButtons from './TagFilterButtons';
import QuickAccessButtons from './QuickAccessButtons';

interface SearchContainerProps {
  spells: SpellData[];
  onSearchResults: (results: SpellData[]) => void;
  isLoading?: boolean;
}

/**
 * 検索コンテナコンポーネント
 * 検索ボックスとタグフィルターを統合し、検索結果を親コンポーネントに通知する
 */
const SearchContainer: React.FC<SearchContainerProps> = ({
  spells,
  onSearchResults,
  isLoading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedMagicType, setSelectedMagicType] = useState<string | null>(null);
  const [selectedEffectTag, setSelectedEffectTag] = useState<string | null>(null);
  const [selectedQuickCategory, setSelectedQuickCategory] = useState<string | null>(null);
  const [filteredSpells, setFilteredSpells] = useState<SpellData[]>(spells || []);

  // カテゴリマッピング（クイックアクセスカテゴリと実際のカテゴリの対応）
  const categoryMapping: Record<string, string[]> = {
    'attack': ['攻撃魔法', '弱点魔法', '雷攻撃魔法', '炎攻撃魔法', '氷攻撃魔法', '風攻撃魔法', '重力攻撃魔法', '特殊攻撃魔法'],
    'heal': ['体力上昇魔法'],
    'buff': ['攻撃力上昇魔法', '防御力上昇魔法', '移動速度上昇魔法', 'ボーナス上昇魔法', '強化魔法'],
    'debuff': ['能力値変更', '割合体力減少魔法', '割合攻撃力減少魔法', '毒魔法'],
    'summon': ['動物召喚魔法', '精霊召喚魔法'],
    'utility': ['特殊能力上昇魔法', '時間操作魔法', '一文字魔法', 'ギャンブル魔法', '特殊魔法'],
  };

  // 検索クエリとタグフィルターに基づいて呪文をフィルタリング
  useEffect(() => {
    if (!spells) return;

    let results = [...spells];

    // テキスト検索でフィルタリング
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(spell => {
        return (
          spell.名前.toLowerCase().includes(query) ||
          spell.必要な歌の段.includes(query) ||
          spell.唱える段の順番.includes(query) ||
          (spell.説明 && spell.説明.toLowerCase().includes(query))
        );
      });
    }

    // 魔法の種類でフィルタリング
    if (selectedMagicType) {
      results = results.filter(spell =>
        spell.カテゴリ === selectedMagicType ||
        (spell.カテゴリ && spell.カテゴリ.includes(selectedMagicType))
      );
    }

    // クイックアクセスカテゴリでフィルタリング
    if (selectedQuickCategory && categoryMapping[selectedQuickCategory]) {
      const categories = categoryMapping[selectedQuickCategory];
      results = results.filter(spell => {
        return categories.some(category =>
          spell.カテゴリ === category ||
          (spell.カテゴリ && spell.カテゴリ.includes(category))
        );
      });
    }

    // 効果タグでフィルタリング
    if (selectedEffectTag) {
      results = results.filter(spell => {
        // 特定のタグに対する特別な処理
        if (selectedEffectTag === 'ダメージ' && spell.カテゴリ && spell.カテゴリ.includes('攻撃')) {
          return true;
        }
        if (selectedEffectTag === '回復' && spell.カテゴリ && spell.カテゴリ.includes('回復')) {
          return true;
        }
        if (selectedEffectTag === '攻撃力' && spell.カテゴリ && spell.カテゴリ.includes('攻撃力')) {
          return true;
        }
        if (selectedEffectTag === '防御力' && spell.カテゴリ && spell.カテゴリ.includes('防御力')) {
          return true;
        }
        if (selectedEffectTag === '移動速度' && spell.カテゴリ && spell.カテゴリ.includes('移動速度')) {
          return true;
        }
        if (selectedEffectTag === 'お金' && spell.カテゴリ && spell.カテゴリ.includes('ボーナス')) {
          return true;
        }
        if (selectedEffectTag === '時間' && spell.カテゴリ && spell.カテゴリ.includes('時間')) {
          return true;
        }
        if (selectedEffectTag === '召喚' && spell.カテゴリ && spell.カテゴリ.includes('召喚')) {
          return true;
        }
        if (selectedEffectTag === 'ギャンブル' && spell.カテゴリ && spell.カテゴリ.includes('ギャンブル')) {
          return true;
        }
        if (selectedEffectTag === '強化' && spell.カテゴリ && spell.カテゴリ.includes('強化')) {
          return true;
        }
        if (selectedEffectTag === '特殊' && spell.カテゴリ && spell.カテゴリ.includes('特殊')) {
          return true;
        }

        // 通常のタグチェック
        return spell.タグ && Array.isArray(spell.タグ) && spell.タグ.includes(selectedEffectTag);
      });
    }

    setFilteredSpells(results);
    onSearchResults(results);
  }, [searchQuery, selectedMagicType, selectedEffectTag, spells, onSearchResults]);

  // 検索クエリの変更ハンドラ
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // タグ選択の変更ハンドラ
  const handleTagSelect = (tag: string, category: 'magicType' | 'effectTag') => {
    if (tag === '全て') {
      // 「全て」が選択された場合は選択をクリア
      setSelectedMagicType(null);
      setSelectedEffectTag(null);
      setSelectedTags([]);
      return;
    }

    if (category === 'magicType') {
      // 魔法の種類が選択された場合
      setSelectedMagicType(selectedMagicType === tag ? null : tag);
      // 選択されたタグを更新
      setSelectedTags(prev => {
        const newTags = prev.filter(t => t !== selectedMagicType);
        return selectedMagicType === tag ? newTags : [...newTags, tag];
      });
    } else {
      // 効果タグが選択された場合
      setSelectedEffectTag(selectedEffectTag === tag ? null : tag);
      // 選択されたタグを更新
      setSelectedTags(prev => {
        const newTags = prev.filter(t => t !== selectedEffectTag);
        return selectedEffectTag === tag ? newTags : [...newTags, tag];
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <SearchBox
        onSearch={handleSearch}
        placeholder="呪文名、必要な歌の段、唱える段の順番で検索..."
      />

      <TagFilterButtons
        spells={spells}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
        selectedMagicType={selectedMagicType}
        selectedEffectTag={selectedEffectTag}
      />

      {isLoading ? (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">検索中...</p>
        </div>
      ) : (
        <div className="mt-4 text-sm text-gray-600">
          {filteredSpells.length} 件の呪文が見つかりました
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
