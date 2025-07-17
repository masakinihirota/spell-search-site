import React from 'react';

/**
 * ヘッダーコンポーネント
 * サイトのヘッダー部分を表示する
 */
const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">スペルトナエル検索</h1>
          <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Beta</span>
        </div>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                ホーム
              </a>
            </li>
            <li>
              <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                使い方
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
