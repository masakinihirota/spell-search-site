import { useState, useCallback } from 'react';
import { SpellData } from '@/types';

/**
 * スペルボードの状態を管理するカスタムフック
 * @param initialSpells 初期スペルリスト
 * @returns スペルボード関連の状態と関数
 */
export function useSpellBoard(initialSpells: SpellCast[] = []) {
  // 選択されたスペル
  const [selectedSpell, setSelectedSpell] = useState<SpellCast | null>(null);

  // ハイライトされた行
  const [highlightedRows, setHighlightedRows] = useState<number[]>([]);

  // ハイライトされた列
  const [highlightedColumns, setHighlightedColumns] = useState<number[]>([]);

  // スペル選択処理
  const handleSpellSelect = useCallback((spell: SpellCast) => {
    setSelectedSpell(spell);

    // 必要な歌の段の数字を配列に変換してハイライト
    const requiredRows = spell.requiredSong.split('').map(Number);
    setHighlightedRows(requiredRows);

    // 唱える段の順番の数字を配列に変換してハイライト
    const castOrderColumns = spell.castOrder.split('').map(Number).map(n => n - 1);
    setHighlightedColumns(castOrderColumns);
  }, []);

  // 選択解除処理
  const handleClearSelection = useCallback(() => {
    setSelectedSpell(null);
    setHighlightedRows([]);
    setHighlightedColumns([]);
  }, []);

  // セル選択処理
  const handleCellSelect = useCallback((rowId: number, columnIndex: number) => {
    // 行と列の選択状態を切り替え
    setHighlightedRows(prev =>
      prev.includes(rowId)
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    );

    setHighlightedColumns(prev =>
  prev.includes(columnIndex)
        ? prev.filter(idx => idx !== columnIndex)
        : [...prev, columnIndex]
    );

    // 選択された行と列に一致するスペルを検索
    const matchingSpells = initialSpells.filter(spell => {
      const spellRows = spell.requiredSong.split('').map(Number);
      return spellRows.includes(rowId);
    });

    if (matchingSpells.length > 0) {
      setSelectedSpell(matchingSpells[0]);
    }
  }, [initialSpells]);

  return {
    selectedSpell,
    highlightedRows,
    highlightedColumns,
    handleSpellSelect,
    handleClearSelection,
    handleCellSelect
  };
}
