# カードグリッドスライド要件定義

## 目的
製品の主要機能やスペックを、視覚的に整理されたカードグリッドレイアウトで提示します。製品ハイライトやモザイク表示に最適です。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.005.jpeg`
- **画像説明**: 中央にMacBook画像、周囲に複数の角丸カードで仕様（ディスプレイ、バッテリー、ストレージなど）を配置

## 既存スライド型
- **type**: `cards`
- **実装関数**: `createCardsSlide()` (`src/slides.js`)

## レイアウト仕様
- **スライド比率**: 16:9 (960 × 540pt 基準)
- **背景**: ブラック (`#000000`)
- **ヘッダー領域**:
  - タイトル: 左揃え、top: 50pt, left: 25pt
  - 幅: 830pt, 高さ: 65pt
- **グリッドエリア**:
  - 位置: top: 172pt, left: 25pt
  - 幅: 910pt, 高さ: 290pt
  - グリッド: 2列または3列（カード数により自動調整）
  - カード間ギャップ: 16pt
- **各カード**:
  - 角丸: 16pt
  - 背景: `#1E1E1E` (Dark Gray) または白
  - ボーダー: 1pt, `#3A3A3A` (オプション)
  - パディング: 内側 16pt～24pt
  - 影: 微細なドロップシャドウ（オプション）

## タイポグラフィ
- **タイトル**:
  - サイズ: 48pt
  - ウェイト: 700 (Bold)
  - カラー: `#FFFFFF`
  - 配置: LEFT
- **カード見出し**:
  - サイズ: 24pt～28pt
  - ウェイト: 700 (Bold)
  - カラー: `#FFFFFF`
  - 配置: LEFT
- **カード本文**:
  - サイズ: 14pt～16pt
  - ウェイト: 400 (Regular)
  - カラー: `#E0E0E0`
  - 行間: 1.4
  - 配置: LEFT

## カラーパレット
- **背景色**: `#000000`
- **カード背景**: `#1E1E1E` (Dark) または `#FFFFFF` (Light)
- **カードボーダー**: `#3A3A3A` (Subtle Gray)
- **テキスト（Dark背景）**: `#FFFFFF`
- **テキスト（Light背景）**: `#1A1A1A`
- **アクセント**: `CONFIG.COLORS.primary`

## ビジュアル要素
- **中央画像（オプション）**:
  - 製品画像を中央カードまたは背景に配置
  - グロー効果: 微細な光彩（オプション）
  - サイズ: グリッドの1～2セル分
- **アイコン**:
  - 各カードの上部に配置（オプション）
  - サイズ: 32pt × 32pt
  - カラー: プライマリカラーまたは白
- **カード配置パターン**:
  - 2x2: 4枚のカード（大きめ）
  - 3x2: 6枚のカード（バランス型）
  - 3x3: 9枚のカード（情報密度高）
  - 非対称: 中央に大きなカード、周囲に小カード

## 実装メモ

### 既存コードとの整合性
- `createCardsSlide()` を使用
- `data.items` 配列で各カードの内容を定義
- `data.columns` でカラム数を指定（2または3）
- 中央画像は `data.centerImage` で指定

### 実装時の注意点
1. カード数に応じて自動的にグリッドを調整（2列 or 3列）
2. カード内のテキストが長い場合は自動調整（フォントサイズ縮小または省略）
3. 中央に画像を配置する場合は周囲のカードレイアウトを調整
4. カードの高さは内容に応じて可変（ただし行内は統一）
5. アイコンはオプション（なければテキストのみ）

### レイアウトマネージャー連携
```javascript
const titleRect = layout.getRect('cardsSlide.title');
const gridArea = layout.getRect('cardsSlide.gridArea');
```

## データスキーマ例

### 製品ハイライト（6枚カード）
```json
{
  "type": "cards",
  "title": "MacBook Pro Highlights",
  "columns": 3,
  "items": [
    {
      "icon": "display",
      "heading": "14.2\" & 16.2\"",
      "body": "Liquid Retina XDR display"
    },
    {
      "icon": "battery",
      "heading": "24 hours",
      "body": "Battery life"
    },
    {
      "icon": "chip",
      "heading": "Apple Intelligence",
      "body": "Personal AI assistant"
    },
    {
      "icon": "storage",
      "heading": "Up to 8TB",
      "body": "SSD storage"
    },
    {
      "icon": "ports",
      "heading": "Thunderbolt 5",
      "body": "Up to 120 Gb/s"
    },
    {
      "icon": "connectivity",
      "heading": "Wi-Fi 7",
      "body": "Next-gen wireless"
    }
  ],
  "centerImage": "https://example.com/macbook-hero.png",
  "notes": "MacBook Pro の主要スペックをカードグリッドで一覧表示。視覚的に情報を整理しています。"
}
```

### シンプルな4枚カード
```json
{
  "type": "cards",
  "title": "Key Features",
  "columns": 2,
  "items": [
    {
      "heading": "Performance",
      "body": "Up to 2x faster than previous generation"
    },
    {
      "heading": "Efficiency",
      "body": "30% lower power consumption"
    },
    {
      "heading": "Connectivity",
      "body": "5G and Wi-Fi 6E support"
    },
    {
      "heading": "Security",
      "body": "Advanced encryption and biometrics"
    }
  ]
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createCardsSlide()`
- **レイアウト定義**: `src/layoutManager.js` - `cardsSlide` 定義
- **カード描画**: カード生成ロジックは `createCardsSlide()` 内で実装

## バリエーション検討
1. **ヘッダー付きカード**: `headerCards` タイプを使用
2. **箇条書きカード**: `bulletCards` タイプで詳細情報を表示
3. **カラフルカード**: 各カードに異なるアクセントカラー
4. **画像カード**: テキストの代わりに画像を主体とする

## アクセシビリティ
- **コントラスト**: カード背景とテキストで 4.5:1 以上
- **情報構造**: 見出しと本文の階層を明確に
- **スキャナビリティ**: カード間の間隔で視覚的分離
- **一貫性**: すべてのカードで同じフォーマット
