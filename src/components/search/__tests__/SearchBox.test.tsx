import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchBox from '../SearchBox';

// モックタイマーを使用
jest.useFakeTimers();

describe('SearchBox', () => {
  test('正しくレンダリングされること', () => {
    render(<SearchBox onSearch={() => {}} />);

    // 検索ボックスが存在することを確認
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeInTheDocument();

    // 検索ボタンが存在することを確認
    const searchButton = screen.getByRole('button', { name: /検索/i });
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

  test('連続入力時に最後の入力だけでonSearchが呼ばれること', () => {
    const onSearchMock = jest.fn();
    render(<SearchBox onSearch={onSearchMock} debounceTime={300} />);

    const searchInput = screen.getByRole('searchbox');

    // 連続して入力値を変更
    fireEvent.change(searchInput, { target: { value: 'あ' } });

    // 少し待機
    act(() => {
      jest.advanceTimersByTime(100);
    });

    fireEvent.change(searchInput, { target: { value: 'あい' } });

    // 少し待機
    act(() => {
      jest.advanceTimersByTime(100);
    });

    fireEvent.change(searchInput, { target: { value: 'あいう' } });

    // デバウンス時間経過
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // 最後の入力値でonSearchが呼ばれたことを確認
    expect(onSearchMock).toHaveBeenCalledWith('あいう');
    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });
});
