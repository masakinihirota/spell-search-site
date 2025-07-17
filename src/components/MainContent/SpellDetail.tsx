import React from 'react';
import { SpellCast } from '@/types';
import KanaBoard from './KanaBoard';

interface SpellDetailProps {
  spell: SpellCast;
  onBack: () => void;
  onToggleFavorite?: (spell: SpellCast) => void;
  isFavorite?: boolean;
  relatedSpells?: SpellCast[];
  onRelatedSpellSelect?: (spell: SpellCast) => void;
}

/**
 * スペル詳細表示コンポーネント
 * 選択されたスペルの詳細情報を表示する
 */
const SpellDetail: React.FC<SpellDetailProps> = ({
  spell,
  onBack,
  onToggleFavorite,
  isFavorite = false,
  relatedSpells = [],
  onRelatedSpellSelect
}) => {
  // 必要な歌の段の数字を配列に変換
  const requiredRows = spell.requiredSong.split('').map(Number);

  // 唱える段の順番の数字を配列に変換
  const castOrderColumns = spell.castOrder.split('').map(Number).map(n => n - 1);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 flex items-center"
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
          戻る
        </button>

        {onToggleFavorite && (
          <button
            onClick={() => onToggleFavorite(spell)}
            className={`flex items-center ${
              isFavorite ? 'text-yellow-500' : 'text-gray-400'
            } hover:text-yellow-600`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={isFavorite ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <span className="ml-1">{isFavorite ? 'お気に入り解除' : 'お気に入り'}</span>
          </button>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-2">{spell.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">基本情報</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="mb-2">
                <span className="font-medium">カテゴリ:</span> {spell.category}
              </p>
              <p className="mb-2">
                <span className="font-medium">必要な歌の段:</span> {spell.requiredSong}
              </p>
              <p>
                <span className="font-medium">唱える段の順番:</span> {spell.castOrder}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">効果</h3>
            <p className="bg-gray-50 p-4 rounded-md">{spell.effect}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-1">詳細説明</h3>
            <p className="bg-gray-50 p-4 rounded-md">{spell.description}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1">スペルボード</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <KanaBoard
              highlightedRows={requiredRows}
              highlightedColumns={castOrderColumns}
            />
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-1">タグ</h3>
            <div className="flex flex-wrap gap-2">
              {spell.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {relatedSpells.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">関連する呪文</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {relatedSpells.map((relatedSpell) => (
              <div
                key={relatedSpell.id}
                className="bg-gray-50 p-3 rounded-md hover:bg-blue-50 cursor-pointer transition-colors"
                onClick={() => onRelatedSpellSelect && onRelatedSpellSelect(relatedSpell)}
              >
                <h4 className="font-medium">{relatedSpell.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{relatedSpell.requiredSong} → {relatedSpell.castOrder}</p>
                <p className="text-xs text-gray-500 mt-1 truncate">{relatedSpell.effect}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpellDetail;
