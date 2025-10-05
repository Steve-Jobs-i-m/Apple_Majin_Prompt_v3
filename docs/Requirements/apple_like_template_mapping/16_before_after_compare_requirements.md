# Before/After比較スライド要件定義

## 目的
変化や改善を Before/After の2分割レイアウトで視覚的に対比させます。改善効果や変革を強調するのに効果的です。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.016.jpeg`
- **画像説明**: 左半分が淡いグレー背景に「Before」、右半分が黒背景に「After」、中央に縦の区切り線

## 既存スライド型
- **type**: `compare`
- **実装関数**: `createCompareSlide()` (`src/slides.js`)

## レイアウト仕様
- **スライド比率**: 16:9
- **左半分（Before）**: 
  - 幅: 480pt、背景: `#E8EAED` (淡いグレー)
  - テキストカラー: `#1A1A1A`
- **右半分（After）**: 
  - 幅: 480pt、背景: `#000000` (黒)
  - テキストカラー: `#FFFFFF`
- **中央区切り線**: 幅 2pt, `#FFFFFF` または `#757575`

## タイポグラフィ
- **Before/Afterラベル**:
  - サイズ: 56pt～72pt
  - ウェイト: 700 (Bold)
  - 配置: 各半分の中央（垂直・水平）

## カラーパレット
- **Before背景**: `#E8EAED` (淡いグレー)
- **After背景**: `#000000` (黒)
- **Beforeテキスト**: `#1A1A1A`
- **Afterテキスト**: `#FFFFFF`
- **区切り線**: `#FFFFFF` または `#757575`

## データスキーマ例
```json
{
  "type": "compare",
  "layout": "beforeAfter",
  "before": {
    "label": "Before",
    "description": "旧システム: 処理時間 10秒"
  },
  "after": {
    "label": "After",
    "description": "新システム: 処理時間 2秒"
  },
  "notes": "システム改善の効果をBefore/Afterで対比表示。"
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createCompareSlide()`
