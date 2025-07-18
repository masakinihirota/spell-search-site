/** @jsxImportSource react */
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../page';

// モックの設定
vi.mock('@/components/Header', () => ({
  default: () => <div data-testid="mock-header">Header</div>
}));

vi.mock('@/components/search/SearchContainer', () => ({
  default: ({ onSearchResults }: any) => (
    <div data-testid="mock-search-container">
      <button onClick={() => onSearchResults([])}>Search</button>
    </div>
  )
}));

vi.mock('@/components/search/SearchResults', () => ({
  default: ({ onSpellSelect }: any) => (
    <div data-testid="mock-search-results">
      <button onClick={() => onSpellSelect({ id: '1', 名前: 'テスト', 必要な歌の段: '123' })}>
        Select Spell
      </button>
    </div>
  )
}));

vi.mock('@/components/MainContent/KanaBoard', () => ({
  default: ({ onRowNumberClick }: any) => (
    <div data-testid="mock-kana-board">
      <button data-testid="row-number-1" onClick={() => onRowNumberClick && onRowNumberClick(1)}>
        Row 1
      </button>
      <button data-testid="row-number-2" onClick={() => onRowNumberClick && onRowNumberClick(2)}>
        Row 2
      </button>
    </div>
  )
}));

vi.mock('@/hooks/useSpellBoard', () => ({
  useSpellBoard: () => ({
    highlightedRows: [],
    highlightedColumns: [],
    highlightedCells: [],
    handleCellSelect: vi.fn(),
    handleSpellSelect: vi.fn()
  })
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn()
  }),
  useSearchParams: () => ({
    get: vi.fn()
  })
}));

// APIからのデータ取得をモック
global.fetch = vi.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve({ spells: [] })
  })
);

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('数字ボタンのクリックで所持状態が切り替わること', async () => {
    render(<Home />);

    // 数字ボタンを取得
    const numberButtons = await screen.findAllByRole('button');
    const button1 = numberButtons.find(button => button.textContent === '1');

    // 数字ボタンをクリック
    if (button1) {
      fireEvent.click(button1);
    }

    // 数字ボタンのスタイルが変わっていることを確認
    expect(button1).toHaveClass('bg-blue-600');
    expect(button1).toHaveClass('text-white');

    // もう一度クリックして所持状態を解除
    if (button1) {
      fireEvent.click(button1);
    }

    // 数字ボタンのスタイルが元に戻っていることを確認
    expect(button1).not.toHaveClass('bg-blue-600');
    expect(button1).not.toHaveClass('text-white');
  });

  it('スペルボードの行番号クリックで所持状態が切り替わること', async () => {
    render(<Home />);

    // スペルボードの行番号ボタンを取得
    const rowNumberButton = await screen.findByTestId('row-number-1');

    // 行番号ボタンをクリック
    fireEvent.click(rowNumberButton);

    // 数字ボタンを取得
    const numberButtons = await screen.findAllByRole('button');
    const button1 = numberButtons.find(button => button.textContent === '1');

    // 数字ボタンのスタイルが変わっていることを確認（所持状態になっている）
    expect(button1).toHaveClass('bg-blue-600');
    expect(button1).toHaveClass('text-white');

    // もう一度行番号ボタンをクリックして所持状態を解除
    fireEvent.click(rowNumberButton);

    // 数字ボタンのスタイルが元に戻っていることを確認
    expect(button1).not.toHaveClass('bg-blue-600');
    expect(button1).not.toHaveClass('text-white');
  });
});
