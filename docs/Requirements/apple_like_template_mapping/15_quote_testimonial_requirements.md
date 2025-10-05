# 引用スライド要件定義

## 目的
証言、引用、お客様の声などを大きく表示し、説得力を持たせるスライドです。感情的なインパクトと信頼性を伝えます。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.015.jpeg`
- **画像説明**: 黒背景に大きな日本語の見出し（左揃え）、下部に小さな帰属情報

## 既存スライド型
- **type**: `quote`
- **実装関数**: `createQuoteSlide()` (`src/slides.js`)

## レイアウト仕様
- **スライド比率**: 16:9 (960 × 540pt 基準)
- **背景**: ブラック (`#000000`)
- **ヘッダー領域**:
  - タイトル: 左揃え、top: 50pt, left: 25pt
  - 幅: 830pt, 高さ: 65pt
  - タイトル下線（オプション）: 左: 25pt, top: 118pt, 幅: 260pt, 高さ: 4pt
- **引用マーク領域**:
  - 位置: 左: 40pt, top: 180pt
  - サイズ: 100pt × 100pt
  - 引用符: 大きな「"」または「❝」
- **引用テキスト領域**:
  - 位置: 左: 150pt, top: 210pt
  - 幅: 700pt, 高さ: 150pt
- **帰属情報領域**:
  - 位置: 右: 110pt, top: 370pt
  - 幅: 700pt, 高さ: 30pt
  - 配置: RIGHT

## タイポグラフィ
- **タイトル（オプション）**:
  - サイズ: 48pt
  - ウェイト: 700 (Bold)
  - カラー: `#FFFFFF`
  - 配置: LEFT
- **引用マーク**:
  - サイズ: 120pt～160pt
  - ウェイト: 400 (Regular) またはセリフフォント
  - カラー: `#4A4A4A` (Dark Gray) または `CONFIG.COLORS.primary` の薄め
  - 透明度: 0.3～0.5（控えめに）
- **引用テキスト**:
  - サイズ: 32pt～48pt
  - ウェイト: 600 (Semi-bold) または 400 (Regular)
  - カラー: `#FFFFFF`
  - 配置: LEFT または CENTER
  - 行間: 1.4～1.6（読みやすさ重視）
- **帰属情報（著者名・役職）**:
  - サイズ: 18pt～24pt
  - ウェイト: 400 (Regular)
  - カラー: `#9E9E9E` (Neutral Gray)
  - 配置: RIGHT または LEFT
  - イタリック: オプション

## カラーパレット
- **背景色**: `#000000`
- **引用マーク**: `#4A4A4A` (opacity: 0.3～0.5) または `CONFIG.COLORS.primary` (opacity: 0.2)
- **引用テキスト**: `#FFFFFF`
- **帰属情報**: `#9E9E9E`
- **アクセントライン**: `CONFIG.COLORS.primary`（オプション）

## ビジュアル要素
- **引用マーク**:
  - 大きな「"」（ダブルクォート）
  - または「❝」「❞」などのタイポグラフィック引用符
  - 半透明で背景に溶け込ませる
  - 左上に配置（または中央）
- **区切り線（オプション）**:
  - 引用テキストの上または下に配置
  - 幅: 80pt～120pt
  - 高さ: 2pt～4pt
  - カラー: プライマリカラー
- **背景画像（オプション）**:
  - 暗めの背景画像を使用可能
  - オーバーレイ: 黒の半透明レイヤーで可読性を確保

## 実装メモ

### 既存コードとの整合性
- `createQuoteSlide()` を使用
- `data.quoteText` で引用本文を指定
- `data.author` で著者名・帰属情報を指定
- `data.showQuoteMark` で引用マークの表示/非表示を制御

### 実装時の注意点
1. 引用テキストが長い場合は自動改行とフォントサイズの調整
2. 引用マークは背景として配置（テキストの後ろ）
3. 帰属情報は右揃えまたは引用テキストの直下に配置
4. 日本語の場合は「」、英語の場合は""を使用
5. イタリックは欧文フォントでのみ適用

### レイアウトマネージャー連携
```javascript
const titleRect = layout.getRect('quoteSlide.title');
const quoteMarkRect = layout.getRect('quoteSlide.quoteMark');
const quoteTextRect = layout.getRect('quoteSlide.quoteText');
const authorRect = layout.getRect('quoteSlide.author');
```

## データスキーマ例

### 基本形（英語引用）
```json
{
  "type": "quote",
  "quoteText": "Innovation distinguishes between a leader and a follower.",
  "author": "Steve Jobs, Apple Co-founder",
  "showQuoteMark": true,
  "notes": "スティーブ・ジョブズの名言を引用。リーダーシップとイノベーションの重要性を強調します。"
}
```

### 日本語の証言
```json
{
  "type": "quote",
  "title": "Customer Testimonial",
  "quoteText": "このMacBook Proは私の仕事を完全に変えました。パフォーマンスとバッテリー寿命の両立が素晴らしい。",
  "author": "田中太郎、映像クリエイター",
  "showQuoteMark": false
}
```

### タイトル付き引用
```json
{
  "type": "quote",
  "title": "What Our Customers Say",
  "quoteText": "The best laptop I've ever used. The M4 chip is incredibly fast and efficient.",
  "author": "Jane Smith, Software Engineer at TechCorp"
}
```

### 長い引用文
```json
{
  "type": "quote",
  "quoteText": "The combination of power, efficiency, and design makes this the ultimate creative tool. Whether I'm editing 8K video or running complex simulations, it handles everything effortlessly.",
  "author": "Alex Chen, Creative Director",
  "showQuoteMark": true
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createQuoteSlide()`
- **レイアウト定義**: `src/layoutManager.js` - `quoteSlide` 定義
- **テキストスタイル**: `src/textStyles.js` - 引用テキストのスタイリング

## バリエーション検討
1. **写真付き引用**: 引用者の写真を追加
2. **中央揃え**: テキストを画面中央に配置
3. **カラーアクセント**: 引用マークをブランドカラーに
4. **複数引用**: 短い引用を2～3個並べて表示

## アクセシビリティ
- **コントラスト**: 白文字/黒背景で 21:1（WCAG AAA）
- **フォントサイズ**: 大型スクリーンでも読みやすい
- **行間**: ゆとりのある行間で可読性を確保
- **帰属情報**: 引用の出典を明確に表示
