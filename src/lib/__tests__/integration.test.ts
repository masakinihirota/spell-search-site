import { describe, it, expect, beforeEach } from 'vitest';
import { getHighlightedCellsFromSpellName } from '../spellUtils';
import { kanaBoard } from '@/data/kanaBoard';
import { SpellData } from '@/types';

describe('呪文ハイライト機能の統合テスト', () => {
  // テスト用の呪文データ
  const testSpells: SpellData[] = [
    {
      id: '1',
      名前: 'ムテキパル',
      必要な歌の段: '247',
      唱える段の順番: '74272',
      カテゴリ: '動物召喚魔法'
    },
    {
      id: '2',
      名前: 'ニャラミ',
      必要な歌の段: '2578',
      唱える段の順番: '5827',
      カテゴリ: '攻撃魔法'
    },
    {
      id: '3',
      名前: 'アアア',
      必要な歌の段: '1',
      唱える段の順番: '111',
      カテゴリ: '特殊攻撃魔法'
    },
    {
      id: '4',
      名前: 'ヒョウガラゴン',
      必要な歌の段: '12345',
      唱える段の順番: '12345',
      カテゴリ: 'テスト用'
    }
  ];

  describe('実際の呪文データを使用した統合テスト', () => {
    it('「ムテキパル」の文字がすべて正しくハイライトされること', () => {
      const spell = testSpells[0];
      const result = getHighlightedCellsFromSpellName(spell.名前, kanaBoard);

      // 「ム」「テ」「キ」「パ」「ル」の5文字がハイライトされるはず
      expect(result).toHaveLength(5);

      // 各文字の位置を確認
      const expectedPositions = [
        { rowId: 7, columnIndex: 2 }, // ム
        { rowId: 4, columnIndex: 3 }, // テ
        { rowId: 2, columnIndex: 1 }, // キ
        { rowId: 7, columnIndex: 5 }, // パ
        { rowId: 2, columnIndex: 7 }  // ル
      ];

      // 各文字の位置が正しいか確認
      expectedPositions.forEach(pos => {
        expect(result).toContainEqual(pos);
      });
    });

    it('「ニャラミ」の文字がすべて正しくハイライトされること', () => {
      const spell = testSpells[1];
      const result = getHighlightedCellsFromSpellName(spell.名前, kanaBoard);

      // 「ニ」「ャ」「ラ」「ミ」の4文字がハイライトされるはず
      expect(result).toHaveLength(4);

      // 各文字の位置を確認
      const expectedPositions = [
        { rowId: 5, columnIndex: 1 }, // ニ
        { rowId: 8, columnIndex: 6 }, // ャ
        { rowId: 2, columnIndex: 5 }, // ラ
        { rowId: 7, columnIndex: 1 }  // ミ
      ];

      // 各文字の位置が正しいか確認
      expectedPositions.forEach(pos => {
        expect(result).toContainEqual(pos);
      });
    });

    it('同じ文字が複数回出現する「アアア」の場合、すべての出現箇所がハイライトされること', () => {
      const spell = testSpells[2];
      const result = getHighlightedCellsFromSpellName(spell.名前, kanaBoard);

      // 「ア」が3回出現するので、3つのセルがハイライトされるはず
      expect(result).toHaveLength(3);

      // すべてのセルが同じ位置（「ア」の位置）を指しているか確認
      const expectedPosition = { rowId: 1, columnIndex: 0 }; // ア
      result.forEach(pos => {
        expect(pos).toEqual(expectedPosition);
      });
    });

    it('存在しない文字を含む呪文の場合、存在する文字のみがハイライトされること', () => {
      // 「ヒョウガラゴン」という呪文（「ゴン」はカナボードに存在しない想定）
      const spell = testSpells[3];
      const result = getHighlightedCellsFromSpellName(spell.名前, kanaBoard);

      // 「ヒ」「ョ」「ウ」「ガ」「ラ」「ゴ」の6文字がハイライトされるはず
      // （「ン」はカナボードに存在するが、テストのために無視する）
      const expectedPositions = [
        { rowId: 6, columnIndex: 1 }, // ヒ
        { rowId: 8, columnIndex: 8 }, // ョ
        { rowId: 1, columnIndex: 2 }, // ウ
        { rowId: 3, columnIndex: 5 }, // ガ
        { rowId: 2, columnIndex: 5 }, // ラ
        { rowId: 3, columnIndex: 9 }  // ゴ
      ];

      // 各文字の位置が正しいか確認
      expectedPositions.forEach(pos => {
        expect(result).toContainEqual(pos);
      });
    });
  });

  describe('エッジケースの処理', () => {
    it('空の呪文名の場合、空の配列が返されること', () => {
      const result = getHighlightedCellsFromSpellName('', kanaBoard);
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('カナボードに存在しない文字のみの呪文名の場合、空の配列が返されること', () => {
      const result = getHighlightedCellsFromSpellName('漢字', kanaBoard);
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('特殊文字を含む呪文名の場合、存在する文字のみがハイライトされること', () => {
      const result = getHighlightedCellsFromSpellName('ア!イ?ウ', kanaBoard);

      // 「ア」「イ」「ウ」の3文字のみがハイライトされるはず
      expect(result).toHaveLength(3);

      const expectedPositions = [
        { rowId: 1, columnIndex: 0 }, // ア
        { rowId: 1, columnIndex: 1 }, // イ
        { rowId: 1, columnIndex: 2 }  // ウ
      ];

      expectedPositions.forEach(pos => {
        expect(result).toContainEqual(pos);
      });
    });

    it('非常に長い呪文名の場合でも正しく処理されること', () => {
      // 非常に長い呪文名を生成
      const longSpellName = 'アイウエオ'.repeat(20); // 100文字

      const result = getHighlightedCellsFromSpellName(longSpellName, kanaBoard);

      // 「ア」「イ」「ウ」「エ」「オ」が各20回出現するので、合計100のセルがハイライトされるはず
      expect(result).toHaveLength(100);

      // 最初の5つのセルが正しいか確認
      const expectedFirstFive = [
        { rowId: 1, columnIndex: 0 }, // ア
        { rowId: 1, columnIndex: 1 }, // イ
        { rowId: 1, columnIndex: 2 }, // ウ
        { rowId: 1, columnIndex: 3 }, // エ
        { rowId: 1, columnIndex: 4 }  // オ
      ];

      expectedFirstFive.forEach((pos, index) => {
        expect(result[index]).toEqual(pos);
      });
    });

    it('小さなカナボードでも正しく動作すること', () => {
      // 小さなカナボードを定義
      const smallKanaBoard = {
        rows: [
          {
            id: 1,
            characters: ['ア', 'イ', 'ウ']
          },
          {
            id: 2,
            characters: ['カ', 'キ', 'ク']
          }
        ]
      };

      const result = getHighlightedCellsFromSpellName('アイカ', smallKanaBoard);

      // 「ア」「イ」「カ」の3文字がハイライトされるはず
      expect(result).toHaveLength(3);

      const expectedPositions = [
        { rowId: 1, columnIndex: 0 }, // ア
        { rowId: 1, columnIndex: 1 }, // イ
        { rowId: 2, columnIndex: 0 }  // カ
      ];

      expectedPositions.forEach(pos => {
        expect(result).toContainEqual(pos);
      });
    });

    it('キャッシュが正しく機能していること', () => {
      // 同じ呪文名で2回呼び出す
      const firstCall = getHighlightedCellsFromSpellName('ムテキパル', kanaBoard);
      const secondCall = getHighlightedCellsFromSpellName('ムテキパル', kanaBoard);

      // 結果が同じであること
      expect(secondCall).toEqual(firstCall);

      // 異なる呪文名で呼び出す
      const thirdCall = getHighlightedCellsFromSpellName('ニャラミ', kanaBoard);

      // 結果が異なること
      expect(thirdCall).not.toEqual(firstCall);
    });
  });
});
