'use client';

import React from 'react';
import Header from '@/components/Header';
import ChatPanel from '@/components/ChatPanel';

/**
 * 掲示板ページコンポーネント
 * スペルトナエルに関する掲示板機能を提供
 */
export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">スペルトナエル掲示板</h1>
        <p className="text-center text-gray-600 mb-8">
          スペルトナエルについて他のプレイヤーと情報交換しましょう
        </p>

        <div className="max-w-4xl mx-auto h-[600px]">
          <ChatPanel />
        </div>
      </div>
    </main>
  );
}
