# タイトルスライド要件定義

## 目的
プレゼンテーションの開始時に強いインパクトを与える、フルスクリーンのタイトルスライドを提供します。黒背景に白文字の中央揃えデザインで、Apple のキーノートスタイルを再現します。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.001.jpeg`
- **画像説明**: フルスクリーンの黒背景に「MacBook Pro」などの大型タイトルが中央配置されたヒーローデザイン

## 既存スライド型
- **type**: `title`
- **実装関数**: `createTitleSlide()` (`src/slides.js`)

## レイアウト仕様
- **スライド比率**: 16:9 (960 × 540pt 基準)
- **背景**: 全面ブラック (`#000000`)
- **タイトル配置**: 画面中央（水平・垂直ともに中央揃え）
- **セーフティマージン**: 上下左右 120pt 推奨
- **タイトル領域**: 
  - 横幅: 720pt (中央揃えで可変)
  - 縦幅: 120pt～180pt（フォントサイズに応じて調整）
  - 位置: 中央 (top: 240pt 付近)
- **日付表示領域**: タイトルの下 80pt、中央揃え
- **ロゴ配置**: 右上隅（オプション）
  - 位置: right: 20pt, top: 20pt
  - サイズ: 75pt × 75pt 程度

## タイポグラフィ
- **フォント**: Inter → SF Pro Display → system-ui → -apple-system → sans-serif
- **タイトル**:
  - サイズ: 72pt～96pt (長さに応じて可変)
  - ウェイト: 700 (Bold)
  - カラー: `#FFFFFF`
  - 配置: CENTER
  - 行間: 1.2 (タイトルが複数行の場合)
- **日付**:
  - サイズ: 24pt～32pt
  - ウェイト: 400 (Regular)
  - カラー: `#E0E0E0`
  - 配置: CENTER

## カラーパレット
- **背景色**: `#000000` (Pure Black)
- **タイトル文字**: `#FFFFFF` (Pure White)
- **日付文字**: `#E0E0E0` (Light Gray)
- **ロゴ**: 設定による（デフォルトは企業ロゴの原色を使用）

## ビジュアル要素
- **背景装飾**: なし（ミニマリズムを維持）
- **グラデーション**: なし
- **アイコン・図形**: なし
- **ロゴ**: 右上に企業ロゴを配置（オプション、設定による）
- **アニメーション想定**: フェードイン、スケールアップなど（実装外）

## 実装メモ

### 既存コードとの整合性
- `createTitleSlide()` は既に実装済み
- `CONFIG.FONTS` の設定を参照してフォントを適用
- `settings.showLogo` で右上ロゴの表示/非表示を制御
- `settings.showDateColumn` で日付表示の有無を制御

### 実装時の注意点
1. タイトルが長い場合は自動改行とフォントサイズの調整を行う
2. 日付フォーマットは `YYYY.MM.DD` 形式を標準とする
3. ロゴは `CONFIG.LOGOS.header` から取得し、アスペクト比を維持して配置
4. タイトルが空の場合は「無題のプレゼンテーション」などのデフォルトテキストを表示

### レイアウトマネージャー連携
```javascript
// layoutManager.js の titleSlide 定義を参照
const titleRect = layout.getRect('titleSlide.title');
const dateRect = layout.getRect('titleSlide.date');
const logoRect = layout.getRect('titleSlide.logo');
```

## データスキーマ例

### 基本形
```json
{
  "type": "title",
  "title": "MacBook Pro",
  "date": "2024.10.15",
  "notes": "プレゼンテーションの開始スライドです。製品名を強調し、視覚的なインパクトを与えます。"
}
```

### 複数行タイトル
```json
{
  "type": "title",
  "title": "Apple Silicon M4\nThe Next Generation",
  "date": "2024.10.15"
}
```

### 日付なし
```json
{
  "type": "title",
  "title": "Innovation Through Simplicity"
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createTitleSlide()`
- **レイアウト定義**: `src/layoutManager.js` - `titleSlide` 定義
- **カラー設定**: `src/config.js` - `CONFIG.COLORS`

## バリエーション検討
以下のバリエーションも検討可能：
1. **サブタイトル付き**: タイトルの下に小さめのサブタイトルを追加
2. **背景画像**: 黒背景の代わりに暗めの背景画像を使用
3. **グラデーション**: 黒から濃いグレーへのグラデーション背景
4. **アクセントライン**: タイトル下に細いアクセントラインを追加

## アクセシビリティ
- **コントラスト比**: 21:1（WCAG AAA準拠）
- **フォントサイズ**: 大型スクリーンでの視認性に配慮
- **シンプルなレイアウト**: 視線の焦点を1箇所に集中
