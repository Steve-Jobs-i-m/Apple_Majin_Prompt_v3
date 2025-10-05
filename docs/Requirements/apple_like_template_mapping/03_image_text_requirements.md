# 画像テキストレイアウトスライド要件定義

## 目的
画像とテキストを組み合わせて、製品やコンセプトを視覚的に説明するスライドです。左右の配置で情報とビジュアルのバランスを取ります。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.003.jpeg`
- **画像説明**: 黒背景に左側に画像（M4チップのグラフィック）、右側にGPU仕様のテキスト

## 既存スライド型
- **type**: `imageText`
- **実装関数**: `createImageTextSlide()` (`src/slides.js`)

## レイアウト仕様
- **スライド比率**: 16:9 (960 × 540pt 基準)
- **背景**: ブラック (`#000000`)
- **左画像エリア**:
  - 位置: left: 25pt, top: 100pt
  - 幅: 455pt, 高さ: 362pt
- **右テキストエリア**:
  - 位置: left: 510pt, top: 100pt
  - 幅: 430pt, 高さ: 362pt
- **ギャップ**: 30pt（画像とテキストの間）

## タイポグラフィ
- **見出し**:
  - サイズ: 42pt～48pt
  - ウェイト: 700 (Bold)
  - カラー: `#FFFFFF`
- **サブ見出し**:
  - サイズ: 24pt～28pt
  - ウェイト: 600 (Semi-bold)
  - カラー: `#FFFFFF`
- **箇条書き**:
  - サイズ: 16pt～18pt
  - ウェイト: 400 (Regular)
  - カラー: `#E0E0E0`
  - 行間: 1.5

## カラーパレット
- **背景色**: `#000000`
- **テキスト**: `#FFFFFF`, `#E0E0E0`
- **区切り線**: `CONFIG.COLORS.primary`

## ビジュアル要素
- **画像配置**: 左カラム、アスペクト比を維持してフィット
- **グロー効果**: 画像に微細な光彩を追加（オプション）

## データスキーマ例
```json
{
  "type": "imageText",
  "image": "https://example.com/gpu.png",
  "heading": "10-core GPU",
  "bullets": [
    "Dynamic Caching",
    "Hardware-accelerated mesh shading",
    "2× faster ray tracing",
    "Advanced shader architecture"
  ],
  "notes": "GPU性能を画像とテキストで説明。"
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createImageTextSlide()`
