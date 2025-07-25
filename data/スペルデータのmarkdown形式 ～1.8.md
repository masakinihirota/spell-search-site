この整形された Markdown ファイルは、**「スペルトナエル」というゲーム資料から抽出されたすべての呪文情報を含んでおり**、以下の構造で整理されています。

- 最上位ヘッダー (`#`) で、ゲーム名と資料のタイトルを示しています。
- 各魔法の種類（カテゴリ）は、セカンダリヘッダー (`##`) を使用し、**魔法の種類とそのカテゴリが持つタグ（例：攻撃魔法 ダメージ、体力上昇魔法 回復）を明記**しています。これにより、各セクションの内容が一目でわかるようになっています。
- 各魔法カテゴリの直下には、呪文のエントリが続くことを示す情報として「呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)」というサードパーティヘッダー (`###`) を配置しました。
- 個々の呪文は、リスト形式 (`-`) で整理され、**呪文名が太字**で強調されています。その下に、`必要な歌の段の数字`と`取得する段の順`がそれぞれキーと値のペアで示されており、AI が各呪文のデータを容易に抽出できるようにしています。

以下に、整形された Markdown ファイルの内容を提示します。

```markdown
# スペルトナエル 魔法大全

このファイルは、ご提供いただいた「魔法大全」の情報を元に、スペルトナエルというゲームの呪文表を Markdown 形式で整形したものです。魔法の種類ごとに分類され、それぞれの呪文には必要な歌の段の数字と取得する段の順が記載されています。

---

## 攻撃魔法 ダメージ

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **パンチ**
  - 必要な歌の段の数字: 147
  - 取得する段の順: 714
- **キック**
  - 必要な歌の段の数字: 28
  - 取得する段の順: 282
- **ニャラ**
  - 必要な歌の段の数字: 258
  - 取得する段の順: 582
- **ニャラミ**
  - 必要な歌の段の数字: 2578
  - 取得する段の順: 5827
- **ニャコラマ**
  - 必要な歌の段の数字: 2578
  - 取得する段の順: 58227
- **ニャラゾーマ**
  - 必要な歌の段の数字: 24578
  - 取得する段の順: 582487
- **ニャルトラーク**
  - 必要な歌の段の数字: 2458
  - 取得する段の順: 5824282
- **チュー**
  - 必要な歌の段の数字: 48
  - 取得する段の順: 488
- **チュピィ**
  - 必要な歌の段の数字: 478
  - 取得する段の順: 4878
- **チュピート**
  - 必要な歌の段の数字: 478
  - 取得する段の順: 48784
- **チュピラット**
  - 必要な歌の段の数字: 2478
  - 取得する段の順: 487284
- **チュピラモット**
  - 必要な歌の段の数字: 2478
  - 取得する段の順: 4872784
- **ピヨン**
  - 必要な歌の段の数字: 17
  - 取得する段の順: 711
- **ピヨテマ**
  - 必要な歌の段の数字: 147
  - 取得する段の順: 7147
- **ピヨナズン**
  - 必要な歌の段の数字: 1457
  - 取得する段の順: 71541
- **ピヨコスワン**
  - 必要な歌の段の数字: 1237
  - 取得する段の順: 712311
- **ライトピヨピヨ**
  - 必要な歌の段の数字: 1247
  - 取得する段の順: 2147171
- **コケー**
  - 必要な歌の段の数字: 28
  - 取得する段の順: 228
- **コケラマ**
  - 必要な歌の段の数字: 27
  - 取得する段の順: 2227
- **コケコッコ**
  - 必要な歌の段の数字: 28
  - 取得する段の順: 22282
- **コケレイブン**
  - 必要な歌の段の数字: 126
  - 取得する段の順: 222161
- **ダークコケココ**
  - 必要な歌の段の数字: 258
  - 取得する段の順: 5822222
- **コン**
  - 必要な歌の段の数字: 12
  - 取得する段の順: 21
- **コンコン**
  - 必要な歌の段の数字: 12
  - 取得する段の順: 2121
- **フォックス**
  - 必要な歌の段の数字: 2368
  - 取得する段の順: 68823
- **コニャラプス**
  - 必要な歌の段の数字: 23578
  - 取得する段の順: 258273
- **オイナリホワイト**
  - 必要な歌の段の数字: 12456
  - 取得する段の順: 11526114
- **ポン**
  - 必要な歌の段の数字: 17
  - 取得する段の順: 71
- **ポンポコ**
  - 必要な歌の段の数字: 127
  - 取得する段の順: 7172
- **ポンポコン**
  - 必要な歌の段の数字: 127
  - 取得する段の順: 71721
- **ポコワイルド**
  - 必要な歌の段の数字: 1257
  - 取得する段の順: 721125
- **ポンポコブラック**
  - 必要な歌の段の数字: 12678
  - 取得する段の順: 71726282
- **メテオフォール**
  - 必要な歌の段の数字: 124678
  - 取得する段の順: 7416882
- **キョシキパープル**
  - 必要な歌の段の数字: 2378
  - 取得する段の順: 28327872
- **ムーンドロップ**
  - 必要な歌の段の数字: 12578
  - 取得する段の順: 7815287
- **ブラックホール**
  - 必要な歌の段の数字: 268
  - 取得する段の順: 6282682
- **ビッグバン**
  - 必要な歌の段の数字: 1368
  - 取得する段の順: 68361
- **ミギアッパー**
  - 必要な歌の段の数字: 1378
  - 取得する段の順: 731878
- **オーバーヒート**
  - 必要な歌の段の数字: 1868684
  - 取得する段の順: 1468
- **ナントカナレーッ**
  - 必要な歌の段の数字: 51425288
  - 取得する段の順: 12458

## 弱点魔法 ダメージ

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **クリティカル**
  - 必要な歌の段の数字: 248
  - 取得する段の順: 224822
- **メガクリティカル**
  - 必要な歌の段の数字: 2348
  - 取得する段の順: 73224822
- **ギガクリティカル**
  - 必要な歌の段の数字: 2348
  - 取得する段の順: 33224822
- **テラクリティカル**
  - 必要な歌の段の数字: 2248
  - 取得する段の順: 42224822
- **ペタクリティカル**
  - 必要な歌の段の数字: 2478
  - 取得する段の順: 74224822

## 雷攻撃魔法 ダメージ

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **プラマ**
  - 必要な歌の段の数字: 27
  - 取得する段の順: 727
- **プラズマ**
  - 必要な歌の段の数字: 247
  - 取得する段の順: 7247
- **プラズラマ**
  - 必要な歌の段の数字: 247
  - 取得する段の順: 72427
- **プラジマータ**
  - 必要な歌の段の数字: 2478
  - 取得する段の順: 724784
- **バオウプラズマ**
  - 必要な歌の段の数字: 12467
  - 取得する段の順: 6117247
- **プラズマフォトン**
  - 必要な歌の段の数字: 124678
  - 取得する段の順: 72476841
- **エレキ**
  - 必要な歌の段の数字: 12
  - 取得する段の順: 122
- **エレキマ**
  - 必要な歌の段の数字: 127
  - 取得する段の順: 1227
- **ピカラット**
  - 必要な歌の段の数字: 2478
  - 取得する段の順: 72284
- **エレキマータ**
  - 必要な歌の段の数字: 12478
  - 取得する段の順: 122784
- **エレキマスター**
  - 必要な歌の段の数字: 123478
  - 取得する段の順: 1227348
- **エレクトブライト**
  - 必要な歌の段の数字: 1246
  - 取得する段の順: 12246214
- **ブレスオブゼウス**
  - 必要な歌の段の数字: 12346
  - 取得する段の順: 62316413

## 炎攻撃魔法 ダメージ

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **フィラ**
  - 必要な歌の段の数字: 268
  - 取得する段の順: 682
- **ファイア**
  - 必要な歌の段の数字: 168
  - 取得する段の順: 6811
- **ファイラガ**
  - 必要な歌の段の数字: 12368
  - 取得する段の順: 68123
- **ヘルファイア**
  - 必要な歌の段の数字: 1268
  - 取得する段の順: 626811
- **フィラブレイク**
  - 必要な歌の段の数字: 1268
  - 取得する段の順: 6826212
- **フィラフラッシュ**
  - 必要な歌の段の数字: 2368
  - 取得する段の順: 68262838
- **フレア**
  - 必要な歌の段の数字: 126
  - 取得する段の順: 621
- **フレイム**
  - 必要な歌の段の数字: 1267
  - 取得する段の順: 6217
- **フレイマナ**
  - 必要な歌の段の数字: 12567
  - 取得する段の順: 62175
- **デスフレイム**
  - 必要な歌の段の数字: 123567
  - 取得する段の順: 536217
- **フレイムアーク**
  - 必要な歌の段の数字: 12678
  - 取得する段の順: 6217182
- **フレイムハンター**
  - 必要な歌の段の数字: 124678
  - 取得する段の順: 62176148
- **カグツチノイカリ**
  - 必要な歌の段の数字: 12345
  - 取得する段の順: 23445122

## 氷攻撃魔法 ダメージ

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **アイズ**
  - 必要な歌の段の数字: 14
  - 取得する段の順: 114
- **アイサガ**
  - 必要な歌の段の数字: 13
  - 取得する段の順: 1133
- **アイスノウ**
  - 必要な歌の段の数字: 135
  - 取得する段の順: 11351
- **アイシクリア**
  - 必要な歌の段の数字: 123
  - 取得する段の順: 113221
- **イテツクコオリ**
  - 必要な歌の段の数字: 124
  - 取得する段の順: 1442212
- **アイスクリスタル**
  - 必要な歌の段の数字: 1234
  - 取得する段の順: 11322342
- **ブリズ**
  - 必要な歌の段の数字: 246
  - 取得する段の順: 624
- **ブリザマ**
  - 必要な歌の段の数字: 2467
  - 取得する段の順: 6247
- **ブリザード**
  - 必要な歌の段の数字: 24568
  - 取得する段の順: 62485
- **ブリザディア**
  - 必要な歌の段の数字: 124568
  - 取得する段の順: 624581
- **ブリズブリザド**
  - 必要な歌の段の数字: 2456
  - 取得する段の順: 6246245
- **ブリザドストーム**
  - 必要な歌の段の数字: 2345678
  - 取得する段の順: 62453487
- **アブソリュートゼロ**
  - 必要な歌の段の数字: 123468
  - 取得する段の順: 163288442

## 風攻撃魔法 ダメージ

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **ウィド**
  - 必要な歌の段の数字: 158
  - 取得する段の順: 185
- **ウィンド**
  - 必要な歌の段の数字: 158
  - 取得する段の順: 1815
- **ウィンディ**
  - 必要な歌の段の数字: 158
  - 取得する段の順: 18158
- **ウィンパクト**
  - 必要な歌の段の数字: 12478
  - 取得する段の順: 181724
- **ウィンドパージ**
  - 必要な歌の段の数字: 14578
  - 取得する段の順: 1815784
- **ハルカゼウィンド**
  - 必要な歌の段の数字: 124568
  - 取得する段の順: 62241815

## 重力攻撃魔法 ダメージ

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **グラナ**
  - 必要な歌の段の数字: 235
  - 取得する段の順: 325
- **グラビナ**
  - 必要な歌の段の数字: 2356
  - 取得する段の順: 3265
- **グラビティ**
  - 必要な歌の段の数字: 23468
  - 取得する段の順: 32648
- **グラバラティ**
  - 必要な歌の段の数字: 23468
  - 取得する段の順: 326248
- **グラジャガドナ**
  - 必要な歌の段の数字: 23458
  - 取得する段の順: 3248355
- **グラビテウェイブ**
  - 必要な歌の段の数字: 123468
  - 取得する段の順: 32641816

## 特殊攻撃魔法 ダメージ

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **アアア**
  - 必要な歌の段の数字: 1
  - 取得する段の順: 111
- **インファ**
  - 必要な歌の段の数字: 168
  - 取得する段の順: 1168
- **スマッシュ**
  - 必要な歌の段の数字: 378
  - 取得する段の順: 37838
- **キュウソノハンゲキ**
  - 必要な歌の段の数字: 123568
  - 取得する段の順: 281356132
- **リョウイキテンパイ**
  - 必要な歌の段の数字: 12478
  - 取得する段の順: 281124171

## 能力値変更 特殊

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **ハートリセット**
  - 必要な歌の段の数字: 23468
  - 取得する段の順: 6842384
- **アタックリセット**
  - 必要な歌の段の数字: 12348
  - 取得する段の順: 14822384
- **ガードリセット**
  - 必要な歌の段の数字: 23458
  - 取得する段の順: 3852384

## 攻撃力上昇魔法 攻撃力

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **ヤーッ**
  - 必要な歌の段の数字: 18
  - 取得する段の順: 188
- **パワーッ**
  - 必要な歌の段の数字: 178
  - 取得する段の順: 7188
- **パワアップ**
  - 必要な歌の段の数字: 178
  - 取得する段の順: 71187
- **パンナコッタ**
  - 必要な歌の段の数字: 124578
  - 取得する段の順: 715284
- **パワークイーン**
  - 必要な歌の段の数字: 1278
  - 取得する段の順: 7182181
- **ゲバミ**
  - 必要な歌の段の数字: 367
  - 取得する段の順: 367
- **ゲバルト**
  - 必要な歌の段の数字: 2346
  - 取得する段の順: 3624
- **ゲバルター**
  - 必要な歌の段の数字: 23468
  - 取得する段の順: 36248
- **ゲバルタレン**
  - 必要な歌の段の数字: 12346
  - 取得する段の順: 362421
- **キングゲバルト**
  - 必要な歌の段の数字: 12346
  - 取得する段の順: 2133624
- **ブレド**
  - 必要な歌の段の数字: 256
  - 取得する段の順: 625
- **ブレイド**
  - 必要な歌の段の数字: 1256
  - 取得する段の順: 6215
- **キラブレド**
  - 必要な歌の段の数字: 256
  - 取得する段の順: 22625
- **ブレドスター**
  - 必要な歌の段の数字: 234568
  - 取得する段の順: 625348
- **エデンブレード**
  - 必要な歌の段の数字: 12568
  - 取得する段の順: 1516285
- **ソード**
  - 必要な歌の段の数字: 358
  - 取得する段の順: 385
- **ソードラ**
  - 必要な歌の段の数字: 2358
  - 取得する段の順: 3852
- **ソーディラ**
  - 必要な歌の段の数字: 2358
  - 取得する段の順: 38582
- **ソードスピン**
  - 必要な歌の段の数字: 13578
  - 取得する段の順: 385371
- **レイジソードラ**
  - 必要な歌の段の数字: 123458
  - 取得する段の順: 2143852
- **アサド**
  - 必要な歌の段の数字: 135
  - 取得する段の順: 135
- **アサルト**
  - 必要な歌の段の数字: 1234
  - 取得する段の順: 1324
- **アザライト**
  - 必要な歌の段の数字: 124
  - 取得する段の順: 14214
- **アサルディア**
  - 必要な歌の段の数字: 12358
  - 取得する段の順: 132581
- **アサドアサルト**
  - 必要な歌の段の数字: 12345
  - 取得する段の順: 1351324
- **アサルトスワッグ**
  - 必要な歌の段の数字: 12348
  - 取得する段の順: 13243183
- **マラド**
  - 必要な歌の段の数字: 257
  - 取得する段の順: 725
- **マーダー**
  - 必要な歌の段の数字: 578
  - 取得する段の順: 7858
- **マダマエル**
  - 必要な歌の段の数字: 1257
  - 取得する段の順: 75712
- **マーダキラー**
  - 必要な歌の段の数字: 2578
  - 取得する段の順: 785228
- **マダマダヤレル**
  - 必要な歌の段の数字: 1257
  - 取得する段の順: 7575122
- **マードサイレンス**
  - 必要な歌の段の数字: 123578
  - 取得する段の順: 78531213
- **エクスキャリバー**
  - 必要な歌の段の数字: 12368
  - 取得する段の順: 12328268
- **カウンター**
  - 必要な歌の段の数字: 1248
  - 取得する段の順: 21148
- **ポロノルテ**
  - 必要な歌の段の数字: 72524
  - 取得する段の順: 2457
- **パワーインパクト**
  - 必要な歌の段の数字: 71811724
  - 取得する段の順: 12478
- **ビルドアップ**
  - 必要な歌の段の数字: 625187
  - 取得する段の順: 125678
- **ステゴロジョートー**
  - 必要な歌の段の数字: 343248848
  - 取得する段の順: 2348
- **アベコーベ**
  - 必要な歌の段の数字: 16286
  - 取得する段の順: 1268

## 防御力上昇魔法 防御力

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **ガード**
  - 必要な歌の段の数字: 358
  - 取得する段の順: 385
- **ガーダラ**
  - 必要な歌の段の数字: 2358
  - 取得する段の順: 3852
- **ガーディラ**
  - 必要な歌の段の数字: 2358
  - 取得する段の順: 38582
- **ガーディラン**
  - 必要な歌の段の数字: 12358
  - 取得する段の順: 385821
- **ガードクイーン**
  - 必要な歌の段の数字: 12358
  - 取得する段の順: 3852181
- **カチコ**
  - 必要な歌の段の数字: 24
  - 取得する段の順: 242
- **カチコチ**
  - 必要な歌の段の数字: 24
  - 取得する段の順: 2424
- **カチコッチ**
  - 必要な歌の段の数字: 248
  - 取得する段の順: 24284
- **カチコチヤデ**
  - 必要な歌の段の数字: 1245
  - 取得する段の順: 242415
- **キングカチコチ**
  - 必要な歌の段の数字: 1234
  - 取得する段の順: 2132424
- **アーミ**
  - 必要な歌の段の数字: 178
  - 取得する段の順: 187
- **アーマー**
  - 必要な歌の段の数字: 178
  - 取得する段の順: 1878
- **アーマード**
  - 必要な歌の段の数字: 1578
  - 取得する段の順: 18785
- **アーマーギガ**
  - 必要な歌の段の数字: 1378
  - 取得する段の順: 187833
- **アーマームーン**
  - 必要な歌の段の数字: 178
  - 取得する段の順: 1878781
- **バリア**
  - 必要な歌の段の数字: 126
  - 取得する段の順: 621
- **バリアナ**
  - 必要な歌の段の数字: 1256
  - 取得する段の順: 6215
- **バリアード**
  - 必要な歌の段の数字: 12568
  - 取得する段の順: 62185
- **ギガバリアー**
  - 必要な歌の段の数字: 12368
  - 取得する段の順: 336218
- **バリアネメシス**
  - 必要な歌の段の数字: 123567
  - 取得する段の順: 6215733
- **プロト**
  - 必要な歌の段の数字: 247
  - 取得する段の順: 724
- **プロテコ**
  - 必要な歌の段の数字: 247
  - 取得する段の順: 7242
- **プロテクト**
  - 必要な歌の段の数字: 247
  - 取得する段の順: 72424
- **プロトディア**
  - 必要な歌の段の数字: 124578
  - 取得する段の順: 724581
- **プロトプロテク**
  - 必要な歌の段の数字: 247
  - 取得する段の順: 7247242
- **プロテクシャイン**
  - 必要な歌の段の数字: 123478
  - 取得する段の順: 72423811
- **シルド**
  - 必要な歌の段の数字: 235
  - 取得する段の順: 325
- **シールド**
  - 必要な歌の段の数字: 2358
  - 取得する段の順: 3825
- **シルディア**
  - 必要な歌の段の数字: 12358
  - 取得する段の順: 32581
- **シルドザラク**
  - 必要な歌の段の数字: 2345
  - 取得する段の順: 325422
- **シルドシルデマ**
  - 必要な歌の段の数字: 2357
  - 取得する段の順: 3253257
- **シールドシャドウ**
  - 必要な歌の段の数字: 12358
  - 取得する段の順: 38253851
- **ラストダイヤモンド**
  - 必要な歌の段の数字: 123457
  - 取得する段の順: 234511715
- **ノックガード**
  - 必要な歌の段の数字: 582385
  - 取得する段の順: 2358
- **カゼノヨロイ**
  - 必要な歌の段の数字: 245121
  - 取得する段の順: 1245

## 体力上昇魔法 回復

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **ホミィ**
  - 必要な歌の段の数字: 678
  - 取得する段の順: 678
- **ホイップ**
  - 必要な歌の段の数字: 1678
  - 取得する段の順: 6187
- **ホイタラミ**
  - 必要な歌の段の数字: 12467
  - 取得する段の順: 61427
- **ホミルタイン**
  - 必要な歌の段の数字: 12467
  - 取得する段の順: 672411
- **ホミホミアップ**
  - 必要な歌の段の数字: 1678
  - 取得する段の順: 6767187
- **ヒール**
  - 必要な歌の段の数字: 268
  - 取得する段の順: 682
- **ヒーリマ**
  - 必要な歌の段の数字: 2678
  - 取得する段の順: 6827
- **ヒーライミ**
  - 必要な歌の段の数字: 12678
  - 取得する段の順: 68217
- **ヒールアップ**
  - 必要な歌の段の数字: 12678
  - 取得する段の順: 682187
- **ヒーラーライト**
  - 必要な歌の段の数字: 12468
  - 取得する段の順: 6828214
- **リラマ**
  - 必要な歌の段の数字: 27
  - 取得する段の順: 227
- **リラクト**
  - 必要な歌の段の数字: 24
  - 取得する段の順: 2224
- **リラクサー**
  - 必要な歌の段の数字: 238
  - 取得する段の順: 22238
- **リラクゼート**
  - 必要な歌の段の数字: 248
  - 取得する段の順: 222484
- **リラクリラクト**
  - 必要な歌の段の数字: 24
  - 取得する段の順: 2222224
- **ヘブンズリラクス**
  - 必要な歌の段の数字: 12346
  - 取得する段の順: 66142223
- **ラブオブビーナス**
  - 必要な歌の段の数字: 123568
  - 取得する段の順: 26166853
- **キュア**
  - 必要な歌の段の数字: 128
  - 取得する段の順: 281
- **キュアグリーン**
  - 必要な歌の段の数字: 1238
  - 取得する段の順: 2813281
- **キュアノパビテス**
  - 必要な歌の段の数字: 12345678
  - 取得する段の順: 28157643
- **キュアブルー**
  - 必要な歌の段の数字: 1268
  - 取得する段の順: 281628
- **キュライト**
  - 必要な歌の段の数字: 1248
  - 取得する段の順: 28214
- **キュラマ**
  - 必要な歌の段の数字: 278
  - 取得する段の順: 2827
- **グラドメディカ**
  - 必要な歌の段の数字: 23578
  - 取得する段の順: 3257582
- **ケアスペイル**
  - 必要な歌の段の数字: 1237
  - 取得する段の順: 213712
- **ケアラナ**
  - 必要な歌の段の数字: 125
  - 取得する段の順: 2125
- **ケアリンク**
  - 必要な歌の段の数字: 12
  - 取得する段の順: 21212
- **スーパールケア**
  - 必要な歌の段の数字: 12378
  - 取得する段の順: 3878221
- **メディ**
  - 必要な歌の段の数字: 578
  - 取得する段の順: 758
- **メディシナル**
  - 必要な歌の段の数字: 23578
  - 取得する段の順: 758352
- **メディナ**
  - 必要な歌の段の数字: 578
  - 取得する段の順: 7585
- **メディルナ**
  - 必要な歌の段の数字: 2578
  - 取得する段の順: 75825
- **ルケア**
  - 必要な歌の段の数字: 12
  - 取得する段の順: 221
- **ハヤテノイヤシ**
  - 必要な歌の段の数字: 6145113
  - 取得する段の順: 13456
- **カサナルキモチ**
  - 必要な歌の段の数字: 2352274
  - 取得する段の順: 23457

## 特殊能力上昇魔法 特殊

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **カラヤブ**
  - 必要な歌の段の数字: 126
  - 取得する段の順: 2216
- **ヤンノカオラ**
  - 必要な歌の段の数字: 125
  - 取得する段の順: 115212
- **フンコツサイシン**
  - 必要な歌の段の数字: 12346
  - 取得する段の順: 61243131
- **ノーガード**
  - 必要な歌の段の数字: 358
  - 取得する段の順: 58385
- **カジバノバカヂカラ**
  - 必要な歌の段の数字: 2456
  - 取得する段の順: 246562522
- **ネコニコバン**
  - 必要な歌の段の数字: 1256
  - 取得する段の順: 525261
- **トキハカネナリ**
  - 必要な歌の段の数字: 2456
  - 取得する段の順: 4262552
- **ヤサシイココロ**
  - 必要な歌の段の数字: 123
  - 取得する段の順: 1331222
- **テンシノベーゼ**
  - 必要な歌の段の数字: 134568
  - 取得する段の順: 4135684
- **ダイフゴー**
  - 必要な歌の段の数字: 13568
  - 取得する段の順: 51638
- **ハイスイノジン**
  - 必要な歌の段の数字: 13456
  - 取得する段の順: 6131541
- **フッカツノジュモン**
  - 必要な歌の段の数字: 1245678
  - 取得する段の順: 682454871
- **バノレス**
  - 必要な歌の段の数字: 2356
  - 取得する段の順: 6523
- **ジヒゴットネアン**
  - 必要な歌の段の数字: 134568
  - 取得する段の順: 46384511
- **アトラクション**
  - 必要な歌の段の数字: 12348
  - 取得する段の順: 1422381
- **リパルション**
  - 必要な歌の段の数字: 2378
  - 取得する段の順: 272381
- **リフレクション**
  - 必要な歌の段の数字: 12368
  - 取得する段の順: 2622381
- **スワップアップ**
  - 必要な歌の段の数字: 1378
  - 取得する段の順: 3187187
- **ミラーアップ**
  - 必要な歌の段の数字: 1278
  - 取得する段の順: 728187
- **フリップアップ**
  - 必要な歌の段の数字: 12678
  - 取得する段の順: 6287187
- **ライフフリップ**
  - 必要な歌の段の数字: 12678
  - 取得する段の順: 2166287
- **アタックミラー**
  - 必要な歌の段の数字: 12478
  - 取得する段の順: 1482728
- **ハンテンジュチュシキ**
  - 必要な歌の段の数字: 123468
  - 取得する段の順: 6141484832
- **スペルバースト**
  - 必要な歌の段の数字: 234678
  - 取得する段の順: 3726834
- **ヒダンノホケン**
  - 必要な歌の段の数字: 1256
  - 取得する段の順: 6515621
- **シニアホケン**
  - 必要な歌の段の数字: 12356
  - 取得する段の順: 351621
- **ダインソ**
  - 必要な歌の段の数字: 135
  - 取得する段の順: 5113
- **ヨケレルホケン**
  - 必要な歌の段の数字: 126
  - 取得する段の順: 1222621
- **イタイヨー**
  - 必要な歌の段の数字: 148
  - 取得する段の順: 14118
- **アンシンパック**
  - 必要な歌の段の数字: 12378
  - 取得する段の順: 1131782

## 動物召喚魔法 召喚

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **チラバルヒヨコ**
  - 必要な歌の段の数字: 1246
  - 取得する段の順: 4262612
- **ピヨコ**
  - 必要な歌の段の数字: 127
  - 取得する段の順: 712
- **ヒヨコラッシュ**
  - 必要な歌の段の数字: 12368
  - 取得する段の順: 6122838
- **ムテキノワンコ**
  - 必要な歌の段の数字: 12457
  - 取得する段の順: 7425112
- **ポチ**
  - 必要な歌の段の数字: 47
  - 取得する段の順: 74
- **ワンコラッシュ**
  - 必要な歌の段の数字: 1238
  - 取得する段の順: 1122838
- **フドウノニャンコ**
  - 必要な歌の段の数字: 12568
  - 取得する段の順: 65155812
- **キナコ**
  - 必要な歌の段の数字: 25
  - 取得する段の順: 252
- **ニャンコダイブツ**
  - 必要な歌の段の数字: 124568
  - 取得する段の順: 58125164
- **トツゲキシャーク**
  - 必要な歌の段の数字: 2348
  - 取得する段の順: 44323882
- **ジャック**
  - 必要な歌の段の数字: 248
  - 取得する段の順: 4882
- **サメラッシュ**
  - 必要な歌の段の数字: 2378
  - 取得する段の順: 372838
- **オドルイルカ**
  - 必要な歌の段の数字: 125
  - 取得する段の順: 152122
- **サクラ**
  - 必要な歌の段の数字: 23
  - 取得する段の順: 322
- **イルカラッシュ**
  - 必要な歌の段の数字: 1238
  - 取得する段の順: 1222838
- **ウカブクラゲ**
  - 必要な歌の段の数字: 1236
  - 取得する段の順: 126223
- **ジェリー**
  - 必要な歌の段の数字: 248
  - 取得する段の順: 4828
- **クラゲラッシュ**
  - 必要な歌の段の数字: 238
  - 取得する段の順: 2232838
- **ウタウキンギョ**
  - 必要な歌の段の数字: 12348
  - 取得する段の順: 1412138
- **ムテキパル**
  - 必要な歌の段の数字: 247
  - 取得する段の順: 74272
- **キンギョラッシュ**
  - 必要な歌の段の数字: 1238
  - 取得する段の順: 21382838
- **デッカイアニマル**
  - 必要な歌の段の数字: 12578
  - 取得する段の順: 58211572
- **デカスギアニマル**
  - 必要な歌の段の数字: 12357
  - 取得する段の順: 52331572
- **カイジュウアニマル**
  - 必要な歌の段の数字: 124578
  - 取得する段の順: 214811572
- **カタイアニマル**
  - 必要な歌の段の数字: 12457
  - 取得する段の順: 2411572
- **カタスギアニマル**
  - 必要な歌の段の数字: 123457
  - 取得する段の順: 24331572
- **コウテツアニマル**
  - 必要な歌の段の数字: 12457
  - 取得する段の順: 21441572
- **ヤサシイアニマル**
  - 必要な歌の段の数字: 12357
  - 取得する段の順: 13311572
- **ヤサシスギアニマル**
  - 必要な歌の段の数字: 12357
  - 取得する段の順: 133331572
- **ボサツノアニマル**
  - 必要な歌の段の数字: 1234567
  - 取得する段の順: 63451572
- **アニマルパニック**
  - 必要な歌の段の数字: 12578
  - 取得する段の順: 15727582
- **マテ**
  - 必要な歌の段の数字: 74
  - 取得する段の順: 47
- **ハウス**
  - 必要な歌の段の数字: 613
  - 取得する段の順: 136

## 精霊召喚魔法 召喚

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **イチノウタ**
  - 必要な歌の段の数字: 145
  - 取得する段の順: 14514
- **ニノウタ**
  - 必要な歌の段の数字: 145
  - 取得する段の順: 5514
- **サンノウタ**
  - 必要な歌の段の数字: 1345
  - 取得する段の順: 31514
- **ヨンノウタ**
  - 必要な歌の段の数字: 145
  - 取得する段の順: 11514
- **ゴノウタ**
  - 必要な歌の段の数字: 1345
  - 取得する段の順: 3514
- **ロクノウタ**
  - 必要な歌の段の数字: 1245
  - 取得する段の順: 22514
- **ナナノウタ**
  - 必要な歌の段の数字: 145
  - 取得する段の順: 55514
- **ハチノウタ**
  - 必要な歌の段の数字: 1456
  - 取得する段の順: 64514
- **マワルウタヒメ**
  - 必要な歌の段の数字: 12467
  - 取得する段の順: 7121467
- **ミダレウタ**
  - 必要な歌の段の数字: 75214
  - 取得する段の順: 12457
- **カオスアレアトリー**
  - 必要な歌の段の数字: 213121428
  - 取得する段の順: 12348

## 移動速度上昇魔法 移動速度

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **アシガ**
  - 必要な歌の段の数字: 13
  - 取得する段の順: 133
- **アシハヤーイ**
  - 必要な歌の段の数字: 1368
  - 取得する段の順: 136181
- **アシルド**
  - 必要な歌の段の数字: 1235
  - 取得する段の順: 1325
- **アシルーガ**
  - 必要な歌の段の数字: 1238
  - 取得する段の順: 13283
- **スピドマスター**
  - 必要な歌の段の数字: 34578
  - 取得する段の順: 3757348
- **スピダ**
  - 必要な歌の段の数字: 357
  - 取得する段の順: 375
- **スピード**
  - 必要な歌の段の数字: 3578
  - 取得する段の順: 3785
- **スピーディ**
  - 必要な歌の段の数字: 3578
  - 取得する段の順: 37858
- **スピドスター**
  - 必要な歌の段の数字: 34578
  - 取得する段の順: 375348
- **アキレスノアシ**
  - 必要な歌の段の数字: 1235
  - 取得する段の順: 1223513
- **カタツムリムリ**
  - 必要な歌の段の数字: 247
  - 取得する段の順: 2447272
- **オナカイッパイ**
  - 必要な歌の段の数字: 12578
  - 取得する段の順: 1521871
- **ギュウホノノロイ**
  - 必要な歌の段の数字: 123568
  - 取得する段の順: 38165521
- **ザワルード**
  - 必要な歌の段の数字: 12458
  - 取得する段の順: 41285
- **ソレハザンゾーダ**
  - 必要な歌の段の数字: 32641485
  - 取得する段の順: 1234568
- **ディメンションループ**
  - 必要な歌の段の数字: 5871381287
  - 取得する段の順: 123578


## ボーナス上昇魔法 お金

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **ボナス**
  - 必要な歌の段の数字: 356
  - 取得する段の順: 653
- **ボナスビ**
  - 必要な歌の段の数字: 356
  - 取得する段の順: 6536
- **ボボンナス**
  - 必要な歌の段の数字: 1356
  - 取得する段の順: 66153
- **ボナスアップ**
  - 必要な歌の段の数字: 135678
  - 取得する段の順: 653187
- **ボーボーナスビ**
  - 必要な歌の段の数字: 3568
  - 取得する段の順: 6868536
- **ボロボロノナスビ**
  - 必要な歌の段の数字: 2356
  - 取得する段の順: 62625536
- **マネー**
  - 必要な歌の段の数字: 578
  - 取得する段の順: 758
- **マネルナ**
  - 必要な歌の段の数字: 257
  - 取得する段の順: 7525
- **オカネクレ**
  - 必要な歌の段の数字: 125
  - 取得する段の順: 12522
- **マネーホシィ**
  - 必要な歌の段の数字: 35678
  - 取得する段の順: 758638
- **マネマネアップ**
  - 必要な歌の段の数字: 1578
  - 取得する段の順: 7575187
- **マネーガモラエル**
  - 必要な歌の段の数字: 123578
  - 取得する段の順: 75837212
- **ゴルド**
  - 必要な歌の段の数字: 235
  - 取得する段の順: 325
- **ゴールド**
  - 必要な歌の段の数字: 2358
  - 取得する段の順: 3825
- **ゴルディア**
  - 必要な歌の段の数字: 12358
  - 取得する段の順: 32581
- **ゴルドディム**
  - 必要な歌の段の数字: 23578
  - 取得する段の順: 325587
- **バチコリゴルド**
  - 必要な歌の段の数字: 23456
  - 取得する段の順: 6422325
- **コイン**
  - 必要な歌の段の数字: 12
  - 取得する段の順: 211
- **コイント**
  - 必要な歌の段の数字: 124
  - 取得する段の順: 2114
- **メガコイン**
  - 必要な歌の段の数字: 1237
  - 取得する段の順: 73211
- **コインモット**
  - 必要な歌の段の数字: 12478
  - 取得する段の順: 211784
- **ゼニゲバコイン**
  - 必要な歌の段の数字: 123456
  - 取得する段の順: 4536211
- **リッチ**
  - 必要な歌の段の数字: 248
  - 取得する段の順: 284
- **リッチマ**
  - 必要な歌の段の数字: 2478
  - 取得する段の順: 2847
- **ギガリッチ**
  - 必要な歌の段の数字: 2348
  - 取得する段の順: 33284
- **メチャリッチ**
  - 必要な歌の段の数字: 2478
  - 取得する段の順: 748284
- **ビリオンリッチ**
  - 必要な歌の段の数字: 12468
  - 取得する段の順: 6211284
- **サツタバビンタ**
  - 必要な歌の段の数字: 3446614
  - 取得する段の順: 1346
- **キンランノチギリ**
  - 必要な歌の段の数字: 21215432
  - 取得する段の順: 12345

## 時間操作魔法 時間

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **タイミ**
  - 必要な歌の段の数字: 147
  - 取得する段の順: 417
- **タイミラ**
  - 必要な歌の段の数字: 1247
  - 取得する段の順: 4172
- **タイママミ**
  - 必要な歌の段の数字: 147
  - 取得する段の順: 41777
- **タイムプラト**
  - 必要な歌の段の数字: 1247
  - 取得する段の順: 417724
- **タイマプラスル**
  - 必要な歌の段の数字: 12347
  - 取得する段の順: 4177232
- **エイエンノトキ**
  - 必要な歌の段の数字: 1245
  - 取得する段の順: 1111542
- **チヨニヤチヨニ**
  - 必要な歌の段の数字: 4151415
  - 取得する段の順: 145
- **エイエンノヨル**
  - 必要な歌の段の数字: 1111512
  - 取得する段の順: 125

## 割合体力減少魔法 ダメージ

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **ディヘルフテ**
  - 必要な歌の段の数字: 24568
  - 取得する段の順: 586264
- **メガディヘルフテ**
  - 必要な歌の段の数字: 2345678
  - 取得する段の順: 73586264
- **ギガディヘルフテ**
  - 必要な歌の段の数字: 234568
  - 取得する段の順: 33586264
- **テラディヘルフテ**
  - 必要な歌の段の数字: 24568
  - 取得する段の順: 42586264
- **ペタディヘルフテ**
  - 必要な歌の段の数字: 245678
  - 取得する段の順: 74586264

## 割合攻撃力減少魔法 特殊

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **ヨワクナーレ**
  - 必要な歌の段の数字: 1258
  - 取得する段の順: 112582
- **メガヨワクナーレ**
  - 必要な歌の段の数字: 123578
  - 取得する段の順: 73112582
- **ギガヨワクナーレ**
  - 必要な歌の段の数字: 12358
  - 取得する段の順: 33112582
- **テラヨワクナーレ**
  - 必要な歌の段の数字: 12458
  - 取得する段の順: 42112582
- **ペタヨワクナーレ**
  - 必要な歌の段の数字: 124578
  - 取得する段の順: 74112582

## 毒魔法 特殊

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **ポイズン**
  - 必要な歌の段の数字: 147
  - 取得する段の順: 7141
- **メガポイズン**
  - 必要な歌の段の数字: 1347
  - 取得する段の順: 737141
- **ギガポイズン**
  - 必要な歌の段の数字: 1347
  - 取得する段の順: 337141
- **テラポイズン**
  - 必要な歌の段の数字: 1247
  - 取得する段の順: 427141
- **ペタポイズン**
  - 必要な歌の段の数字: 147
  - 取得する段の順: 747141
- **クルーシム**
  - 必要な歌の段の数字: 2378
  - 取得する段の順: 22837

## 一文字魔法 特殊

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **オ**
  - 必要な歌の段の数字: 1
  - 取得する段の順: 111
- **マ**
  - 必要な歌の段の数字: 7
  - 取得する段の順: 7
- **ド**
  - 必要な歌の段の数字: 5
  - 取得する段の順: 5
- **オマドディア**
  - 必要な歌の段の数字: 1578
  - 取得する段の順: 175581

## 強化魔法 強化

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **ブスタ**
  - 必要な歌の段の数字: 346
  - 取得する段の順: 634
- **ブースト**
  - 必要な歌の段の数字: 3468
  - 取得する段の順: 6834
- **メガブースト**
  - 必要な歌の段の数字: 34678
  - 取得する段の順: 736834
- **ギガブースト**
  - 必要な歌の段の数字: 3468
  - 取得する段の順: 336834
- **テラブースト**
  - 必要な歌の段の数字: 23468
  - 取得する段の順: 426834
- **ペタブースト**
  - 必要な歌の段の数字: 34678
  - 取得する段の順: 746834
- **スワップブースト**
  - 必要な歌の段の数字: 134678
  - 取得する段の順: 31876834
- **ミラーブースト**
  - 必要な歌の段の数字: 234678
  - 取得する段の順: 7286834
- **フリップブースト**
  - 必要な歌の段の数字: 234678
  - 取得する段の順: 62876834
- **アクセラ**
  - 必要な歌の段の数字: 123
  - 取得する段の順: 1232
- **スワップアクセラ**
  - 必要な歌の段の数字: 12378
  - 取得する段の順: 31871232
- **ミラーアクセラ**
  - 必要な歌の段の数字: 12378
  - 取得する段の順: 7281232
- **フリップアクセラ**
  - 必要な歌の段の数字: 123678
  - 取得する段の順: 62871232
- **アンプ**
  - 必要な歌の段の数字: 17
  - 取得する段の順: 117
- **アンプド**
  - 必要な歌の段の数字: 157
  - 取得する段の順: 1175
- **スーパアンプ**
  - 必要な歌の段の数字: 1378
  - 取得する段の順: 387117
- **ハイパアンプ**
  - 必要な歌の段の数字: 167
  - 取得する段の順: 617117
- **ルトラアンプ**
  - 必要な歌の段の数字: 1247
  - 取得する段の順: 242117
- **マスタアンプ**
  - 必要な歌の段の数字: 1347
  - 取得する段の順: 734117
- **ピアノ**
  - 必要な歌の段の数字: 157
  - 取得する段の順: 715
- **フォルテ**
  - 必要な歌の段の数字: 2468
  - 取得する段の順: 6824
- **メゾフォルテ**
  - 必要な歌の段の数字: 24678
  - 取得する段の順: 746824
- **フォルテシモ**
  - 必要な歌の段の数字: 234678
  - 取得する段の順: 682437
- **フォルテシシモ**
  - 必要な歌の段の数字: 234678
  - 取得する段の順: 6824337
- **クレシェンド**
  - 必要な歌の段の数字: 12358
  - 取得する段の順: 223815
- **マジ**
  - 必要な歌の段の数字: 47
  - 取得する段の順: 74
- **ガチ**
  - 必要な歌の段の数字: 34
  - 取得する段の順: 34
- **コワレタアクセラ**
  - 必要な歌の段の数字: 1234
  - 取得する段の順: 21241232

## ギャンブル魔法 ギャンブル

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **ダイスロール**
  - 必要な歌の段の数字: 12358
  - 取得する段の順: 513282
- **トリプルロール**
  - 必要な歌の段の数字: 2478
  - 取得する段の順: 4272282
- **ペンタロール**
  - 必要な歌の段の数字: 12478
  - 取得する段の順: 714282
- **デカロール**
  - 必要な歌の段の数字: 258
  - 取得する段の順: 52282
- **コイントス**
  - 必要な歌の段の数字: 1234
  - 取得する段の順: 21143
- **アバラクダケロ**
  - 必要な歌の段の数字: 1256
  - 取得する段の順: 1622522
- **ロシアンルーレット**
  - 必要な歌の段の数字: 12348
  - 取得する段の順: 231128284

## 特殊魔法 特殊

### 呪文一覧 (名前 | 必要な歌の段の数字 | 取得する段の順)

- **ハレルヤバルン**
  - 必要な歌の段の数字: 126
  - 取得する段の順: 6221621
- **バイバイ**
  - 必要な歌の段の数字: 16
  - 取得する段の順: 6161
- **ベールハイド**
  - 必要な歌の段の数字: 12568
  - 取得する段の順: 682615
- **バールハイト**
  - 必要な歌の段の数字: 12468
  - 取得する段の順: 682614
- **ノスタルジアメール**
  - 必要な歌の段の数字: 1234578
  - 取得する段の順: 534241782
- **シアワセリープ**
  - 必要な歌の段の数字: 12378
  - 取得する段の順: 3113287
- **コネクトテストア**
  - 必要な歌の段の数字: 12345
  - 取得する段の順: 25244341
- **ハジマリノマホウ**
  - 必要な歌の段の数字: 124567
  - 取得する段の順: 64725761
- **シュウエンノマホウ**
  - 必要な歌の段の数字: 135678
  - 取得する段の順: 381115761
- **シクハック**
  - 必要な歌の段の数字: 2368
  - 取得する段の順: 32682
- **ダブルロール**
  - 必要な歌の段の数字: 2568
  - 取得する段の順: 562282
- **ドクナオール**
  - 必要な歌の段の数字: 1258
  - 取得する段の順: 525182
- **ドクバラノマイ**
  - 必要な歌の段の数字: 12567
  - 取得する段の順: 5262571
- **ベノムガード**
  - 必要な歌の段の数字: 35678
  - 取得する段の順: 657385
- **ベノムソード**
  - 必要な歌の段の数字: 35678
  - 取得する段の順: 657385
- **ミライヨチ**
  - 必要な歌の段の数字: 1247
  - 取得する段の順: 72114
- **リバーサルフェイト**
  - 必要な歌の段の数字: 123468
  - 取得する段の順: 268326814
- **テンペンチー**
  - 必要な歌の段の数字: 417148
  - 取得する段の順: 1478
- **ジュゲム（省略）**
  - 必要な歌の段の数字: 4837（省略）
  - 取得する段の順: 3478
- **イマナニカシタカ**
  - 必要な歌の段の数字: 17552342
  - 取得する段の順: 123457
- **ドロー**
  - 必要な歌の段の数字: 528
  - 取得する段の順: 258
- **ロスト**
  - 必要な歌の段の数字: 234
  - 取得する段の順: 234
- **スペルジョーカー**
  - 必要な歌の段の数字: 37248828
  - 取得する段の順: 23478

