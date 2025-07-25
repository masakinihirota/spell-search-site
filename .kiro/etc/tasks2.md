# 実装計画

- [ ] **1. 基礎構造のセットアップ**
    - [ ] 1.1. `src/types/index.ts` に `SongMatchingResult` 型を定義する。
        - `possessedDigits: string`
        - `missingDigits: string`
        - `matchingPercentage: number`
        - _要件: 1.1, 2.1, 3.1_
    - [ ] 1.2. `src/types/index.ts` にキャッシュ用の型 `MatchingCache` (Map<string, SongMatchingResult>) を定義する。

- [ ] **2. マッチング計算ロジックの実装**
    - [ ] 2.1. `src/lib/songUtils.ts` ファイルを作成し、マッチング計算ユーティリティを実装する。
        - `calculateSongMatching(requiredSong: string, possessedSong: string): SongMatchingResult` 関数を実装する。
        - 所持数字、不足数字、マッチング率を計算して返すロジックを実装する。
        - _要件: 1.2, 1.3, 2.2, 2.3_
    - [ ] 2.2. `src/lib/__tests__/songUtils.test.ts` を作成し、計算ロジックの単体テストを実装する。
        - 正常系（完全一致、部分一致、不一致）のテストケースを作成する。
        - エッジケース（空文字列、重複��字など）のテストケースを作成する。

- [ ] **3. キャッシュと状態管理の実装**
    - [ ] 3.1. `src/lib/spellMatchingCache.ts` を作成し、`SpellMatchingCache` シングルトンクラスを実装する。
        - 全呪文リストを保持し、`rebuildCache(possessedSong: string)` メソッドで全呪文のマッチング結果を再計算してキャッシュする。
        - アプリケーション起動時に所持歌 `''` で初期キャッシュを構築する `initialize` メソッドを実装する。
        - _要件: 3.2_
    - [ ] 3.2. `src/hooks/usePossession.ts` を作成し、`usePossessionManager` フックを実装する。
        - 所持している歌の文字列 (`possessedSong`) を state として管理する。
        - 所持歌が変更されたら、0.5秒のデバウンスをかけて `SpellMatchingCache` の `rebuildCache` を呼び出す。
        - 計算中の状態 `isCalculating` を管理する。
        - _要件: 3.2_

- [ ] **4. 表示コンポーネントの実装**
    - [ ] 4.1. `src/components/spellDetail/SongMatchingDisplay.tsx` ファイルを作成し、`SongMatchingDisplay` コンポーネントを実装する。
        - `spellId` を props として受け取り、`SpellMatchingCache` からマッチング結果を取得して表示する。
        - 所持数字、不足数字、マッチング率を横並びで表示する。
        - _要件: 3.1, 3.3, 4.1_
    - [ ] 4.2. マッチング率に応じて背景色を変更するロジックを実装する。
        - 0%, 1-49%, 50-74%, 75-99%, 100% の各段階で色が変わるようにする。
        - 100% の場合は太い枠線を追加する。
        - _要件: 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_
    - [ ] 4.3. ダークモードとライトモードに対応した色彩設計を実装する。
        - OSのテーマ設定を検知し、自動で表示色が切り替わるようにする。
        - _要件: 5.1, 5.2, 5.3_

- [ ] **5. アプリケーションへの統合**
    - [ ] 5.1. `src/app/page.tsx` (メインページ) を修正する。
        - `usePossessionManager` フックを呼び出し、所持歌の状態を管理する。
        - `useEffect`内で、全呪文データを取得後に `spellMatchingCache.initialize` を呼び出す。
        - 所持歌を入力・変更するためのUI（数字ボタンなど）と `usePossessionManager` を連携させる。
    - [ ] 5.2. `src/components/search/SearchResults.tsx` (呪文リスト) を修正する。
        - 各呪文アイテムの右上に `SongMatchingDisplay` コンポーネントを配置する。
        - _要件: 1.1, 2.1, 3.1, 4.1_
    - [ ] 5.3. `src/app/page.tsx` の「購入した魔法」リスト（所持リスト）を修正する。
        - 各アイテムに `SongMatchingDisplay` コンポーネントを統合し、呪文リストと同じ形式でマッチング情報を表示する。
        - _要件: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] **6. 最終確認と調整**
    - [ ] 6.1. 全機能が統合され、所持歌の変更が呪文リストと所持リストの両方に正しく反映されることを確認する。
    - [ ] 6.2. パフォーマンスを考慮し、`React.memo` などを使用して不要な再レンダリングを抑制する。
    - [ ] 6.3. ユーザビリティテストを行い、表示や動作に違和感がないか確認する。
