# 2カラムコンテンツスライド要件定義

## 目的
CPUスペックなどの技術仕様を、テキストと画像の2カラムレイアウトで効果的に伝えるスライドです。左右の視覚バランスを保ちながら、詳細情報と視覚的要素を組み合わせます。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.002.jpeg`
- **画像説明**: 黒背景に左カラム（10-core CPU のテキスト情報）と右カラム（M4チップの画像）を配置

## 既存スライド型
- **type**: `content`
- **実装関数**: `createContentSlide()` (`src/slides.js`)

## レイアウト仕様
- **スライド比率**: 16:9 (960 × 540pt 基準)
- **背景**: ブラック (`#000000`)
- **ヘッダー領域**:
  - タイトル: 左揃え、top: 50pt, left: 25pt
  - 幅: 830pt, 高さ: 65pt
  - タイトル下線: 左: 25pt, top: 118pt, 幅: 260pt, 高さ: 4pt
- **2カラムレイアウト** (左右分割):
  - 左カラム (テキスト): 
    - 位置: left: 25pt, top: 172pt
    - 幅: 430pt, 高さ: 290pt
  - 右カラム (画像):
    - 位置: left: 485pt, top: 172pt
    - 幅: 455pt, 高さ: 290pt
  - カラム間ガター: 30pt
- **フッター**: 
  - 下部バー: 高さ 2pt、プライマリカラー
  - ページ番号: 右下

## タイポグラフィ
- **タイトル**:
  - サイズ: 48pt～56pt
  - ウェイト: 700 (Bold)
  - カラー: `#FFFFFF`
  - 配置: LEFT
- **見出し（例: "10-core CPU"）**:
  - サイズ: 36pt～42pt
  - ウェイト: 700 (Bold)
  - カラー: `#FFFFFF`
- **サブセクション（例: "4 performance cores"）**:
  - サイズ: 24pt～28pt
  - ウェイト: 600 (Semi-bold)
  - カラー: `#FFFFFF`
- **箇条書き**:
  - サイズ: 16pt～18pt
  - ウェイト: 400 (Regular)
  - カラー: `#E0E0E0`
  - 行間: 1.5
- **区切り線**:
  - 幅: 60pt
  - 高さ: 2pt
  - カラー: プライマリカラー（アクセント）

## カラーパレット
- **背景色**: `#000000`
- **タイトル・見出し**: `#FFFFFF`
- **本文テキスト**: `#E0E0E0`
- **アクセント**: `CONFIG.COLORS.primary`（例: `#4285F4`）
- **画像背景**: 透明または暗めのグラデーション

## ビジュアル要素
- **画像配置**:
  - 右カラムに1枚配置
  - アスペクト比を維持してフィット
  - 中央揃え（垂直・水平）
  - 必要に応じて背景にグロー効果（オプション）
- **区切り線**:
  - 見出しの下に細いアクセントライン
  - プライマリカラーで強調
- **箇条書きマーカー**:
  - 円形ドット (`•`) または三角形 (`▸`)
  - カラー: プライマリカラーまたは白

## 実装メモ

### 既存コードとの整合性
- `createContentSlide()` で `data.layout === 'twoColumn'` を使用
- `data.leftColumn` と `data.rightColumn` でコンテンツを分離
- 画像は `data.images` 配列から取得

### 実装時の注意点
1. 左右のコンテンツ量に応じて垂直方向の配置を調整
2. 画像が大きい場合は自動リサイズ（最大幅・高さを守る）
3. テキストが長い場合は自動改行とスクロール回避
4. 区切り線は見出しとサブセクションの区切りに使用

### レイアウトマネージャー連携
```javascript
const titleRect = layout.getRect('contentSlide.title');
const leftCol = layout.getRect('contentSlide.twoColLeft');
const rightCol = layout.getRect('contentSlide.twoColRight');
```

## データスキーマ例

### 基本形（CPUスペック例）
```json
{
  "type": "content",
  "layout": "twoColumn",
  "title": "Apple M4 Chip",
  "leftColumn": {
    "heading": "10-core CPU",
    "sections": [
      {
        "subheading": "4 performance cores",
        "bullets": [
          "Up to 4.5 GHz",
          "High-performance computing",
          "Power-efficient design"
        ]
      },
      {
        "subheading": "6 efficiency cores",
        "bullets": [
          "Optimized for battery life",
          "Background task handling",
          "Up to 3.8 GHz"
        ]
      }
    ]
  },
  "rightColumn": {
    "image": "https://example.com/m4-chip.png"
  },
  "notes": "M4チップのCPU仕様を詳細に説明します。左側でテキスト情報、右側で視覚的にチップイメージを表示。"
}
```

### GPU仕様例（左右反転）
```json
{
  "type": "content",
  "layout": "twoColumn",
  "title": "Graphics Performance",
  "leftColumn": {
    "image": "https://example.com/m4-gpu.png"
  },
  "rightColumn": {
    "heading": "10-core GPU",
    "bullets": [
      "Dynamic Caching",
      "Hardware-accelerated mesh shading",
      "2× faster ray tracing",
      "Advanced shader architecture"
    ]
  }
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createContentSlide()`
- **レイアウト定義**: `src/layoutManager.js` - `contentSlide.twoColLeft`, `contentSlide.twoColRight`
- **画像ヘルパー**: `src/helpers.js` - `renderImagesInArea()`

## バリエーション検討
1. **3カラムレイアウト**: 画像を中央に、テキストを左右に配置
2. **画像複数枚**: 右カラムに2x2グリッドで4枚配置
3. **背景グラデーション**: 左から右へのグラデーション背景
4. **アニメーション**: 左右からスライドイン効果（実装外）

## アクセシビリティ
- **コントラスト**: 白文字/黒背景で21:1（WCAG AAA）
- **情報構造**: 見出し階層を明確に
- **画像代替テキスト**: 画像の内容を説明する notes を提供
