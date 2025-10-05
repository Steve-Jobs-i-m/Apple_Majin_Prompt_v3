# Apple_like_template 画像マッピング - 実装ガイド

## 概要
このディレクトリには、`Apple_like_template/` フォルダ内の全32枚の参考画像を既存のスライド型に置き換えるための要件定義が含まれています。

## ドキュメント構成

### マスタードキュメント
- **`00_mapping_overview.md`** - 全32枚の画像と既存スライド型のマッピング一覧、要件定義の標準フォーマット

### 個別要件定義（01-32）
各ファイルは以下の番号規則に従っています：
- `01-32`: Apple_like_template.001.jpeg ～ 032.jpeg に対応
- ファイル名: `{番号}_{スライド型}_{説明}_requirements.md`

## クイックリファレンス

### スライド型別マッピング

#### 基本レイアウト
| 番号 | 画像ファイル | スライド型 | 用途 |
|------|------------|----------|------|
| 01 | Apple_like_template.001.jpeg | `title` | タイトルスライド |
| 19 | Apple_like_template.019.jpeg | `section` | セクション区切り |
| 32 | Apple_like_template.032.jpeg | `closing` | クロージングスライド |
| 31 | Apple_like_template.031.jpeg | `agenda` | アジェンダ |

#### コンテンツ系
| 番号 | 画像ファイル | スライド型 | 用途 |
|------|------------|----------|------|
| 02 | Apple_like_template.002.jpeg | `content` | 2カラムコンテンツ |
| 03 | Apple_like_template.003.jpeg | `imageText` | 画像テキストレイアウト |
| 07 | Apple_like_template.007.jpeg | `content` | 価格表示 |
| 20 | Apple_like_template.020.jpeg | `content` | テキスト中心 |

#### 比較・データ表示
| 番号 | 画像ファイル | スライド型 | 用途 |
|------|------------|----------|------|
| 04 | Apple_like_template.004.jpeg | `barCompare` | バー比較 |
| 09 | Apple_like_template.009.jpeg | `table` | テーブル |
| 11 | Apple_like_template.011.jpeg | `barCompare` | シンプルバーチャート |
| 16 | Apple_like_template.016.jpeg | `compare` | Before/After比較 |
| 17 | Apple_like_template.017.jpeg | `statsCompare` | 統計コントラスト |

#### カード系
| 番号 | 画像ファイル | スライド型 | 用途 |
|------|------------|----------|------|
| 05 | Apple_like_template.005.jpeg | `cards` | カードグリッド |
| 12 | Apple_like_template.012.jpeg | `cards` | アイコントリオ |
| 18 | Apple_like_template.018.jpeg | `cards` | 特徴スロット |
| 22 | Apple_like_template.022.jpeg | `headerCards` | ヘッダー付きカード |
| 23 | Apple_like_template.023.jpeg | `bulletCards` | 箇条書きカード |

#### KPI・メトリクス
| 番号 | 画像ファイル | スライド型 | 用途 |
|------|------------|----------|------|
| 06 | Apple_like_template.006.jpeg | `kpi` | KPI表示 |
| 24 | Apple_like_template.024.jpeg | `progress` | プログレスバー |

#### タイムライン・プロセス
| 番号 | 画像ファイル | スライド型 | 用途 |
|------|------------|----------|------|
| 08 | Apple_like_template.008.jpeg | `timeline` | タイムライン |
| 21 | Apple_like_template.021.jpeg | `process` | プロセス・ステップ |

#### ダイアグラム・図表
| 番号 | 画像ファイル | スライド型 | 用途 |
|------|------------|----------|------|
| 10 | Apple_like_template.010.jpeg | `diagram` | 円グラフ |
| 25 | Apple_like_template.025.jpeg | `cycle` | サイクル図 |
| 26 | Apple_like_template.026.jpeg | `triangle` | トライアングル図 |
| 27 | Apple_like_template.027.jpeg | `pyramid` | ピラミッド図 |
| 28 | Apple_like_template.028.jpeg | `flowChart` | フローチャート |
| 29 | Apple_like_template.029.jpeg | `stepUp` | ステップアップ図 |

#### 画像・ビジュアル系
| 番号 | 画像ファイル | スライド型 | 用途 |
|------|------------|----------|------|
| 13 | Apple_like_template.013.jpeg | `imageText` | 画像コラージュ |
| 14 | Apple_like_template.014.jpeg | `imageText` | ヒーロー画像 |
| 15 | Apple_like_template.015.jpeg | `quote` | 引用・証言 |

