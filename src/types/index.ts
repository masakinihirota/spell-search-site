/**
 * スペルトナエルデータの型定義
 */
export interface SpellCast {
  id: string;
  requiredSong: string;  // 必要な歌の段（例: "356"）
  castOrder: string;     // 唱える段の順番（例: "653"）
  name: string;          // 呪文の名前（例: "ボナス"）
  effect: string;        // 呪文の効果
  description: string;   // 詳細説明
  category: string;      // 呪文のカテゴリ
  tags: string[];        // 関連タグ
  isPopular: boolean;    // 人気の呪文かどうか
  spellSequence: {       // 呪文の詳細な構成要素
    boardNumbers: number[];  // 必要な歌の段の数字（例: [3,5,6,6,5,3]）
    characterSets: string[]; // 各段に対応する文字セット（例: ["サシスセソ", "ナニヌネノ", ...]）
  };
  createdAt: string;
  updatedAt: string;
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
