# バー比較スライド要件定義

## 目的
複数のデータポイントを横棒グラフで視覚的に比較し、性能差や改善度を直感的に伝えるスライドです。Affinity Photo ベンチマークのような比較データの表示に最適です。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.004.jpeg`
- **画像説明**: 「Image processing in Affinity Photo」タイトルの下に、M4/M3/M1 MacBook Pro の性能を横棒で比較

## 既存スライド型
- **type**: `barCompare`
- **実装関数**: `createBarCompareSlide()` (`src/slides.js`)

## レイアウト仕様
- **スライド比率**: 16:9 (960 × 540pt 基準)
- **背景**: ブラック (`#000000`)
- **ヘッダー領域**:
  - タイトル: 中央揃え、top: 50pt
  - 幅: 830pt, 高さ: 65pt
- **比較エリア**:
  - 位置: top: 172pt, left: 80pt
  - 幅: 800pt, 高さ: 290pt
  - アイテム間隔: 36pt
- **各バー構成**:
  - アイコン: 左端、36pt × 36pt
  - ラベル: アイコンの右、160pt 幅
  - バー背景: 淡いグレー、full width
  - バー前景: プログレス部分、カラー付き
  - 値表示: 右端、right-aligned

## タイポグラフィ
- **タイトル**:
  - サイズ: 48pt
  - ウェイト: 700 (Bold)
  - カラー: `#FFFFFF`
  - 配置: CENTER
- **モデル名（ラベル）**:
  - サイズ: 20pt～24pt
  - ウェイト: 600 (Semi-bold)
  - カラー: `#FFFFFF`
  - 配置: LEFT
- **数値・速度表示**:
  - サイズ: 20pt～24pt
  - ウェイト: 700 (Bold)
  - カラー: `#FFFFFF`
  - 配置: RIGHT
  - 例: "1.3x faster", "1.8x faster"

## カラーパレット
- **背景色**: `#000000`
- **タイトル・ラベル**: `#FFFFFF`
- **バー背景**: `#3A3A3A` (Dark Gray)
- **強調バー（最新モデル）**: `#00D4FF` (Aqua/Cyan) または `CONFIG.COLORS.primary`
- **通常バー**: `#757575` (Medium Gray)
- **旧モデルバー**: `#5A5A5A` (Neutral Gray)

## ビジュアル要素
- **アイコン**:
  - 各バーの左端に配置
  - チップアイコン（M4, M3, M1）または製品アイコン
  - サイズ: 36pt × 36pt
  - カラー: 白またはグレー
- **横棒グラフ**:
  - 角丸: 8pt
  - 高さ: 48pt～60pt
  - 背景: 暗めのグレー（全幅）
  - 前景: 性能に応じた幅、カラー付き
  - アニメーション: 左から右へ伸びる効果（実装外）
- **値ラベル**:
  - バーの右端に配置
  - 背景なし、テキストのみ
  - 強調表示: 最新モデルは Aqua カラー

## 実装メモ

### 既存コードとの整合性
- `createBarCompareSlide()` を使用
- `data.items` 配列で各バーのデータを定義
- 各アイテムに `label`, `value`, `percentage` を含める

### 実装時の注意点
1. 最大値を基準に他のバーの長さを相対計算
2. 最新/最速のアイテムを自動的にハイライト（Aqua カラー）
3. アイコンはオプション（なければスペースを詰める）
4. 値ラベルは右端に固定（バーの長さに関わらず）
5. 3～5項目程度が最適（多すぎると視認性低下）

### レイアウトマネージャー連携
```javascript
const titleRect = layout.getRect('barCompareSlide.title');
const areaRect = layout.getRect('barCompareSlide.area');
```

## データスキーマ例

### Affinity Photo ベンチマーク例
```json
{
  "type": "barCompare",
  "title": "Image processing in Affinity Photo",
  "items": [
    {
      "label": "M4 MacBook Pro",
      "value": 100,
      "displayValue": "1.8x faster",
      "icon": "m4-chip",
      "highlight": true
    },
    {
      "label": "M3 MacBook Pro",
      "value": 76,
      "displayValue": "1.3x faster",
      "icon": "m3-chip"
    },
    {
      "label": "M1 MacBook Pro",
      "value": 55,
      "displayValue": "Baseline",
      "icon": "m1-chip"
    }
  ],
  "notes": "Affinity Photo での画像処理性能を比較。M4 は M1 比で 1.8倍高速です。"
}
```

### バッテリー寿命比較例
```json
{
  "type": "barCompare",
  "title": "Battery Life Comparison",
  "items": [
    {
      "label": "14-inch MacBook Pro",
      "value": 22,
      "displayValue": "22 hours"
    },
    {
      "label": "13-inch MacBook Air",
      "value": 18,
      "displayValue": "18 hours"
    },
    {
      "label": "MacBook Pro (Intel)",
      "value": 10,
      "displayValue": "10 hours"
    }
  ]
}
```

### パーセンテージ比較例
```json
{
  "type": "barCompare",
  "title": "Market Share by Region",
  "items": [
    {
      "label": "North America",
      "value": 85,
      "displayValue": "85%"
    },
    {
      "label": "Europe",
      "value": 62,
      "displayValue": "62%"
    },
    {
      "label": "Asia Pacific",
      "value": 48,
      "displayValue": "48%"
    }
  ]
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createBarCompareSlide()`
- **レイアウト定義**: `src/layoutManager.js` - `barCompareSlide` 定義
- **カラー設定**: `src/config.js` - `CONFIG.COLORS.primary`

## バリエーション検討
1. **縦棒グラフ**: 横バーを縦バーに変更
2. **グループ化**: カテゴリごとにバーをグループ化
3. **スタック**: 積み上げ棒グラフで内訳を表示
4. **グリッドライン**: 背景に薄いグリッドを追加（オプション）

## アクセシビリティ
- **コントラスト**: バーと背景のコントラスト比 4.5:1 以上
- **カラーだけに依存しない**: 値ラベルで数値も表示
- **順序**: 通常は値の降順に配置
- **ラベル**: すべてのバーに明確なラベルを付ける
