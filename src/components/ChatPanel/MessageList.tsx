import React from 'react';
import { ChatMessage } from '@/types';

interface MessageListProps {
  messages: ChatMessage[];
}

/**
 * メッセージリストコンポーネント
 * 掲示板メッセージの一覧を表示
 */
const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          メッセージはまだありません
        </div>
      ) : (
        messages.map((message) => (
          <div key={message.id} className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-medium">{message.username}</span>
              <span className="text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleString('ja-JP')}
              </span>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm mt-1">
              <p className="whitespace-pre-line">{message.message}</p>
              {message.relatedSpellId && (
                <div className="mt-2 text-xs text-blue-600">
                  関連スペル: {message.relatedSpellId}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
