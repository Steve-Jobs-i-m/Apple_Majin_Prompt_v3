# 画像コラージュスライド要件定義

## 目的
複数の画像を非対称なレイアウトで配置し、視覚的な変化と興味を引きます。左に大きな横長画像、右に2つの縦長画像を積み重ねます。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.013.jpeg`
- **画像説明**: 黒背景に左側に大きな横長写真、右側に2つの縦長写真を上下に配置、角丸フレーム、ドロップシャドウ

## 既存スライド型
- **type**: `imageText`
- **実装関数**: `createImageTextSlide()` (マルチ画像モード)

## レイアウト仕様
- **スライド比率**: 16:9
- **背景**: ブラック (`#000000`)
- **左画像**: 幅 550pt × 高さ 362pt、角丸 16pt
- **右画像（上）**: 幅 360pt × 高さ 173pt、角丸 16pt
- **右画像（下）**: 幅 360pt × 高さ 173pt、角丸 16pt
- **ガター**: 画像間 16pt

## カラーパレット
- **背景色**: `#000000`

## ビジュアル要素
- **角丸フレーム**: すべての画像に統一 16pt
- **ドロップシャドウ**: 微細な影で立体感（blur: 20pt, opacity: 0.3）

## データスキーマ例
```json
{
  "type": "imageText",
  "layout": "collage",
  "images": [
    {"url": "https://example.com/landscape.jpg", "size": "large"},
    {"url": "https://example.com/portrait1.jpg", "size": "small"},
    {"url": "https://example.com/portrait2.jpg", "size": "small"}
  ],
  "notes": "複数画像を非対称レイアウトでコラージュ表示。"
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createImageTextSlide()`
