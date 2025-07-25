import { calculateSongMatching } from './songUtils';
import type { SpellCast, MatchingCache, SongMatchingResult } from '@/types';

class SpellMatchingCache {
  private static instance: SpellMatchingCache;
  private cache: MatchingCache = new Map();
  private allSpells: SpellCast[] = [];

  private constructor() {
    // private constructor to prevent direct instantiation
  }

  public static getInstance(): SpellMatchingCache {
    if (!SpellMatchingCache.instance) {
      SpellMatchingCache.instance = new SpellMatchingCache();
    }
    return SpellMatchingCache.instance;
  }

  public async initialize(spells: SpellCast[]): Promise<void> {
    this.allSpells = spells;
    // 初期状態（所持なし）でキャッシュを計算
    this.rebuildCache('');
  }

  public rebuildCache(possessedSong: string): void {
    const newCache: MatchingCache = new Map();
    for (const spell of this.allSpells) {
      const result = calculateSongMatching(spell.requiredSong, possessedSong);
      newCache.set(spell.id, result);
    }
    this.cache = newCache;
  }

  public getMatchingResult(spellId: string): SongMatchingResult | undefined {
    return this.cache.get(spellId);
  }

  public getFullCache(): MatchingCache {
    return this.cache;
  }
}

export const spellMatchingCache = SpellMatchingCache.getInstance();
