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
 * チャットメッセージの型定義
 */
export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: string;
  relatedSpellId?: string;
  type: 'general' | 'spell-related';
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
