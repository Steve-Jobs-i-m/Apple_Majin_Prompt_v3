# ダイアグラム（円グラフ）スライド要件定義

## 目的
円グラフやパイチャートで割合やカテゴリの分布を視覚的に表示します。データの比率を直感的に理解できます。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.010.jpeg`
- **画像説明**: 黒背景に4つのセグメントを持つ円グラフ（青、緑、グレー、オレンジ）

## 既存スライド型
- **type**: `diagram`
- **実装関数**: `createDiagramSlide()` (`src/slides.js`)

## レイアウト仕様
- **スライド比率**: 16:9 (960 × 540pt 基準)
- **背景**: ブラック (`#000000`)
- **円グラフエリア**:
  - 位置: 中央揃え
  - 直径: 300pt～400pt

## タイポグラフィ
- **タイトル**:
  - サイズ: 48pt
  - ウェイト: 700 (Bold)
  - カラー: `#FFFFFF`
  - 配置: LEFT または CENTER

## カラーパレット
- **背景色**: `#000000`
- **セグメント色**: `#4285F4` (青), `#0F9D58` (緑), `#757575` (グレー), `#FF9800` (オレンジ)

## ビジュアル要素
- **円グラフ**: スムーズなエッジ、アンチエイリアス処理
- **レジェンド**: 各セグメントの説明をグラフの横に配置（オプション）

## データスキーマ例
```json
{
  "type": "diagram",
  "title": "Market Distribution",
  "chartType": "pie",
  "segments": [
    {"label": "Product A", "value": 35, "color": "#4285F4"},
    {"label": "Product B", "value": 28, "color": "#0F9D58"},
    {"label": "Product C", "value": 22, "color": "#757575"},
    {"label": "Product D", "value": 15, "color": "#FF9800"}
  ],
  "notes": "市場分布を円グラフで視覚化。"
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createDiagramSlide()`
