import type { MatchingCache, SongMatchingResult, SpellCast } from '@/types';
import { calculateSongMatching } from './songUtils';

class SpellMatchingCache {
  private static instance: SpellMatchingCache;
  private cache: MatchingCache = new Map();
  private allSpells: SpellCast[] = [];
  private isInitialized: boolean = false;

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
    // 初期化完了フラグを設定
    this.isInitialized = true;
  }

  public rebuildCache(possessedSong: string): void {
    const newCache: MatchingCache = new Map();
    for (const spell of this.allSpells) {
      const requiredSong = spell.requiredSong || '';
      const result = calculateSongMatching(requiredSong, possessedSong);
      newCache.set(spell.id, result);
    }
    this.cache = newCache;
  }

  public getMatchingResult(spellId: string): SongMatchingResult | undefined {
    // 初期化チェック：未初期化時はundefinedを返す
    if (!this.isInitialized) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('SpellMatchingCache: キャッシュが初期化されていません');
      }
      return undefined;
    }

    // spellIdの妥当性チェック
    if (!spellId || spellId.trim() === '') {
      if (process.env.NODE_ENV === 'development') {
        console.warn('SpellMatchingCache: 無効なspellIdが指定されました:', spellId);
      }
      return undefined;
    }

    return this.cache.get(spellId);
  }

  public getFullCache(): MatchingCache {
    return this.cache;
  }
}

export const spellMatchingCache = SpellMatchingCache.getInstance();
