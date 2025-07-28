import { useState, useCallback, useMemo } from 'react';
import { kanaBoard } from '@/data/kanaBoard';
import { getHighlightedCellsFromSpellName } from '@/lib/spellUtils';
import type { HighlightedCell, SpellCast, SpellData } from '@/types';

// スペルの型を統一するヘルパー関数
function getSpellName(spell: SpellCast | SpellData): string {
  return (spell as SpellCast).name || (spell as SpellData).名前 || '';
}

function getRequiredSong(spell: SpellCast | SpellData): string {
  return (spell as SpellCast).requiredSong || (spell as SpellData).必要な歌の段 || '';
}

/**
 * スペルボードの状態を管理するカスタムフック（最適化版）
 * @param initialSpells 初期スペルリスト
 * @returns スペルボード関連の状態と関数
 */
export function useSpellBoard(initialSpells: (SpellCast | SpellData)[] = []) {
  // 選択されたスペル
  const [selectedSpell, setSelectedSpell] = useState<SpellCast | SpellData | null>(null);

  // ハイライトされた行
  const [highlightedRows, setHighlightedRows] = useState<number[]>([]);

  // ハイライトされた列
  const [highlightedColumns, setHighlightedColumns] = useState<number[]>([]);

  // ハイライトされたセル（新しい状態）
  const [highlightedCells, setHighlightedCells] = useState<HighlightedCell[]>([]);

  // スペル選択処理（メモ化）
  const handleSpellSelect = useCallback((spell: SpellCast | SpellData) => {
    if (!spell) {
      return;
    }

    setSelectedSpell(spell);

    // 呪文名からハイライトするセルを特定
    const spellName = getSpellName(spell);
    if (!spellName) {
      console.warn('呪文名が見つかりません:', spell);
      setHighlightedCells([]);
      setHighlightedRows([]);
      setHighlightedColumns([]);
      return;
    }

    const cells = getHighlightedCellsFromSpellName(spellName, kanaBoard);
    setHighlightedCells(cells);

    // 横方向のみのハイライト（行のみ）- Set を使用して重複を排除
    const uniqueRowIds = [...new Set(cells.map(cell => cell.rowId))];
    setHighlightedRows(uniqueRowIds);

    // 縦方向のハイライトは行わない
    setHighlightedColumns([]);
  }, []);

  // 選択解除処理（メモ化）
  const handleClearSelection = useCallback(() => {
    setSelectedSpell(null);
    setHighlightedRows([]);
    setHighlightedColumns([]);
    setHighlightedCells([]);
  }, []);

  // 初期スペルのインデックスをメモ化（行番号からスペルを素早く検索するため）
  const spellsByRow = useMemo(() => {
    const index = new Map<number, (SpellCast | SpellData)[]>();

    initialSpells.forEach(spell => {
      const rows = getRequiredSong(spell).split('').map((char: string) => Number(char));

      rows.forEach((rowId: number) => {
        if (!index.has(rowId)) {
          index.set(rowId, []);
        }
        const spells = index.get(rowId);
        if (spells) {
          spells.push(spell);
        }
      });
    });

    return index;
  }, [initialSpells]);

  // セル選択処理（最適化版）
  const handleCellSelect = useCallback((rowId: number, columnIndex: number) => {
    // 行と列の選択状態を切り替え（イミュータブルな更新）
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

    // ハイライトセルをクリア
    setHighlightedCells([]);

    // 選択された行に一致するスペルを検索（インデックスを使用）
    const matchingSpells = spellsByRow.get(rowId) || [];

    if (matchingSpells.length > 0) {
      setSelectedSpell(matchingSpells[0]);
    }
  }, [spellsByRow]);

  return {
    selectedSpell,
    highlightedRows,
    highlightedColumns,
    highlightedCells,
    handleSpellSelect,
    handleClearSelection,
    handleCellSelect
  };
}
