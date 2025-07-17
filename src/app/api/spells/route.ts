import { NextRequest, NextResponse } from 'next/server';
import { getAllSpells, addSpell } from '@/lib/data-utils';
import { searchSpells as searchSpellsUtil } from '@/lib/searchUtils';
import { SpellCast, SpellData } from '@/types';

/**
 * スペル一覧を取得するAPI
 * GET /api/spells
 * クエリパラメータ:
 * - q: 検索クエリ
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';

    let spells: SpellCast[];

    // 全てのスペルを取得
    const allSpells = await getAllSpells();

    if (query) {
      // 検索クエリがある場合は検索結果を返す
      spells = searchSpellsUtil(allSpells, query);
    } else {
      // 検索クエリがない場合は全てのスペルを返す
      spells = allSpells;
    }

    // SpellCast型からSpellData型に変換
    const spellsData: SpellData[] = spells.map(spell => ({
      id: spell.id,
      名前: spell.name || spell.名前 || '',
      必要な歌の段: spell.requiredSong || spell.必要な歌の段 || '',
      唱える段の順番: spell.castOrder || spell.唱える段の順番 || '',
      カテゴリ: spell.category || spell.カテゴリ || '',
      説明: spell.description || spell.説明 || '',
      タグ: spell.tags || spell.タグ || []
    }));

    return NextResponse.json({ spells: spellsData }, { status: 200 });
  } catch (error) {
    console.error('スペルデータの取得に失敗しました:', error);
    return NextResponse.json(
      { error: 'スペルデータの取得に失敗しました' },
      { status: 500 }
    );
  }
}

/**
 * 新しいスペルを追加するAPI（管理者用）
 * POST /api/spells
 */
export async function POST(request: NextRequest) {
  try {
    const newSpellData = await request.json();

    // 必須フィールドの検証
    const requiredFields = ['name', 'requiredSong', 'castOrder', 'effect', 'description', 'category'];
    for (const field of requiredFields) {
      if (!newSpellData[field]) {
        return NextResponse.json(
          { error: `${field} は必須フィールドです` },
          { status: 400 }
        );
      }
    }

    const newSpell = await addSpell(newSpellData);

    return NextResponse.json({ spell: newSpell }, { status: 201 });
  } catch (error) {
    console.error('スペルの追加に失敗しました:', error);
    return NextResponse.json(
      { error: 'スペルの追加に失敗しました' },
      { status: 500 }
    );
  }
}
