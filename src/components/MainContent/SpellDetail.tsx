import React from 'react';
import { SpellCast } from '@/types';

interface SpellDetailProps {
  spell: SpellCast | null;
  onBack: () => void;
}

/**
 * スペル詳細表示コンポーネント
 * 選択されたスペルの詳細情報を表示
 */
const SpellDetail: React.FC<SpellDetailProps> = ({ spell, onBack }) => {
  if (!spell) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">{spell.name}</h2>
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800"
          aria-label="戻る"
        >
          ← 戻る
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-600">番号: <span className="font-medium">{spell.number}</span></p>
          <p className="text-gray-600">カテゴリ: <span className="font-medium">{spell.category}</span></p>
        </div>
        <div>
          <p className="text-gray-600">作成日: <span className="font-medium">{new Date(spell.createdAt).toLocaleDateString('ja-JP')}</span></p>
          <p className="text-gray-600">更新日: <span className="font-medium">{new Date(spell.updatedAt).toLocaleDateString('ja-JP')}</span></p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">効果</h3>
        <p className="bg-gray-50 p-3 rounded">{spell.effect}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">詳細説明</h3>
        <p className="bg-gray-50 p-3 rounded whitespace-pre-line">{spell.description}</p>
      </div>

      {spell.tags && spell.tags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">タグ</h3>
          <div className="flex flex-wrap gap-2">
            {spell.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpellDetail;
