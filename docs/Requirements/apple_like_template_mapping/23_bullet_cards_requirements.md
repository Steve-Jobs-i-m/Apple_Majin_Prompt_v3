# 箇条書きカードスライド要件定義

## 目的
各カードに箇条書きリストを含めて、詳細な情報を整理して提示します。機能比較やチェックリストに最適です。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.023.jpeg`
- **画像説明**: 黒背景に箇条書きテキストを含むカードをグリッド配置

## 既存スライド型
- **type**: `bulletCards`
- **実装関数**: `createBulletCardsSlide()` (`src/slides.js`)

## レイアウト仕様
- **スライド比率**: 16:9
- **背景**: ブラック (`#000000`)
- **グリッド**: 2×2
- **各カード**: タイトル + 箇条書きリスト

## タイポグラフィ
- **タイトル**: 48pt, Bold, `#FFFFFF`
- **カードタイトル**: 24pt, Bold, `#FFFFFF`
- **箇条書き**: 14pt, Regular, `#E0E0E0`, 行間 1.5

## カラーパレット
- **背景色**: `#000000`
- **カード背景**: `#1E1E1E`
- **タイトル**: `#FFFFFF`
- **箇条書き**: `#E0E0E0`
- **マーカー**: `CONFIG.COLORS.primary`

## データスキーマ例
```json
{
  "type": "bulletCards",
  "title": "機能比較",
  "items": [
    {
      "title": "エントリーモデル",
      "bullets": ["8GBメモリ", "256GB SSD", "基本機能"]
    },
    {
      "title": "プロモデル",
      "bullets": ["16GBメモリ", "512GB SSD", "高度な機能"]
    }
  ],
  "notes": "製品モデルを箇条書きカードで比較。"
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createBulletCardsSlide()`
