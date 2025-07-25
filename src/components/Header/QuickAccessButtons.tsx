import React, { useState, useEffect } from 'react';
import { SpellData } from '@/types';

interface QuickAccessButtonsProps {
  onButtonClick: (query: string) => void;
  favoriteSpells?: SpellData[];
}

/**
 * クイックアクセスボタンコンポーネント
 * カテゴリ別のクイックアクセスボタンとお気に入りスペルを表示する
 */
const QuickAccessButtons: React.FC<QuickAccessButtonsProps> = ({
  onButtonClick,
  favoriteSpells = []
}) => {
  // 選択されたカテゴリの状態
  const [selectedCategory, setSelectedCategory] = useState<string | null>('all');

  // カテゴリリスト
  const categories = [
    { id: 'all', name: '全て', query: '' },
    { id: 'damage', name: 'ダメージ', query: 'ダメージ' },
    { id: 'heal', name: '回復', query: '回復' },
    { id: 'attack', name: '攻撃力', query: '攻撃力' },
    { id: 'defense', name: '防御力', query: '防御力' },
    { id: 'speed', name: '移動速度', query: '移動速度' },
    { id: 'money', name: 'お金', query: 'お金' },
    { id: 'time', name: '時間', query: '時間' },
    { id: 'summon', name: '召喚', query: '召喚' },
    { id: 'gamble', name: 'ギャンブル', query: 'ギャンブル' },
    { id: 'enhance', name: '強化', query: '強化' },
    { id: 'special', name: '特殊', query: '特殊' }
  ];

  // コンポーネントがマウントされたときに「全て」のタグを選択状態にする
  useEffect(() => {
    if (selectedCategory === 'all') {
      onButtonClick('');
    }
  }, []);

  // カテゴリボタンのクリックハンドラ
  const handleCategoryClick = (category: { id: string; name: string; query: string }) => {
    // 同じカテゴリをクリックした場合は選択を解除
    if (selectedCategory === category.id) {
      setSelectedCategory(null);
      onButtonClick('');
    } else {
      setSelectedCategory(category.id);
      onButtonClick(category.query);
    }
  };

  // お気に入りスペルのクリックハンドラ
  const handleFavoriteClick = (spell: SpellData) => {
    onButtonClick(spell.名前 || '');
  };

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">カテゴリ</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {favoriteSpells.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">お気に入り</h3>
          <div className="flex flex-wrap gap-2">
            {favoriteSpells.map((spell) => (
              <button
                key={spell.id}
                onClick={() => handleFavoriteClick(spell)}
                className="px-3 py-2 rounded-md text-sm font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors"
              >
                {spell.名前}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickAccessButtons;
