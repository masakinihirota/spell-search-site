import React, { useState } from 'react';
import { SpellCast } from '@/types';

interface QuickAccessButtonsProps {
  onButtonClick: (query: string) => void;
  favoriteSpells?: SpellCast[];
}

/**
 * クイックアクセスボタンコンポーネント
 * 購入した呪文と数字ボタンへのクイックアクセスを提供
 */
const QuickAccessButtons: React.FC<QuickAccessButtonsProps> = ({ onButtonClick, favoriteSpells = [] }) => {
  // 選択された数字ボタンの状態を管理
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  // デフォルトの購入済み呪文リスト（購入した呪文がない場合に表示）
  const defaultFavoriteSpells = [
    { id: 'spell_1', name: 'ボナス' },
    { id: 'spell_2', name: 'ムテキパル' },
    { id: 'spell_3', name: 'ヒール' },
    { id: 'spell_4', name: 'バリア' },
  ];

  // 購入した呪文がある場合は、それを使用する
  const favoriteButtonSpells = favoriteSpells.length > 0
    ? favoriteSpells.map(spell => ({ id: spell.id, name: spell.name }))
    : defaultFavoriteSpells;

  // 数字ボタンのトグル処理
  const handleNumberToggle = (num: number) => {
    if (selectedNumbers.includes(num)) {
      // すでに選択されている場合は選択解除
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else {
      // 選択されていない場合は選択に追加
      setSelectedNumbers([...selectedNumbers, num]);
    }

    // 検索クエリを更新（選択された数字を文字列として連結）
    const query = selectedNumbers.includes(num)
      ? selectedNumbers.filter(n => n !== num).join('')
      : [...selectedNumbers, num].join('');

    onButtonClick(query);
  };

  // リセットボタンの処理
  const handleReset = () => {
    setSelectedNumbers([]);
    onButtonClick('');
  };

  return (
    <div className="my-4">
      {/* 購入した呪文ボタン */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {favoriteButtonSpells.map((spell) => (
          <button
            key={spell.id}
            onClick={() => onButtonClick(spell.name)}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
          >
            {spell.name}
          </button>
        ))}
      </div>

      {/* 数字ボタン（1-8）とリセットボタン */}
      <div className="flex justify-center">
        <div className="flex flex-wrap gap-2 justify-center items-center max-w-md">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberToggle(num)}
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-colors text-base sm:text-lg font-bold
                ${selectedNumbers.includes(num)
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-900'}`}
            >
              {num}
            </button>
          ))}

          {/* リセットボタン */}
          <button
            onClick={handleReset}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-red-400 text-white rounded-full hover:bg-red-500 transition-colors"
            title="リセット"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessButtons;
