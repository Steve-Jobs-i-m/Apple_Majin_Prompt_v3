# 価格表示スライド要件定義

## 目的
製品名、サイズ、価格を大きく中央配置し、製品画像と組み合わせて価格情報を効果的に伝えます。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.007.jpeg`
- **画像説明**: 中央に「MacBook Pro」「14-inch」「$1599」のテキスト、下部に製品画像

## 既存スライド型
- **type**: `content`
- **実装関数**: `createContentSlide()` (中央揃えレイアウト)

## レイアウト仕様
- **スライド比率**: 16:9 (960 × 540pt 基準)
- **背景**: ブラック (`#000000`)
- **中央テキストエリア**:
  - 位置: 中央揃え（垂直・水平）
  - 幅: 600pt
- **製品画像エリア**:
  - 位置: 下部中央
  - 幅: 500pt～600pt
  - top: 300pt 付近

## タイポグラフィ
- **製品名**:
  - サイズ: 56pt～64pt
  - ウェイト: 700 (Bold)
  - カラー: `#FFFFFF`
  - 配置: CENTER
- **サイズ/モデル**:
  - サイズ: 32pt～40pt
  - ウェイト: 400 (Regular)
  - カラー: `#E0E0E0`
  - 配置: CENTER
- **価格**:
  - サイズ: 48pt～56pt
  - ウェイト: 700 (Bold)
  - カラー: `#FFFFFF`
  - 配置: CENTER

## カラーパレット
- **背景色**: `#000000`
- **製品名・価格**: `#FFFFFF`
- **サイズ情報**: `#E0E0E0`

## ビジュアル要素
- **製品画像**: 下部中央に配置、微細なドロップシャドウ

## データスキーマ例
```json
{
  "type": "content",
  "layout": "pricing",
  "product": "MacBook Pro",
  "size": "14-inch",
  "price": "$1599",
  "image": "https://example.com/macbook-pro.png",
  "notes": "MacBook Pro の価格を中央に大きく表示。"
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createContentSlide()`
