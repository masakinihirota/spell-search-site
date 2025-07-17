# 検索ボックスコンポーネント

このディレクトリには、スペルトナエル検索サイトの検索機能に関連するコンポーネントが含まれています。

## SearchBox

`SearchBox`コンポーネントは、ユーザーが入力した検索クエリをデバウンスして親コンポーネントに通知する機能を提供します。

### 特徴

- リアルタイム検索（デバウンス機能付き）
- 検索履歴の保存と表示
- アクセシビリティ対応
- モバイルフレンドリーなデザイン
- カスタマイズ可能なプレースホルダーとデバウンス時間

### 使用方法

```tsx
import SearchBox from '@/components/Header/SearchBox';

// 基本的な使用方法
<SearchBox onSearch={(query) => console.log('検索クエリ:', query)} />

// すべてのプロパティを指定
<SearchBox
  onSearch={(query) => console.log('検索クエリ:', query)}
  placeholder="カスタムプレースホルダー"
  initialValue="初期検索値"
  debounceTime={500}
  showHint={false}
  className="custom-class"
/>
```

### プロパティ

| プロパティ名 | 型 | 必須 | デフォルト値 | 説明 |
|------------|-----|------|------------|------|
| onSearch | (query: string) => void | はい | - | 検索クエリが変更されたときに呼び出されるコールバック関数 |
| placeholder | string | いいえ | '呪文名、必要な歌の段、効果などで検索...' | 検索ボックスのプレースホルダーテキスト |
| initialValue | string | いいえ | '' | 検索ボックスの初期値 |
| debounceTime | number | いいえ | 300 | 検索クエリの変更からonSearchが呼び出されるまでの遅延時間（ミリ秒） |
| showHint | boolean | いいえ | true | ヒントテキストを表示するかどうか |
| className | string | いいえ | '' | コンポーネントのルート要素に追加するCSSクラス |
| showNumberButtons | boolean | いいえ | true | 数字ボタンを表示するかどうか |

## useSearchBox

`useSearchBox`カスタムフックは、検索ボックスの状態と機能を管理するためのフックです。

### 使用方法

```tsx
import useSearchBox from '@/hooks/useSearchBox';

const MyComponent = () => {
  const {
    query,
    setQuery,
    debouncedQuery,
    isSearching,
    searchHistory,
    clearQuery,
    saveToHistory
  } = useSearchBox({
    initialQuery: '初期検索値',
    debounceTime: 300,
    onSearch: (query) => {
      // 検索処理
    }
  });

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={clearQuery}>クリア</button>
      <button onClick={() => saveToHistory(query)}>履歴に保存</button>
    </div>
  );
};
```

### 返り値

| プロパティ名 | 型 | 説明 |
|------------|-----|------|
| query | string | 現在の検索クエリ |
| setQuery | (query: string) => void | 検索クエリを設定する関数 |
| debouncedQuery | string | デバウンス後の検索クエリ |
| isSearching | boolean | 検索中かどうか |
| searchHistory | string[] | 検索履歴 |
| clearQuery | () => void | 検索クエリをクリアする関数 |
| saveToHistory | (query: string) => void | 検索クエリを履歴に保存する関数 |

## 実装の詳細

### デバウンス処理

ユーザーが入力を停止してから一定時間（デフォルトでは300ミリ秒）経過後に検索処理を実行します。これにより、ユーザーが入力中に検索処理が実行されることを防ぎ、パフォーマンスを向上させます。

### 数字ボタンによるフィルタリング

数字ボタン（1〜9）を提供し、ユーザーが必要な歌の段に含まれる数字でスペルをフィルタリングできるようにします。

- ボタンをクリックすると、その数字が検索クエリに追加されます
- 複数の数字を選択して、複数の数字を含むスペルを検索できます
- 選択された数字は視覚的にハイライト表示されます
- 選択された数字を再度クリックすると選択が解除されます
- クリアボタンですべての選択をリセットできます

### 検索履歴

ローカルストレージを使用して、ユーザーの検索履歴を保存します。最大5件の履歴を保存し、重複する検索クエリは自動的に削除されます。

### アクセシビリティ

- 適切なARIA属性を使用
- キーボードナビゲーションのサポート
- 高コントラストのデザイン

### モバイル対応

- レスポンシブデザイン
- タッチフレンドリーなUIコンポーネント
- モバイルデバイスでの使いやすさを考慮した設計
