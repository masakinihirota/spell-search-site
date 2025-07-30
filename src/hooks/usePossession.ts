import { useState, useEffect, useCallback } from 'react';
import { spellMatchingCache } from '@/lib/spellMatchingCache';

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function usePossessionManager(initialPossessedSong: string = '') {
  const [possessedSong, setPossessedSong] = useState(initialPossessedSong);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isCacheReady, setIsCacheReady] = useState(false); // Add cache ready state
  const debouncedPossessedSong = useDebounce(possessedSong, 500); // 500msのデバウンス

  useEffect(() => {
    setIsCalculating(true);
    setIsCacheReady(false); // Reset cache ready state
    // デバウンスされた値が変更されたときにキャッシュを再構築
    spellMatchingCache.rebuildCache(debouncedPossessedSong);
    setIsCalculating(false);
    setIsCacheReady(true); // Set cache ready state to true
  }, [debouncedPossessedSong]);

  const updatePossessedSong = useCallback((newSong: string) => {
    // 数字以外の文字をフィルタリング
    const filteredSong = newSong.replace(/[^0-9]/g, '');
    setPossessedSong(filteredSong);
  }, []);

  return {
    possessedSong,
    updatePossessedSong,
    isCalculating,
    isCacheReady, // Return cache ready state
    matchingCache: spellMatchingCache.getFullCache(),
  };
}

