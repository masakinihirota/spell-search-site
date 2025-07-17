import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchBox from '../SearchBox';

// モックタイマーを使用
jest.useFakeTimers();

describe('SearchBox', () => {
  beforeEach(() => {
    // localStorage のモック
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  test('正しくレンダリングされること', () => {
    render(<SearchBox onSearch={() => {}} />);

    // 検索ボックスが存在することを確認
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeInTheDocument();

    // 検索ボタンが存在することを確認
    const searchButton = screen.getByLabelText('検索を実行');
    expect(searchButton).toBeInTheDocument();
  });

  test('プレースホルダーが正しく表示されること', () => {
    const placeholder = 'テスト用プレースホルダー';
    render(<SearchBox onSearch={() => {}} placeholder={placeholder} />);

    const searchInput = screen.getByPlaceholderText(placeholder);
    expect(searchInput).toBeInTheDocument();
  });

  test('初期値が正しく設定されること', () => {
    const initialValue = '初期検索値';
    render(<SearchBox onSearch={() => {}} initialValue={initialValue} />);

    const searchInput = screen.getByRole('searchbox') as HTMLInputElement;
    expect(searchInput.value).toBe(initialValue);
  });

  test('入力値が変更されたときにonSearchが呼ばれること（デバウンス後）', () => {
    const onSearchMock = jest.fn();
    render(<SearchBox onSearch={onSearchMock} debounceTime={300} />);

    const searchInput = screen.getByRole('searchbox');

    // 入力値を変更
    fireEvent.change(searchInput, { target: { value: 'テスト' } });

    // デバウンス前はonSearchが呼ばれていないことを確認
    expect(onSearchMock).not.toHaveBeenCalled();

    // デバウンス時間経過
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // onSearchが呼ばれたことを確認
    expect(onSearchMock).toHaveBeenCalledWith('テスト');
  });

  test('フォーム送信時にonSearchが呼ばれること', () => {
    const onSearchMock = jest.fn();
    render(<SearchBox onSearch={onSearchMock} initialValue="テスト" />);

    const form = screen.getByRole('searchbox').closest('form');

    // フォームを送信
    if (form) {
      fireEvent.submit(form);
    }

    // onSearchが呼ばれたことを確認
    expect(onSearchMock).toHaveBeenCalledWith('テスト');
  });

  test('クリアボタンをクリックするとクエリがクリアされること', () => {
    const onSearchMock = jest.fn();
    render(<SearchBox onSearch={onSearchMock} initialValue="テスト" />);

    // クリアボタンをクリック
    const clearButton = screen.getByLabelText('検索をクリア');
    fireEvent.click(clearButton);

    // 入力値がクリアされたことを確認
    const searchInput = screen.getByRole('searchbox') as HTMLInputElement;
    expect(searchInput.value).toBe('');

    // onSearchが空文字で呼ばれたことを確認
    expect(onSearchMock).toHaveBeenCalledWith('');
  });

  test('検索履歴が表示されること', () => {
    // localStorage から検索履歴を取得するモック
    const mockHistory = ['履歴1', '履歴2', '履歴3'];
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue(JSON.stringify(mockHistory));

    const onSearchMock = jest.fn();
    render(<SearchBox onSearch={onSearchMock} />);

    // 検索ボックスにフォーカス
    const searchInput = screen.getByRole('searchbox');
    fireEvent.focus(searchInput);

    // 検索履歴が表示されることを確認
    mockHistory.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test('検索履歴の項目をクリックすると検索が実行されること', () => {
    // localStorage から検索履歴を取得するモック
    const mockHistory = ['履歴1', '履歴2', '履歴3'];
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue(JSON.stringify(mockHistory));

    const onSearchMock = jest.fn();
    render(<SearchBox onSearch={onSearchMock} />);

    // 検索ボックスにフォーカス
    const searchInput = screen.getByRole('searchbox');
    fireEvent.focus(searchInput);

    // 検索履歴の項目をクリック
    const historyItem = screen.getByText('履歴2');
    fireEvent.click(historyItem);

    // onSearchが呼ばれたことを確認
    expect(onSearchMock).toHaveBeenCalledWith('履歴2');

    // 入力値が更新されたことを確認
    expect((searchInput as HTMLInputElement).value).toBe('履歴2');
  });
});
  test('数字ボタンが表示されること', () => {
    render(<SearchBox onSearch={() => {}} />);

    // 数字ボタンが表示されることを確認
    for (let i = 1; i <= 9; i++) {
      const numberButton = screen.getByText(i.toString());
      expect(numberButton).toBeInTheDocument();
    }
  });

  test('数字ボタンをクリックすると選択状態になること', () => {
    const onSearchMock = jest.fn();
    render(<SearchBox onSearch={onSearchMock} />);

    // 数字ボタンをクリック
    const numberButton = screen.getByText('3');
    fireEvent.click(numberButton);

    // ボタンのスタイルが変わることを確認（選択状態）
    expect(numberButton.className).toContain('bg-blue-600');
    expect(numberButton.className).toContain('text-white');

    // onSearchが呼ばれたことを確認（数字が検索クエリに追加される）
    expect(onSearchMock).toHaveBeenCalledWith('3');
  });

  test('複数の数字ボタンをクリックすると検索クエリに追加されること', () => {
    const onSearchMock = jest.fn();
    render(<SearchBox onSearch={onSearchMock} />);

    // 複数の数字ボタンをクリック
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('6'));

    // 最後の呼び出しで正しい検索クエリが使用されたことを確認
    expect(onSearchMock).toHaveBeenLastCalledWith('356');
  });

  test('選択された数字ボタンを再度クリックすると選択が解除されること', () => {
    const onSearchMock = jest.fn();
    render(<SearchBox onSearch={onSearchMock} />);

    // 数字ボタンをクリック
    const numberButton = screen.getByText('3');
    fireEvent.click(numberButton);

    // 再度同じボタンをクリック
    fireEvent.click(numberButton);

    // ボタンのスタイルが元に戻ることを確認（非選択状態）
    expect(numberButton.className).toContain('bg-gray-100');
    expect(numberButton.className).toContain('text-gray-700');

    // onSearchが空文字で呼ばれたことを確認
    expect(onSearchMock).toHaveBeenLastCalledWith('');
  });

  test('クリアボタンをクリックすると選択された数字がすべてクリアされること', () => {
    const onSearchMock = jest.fn();
    render(<SearchBox onSearch={onSearchMock} />);

    // 複数の数字ボタンをクリック
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('6'));

    // クリアボタンをクリック
    const clearButton = screen.getByLabelText('数字フィルターをクリア');
    fireEvent.click(clearButton);

    // すべての数字ボタンが非選択状態になることを確認
    for (let i = 1; i <= 9; i++) {
      const numberButton = screen.getByText(i.toString());
      expect(numberButton.className).toContain('bg-gray-100');
      expect(numberButton.className).toContain('text-gray-700');
    }

    // onSearchが空文字で呼ばれたことを確認
    expect(onSearchMock).toHaveBeenLastCalledWith('');
  });

  test('showNumberButtonsがfalseの場合、数字ボタンが表示されないこと', () => {
    render(<SearchBox onSearch={() => {}} showNumberButtons={false} />);

    // 数字ボタンが表示されないことを確認
    for (let i = 1; i <= 9; i++) {
      expect(screen.queryByText(i.toString())).not.toBeInTheDocument();
    }
  });

  test('テキスト入力と数字ボタンの組み合わせが正しく動作すること', () => {
    const onSearchMock = jest.fn();
    render(<SearchBox onSearch={onSearchMock} />);

    // テキスト入力
    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'テスト' } });

    // デバウンス時間経過
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // 数字ボタンをクリック
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('5'));

    // 最後の呼び出しで正しい検索クエリが使用されたことを確認
    expect(onSearchMock).toHaveBeenLastCalledWith('テスト 35');
  });
