# 実装計画

- [x] **1. 基礎構造のセットアップ**
    - [x] 1.1. `src/types/index.ts` に `SongMatchingResult` 型を定義する。
    - [x] 1.2. `src/types/index.ts` にキャッシュ用の型 `MatchingCache` を定義する。

- [x] **2. マッチング計算ロジックの実装**
    - [x] 2.1. `src/lib/songUtils.ts` に `calculateSongMatching` 関数を実装する。
    - [x] 2.2. `src/lib/__tests__/songUtils.test.ts` に単体テストを実装する。

- [x] **3. キャッシュと状態管理の実装**
    - [x] 3.1. `src/lib/spellMatchingCache.ts` に `SpellMatchingCache` シングルトンクラスを実装する。
    - [x] 3.2. `src/hooks/usePossession.ts` に `usePossessionManager` フックを実装する。

- [x] **4. 表示コンポーネントの実装**
    - [x] 4.1. `src/components/spellDetail/SongMatchingDisplay.tsx` コンポーネントを実装する。
    - [x] 4.2. マッチング率に応じた背景色変更ロジックを実装する。
    - [x] 4.3. ダークモードとライトモードに対応する。

- [x] **5. アプリケーションへの統合**
    - [x] 5.1. `src/app/page.tsx` で所持歌の状態を管理する。
    - [x] 5.2. `src/components/search/SearchResults.tsx` (呪文リスト) に `SongMatchingDisplay` を配置する。
    - [x] 5.3. `src/app/page.tsx` の「購入した魔法」リストに `SongMatchingDisplay` を統合する。

- [x] **6. 不具合修正と機能改善**
    - [x] 6.1. **コンポーネントの不整合解消:**
        - [x] 6.1.1. `src/components/MainContent/SearchResults.tsx` の内容を `src/components/search/SearchResults.tsx` に統合し、不要な `MainContent/SearchResults.tsx` を削除する。
        - [x] 6.1.2. `src/app/page.tsx` で `search/SearchResults.tsx` を正しくインポートしていることを確認する。
    - [x] 6.2. **`SongMatchingDisplay` の表示更新ロジック修正:**
        - [x] 6.2.1. `SongMatchingDisplay` コンポーネントが `possessedSong` を props として受け取るように修正する。
        - [x] 6.2.2. `page.tsx` から `SearchResults.tsx` を経由して `possessedSong` を `SongMatchingDisplay` に渡すように修正する。
        - [x] 6.2.3. `SongMatchingDisplay` 内で、`possessedSong` の変更に応じて表示が再計算・再レンダリングされるようにする。
    - [ ] 6.3. **最終確認:**
        - [ ] 6.3.1. 全機能が統合され、所持歌の変更が呪文リストと購入済みリストの両方にリアルタイムで正しく反映されることを確認する。
        - [ ] 6.3.2. パフォーマンスを考慮し、不要な再レンダリングが発生していないか確認する。
