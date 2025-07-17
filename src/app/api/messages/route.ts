import { NextRequest, NextResponse } from 'next/server';
import { getAllMessages, addMessage, getMessagesBySpellId } from '@/lib/data-utils';

/**
 * メッセージ一覧を取得するAPI
 * GET /api/messages
 * クエリパラメータ:
 * - spellId: 特定のスペルに関連するメッセージのみを取得
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const spellId = searchParams.get('spellId');

    let messages;

    if (spellId) {
      // 特定のスペルに関連するメッセージを取得
      messages = await getMessagesBySpellId(spellId);
    } else {
      // 全てのメッセージを取得
      messages = await getAllMessages();
    }

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error('メッセージの取得に失敗しました:', error);
    return NextResponse.json(
      { error: 'メッセージの取得に失敗しました' },
      { status: 500 }
    );
  }
}

/**
 * 新しいメッセージを投稿するAPI
 * POST /api/messages
 */
export async function POST(request: NextRequest) {
  try {
    const messageData = await request.json();

    // 必須フィールドの検証
    if (!messageData.username || !messageData.message) {
      return NextResponse.json(
        { error: 'ユーザー名とメッセージは必須です' },
        { status: 400 }
      );
    }

    // メッセージの長さ制限（500文字）
    if (messageData.message.length > 500) {
      return NextResponse.json(
        { error: 'メッセージは500文字以内にしてください' },
        { status: 400 }
      );
    }

    // メッセージタイプの設定（デフォルトは general）
    if (!messageData.type) {
      messageData.type = messageData.relatedSpellId ? 'spell-related' : 'general';
    }

    const newMessage = await addMessage(messageData);

    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch (error) {
    console.error('メッセージの投稿に失敗しました:', error);
    return NextResponse.json(
      { error: 'メッセージの投稿に失敗しました' },
      { status: 500 }
    );
  }
}
