import Link from "next/link";
import Header from "@/components/Header";

/**
 * 使い方ページ
 * このページでは、スペルトナエル検索サイトの機能を説明します。
 */
export default function UsagePage() {
	return (
		<main className="min-h-screen bg-gray-50">
			<Header />

			<div className="container mx-auto px-4 py-8">
				<h1 className="text-2xl font-bold mb-4 text-gray-700">
					使い方(PCで使うことを想定しています。)
				</h1>
				<p className="mb-6 text-gray-700">
					スマホでは非常に使いづらいと思います。
				</p>

				<div className="bg-white rounded-lg shadow-md p-6">
					<ol className="list-decimal pl-6 space-y-4 text-gray-900">
						<li>
							<p>ゲームを開始したら、詩を購入します。</p>
						</li>
						<li>
							<p>購入した歌の番号をクリックすると保存されます。</p>
						</li>
						<li>
							<p>所持している呪文をクリックして持ち物リストに追加します。</p>
						</li>
						<li>
							<p>
								マウスをホバーすると、その呪文がスペルボードでハイライトされます。
							</p>
						</li>
						<li>
							<p>
								ハイライトされた歌は自分の所持している歌と比較して、どれだけ呪文を唱えやすくなるかを調べます。
							</p>
						</li>
						<li>
							<p>
								所持している歌と、呪文に必要な歌が100％一致すると背景色が変わります。
							</p>
						</li>
						<li>
							<p>
								持ち物リストには、一致する歌と、足りない歌が表示されます。
							</p>
						</li>
					</ol>
				</div>
				<h1 className="text-2xl font-bold mb-4">このサイトの機能</h1>
				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-xl font-semibold mb-2 text-gray-900">
						スペルトナエルで遊ぶ機能
					</h2>
					<h2 className="text-xl font-semibold mb-2 text-gray-900">1. 検索機能の利用</h2>
					<p className="mb-4 text-gray-700">
						１文字から、検索ボックスに文字を入力して、該当する呪文を検索できます。
					</p>
					<h2 className="text-xl font-semibold mb-2 text-gray-900">2. 呪文の詳細を見る</h2>
					<p className="mb-4 text-gray-700">
						検索結果から呪文をクリックすると、その呪文が持ち物リストに入ります。
					</p>
					<h2 className="text-xl font-semibold mb-2 text-gray-900">3. お気に入り機能</h2>
					<p className="mb-4 text-gray-700">
						呪文を持ち物リストに追加して、後で簡単にアクセスできます。持ち物リストは最大20個まで保存可能です。それ以上は最も古いものを削除するかの確認が出ます。
					</p>
					<h2 className="text-xl font-semibold mb-2 text-gray-900">
						4. 呪文の持ち物リストを管理
					</h2>
					<p className="mb-4 text-gray-700">
						数字ボタンをクリックして、所持している呪文の状態を管理できます。
					</p>
					<h2 className="text-xl font-semibold mb-2 text-gray-900">5. リセット機能</h2>
					<p className="text-gray-700">
						リセットボタンを使用して、選択した状態をクリアできます。
					</p>
					<h2 className="text-xl font-semibold mb-2 text-gray-900">6. 歌の数字機能</h2>
					<p className="text-gray-700">
						歌の数字をクリックすると、その歌の所持状態を変更できます。
					</p>
				</div>
				{/* topに戻る のリンクボタンを作成 */}
				<Link
					href="/"
					className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition-colors"
				>
					トップに戻る
				</Link>
			</div>
		</main>
	);
}
