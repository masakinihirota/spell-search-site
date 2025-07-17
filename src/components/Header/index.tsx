import React from 'react';
import Link from 'next/link';

/**
 * ヘッダーコンポーネント
 * サイトのタイトルと基本的なナビゲーションを表示
 */
const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          スペルトナエル歌の検索
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="hover:text-gray-300">
            ホーム
          </Link>
          <Link href="/chat" className="hover:text-gray-300">
            掲示板
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
