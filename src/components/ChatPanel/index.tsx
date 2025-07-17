import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { ChatMessage } from '@/types';

interface ChatPanelProps {
  relatedSpellId?: string;
}

/**
 * 掲示板パネルコンポーネント
 * メッセージリストと入力フォームを含む掲示板UI
 */
const ChatPanel: React.FC<ChatPanelProps> = ({ relatedSpellId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // メッセージ読み込み（実際の実装ではAPIから取得）
  useEffect(() => {
    // 仮のデータ取得処理（後でAPIに置き換え）
    const fetchMessages = async () => {
      try {
        setLoading(true);
        // 実際の実装ではAPIからデータを取得
        // const response = await fetch('/api/messages');
        // const data = await response.json();

        // 仮のデータ
        const dummyMessages: ChatMessage[] = [
          {
            id: '1',
            username: 'ユーザー1',
            message: 'こんにちは！',
            timestamp: new Date().toISOString(),
            type: 'general'
          },
          {
            id: '2',
            username: 'ユーザー2',
            message: '火の玉の使い方について教えてください',
            timestamp: new Date().toISOString(),
            relatedSpellId: '1',
            type: 'spell-related'
          }
        ];

        setMessages(dummyMessages);
      } catch (error) {
        console.error('メッセージの取得に失敗しました', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // メッセージ送信処理（実際の実装ではAPIに送信）
  const handleSendMessage = async (messageText: string) => {
    try {
      // 新しいメッセージオブジェクトを作成
      const newMessage: ChatMessage = {
        id: `temp-${Date.now()}`, // 仮のID（実際の実装ではサーバーが生成）
        username: 'あなた', // 仮のユーザー名（実際の実装では認証情報から取得）
        message: messageText,
        timestamp: new Date().toISOString(),
        relatedSpellId,
        type: relatedSpellId ? 'spell-related' : 'general'
      };

      // 仮の実装：メッセージをローカルステートに追加
      setMessages(prev => [...prev, newMessage]);

      // 実際の実装ではAPIにメッセージを送信
      // await fetch('/api/messages', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newMessage)
      // });
    } catch (error) {
      console.error('メッセージの送信に失敗しました', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow-md">
      <div className="p-4 border-b bg-white">
        <h2 className="text-xl font-semibold">
          {relatedSpellId ? `スペル「${relatedSpellId}」の掲示板` : '掲示板'}
        </h2>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <MessageList messages={messages} />
      )}

      <MessageInput onSendMessage={handleSendMessage} relatedSpellId={relatedSpellId} />
    </div>
  );
};

export default ChatPanel;
