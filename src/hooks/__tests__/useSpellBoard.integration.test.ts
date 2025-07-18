import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as spellUtils from '@/lib/spellUtils';
import { SpellCast } from '@/types';
import { useSpellBoard } from '../useSpellBoard';

// getHighlightedCellsFromSpellName関数をモック化
vi.mock('@/lib/spellUtils', () => ({
  getHighlightedCellsFromSpellName: vi.fn()
}));

describe('useSpellBoard フックの統合テスト', () => {
  // テスト用のスペルデータ
  const testSpells: SpellCast[] = [
    {
      id: '1',
      name: 'ムテキパル',
      requiredSong: '247',
      castOrder: '74272',
      category: '動物召喚魔法',
      tags: [],
      名前: 'ムテキパル',
      必要な歌の段: '247',
      唱える段の順番: '74272'
    },
    {
      id: '2',
      name: 'ニャラミ',
      requiredSong: '2578',
      castOrder: '5827',
      category: '攻撃魔法',
      tags: [],
      名前: 'ニャラミ',
      必要な歌の段: '2578',
      唱える段の順番: '5827'
    }
  ];

  // モックのリセット
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('呪文選択時に正しくハイライトセルが設定されること', () => {
    // モックの戻り値を設定
    const mockHighlightedCells = [
      { rowId: 7, columnIndex: 2 }, // ム
      { rowId: 4, columnIndex: 3 }, // テ
      { rowId: 2, columnIndex: 1 }, // キ
      { rowId: 7, columnIndex: 5 }, // パ
      { rowId: 2, columnIndex: 7 }  // ル
    ];

    (spellUtils.getHighlightedCellsFromSpellName as jest.Mock).mockReturnValue(mockHighlightedCells);

    // フックをレンダリング
    const { result } = renderHook(() => useSpellBoard(testSpells));

    // 初期状態の確認
    expect(result.current.selectedSpell).toBeNull();
    expect(result.current.highlightedRows).toEqual([]);
    expect(result.current.highlightedColumns).toEqual([]);
    expect(result.current.highlightedCells).toEqual([]);

    // 呪文を選択
    act(() => {
      result.current.handleSpellSelect(testSpells[0]);
    });

    // 呪文が選択されたことを確認
    expect(result.current.selectedSpell).toEqual(testSpells[0]);

    // getHighlightedCellsFromSpellName が正しく呼ばれたことを確認
    expect(spellUtils.getHighlightedCellsFromSpellName).toHaveBeenCalledWith('ムテキパル', expect.anything());

    // ハイライトセルが正しく設定されたことを確認
    expect(result.current.highlightedCells).toEqual(mockHighlightedCells);

    // 行のハイライトが正しく設定されたことを確認（重複なし）
    expect(result.current.highlightedRows).toEqual([7, 4, 2]);

    // 列のハイライトは空であることを確認（横方向のみのハイライト）
    expect(result.current.highlightedColumns).toEqual([]);
  });

  it('選択解除時にハイライトがクリアされること', () => {
    // モックの戻り値を設定
    const mockHighlightedCells = [
      { rowId: 7, columnIndex: 2 }, // ム
      { rowId: 4, columnIndex: 3 }  // テ
    ];

    (spellUtils.getHighlightedCellsFromSpellName as jest.Mock).mockReturnValue(mockHighlightedCells);

    // フックをレンダリング
    const { result } = renderHook(() => useSpellBoard(testSpells));

    // 呪文を選択
    act(() => {
      result.current.handleSpellSelect(testSpells[0]);
    });

    // 選択を解除
    act(() => {
      result.current.handleClearSelection();
    });

    // 状態がクリアされたことを確認
    expect(result.current.selectedSpell).toBeNull();
    expect(result.current.highlightedRows).toEqual([]);
    expect(result.current.highlightedColumns).toEqual([]);
    expect(result.current.highlightedCells).toEqual([]);
  });

  it('セル選択時に行と列が正しくハイライトされること', () => {
    // フックをレンダリング
    const { result } = renderHook(() => useSpellBoard(testSpells));

    // セルを選択
    act(() => {
      result.current.handleCellSelect(2, 3);
    });

    // 行と列がハイライトされたことを確認
    expect(result.current.highlightedRows).toEqual([2]);
    expect(result.current.highlightedColumns).toEqual([3]);

    // ハイライトセルは空であることを確認（セル選択時はハイライトセルを使用しない）
    expect(result.current.highlightedCells).toEqual([]);
  });

  it('同じセルを再選択するとハイライトが解除されること', () => {
    // フックをレンダリング
    const { result } = renderHook(() => useSpellBoard(testSpells));

    // セルを選択
    act(() => {
      result.current.handleCellSelect(2, 3);
    });

    // 同じセルを再選択
    act(() => {
      result.current.handleCellSelect(2, 3);
    });

    // ハイライトが解除されたことを確認
    expect(result.current.highlightedRows).toEqual([]);
    expect(result.current.highlightedColumns).toEqual([]);
  });

  it('異なる呪文を連続して選択した場合、ハイライトが正しく更新されること', () => {
    // 1つ目の呪文のモック戻り値
    const mockHighlightedCells1 = [
      { rowId: 7, columnIndex: 2 }, // ム
      { rowId: 4, columnIndex: 3 }  // テ
    ];

    // 2つ目の呪文のモック戻り値
    const mockHighlightedCells2 = [
      { rowId: 5, columnIndex: 1 }, // ニ
      { rowId: 8, columnIndex: 6 }  // ャ
    ];

    // モックの戻り値を設定（呼び出し順に応じて異なる値を返す）
    (spellUtils.getHighlightedCellsFromSpellName as jest.Mock)
      .mockReturnValueOnce(mockHighlightedCells1)
      .mockReturnValueOnce(mockHighlightedCells2);

    // フックをレンダリング
    const { result } = renderHook(() => useSpellBoard(testSpells));

    // 1つ目の呪文を選択
    act(() => {
      result.current.handleSpellSelect(testSpells[0]);
    });

    // 1つ目の呪文のハイライトを確認
    expect(result.current.highlightedCells).toEqual(mockHighlightedCells1);
    expect(result.current.highlightedRows).toEqual([7, 4]);

    // 2つ目の呪文を選択
    act(() => {
      result.current.handleSpellSelect(testSpells[1]);
    });

    // 2つ目の呪文のハイライトを確認
    expect(result.current.highlightedCells).toEqual(mockHighlightedCells2);
    expect(result.current.highlightedRows).toEqual([5, 8]);
  });

  it('日本語フィールド名と英語フィールド名の互換性が正しく機能すること', () => {
    // 日本語フィールド名のみを持つスペル
    const japaneseOnlySpell: SpellCast = {
      id: '3',
      名前: 'テスト呪文',
      必要な歌の段: '123',
      唱える段の順番: '321',
      category: 'テスト',
      tags: []
    };

    // 英語フィールド名のみを持つスペル
    const englishOnlySpell: SpellCast = {
      id: '4',
      name: 'テスト呪文2',
      requiredSong: '456',
      castOrder: '654',
      category: 'テスト2',
      tags: []
    };

    // モックの戻り値を設定
    const mockHighlightedCells = [{ rowId: 1, columnIndex: 1 }];
    (spellUtils.getHighlightedCellsFromSpellName as jest.Mock).mockReturnValue(mockHighlightedCells);

    // フックをレンダリング
    const { result } = renderHook(() => useSpellBoard([japaneseOnlySpell, englishOnlySpell]));

    // 日本語フィールド名のみのスペルを選択
    act(() => {
      result.current.handleSpellSelect(japaneseOnlySpell);
    });

    // 正しく処理されたことを確認
    expect(spellUtils.getHighlightedCellsFromSpellName).toHaveBeenCalledWith('テスト呪文', expect.anything());

    // 英語フィールド名のみのスペルを選択
    act(() => {
      result.current.handleSpellSelect(englishOnlySpell);
    });

    // 正しく処理されたことを確認
    expect(spellUtils.getHighlightedCellsFromSpellName).toHaveBeenCalledWith('テスト呪文2', expect.anything());
  });
});
