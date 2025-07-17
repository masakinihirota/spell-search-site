import React from 'react';
import { SpellData } from '@/types';

interface QuickAccessButtonsProps {
  onQuickAccess: (category: string) => void;
  selectedCategory: string | null;
}

/**
 * クイックアクセスボタンコンポーネント
 * よく使う呪文カテゴリに素早くアクセスするためのボタン群
 */
const QuickAccessButtons: React.FC<QuickAccessButtonsProps> = ({
  onQuickAccess,
  selectedCategory
}) => {
  // 主要カテゴリ（よく使われる呪文のカテゴリ）
  const mainCategories = [
    { id: 'attack', name: '攻撃系', icon: '⚔️', color: 'bg-red-500' },
    { id: 'heal', name: '回復系', icon: '💊', color: 'bg-green-500' },
    { id: 'buff', name: '強化系', icon: '🔼', color: 'bg-blue-500' },
    { id: 'debuff', name: '弱体系', icon: '🔽', color: 'bg-purple-500' },
    { id: 'summon', name: '召喚系', icon: '🐾', color: 'bg-yellow-500' },
    { id: 'utility', name: '特殊系', icon: '🔮', color: 'bg-indigo-500' },
  ];

  // カテゴリマッピング（主要カテゴリと実際のカテゴリの対応）
  const categoryMapping: Record<string, string[]> = {
    'attack': ['攻撃魔法', '弱点魔法', '雷攻撃魔法', '炎攻撃魔法', '氷攻撃魔法', '風攻撃魔法', '重力攻撃魔法', '特殊攻撃魔法'],
    'heal': ['体力上昇魔法'],
    'buff': ['攻撃力上昇魔法', '防御力上昇魔法', '移動速度上昇魔法', 'ボーナス上昇魔法', '強化魔法'],
    'debuff': ['能力値変更', '割合体力減少魔法', '割合攻撃力減少魔法', '毒魔法'],
    'summon': ['動物召喚魔法', '精霊召喚魔法'],
    'utility': ['特殊能力上昇魔法', '時間操作魔法', '一文字魔法', 'ギャンブル魔法', '特殊魔法'],
  };

  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-2">クイックアクセス</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {mainCategories.map((category) => (
          <button
            key={category.id}
            className={`
              flex flex-col items-center justify-center p-3 rounded-lg transition-all
              ${selectedCategory === category.id
                ? `${category.color} text-white ring-2 ring-offset-2 ring-${category.color.replace('bg-', '')} shadow-lg transform scale-105`
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}
            `}
            onClick={() => onQuickAccess(category.id)}
            aria-pressed={selectedCategory === category.id}
          >
            <span className="text-2xl mb-1">{category.icon}</span>
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessButtons;
