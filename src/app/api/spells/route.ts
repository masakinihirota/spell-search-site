import { NextRequest, NextResponse } from 'next/server';
import { getAllSpells, searchSpells, addSpell } from '@/lib/data-utils';
import { SpellCast } from '@/types';

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

    if (query) {
      // 検索クエリがある場合は検索結果を返す
      spells = await searchSpells(query);
    } else {
      // 検索クエリがない場合は全てのスペルを返す
      spells = await getAllSpells();
    }

    return NextResponse.json({ spells }, { status: 200 });
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
    const requiredFields = ['name', 'number', 'effect', 'description', 'category'];
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
