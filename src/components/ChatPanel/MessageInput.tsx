import React, { useState, useCallback } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  relatedSpellId?: string;
}

/**
 * メッセージ入力コンポーネント
 * 掲示板メッセージの入力と送信機能を提供
 */
const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, relatedSpellId }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (message.trim()) {
        onSendMessage(message);
        setMessage('');
      }
    },
    [message, onSendMessage]
  );

  return (
    <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
      {relatedSpellId && (
        <div className="mb-2 text-sm text-blue-600">
          スペル「{relatedSpellId}」について投稿中
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力..."
          className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          送信
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
