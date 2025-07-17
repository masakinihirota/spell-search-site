import React from 'react';
import { SpellData } from '@/types';

interface SpellDetailProps {
  spell: SpellData | null;
  onBack: () => void;
}

/**
 * スペル詳細表示コンポーネント
 */
const SpellDetail: React.FC<SpellDetailProps> = ({ spell, onBack }) => {
  if (!spell) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        検索結果に戻る
      </button>

      <h2 className="text-2xl font-bold text-blue-800 mb-2">{spell.名前}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">基本情報</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-2">
              <span className="font-medium">カテゴリ:</span> {spell.カテゴリ}
            </p>
            <p className="mb-2">
              <span className="font-medium">必要な歌の段:</span> {spell.必要な歌の段}
            </p>
            <p>
              <span className="font-medium">唱える段の順番:</span> {spell.唱える段の順番}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">タグ</h3>
          <div className="flex flex-wrap gap-2">
            {spell.タグ?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {spell.説明 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">説明</h3>
          <p className="text-gray-700">{spell.説明}</p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-2">詠唱方法</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="mb-2">
            <span className="font-medium">必要な歌の段:</span> {spell.必要な歌の段}
          </p>
          <p>
            <span className="font-medium">唱える段の順番:</span> {spell.唱える段の順番}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpellDetail;
