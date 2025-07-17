import { NextRequest, NextResponse } from 'next/server';
import { deleteMessage } from '@/lib/data-utils';

/**
 * 特定のメッセージを削除するAPI
 * DELETE /api/messages/[id]
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const success = await deleteMessage(id);

    if (!success) {
      return NextResponse.json(
        { error: '指定されたIDのメッセージが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('メッセージの削除に失敗しました:', error);
    return NextResponse.json(
      { error: 'メッセージの削除に失敗しました' },
      { status: 500 }
    );
  }
}
