import { describe, it, expect } from 'vitest';
import { calculateSongMatching } from '../songUtils';

describe('calculateSongMatching', () => {
  it('完全に一致する場合', () => {
    expect(calculateSongMatching('123', '123')).toEqual({
      possessedDigits: '123',
      missingDigits: '',
      matchingPercentage: 100,
    });
  });

  it('部分的に一致する場合', () => {
    expect(calculateSongMatching('12345', '135')).toEqual({
      possessedDigits: '135',
      missingDigits: '24',
      matchingPercentage: 60,
    });
  });

  it('全く一致しない場合', () => {
    expect(calculateSongMatching('123', '456')).toEqual({
      possessedDigits: '',
      missingDigits: '123',
      matchingPercentage: 0,
    });
  });

  it('必要な歌がない場合', () => {
    expect(calculateSongMatching('', '123')).toEqual({
      possessedDigits: '',
      missingDigits: '',
      matchingPercentage: 100,
    });
  });

  it('所持している歌がない場合', () => {
    expect(calculateSongMatching('123', '')).toEqual({
      possessedDigits: '',
      missingDigits: '123',
      matchingPercentage: 0,
    });
  });

  it('両方とも空の場合', () => {
    expect(calculateSongMatching('', '')).toEqual({
      possessedDigits: '',
      missingDigits: '',
      matchingPercentage: 100,
    });
  });

  it('重複する数字を正しく処理できるか', () => {
    expect(calculateSongMatching('112233', '12')).toEqual({
      possessedDigits: '12',
      missingDigits: '3',
      matchingPercentage: 33, // (2 / 6) * 100
    });
  });
});