#### その他
| 番号 | 画像ファイル | スライド型 | 用途 |
|------|------------|----------|------|
| 30 | Apple_like_template.030.jpeg | `faq` | FAQ |

## 要件定義ファイルの構造

各要件定義ファイルには以下のセクションが含まれています：

1. **目的** - スライドの用途と役割
2. **対応画像** - Apple_like_template の該当ファイル名と説明
3. **既存スライド型** - マッピング先のtype名と実装関数
4. **レイアウト仕様** - 配置、サイズ、余白の詳細
5. **タイポグラフィ** - フォント、サイズ、ウェイト、配置
6. **カラーパレット** - 使用する色の定義
7. **ビジュアル要素** - アイコン、図形、背景などの仕様
8. **実装メモ** - GAS実装時の注意点
9. **データスキーマ例** - slideData での指定方法（JSON）
10. **参考実装** - 既存コードへの参照

## 使用方法

### 開発者向け
1. 実装するスライド型に対応する要件定義ファイルを参照
2. レイアウト仕様とタイポグラフィに従って実装
3. データスキーマ例を参考にインターフェースを設計
4. 既存実装（`src/slides.js`）との整合性を確認

### デザイナー向け
1. 各要件定義のビジュアル仕様を確認
2. カラーパレットとタイポグラフィの標準を適用
3. Apple_like_template 画像を参考にレイアウトを調整
4. SVGモックアップ作成時の基準資料として活用

### AI/プロンプトエンジニア向け
1. スライド生成プロンプトの入力資料として使用
2. データスキーマ例を参考にJSON構造を構築
3. タイポグラフィとレイアウトの制約を反映
4. 複数スライドの組み合わせパターンを設計

## 実装優先順位の推奨

### Phase 1: 必須スライド（高優先度）
- 01: タイトルスライド ✓（既存）
- 02: 2カラムコンテンツ ✓（既存）
- 19: セクション区切り ✓（既存）
- 32: クロージングスライド ✓（既存）

### Phase 2: コアコンテンツ（中優先度）
- 04: バー比較 ✓（既存）
- 05: カードグリッド ✓（既存）
- 08: タイムライン ✓（既存）
- 20: テキスト中心コンテンツ ✓（既存）

### Phase 3: 高度な図表（中優先度）
- 21: プロセス・ステップ ✓（既存）
- 25: サイクル図 ✓（既存）
- 26: トライアングル図 ✓（既存）
- 27: ピラミッド図 ✓（既存）

### Phase 4: 特殊用途（低優先度）
- 15: 引用・証言 ✓（既存）
- 30: FAQ ✓（既存）
- 31: アジェンダ ✓（既存）

## 開発時の注意事項

### レイアウトの一貫性
- すべてのスライドで16:9の比率を維持
- セーフティマージンを統一（上下左右 25pt～120pt）
- グリッド間隔は16pt、24pt、32ptの倍数を使用

### タイポグラフィの標準
- タイトル: 48pt～72pt, Bold
- 見出し: 24pt～42pt, Semi-bold
- 本文: 16pt～20pt, Regular
- キャプション: 14pt～16pt, Regular

### カラーパレットの使用
- 背景: `#000000`（黒）または `CONFIG.COLORS.background_white`
- テキスト: `#FFFFFF`（見出し）、`#E0E0E0`（本文）、`#9E9E9E`（キャプション）
- アクセント: `CONFIG.COLORS.primary`（動的設定可能）

### コード実装の参照先
- スライド生成関数: `src/slides.js`
- レイアウト定義: `src/layoutManager.js`
- カラー・フォント設定: `src/config.js`
- ヘルパー関数: `src/helpers.js`

## 関連ドキュメント
- `docs/Requirements/component_requirements.md` - 既存のコンポーネント要件
- `docs/Requirements/agenda_component_requirements.md` - アジェンダの詳細仕様
- `docs/google_slide_mvp_design.md` - Google Slide MVP デザイン
- `docs/prompt/AI_prompt/Apple_like_system_prompt_v3.md` - AI プロンプト v3

## 更新履歴
- 2024-10-15: 初版作成、全32枚の要件定義完了
- 各要件定義ファイルは個別に更新可能

## フィードバック・改善
要件定義の改善提案や追加仕様が必要な場合は、該当する要件定義ファイルを直接編集してください。
