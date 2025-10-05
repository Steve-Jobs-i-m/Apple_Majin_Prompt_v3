# ヘッダー付きカードスライド要件定義

## 目的
各カードに小見出しを付けて、情報を整理して提示します。製品特徴や比較項目の表示に適しています。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.022.jpeg`
- **画像説明**: 黒背景にヘッダーテキスト付きのカードをグリッド配置

## 既存スライド型
- **type**: `headerCards`
- **実装関数**: `createHeaderCardsSlide()` (`src/slides.js`)

## レイアウト仕様
- **スライド比率**: 16:9
- **背景**: ブラック (`#000000`)
- **グリッド**: 2×2 または 3×2
- **各カード**: ヘッダー + 本文エリア

## タイポグラフィ
- **タイトル**: 48pt, Bold, `#FFFFFF`
- **カードヘッダー**: 24pt, Bold, `#FFFFFF`
- **カード本文**: 16pt, Regular, `#E0E0E0`

## カラーパレット
- **背景色**: `#000000`
- **カード背景**: `#1E1E1E`
- **ヘッダー**: `#FFFFFF`
- **本文**: `#E0E0E0`

## データスキーマ例
```json
{
  "type": "headerCards",
  "title": "製品ラインナップ",
  "items": [
    {"header": "MacBook Air", "body": "軽量で持ち運びやすい"},
    {"header": "MacBook Pro", "body": "プロフェッショナル向け"},
    {"header": "iMac", "body": "オールインワンデスクトップ"},
    {"header": "Mac mini", "body": "コンパクトなデスクトップ"}
  ],
  "notes": "製品ラインナップをヘッダー付きカードで表示。"
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createHeaderCardsSlide()`
