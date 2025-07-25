import React, { useMemo } from 'react';
import { calculateSongMatching } from '@/lib/songUtils';
import type { SpellData } from '@/types';

interface SongMatchingDisplayProps {
  spell: SpellData;
  possessedSong: string;
  isDarkMode: boolean; // isDarkMode を props として追加
}

export const getBackgroundColor = (percentage: number, isDarkMode: boolean): string => {
  // ライトモード・ダークモード共通のスタイル
  if (percentage === 100) return 'bg-green-200 dark:bg-green-800 border-2 border-green-500 dark:border-green-400';
  if (percentage >= 75) return 'bg-green-100 dark:bg-green-900';
  if (percentage >= 50) return 'bg-yellow-100 dark:bg-yellow-900';
  if (percentage > 0) return 'bg-gray-50 dark:bg-gray-800';
  return 'bg-gray-100 dark:bg-gray-700';
};

const SongMatchingDisplay: React.FC<SongMatchingDisplayProps> = ({ spell, possessedSong, isDarkMode }) => {
  const matchingResult = useMemo(() => {
    const requiredSong = spell.必要な歌の段 || '';
    return calculateSongMatching(requiredSong, possessedSong);
  }, [spell, possessedSong]);

  if (!matchingResult) {
    return null;
  }

  const { possessedDigits, missingDigits, matchingPercentage } = matchingResult;

  const bgColor = getBackgroundColor(matchingPercentage, isDarkMode);

  return (
    <div className={`flex items-center space-x-2 p-1 rounded-md text-lg transition-colors ${bgColor}`}> {/* text-base を text-lg に変更 */}
      <span title="所持" className="text-green-600 dark:text-green-400 font-bold">{possessedDigits}</span>
      <span title="不足" className="text-red-600 dark:text-red-400 font-bold">{missingDigits}</span>
      <span title="一致率" className="font-bold text-gray-800 dark:text-gray-200">{`${matchingPercentage}%`}</span>
    </div>
  );
};

export default React.memo(SongMatchingDisplay);
