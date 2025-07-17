import { KanaBoard, KanaBoardRow } from '@/types';

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
