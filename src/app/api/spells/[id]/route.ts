import { NextRequest, NextResponse } from 'next/server';
import { getSpellById, updateSpell, deleteSpell } from '@/lib/data-utils';
import fs from 'fs/promises';
import path from 'path';
import { SpellCast } from '@/types';

/**
 * 特定のスペルを取得するAPI
 * GET /api/spells/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const spell = await getSpellById(id);

    if (!spell) {
      return NextResponse.json(
        { error: '指定されたIDのスペルが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({ spell }, { status: 200 });
  } catch (error) {
    console.error('スペルデータの取得に失敗しました:', error);
    return NextResponse.json(
      { error: 'スペルデータの取得に失敗しました' },
      { status: 500 }
    );
  }
}

/**
 * 特定のスペルを更新するAPI（管理者用）
 * PUT /api/spells/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const updatedSpellData = await request.json();

    const updatedSpell = await updateSpell(id, updatedSpellData);

    if (!updatedSpell) {
      return NextResponse.json(
        { error: '指定されたIDのスペルが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({ spell: updatedSpell }, { status: 200 });
  } catch (error) {
    console.error('スペルの更新に失敗しました:', error);
    return NextResponse.json(
      { error: 'スペルの更新に失敗しました' },
      { status: 500 }
    );
  }
}

/**
 * 特定のスペルを削除するAPI（管理者用）
 * DELETE /api/spells/[id]
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const success = await deleteSpell(id);

    if (!success) {
      return NextResponse.json(
        { error: '指定されたIDのスペルが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('スペルの削除に失敗しました:', error);
    return NextResponse.json(
      { error: 'スペルの削除に失敗しました' },
      { status: 500 }
    );
  }
}
