# アイコントリオスライド要件定義

## 目的
3つのアイコンを水平に並べて、カテゴリやコンセプトを視覚的に表現します。シンプルで覚えやすいメッセージングに最適です。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.012.jpeg`
- **画像説明**: 黒背景に3つの白いシルエットアイコン（ランプ、椅子、ベッド）を等間隔配置

## 既存スライド型
- **type**: `cards`
- **実装関数**: `createCardsSlide()` (アイコンモード)

## レイアウト仕様
- **スライド比率**: 16:9
- **背景**: ブラック (`#000000`)
- **アイコンエリア**: 水平中央、等間隔（間隔 80pt～120pt）

## タイポグラフィ
- **タイトル**: 48pt, Bold, `#FFFFFF`, CENTER
- **アイコンラベル**: 20pt, Regular, `#E0E0E0`, CENTER（各アイコンの下）

## カラーパレット
- **背景色**: `#000000`
- **アイコン**: `#FFFFFF`

## ビジュアル要素
- **アイコン**: サイズ 80pt × 80pt、白シルエット、同じビジュアルウェイト

## データスキーマ例
```json
{
  "type": "cards",
  "layout": "icons",
  "title": "Living Spaces",
  "items": [
    {"icon": "lamp", "label": "Lighting"},
    {"icon": "chair", "label": "Furniture"},
    {"icon": "bed", "label": "Bedroom"}
  ],
  "notes": "3つのアイコンで生活空間のカテゴリを表示。"
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createCardsSlide()`
