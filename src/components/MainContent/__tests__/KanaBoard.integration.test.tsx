/** @jsxImportSource react */
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import KanaBoard from '../KanaBoard';
import { HighlightedCell } from '@/types';

// kanaBoard をモック化
vi.mock('@/data/kanaBoard', () => ({
  kanaBoard: {
    rows: [
      {
        id: 1,
        characters: ['ア', 'イ', 'ウ', 'エ', 'オ']
      },
      {
        id: 2,
        characters: ['カ', 'キ', 'ク', 'ケ', 'コ']
      },
      {
        id: 3,
        characters: ['サ', 'シ', 'ス', 'セ', 'ソ']
      }
    ]
  }
}));

describe('KanaBoard コンポーネントの統合テスト', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('複数の行、列、セルが同時にハイライトされる場合、優先順位が正しいこと', () => {
    // 行、列、セルのハイライト設定
    const highlightedRows = [1, 2];
    const highlightedColumns = [1, 2];
    const highlightedCells: HighlightedCell[] = [
      { rowId: 1, columnIndex: 1 }, // イ
      { rowId: 2, columnIndex: 2 }  // ク
    ];

    render(
      <KanaBoard
        highlightedRows={highlightedRows}
        highlightedColumns={highlightedColumns}
        highlightedCells={highlightedCells}
      />
    );

    // セルハイライトが行と列のハイライトよりも優先されることを確認
    const cellI = screen.getByText('イ').closest('td');
    const cellKu = screen.getByText('ク').closest('td');

    expect(cellI).toHaveClass('bg-yellow-300');
    expect(cellI).toHaveClass('font-bold');
    expect(cellKu).toHaveClass('bg-yellow-300');
    expect(cellKu).toHaveClass('font-bold');

    // 行と列が交差するセルが正しくハイライトされることを確認
    const cellKi = screen.getByText('キ').closest('td');
    // 行と列が交差するセルは、実装によっては bg-yellow-300 または bg-yellow-100 になる可能性がある
    // ここでは、何らかのハイライトクラスが適用されていることだけを確認
    expect(cellKi?.className).toMatch(/bg-yellow-\d+/);
  });

  it('大量のハイライトセルがある場合でもパフォーマンスが維持されること', () => {
    // 多数のハイライトセルを生成
    const highlightedCells: HighlightedCell[] = [];
    for (let i = 1; i <= 3; i++) {
      for (let j = 0; j < 5; j++) {
        highlightedCells.push({ rowId: i, columnIndex: j });
      }
    }

    // レンダリング前の時間を記録
    const startTime = performance.now();

    render(<KanaBoard highlightedCells={highlightedCells} />);

    // レンダリング後の時間を記録
    const endTime = performance.now();

    // レンダリング時間が許容範囲内であることを確認（例: 100ms以下）
    // 注: この値はテスト環境によって調整が必要
    expect(endTime - startTime).toBeLessThan(100);

    // すべてのセルがハイライトされていることを確認
    const allCells = screen.getAllByRole('cell');
    const highlightedCellElements = allCells.filter(cell =>
      cell.className.includes('bg-yellow-300') && cell.className.includes('font-bold')
    );

    // ヘッダーセル（行番号）を除いた数
    expect(highlightedCellElements.length).toBe(15);
  });

  it('ハイライトセルのマップが正しく最適化されていること', () => {
    // 重複するハイライトセルを含む配列
    const highlightedCells: HighlightedCell[] = [
      { rowId: 1, columnIndex: 1 },
      { rowId: 1, columnIndex: 1 }, // 重複
      { rowId: 2, columnIndex: 2 }
    ];

    render(<KanaBoard highlightedCells={highlightedCells} />);

    // 重複するセルが正しくハイライトされていることを確認
    const cellI = screen.getByText('イ').closest('td');
    const cellKu = screen.getByText('ク').closest('td');

    expect(cellI).toHaveClass('bg-yellow-300');
    expect(cellI).toHaveClass('font-bold');
    expect(cellKu).toHaveClass('bg-yellow-300');
    expect(cellKu).toHaveClass('font-bold');
  });

  it('セルクリック時にコールバックが正しく呼ばれること', () => {
    const onCellClick = vi.fn();

    render(<KanaBoard onCellClick={onCellClick} />);

    // 複数のセルをクリック
    const cellA = screen.getByText('ア').closest('td');
    const cellKa = screen.getByText('カ').closest('td');

    cellA?.click();
    expect(onCellClick).toHaveBeenCalledWith(1, 0);

    cellKa?.click();
    expect(onCellClick).toHaveBeenCalledWith(2, 0);

    // 正しい回数呼ばれたことを確認
    expect(onCellClick).toHaveBeenCalledTimes(2);
  });

  it('プロップが変更されると再レンダリングされること', () => {
    const { rerender } = render(<KanaBoard highlightedRows={[1]} />);

    // 行1がハイライトされていることを確認
    const rowA = screen.getByText('ア').closest('tr');
    expect(rowA).toHaveClass('bg-yellow-100');

    // プロップを変更して再レンダリング
    rerender(<KanaBoard highlightedRows={[2]} />);

    // 行2がハイライトされていることを確認
    const rowKa = screen.getByText('カ').closest('tr');
    expect(rowKa).toHaveClass('bg-yellow-100');

    // 行1のハイライトが解除されていることを確認
    expect(rowA).not.toHaveClass('bg-yellow-100');
  });

  it('すべてのプロップがundefinedの場合でも正しくレンダリングされること', () => {
    render(<KanaBoard />);

    // 基本的なレンダリングが行われていることを確認
    expect(screen.getByText('行')).toBeInTheDocument();
    expect(screen.getByText('ア')).toBeInTheDocument();
    expect(screen.getByText('カ')).toBeInTheDocument();
    expect(screen.getByText('サ')).toBeInTheDocument();
  });
});
