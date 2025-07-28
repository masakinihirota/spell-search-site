import type { SongMatchingResult } from '@/types';

/**
 * 2つの数字文字列の共通部分と差分を計算する
 * @param requiredDigits 必要な数字の文字列
 * @param possessedDigits 所持している数字の文字列
 * @returns 共通部分と不足部分のオブジェクト
 */
function getDigitComparison(requiredDigits: string, possessedDigits: string) {
  const requiredSet = new Set(requiredDigits.split(''));
  const possessedSet = new Set(possessedDigits.split(''));

  const commonDigits = new Set<string>();
  const missingDigits = new Set<string>();

  for (const digit of requiredSet) {
    if (possessedSet.has(digit)) {
      commonDigits.add(digit);
    } else {
      missingDigits.add(digit);
    }
  }

  return {
    common: [...commonDigits].sort().join(''),
    missing: [...missingDigits].sort().join(''),
  };
}

/**
 * 呪文に必要な歌と所持している歌のマッチング率を計算する
 * @param requiredSong 呪文に必要な歌の数字
 * @param possessedSong 所持している歌の数字
 * @returns マッチング結果
 */
export function calculateSongMatching(
  requiredSong: string,
  possessedSong: string,
): SongMatchingResult {
  if (!requiredSong) {
    return {
      possessedDigits: '',
      missingDigits: '',
      matchingPercentage: 100,
    };
  }

  const comparison = getDigitComparison(requiredSong, possessedSong);

  const matchingPercentage =
    Math.floor((comparison.common.length / requiredSong.length) * 100);

  return {
    possessedDigits: comparison.common,
    missingDigits: comparison.missing,
    matchingPercentage,
  };
}
