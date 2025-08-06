# 設計書

## 概要

SpellMatchingCacheクラスのTypeScriptコンパイルエラーを修正するための設計。現在、`src/types/index.ts`ファイルにマージコンフリクトが存在し、`MatchingCache`型が2つの異なる定義で競合している。この問題を解決し、型安全性を確保する。

## アーキテクチャ

### 問題の分析

1. **マージコンフリクト**: `src/types/index.ts`で`MatchingCache`が2つの異なる型として定義されている
   - `export interface MatchingCache` (複雑なインターフェース)
   - `export type MatchingCache = Map<string, SongMatchingResult>` (シンプルな型エイリアス)

2. **現在の使用状況**: `SpellMatchingCache`クラスは`Map<string, SongMatchingResult>`として使用している

3. **型の不整合**: コンパイラが複雑なインターフェース定義を期待しているが、実装では`Map`を使用している

### 解決戦略

現在の実装を分析した結果、`SpellMatchingCache`クラスは実際には`Map<string, SongMatchingResult>`として動作しており、複雑な`MatchingCache`インターフェースの機能は使用されていない。そのため、シンプルな型エイリアス定義を採用する。

## コンポーネントと インターフェース

### 1. 型定義の統一

**ファイル**: `src/types/index.ts`

- マージコンフリクトを解決し、`MatchingCache`を`Map<string, SongMatchingResult>`として統一
- 不要な複雑なインターフェース定義を削除
- 既存の`SongMatchingResult`型定義を保持

### 2. SpellMatchingCacheクラスの型安全性向上

**ファイル**: `src/lib/spellMatchingCache.ts`

- 現在の実装を保持しつつ、型安全性を向上
- エラーハンドリングの改善
- 初期化状態の管理を追加

## データモデル

### 保持する型定義

```typescript
// 歌マッチング結果の型定義
export interface SongMatchingResult {
  possessedDigits: string;
  missingDigits: string;
  matchingPercentage: number;
}

// マッチングキャッシュの型定義（統一版）
export type MatchingCache = Map<string, SongMatchingResult>;
```

### 削除する型定義

```typescript
// 削除対象：使用されていない複雑なインターフェース
export interface MatchingCache {
  currentPossessedSongs: string;
  matchingResults: SpellMatchingMap;
  isUpdating: boolean;
  lastUpdated: number;
}

// 削除対象：関連する未使用の型定義
export type SpellMatchingMap = Map<string, SongMatchingResult>;
export interface InitialCache { ... }
export interface BackgroundCalculation { ... }
export interface SongMatchingError { ... }
```

## エラーハンドリング

### 1. 初期化チェック

- `SpellMatchingCache`クラスに初期化状態を追加
- 初期化前のアクセスに対する適切なエラーハンドリング

### 2. 型安全性の向上

- `undefined`チェックの強化
- 不正な`spellId`に対する安全な処理

### 3. デバッグ情報の追加

- 開発環境でのデバッグ情報出力
- エラー発生時の詳細情報提供

## テスト戦略

### 1. 型チェックテスト

- TypeScriptコンパイルが成功することを確認
- 型定義の一貫性をテスト

### 2. 機能テスト

- `SpellMatchingCache`の初期化が正常に動作することを確認
- キャッシュの再構築が正しく実行されることを確認
- マッチング結果の取得が正常に動作することを確認

### 3. エラーハンドリングテスト

- 初期化前のアクセスに対するエラーハンドリングをテスト
- 不正な`spellId`に対する処理をテスト

## 実装の詳細

### マージコンフリクトの解決手順

1. `src/types/index.ts`のマージコンフリクトマーカーを削除
2. 重複する型定義を統一
3. 使用されていない複雑な型定義を削除
4. シンプルな`MatchingCache`型エイリアスを保持

### SpellMatchingCacheクラスの改善

1. 初期化状態の管理を追加
2. エラーハンドリングの改善
3. 型安全性の向上
4. デバッグ情報の追加（開発環境のみ）

この設計により、TypeScriptコンパイルエラーを解決し、既存の機能を保持しながら型安全性を向上させることができる。
