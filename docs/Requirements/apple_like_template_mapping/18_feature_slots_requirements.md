# 特徴スロットスライド要件定義

## 目的
4つの角丸矩形アウトラインを横に並べ、将来コンテンツを追加するプレースホルダーや特徴枠として使用します。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.018.jpeg`
- **画像説明**: 黒背景に4つの白い角丸矩形アウトライン（中身は透明）を等間隔に配置

## 既存スライド型
- **type**: `cards`
- **実装関数**: `createCardsSlide()` (アウトラインモード)

## レイアウト仕様
- **スライド比率**: 16:9
- **背景**: ブラック (`#000000`)
- **スロット**: 4つの正方形に近い矩形
- **サイズ**: 各 180pt × 180pt
- **間隔**: 等間隔（約 32pt）
- **角丸**: 16pt
- **配置**: 水平中央揃え

## ビジュアル要素
- **ストローク**: 白 `#FFFFFF`、太さ 3pt
- **塗りつぶし**: 透明
- **内側**: 将来のコンテンツ用に空

## データスキーマ例
```json
{
  "type": "cards",
  "layout": "slots",
  "title": "Key Features",
  "items": [
    {"placeholder": true},
    {"placeholder": true},
    {"placeholder": true},
    {"placeholder": true}
  ],
  "notes": "4つの特徴スロット。将来のコンテンツ用プレースホルダー。"
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createCardsSlide()`
