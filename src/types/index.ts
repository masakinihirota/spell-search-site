<<<<<<< HEAD
/**
 * スペルデータの型定義（設計書に基づく）
 */
export interface SpellData {
  id: string;
  名前: string;
  必要な歌の段: string;
  唱える段の順番: string;
  カテゴリ: string;
  説明?: string;
  タグ?: string[];
}

/**
 * スペルキャスト型定義（英語フィールド名を持つ互換性のある型）
 */
export interface SpellCast {
  id: string;
  name: string;
  requiredSong: string;
  castOrder: string;
  category: string;
  effect?: string;
  description?: string;
  tags: string[];
  isPopular?: boolean;
  spellSequence?: SpellSequence;
  createdAt?: string;
  updatedAt?: string;
  // 日本語フィールド名との互換性
  名前?: string;
  必要な歌の段?: string;
  唱える段の順番?: string;
  カテゴリ?: string;
  説明?: string;
  タグ?: string[];
}

/**
 * スペルカテゴリの型定義
 */
export interface SpellCategory {
  id: string;
  name: string;
  description?: string;
}

/**
 * 検索クエリの型定義
 */
export interface SearchQuery {
  text: string;
  categories: string[];
  tags?: string[];
  sortBy?: 'name' | 'category' | 'complexity';
  sortDirection?: 'asc' | 'desc';
}

/**
 * アプリケーション状態の型定義
 */
export interface AppState {
  spells: SpellData[];
  filteredSpells: SpellData[];
  selectedSpell: SpellData | null;
  searchQuery: SearchQuery;
  isLoading: boolean;
  error: string | null;
  highlightedRows: number[];
}

/**
 * スペルボードの行データ型定義
 */
export interface SpellBoardRow {
  id: number;
  characters: string[];
}

/**
 * スペルボードの型定義
 */
export interface SpellBoard {
  rows: SpellBoardRow[];
}

/**
 * スペルシーケンスの型定義
 */
export interface SpellSequence {
  boardNumbers: number[];
  characterSets: string[];
}



/**
 * カナボード行の型定義
 */
export interface KanaBoardRow {
  id: number;
  characters: string[];
}

/**
 * カナボードの型定義
 */
export interface KanaBoard {
  rows: KanaBoardRow[];
}

/**
 * ハイライトするセルの位置を表す型定義
 */
export interface HighlightedCell {
  rowId: number;
  columnIndex: number;
}

// ===== 歌マッチング機能の型定義 =====

/**
 * 歌マッチング結果の型定義
 * 要件1.1, 2.1, 3.1に対応
 */
export interface SongMatchingResult {
  /** 所持している歌の数字 */
  possessedDigits: string;
  /** 不足している歌の数字 */
  missingDigits: string;
  /** マッチング率 (0-100) */
  matchingPercentage: number;
}

/**
 * 歌マッチングキャッシュの型定義
 * 呪文IDをキーとしたマッチング結果のマップ
 */
export type SpellMatchingMap = Map<string, SongMatchingResult>;

/**
 * マッチングキャッシュシステムの状態管理型定義
 */
export interface MatchingCache {
  /** 現在の所持歌数字 */
  currentPossessedSongs: string;
  /** キャッシュされたマッチング結果 */
  matchingResults: SpellMatchingMap;
  /** キャッシュが更新中かどうか */
  isUpdating: boolean;
  /** 最後の更新タイムスタンプ */
  lastUpdated: number;
}

/**
 * 初期キャッシュ（所持歌数0）の型定義
 * アプリ起動時の事前計算結果を保存
 */
export interface InitialCache {
  /** 所持歌数0の状態でのマッチング結果 */
  zeroStateResults: SpellMatchingMap;
  /** 初期化完了フラグ */
  isInitialized: boolean;
}

/**
 * バックグラウンド計算の状態管理型定義
 */
export interface BackgroundCalculation {
  /** 計算対象の所持歌数字 */
  targetPossessedSongs: string;
  /** 計算進行状況 (0-100) */
  progress: number;
  /** 計算中フラグ */
  isCalculating: boolean;
  /** デバウンスタイマーID */
  debounceTimerId: NodeJS.Timeout | null;
}

/**
 * 歌マッチング計算エラーの型定義
 */
export interface SongMatchingError {
  /** エラーコード */
  code: 'INVALID_INPUT' | 'CALCULATION_FAILED' | 'CACHE_ERROR';
  /** エラーメッセージ */
  message: string;
  /** エラーの詳細情報 */
  details?: unknown;
}
=======
/**
 * スペルデータの型定義（設計書に基づく）
 */
export interface SpellData {
  id: string;
  名前: string | undefined;
  必要な歌の段: string | undefined;
  唱える段の順番: string | undefined;
  カテゴリ: string | undefined;
  説明?: string;
  タグ?: string[];
}

/**
 * スペルキャスト型定義（英語フィールド名を持つ互換性のある型）
 */
export interface SpellCast {
  id: string;
  name: string | undefined;
  requiredSong: string | undefined;
  castOrder: string | undefined;
  category: string | undefined;
  effect?: string;
  description?: string;
  tags: string[];
  isPopular?: boolean;
  spellSequence?: SpellSequence;
  createdAt?: string;
  updatedAt?: string;
  // 日本語フィールド名との互換性
  名前?: string;
  必要な歌の段?: string;
  唱える段の順番?: string;
  カテゴリ?: string;
  説明?: string;
  タグ?: string[];
}

/**
 * スペルカテゴリの型定義
 */
export interface SpellCategory {
  id: string;
  name: string;
  description?: string;
}

/**
 * 検索クエリの型定義
 */
export interface SearchQuery {
  text: string;
  categories: string[];
  tags?: string[];
  sortBy?: 'name' | 'category' | 'complexity';
  sortDirection?: 'asc' | 'desc';
}

/**
 * アプリケーション状態の型定義
 */
export interface AppState {
  spells: SpellData[];
  filteredSpells: SpellData[];
  selectedSpell: SpellData | null;
  searchQuery: SearchQuery;
  isLoading: boolean;
  error: string | null;
  highlightedRows: number[];
}

/**
 * スペルボードの行データ型定義
 */
export interface SpellBoardRow {
  id: number;
  characters: string[];
}

/**
 * スペルボードの型定義
 */
export interface SpellBoard {
  rows: SpellBoardRow[];
}

/**
 * スペルシーケンスの型定義
 */
export interface SpellSequence {
  boardNumbers: number[];
  characterSets: string[];
}

/**
 * 歌のマッチング結果の型定義
 */
export interface SongMatchingResult {
  possessedDigits: string;
  missingDigits: string;
  matchingPercentage: number;
}

/**
 * マッチングキャッシュの型定義
 */
export type MatchingCache = Map<string, SongMatchingResult>;

/**
 * カナボード行の型定義
 */
export interface KanaBoardRow {
  id: number;
  characters: string[];
}

/**
 * カナボードの型定義
 */
export interface KanaBoard {
  rows: KanaBoardRow[];
}

/**
 * ハイライトするセルの位置を表す型定義
 */
export interface HighlightedCell {
  rowId: number;
  columnIndex: number;
}
>>>>>>> main
