/** @jsxImportSource react */
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
      }
    ]
  }
}));

describe('KanaBoard', () => {
  it('基本的なレンダリングが正しく行われること', () => {
    render(<KanaBoard />);

    // ヘッダー行が表示されていることを確認
    expect(screen.getByText('行')).toBeInTheDocument();

    // 列番号が表示されていることを確認（複数の要素があるため getAllByText を使用）
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);
    expect(screen.getAllByText('2').length).toBeGreaterThan(0);

    // カナ文字が表示されていることを確認
    expect(screen.getByText('ア')).toBeInTheDocument();
    expect(screen.getByText('カ')).toBeInTheDocument();
  });

  it('行のハイライトが正しく適用されること', () => {
    const highlightedRows = [1];
    render(<KanaBoard highlightedRows={highlightedRows} />);

    // 行がハイライトされていることを確認
    const row = screen.getByText('ア').closest('tr');
    expect(row).toHaveClass('bg-yellow-100');

    // ハイライトされていない行を確認
    const nonHighlightedRow = screen.getByText('カ').closest('tr');
    expect(nonHighlightedRow).not.toHaveClass('bg-yellow-100');
  });

  it('列のハイライトが正しく適用されること', () => {
    const highlightedColumns = [0];
    render(<KanaBoard highlightedColumns={highlightedColumns} />);

    // 列がハイライトされていることを確認
    const cell = screen.getByText('ア').closest('td');
    expect(cell).toHaveClass('bg-yellow-50');
  });

  it('セルのハイライトが正しく適用されること', () => {
    const highlightedCells: HighlightedCell[] = [
      { rowId: 1, columnIndex: 0 } // 「ア」のセル
    ];

    render(<KanaBoard highlightedCells={highlightedCells} />);

    // セルがハイライトされていることを確認
    const cell = screen.getByText('ア').closest('td');
    expect(cell).toHaveClass('bg-yellow-300');
    expect(cell).toHaveClass('font-bold');

    // ハイライトされていないセルを確認
    const nonHighlightedCell = screen.getByText('イ').closest('td');
    expect(nonHighlightedCell).not.toHaveClass('bg-yellow-300');
  });

  it('セルクリック時にコールバックが呼ばれること', () => {
    const onCellClick = vi.fn();
    render(<KanaBoard onCellClick={onCellClick} />);

    // セルをクリック
    const cell = screen.getByText('ア').closest('td');
    cell?.click();

    // コールバックが正しく呼ばれたことを確認
    expect(onCellClick).toHaveBeenCalledWith(1, 0);
  });
});
