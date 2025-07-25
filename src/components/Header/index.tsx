import Link from "next/link";
import type React from "react";

/**
 * ヘッダーコンポーネント
 * サイトのヘッダー部分を表示する
 */
const Header: React.FC = () => {
	return (
		<header className="bg-white shadow-md">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<div className="flex items-center">
					<Link href="/">
						<h1 className="text-2xl font-bold text-blue-600">
							スペルトナエル{" "}
						</h1>
					</Link>
					<h2 className=" text-blue-600">_歌ビルド用呪文検索</h2>
					<span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
						Beta
					</span>
					<span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
						ver1.9.0に対応
					</span>
					<a
						href="https://vns-masakinihirota.vercel.app/"
						className="ml-2 text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="次回作: masakinihirota"
					>
						<span className="text-xs text-gray-500 mr-1 hidden sm:inline"></span>
						次回作:masakinihirota(開発中)
					</a>
				</div>

				<div className="flex items-center">
					<a
						href="/usage"
						className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center mr-4"
						aria-label="使い方ページ"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="mr-1"
						>
							<title>Usage Icon</title>
							<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
						</svg>
						<span className="hidden sm:inline">使い方</span>
					</a>
					<a
						href="https://github.com/masakinihirota/spell-search-site"
						className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHubリポジトリ: masakinihirota/spell-search-site"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="mr-1"
						>
							<title>GitHub Icon</title>
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
						</svg>
						<span className="hidden sm:inline">GitHub</span>
					</a>
				</div>
			</div>
		</header>
	);
};

export default Header;
