import { describe, it, expect } from 'vitest';
import { getHighlightedCellsFromSpellName } from '../spellUtils';
import { KanaBoard } from '@/types';

describe('getHighlightedCellsFromSpellName', () => {
  // テスト用のカナボードを定義
  const testKanaBoard: KanaBoard = {
    rows: [
      {
        id: 1,
        characters: ['ア', 'イ', 'ウ', 'エ', 'オ', 'ヤ', 'ユ', 'ヨ', 'ワ', 'ン']
      },
      {
        id: 2,
        characters: ['カ', 'キ', 'ク', 'ケ', 'コ', 'ラ', 'リ', 'ル', 'レ', 'ロ']
      },
      {
        id: 3,
        characters: ['サ', 'シ', 'ス', 'セ', 'ソ', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ']
      }
    ]
  };

  it('基本的なケース：単一の文字を含む呪文名', () => {
    // 「ア」という呪文名のテスト
    const result = getHighlightedCellsFromSpellName('ア', testKanaBoard);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ rowId: 1, columnIndex: 0 });
  });

  it('基本的なケース：複数の文字を含む呪文名', () => {
    // 「アカサ」という呪文名のテスト
    const result = getHighlightedCellsFromSpellName('アカサ', testKanaBoard);

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ rowId: 1, columnIndex: 0 }); // ア
    expect(result[1]).toEqual({ rowId: 2, columnIndex: 0 }); // カ
    expect(result[2]).toEqual({ rowId: 3, columnIndex: 0 }); // サ
  });

  it('重複文字を含むケース', () => {
    // 「アアカ」という呪文名のテスト（「ア」が重複）
    const result = getHighlightedCellsFromSpellName('アアカ', testKanaBoard);

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ rowId: 1, columnIndex: 0 }); // 1つ目の「ア」
    expect(result[1]).toEqual({ rowId: 1, columnIndex: 0 }); // 2つ目の「ア」
    expect(result[2]).toEqual({ rowId: 2, columnIndex: 0 }); // カ
  });

  it('存在しない文字を含むケース', () => {
    // 「アカ漢字」という呪文名のテスト（「漢字」はカナボードに存在しない）
    const result = getHighlightedCellsFromSpellName('アカ漢字', testKanaBoard);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ rowId: 1, columnIndex: 0 }); // ア
    expect(result[1]).toEqual({ rowId: 2, columnIndex: 0 }); // カ
    // 「漢字」は見つからないのでハイライトセルは生成されない
  });

  it('空の呪文名の場合', () => {
    const result = getHighlightedCellsFromSpellName('', testKanaBoard);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('実際のカナボードデータを使用したテスト', () => {
    // 実際のカナボードデータを定義
    const fullKanaBoard: KanaBoard = {
      rows: [
        {
          id: 1,
          characters: ['ア', 'イ', 'ウ', 'エ', 'オ', 'ヤ', 'ユ', 'ヨ', 'ワ', 'ン']
        },
        {
          id: 2,
          characters: ['カ', 'キ', 'ク', 'ケ', 'コ', 'ラ', 'リ', 'ル', 'レ', 'ロ']
        },
        {
          id: 3,
          characters: ['サ', 'シ', 'ス', 'セ', 'ソ', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ']
        },
        {
          id: 4,
          characters: ['タ', 'チ', 'ツ', 'テ', 'ト', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ']
        },
        {
          id: 5,
          characters: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド']
        },
        {
          id: 6,
          characters: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'バ', 'ビ', 'ブ', 'ベ', 'ボ']
        },
        {
          id: 7,
          characters: ['マ', 'ミ', 'ム', 'メ', 'モ', 'パ', 'ピ', 'プ', 'ペ', 'ポ']
        },
        {
          id: 8,
          characters: ['ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ッ', 'ャ', 'ュ', 'ョ', 'ー']
        }
      ]
    };

    // 「ムテキ」という呪文名のテスト
    const result = getHighlightedCellsFromSpellName('ムテキ', fullKanaBoard);

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ rowId: 7, columnIndex: 2 }); // ム
    expect(result[1]).toEqual({ rowId: 4, columnIndex: 3 }); // テ
    expect(result[2]).toEqual({ rowId: 2, columnIndex: 1 }); // キ
  });
});
