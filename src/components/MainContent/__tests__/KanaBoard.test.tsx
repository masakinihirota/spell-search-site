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

  it('行番号のスタイリングが正しく適用されること', () => {
    render(<KanaBoard />);

    // 行番号セルを取得
    const rowNumberCell = screen.getAllByText('1')[0].closest('td');

    // 行番号セルに適切なスタイリングが適用されていることを確認
    expect(rowNumberCell).toHaveClass('font-extrabold');
    expect(rowNumberCell).toHaveClass('bg-gray-100');
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

    // ハイライトされた行の行番号セルが正しくスタイリングされていることを確認
    const highlightedRowNumberCell = screen.getAllByText('1')[0].closest('td');
    expect(highlightedRowNumberCell).toHaveClass('bg-yellow-200');
    expect(highlightedRowNumberCell).toHaveClass('text-black');
    expect(highlightedRowNumberCell).toHaveClass('ring-2');
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

  it('所持呪文の行番号が正しくスタイリングされること', () => {
    const activeNumberButtons = [1];
    render(<KanaBoard activeNumberButtons={activeNumberButtons} />);

    // 所持呪文の行番号セルを取得
    const activeRowNumberCell = screen.getAllByText('1')[0].closest('td');

    // 所持呪文の行番号セルに適切なスタイリングが適用されていることを確認
    expect(activeRowNumberCell).toHaveClass('ring-2');
    expect(activeRowNumberCell).toHaveClass('ring-red-500');

    // 所持していない呪文の行番号セルを取得
    const inactiveRowNumberCell = screen.getAllByText('2')[0].closest('td');

    // 所持していない呪文の行番号セルには特別なスタイリングが適用されていないことを確認
    expect(inactiveRowNumberCell).not.toHaveClass('ring-red-500');
  });

  it('行番号クリック時にコールバックが呼ばれること', () => {
    const onRowNumberClick = vi.fn();
    render(<KanaBoard onRowNumberClick={onRowNumberClick} />);

    // 行番号セルを取得
    const rowNumberCell = screen.getAllByText('1')[0].closest('td');

    // 行番号セルをクリック
    rowNumberCell?.click();

    // コールバックが正しく呼ばれたことを確認
    expect(onRowNumberClick).toHaveBeenCalledWith(1);
  });
});
