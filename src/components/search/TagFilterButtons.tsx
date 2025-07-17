import React from 'react';
import { SpellData } from '@/types';

interface TagFilterButtonsProps {
  spells: SpellData[];
  selectedTags: string[];
  onTagSelect: (tag: string, category: 'magicType' | 'effectTag') => void;
  selectedMagicType: string | null;
  selectedEffectTag: string | null;
}

/**
 * タグフィルターボタンコンポーネント
 * ユーザーがタグを選択して呪文をフィルタリングできるようにする
 */
const TagFilterButtons: React.FC<TagFilterButtonsProps> = ({
  selectedTags,
  onTagSelect,
  selectedMagicType,
  selectedEffectTag
}) => {
  // 魔法の種類（カテゴリ）
  const magicTypes = [
    '攻撃魔法', '弱点魔法', '雷攻撃魔法', '炎攻撃魔法', '氷攻撃魔法', '風攻撃魔法',
    '重力攻撃魔法', '特殊攻撃魔法', '能力値変更', '攻撃力上昇魔法', '防御力上昇魔法',
    '体力上昇魔法', '特殊能力上昇魔法', '動物召喚魔法', '精霊召喚魔法', '移動速度上昇魔法',
    'ボーナス上昇魔法', '時間操作魔法', '割合体力減少魔法', '割合攻撃力減少魔法', '毒魔法',
    '一文字魔法', '強化魔法', 'ギャンブル魔法', '特殊魔法'
  ];

  // 効果タグ
  const effectTags = [
    'ダメージ', '回復', '攻撃力', '防御力', '移動速度', 'お金', '時間', '召喚', 'ギャンブル', '強化', '特殊'
  ];

  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-2">タグフィルター</h3>

      {/* すべてのタグを選択解除するボタン */}
      <div className="mb-4">
        <button
          className={`px-3 py-1 rounded-full text-sm ${
            selectedTags.length === 0
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => onTagSelect('全て', 'magicType')}
        >
          全て
        </button>
      </div>

      {/* 魔法の種類 */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">魔法の種類</h4>
        <div className="flex flex-wrap gap-2">
          {magicTypes.map((tag) => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedMagicType === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => onTagSelect(tag, 'magicType')}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 効果タグ */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">タグ</h4>
        <div className="flex flex-wrap gap-2">
          {effectTags.map((tag) => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedEffectTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => onTagSelect(tag, 'effectTag')}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagFilterButtons;
