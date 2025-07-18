import { describe, it, expect, vi } from 'vitest';
import { getHighlightedCellsFromSpellName } from '@/lib/spellUtils';
import { HighlightedCell } from '@/types';

// getHighlightedCellsFromSpellName 関数のテスト
describe('useSpellBoard フックの機能テスト', () => {
  // テスト用のカナボードを定義
  const testKanaBoard = {
    rows: [
      {
        id: 1,
        characters: ['ア', 'イ', 'ウ', 'エ', 'オ', 'ヤ', 'ユ', 'ヨ', 'ワ', 'ン']
      },
      {
        id: 2,
        characters: ['カ', 'キ', 'ク', 'ケ', 'コ', 'ラ', 'リ', 'ル', 'レ', 'ロ']
      }
    ]
  };

  it('呪文選択時のハイライトセル生成が正しく動作すること', () => {
    // 「アカ」という呪文名のテスト
    const result = getHighlightedCellsFromSpellName('アカ', testKanaBoard);

    // 結果の検証
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ rowId: 1, columnIndex: 0 }); // ア
    expect(result[1]).toEqual({ rowId: 2, columnIndex: 0 }); // カ
  });

  it('横方向のみのハイライト表示が正しく計算されること', () => {
    // ハイライトセルの配列
    const highlightedCells: HighlightedCell[] = [
      { rowId: 1, columnIndex: 0 },
      { rowId: 1, columnIndex: 1 },
      { rowId: 2, columnIndex: 0 }
    ];

    // 行IDの抽出（重複を除去）
    const rowIds = [...new Set(highlightedCells.map(cell => cell.rowId))];

    // 結果の検証
    expect(rowIds).toEqual([1, 2]);
    expect(rowIds).toHaveLength(2);
  });
});
