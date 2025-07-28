import type { HighlightedCell, KanaBoard } from '@/types';

// 文字位置のマッピングをキャッシュするためのMap
// キー: カタカナ文字, 値: 位置情報の配列
type CharPositionMap = Map<string, HighlightedCell[]>;

// カナボードの文字位置マッピングをキャッシュ
let charPositionMapCache: CharPositionMap | null = null;

/**
 * カナボードの文字位置マッピングを作成する
 * @param kanaBoard カナボードのデータ
 * @returns 文字位置のマッピング
 */
function createCharPositionMap(kanaBoard: KanaBoard): CharPositionMap {
  const map = new Map<string, HighlightedCell[]>();

  // カナボードの各行をチェック
  for (const row of kanaBoard.rows) {
    // 行内の各列をチェック
    for (let colIndex = 0; colIndex < row.characters.length; colIndex++) {
      const char = row.characters[colIndex];

      // マップに文字の位置情報を追加
      if (!map.has(char)) {
        map.set(char, []);
      }

      map.get(char)!.push({
        rowId: row.id,
        columnIndex: colIndex
      });
    }
  }

  return map;
}

// 呪文名とそのハイライトセルのキャッシュ
// LRU (Least Recently Used) キャッシュの実装
class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<K, V>();
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) {
      return undefined;
    }

    // キーが存在する場合、そのエントリを取得して再度追加することで「最近使用した」状態にする
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    // キーが既に存在する場合は削除
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // キャッシュが容量に達している場合は、最も古いエントリ（最初のエントリ）を削除
    else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    // 新しいエントリを追加
    this.cache.set(key, value);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}

// 呪文名とそのハイライトセルのLRUキャッシュ（最大200エントリ）
const spellNameCellsCache = new LRUCache<string, HighlightedCell[]>(200);

/**
 * 呪文名からハイライトするセルを特定する関数（最適化版）
 * @param spellName 呪文名
 * @param kanaBoard カナボードのデータ
 * @returns ハイライトするセルの配列
 */
export function getHighlightedCellsFromSpellName(
  spellName: string,
  kanaBoard: KanaBoard
): HighlightedCell[] {
  // 入力チェック
  if (!spellName || spellName.length === 0) {
    return [];
  }

  // キャッシュにある場合はキャッシュから返す
  const cachedResult = spellNameCellsCache.get(spellName);
  if (cachedResult !== undefined) {
    return cachedResult;
  }

  // 文字位置マッピングがない場合は作成
  if (!charPositionMapCache) {
    charPositionMapCache = createCharPositionMap(kanaBoard);
  }

  const highlightedCells: HighlightedCell[] = [];

  // 呪文名の各文字について
  for (const char of spellName) {
    // マップから文字の位置情報を取得
    const positions = charPositionMapCache.get(char);

    // 位置情報がある場合は追加
    if (positions && positions.length > 0) {
      highlightedCells.push(...positions);
    }
  }

  // 結果をキャッシュに保存
  spellNameCellsCache.set(spellName, highlightedCells);

  return highlightedCells;
}

/**
 * 行番号と列番号から文字を取得する
 * @param board カナボード
 * @param rowId 行番号 (1-8)
 * @param columnIndex 列番号 (0-9)
 * @returns 対応する文字、見つからない場合は空文字
 */
export function getCharacterFromPosition(
  board: KanaBoard,
  rowId: number,
  columnIndex: number
): string {
  const row = board.rows.find(r => r.id === rowId);
  if (!row || columnIndex < 0 || columnIndex >= row.characters.length) {
    return '';
  }
  return row.characters[columnIndex];
}

/**
 * 呪文の入力シーケンスを解析する
 * 例: "247 74272" -> "ルテミルキ"
 * @param board カナボード
 * @param sequence 入力シーケンス (例: "247 74272")
 * @returns 解析された文字列
 */
export function parseSpellSequence(board: KanaBoard, sequence: string): string {
  // スペースで分割して、行番号と列番号のパートに分ける
  const parts = sequence.trim().split(/\s+/);
  if (parts.length !== 2) {
    return '';
  }

  const rowIds = parts[0].split('').map(Number);
  const columnIndices = parts[1].split('').map(Number);

  // 各行と列の組み合わせから文字を取得
  let result = '';
  for (let i = 0; i < columnIndices.length; i++) {
    const rowId = rowIds[i % rowIds.length]; // 行番号が足りない場合は循環させる
    const columnIndex = columnIndices[i] - 1; // 1-indexedを0-indexedに変換
    const char = getCharacterFromPosition(board, rowId, columnIndex);
    result += char;
  }

  return result;
}

/**
 * 呪文名から入力シーケンスを生成する（逆引き）
 * 例: "ムテキパル" -> "247 74272"
 * @param board カナボード
 * @param spellName 呪文名
 * @returns 入力シーケンス
 */
export function generateSpellSequence(board: KanaBoard, spellName: string): string | null {
  // 各文字の位置を探す
  const positions: { rowId: number; columnIndex: number }[] = [];

  for (const char of spellName) {
    let found = false;

    for (const row of board.rows) {
      const columnIndex = row.characters.findIndex(c => c === char);
      if (columnIndex !== -1) {
        positions.push({ rowId: row.id, columnIndex });
        found = true;
        break;
      }
    }

    if (!found) {
      return null; // 文字が見つからない場合はnullを返す
    }
  }

  // 行番号と列番号のパターンを見つける
  // 簡略化のため、最初の3つの行番号を使用
  const rowIds = positions.slice(0, 3).map(p => p.rowId).join('');
  const columnIndices = positions.map(p => p.columnIndex + 1).join(''); // 0-indexedを1-indexedに変換

  return `${rowIds} ${columnIndices}`;
}

/**
 * 入力された文字列が特定の呪文と一致するか確認する
 * @param input ユーザー入力
 * @param spellName 呪文名
 * @returns 一致するかどうか
 */
export function matchesSpell(input: string, spellName: string): boolean {
  return input.toLowerCase() === spellName.toLowerCase();
}

/**
 * 入力された文字列が呪文の一部と一致するか確認する
 * @param input ユーザー入力
 * @param spellName 呪文名
 * @returns 一部一致するかどうか
 */
export function partialMatchesSpell(input: string, spellName: string): boolean {
  return spellName.toLowerCase().includes(input.toLowerCase());
}
