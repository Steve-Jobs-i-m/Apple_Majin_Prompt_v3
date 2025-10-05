# タイムラインスライド要件定義

## 目的
時系列のイベントやマイルストーンを、水平なタイムライン上に配置して視覚的に示します。製品ロードマップやプロジェクトスケジュールの表示に最適です。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.008.jpeg`
- **画像説明**: 黒背景に白い水平ライン、3つの円形ノード、斜めのラベルと説明文

## 既存スライド型
- **type**: `timeline`
- **実装関数**: `createTimelineSlide()` (`src/slides.js`)

## レイアウト仕様
- **スライド比率**: 16:9 (960 × 540pt 基準)
- **背景**: ブラック (`#000000`)
- **ヘッダー領域**:
  - タイトル: 左揃え、top: 50pt, left: 25pt
  - 幅: 830pt, 高さ: 65pt
  - タイトル下線: 左: 25pt, top: 118pt, 幅: 260pt, 高さ: 4pt
- **タイムラインエリア**:
  - 位置: top: 172pt, left: 25pt
  - 幅: 910pt, 高さ: 290pt
- **タイムライン要素**:
  - 水平ライン: 中央配置、高さ 2pt
  - ノード（円形）: 直径 16pt～20pt、ライン上に配置
  - ノード数: 3～5個（均等配置）
  - ノード間隔: 等間隔に自動計算

## タイポグラフィ
- **タイトル**:
  - サイズ: 48pt
  - ウェイト: 700 (Bold)
  - カラー: `#FFFFFF`
  - 配置: LEFT
- **マイルストーンラベル**:
  - サイズ: 24pt～28pt
  - ウェイト: 700 (Bold)
  - カラー: `#FFFFFF`
  - 配置: 斜め（30～35度傾斜）またはノード上部
- **日付/説明**:
  - サイズ: 14pt～16pt
  - ウェイト: 400 (Regular)
  - カラー: `#E0E0E0`
  - 配置: ラベルの下、または水平

## カラーパレット
- **背景色**: `#000000`
- **タイトル**: `#FFFFFF`
- **タイムライン（ライン）**: `#9E9E9E` (Neutral Gray)
- **ノード（未完了）**: `#5A5A5A` (Dark Gray) または空洞
- **ノード（完了）**: `CONFIG.COLORS.primary` (例: `#4285F4`)
- **ノード（次のステップ）**: `#FFB300` (Amber) または border のみ
- **テキスト**: `#FFFFFF` (ラベル), `#E0E0E0` (説明)

## ビジュアル要素
- **水平ライン**:
  - 太さ: 2pt
  - カラー: `#9E9E9E`
  - スタイル: 実線
- **ノード（円形）**:
  - サイズ: 16pt～20pt 直径
  - 境界: 2pt
  - 塗りつぶし: 状態により変化
    - 完了: プライマリカラーで塗りつぶし
    - 進行中: ボーダーのみ、内側は透明
    - 未開始: グレーで塗りつぶし
- **ラベルの傾き**:
  - 角度: 30～35度（反時計回り）
  - 位置: ノードの上部
  - ベースライン: ノードの中心から垂直に揃える
- **接続線**:
  - ノード間を実線で接続
  - 完了区間: プライマリカラー
  - 未完了区間: グレー

## 実装メモ

### 既存コードとの整合性
- `createTimelineSlide()` を使用
- `data.milestones` 配列で各マイルストーンを定義
- 各マイルストーンに `label`, `date`, `state` を含める

### 実装時の注意点
1. ノード数に応じて自動的に間隔を計算
2. ラベルの傾きは Apps Script の回転機能で実装（またはテキストボックスの配置で調整）
3. 状態（done, next, todo）に応じてノードの色を自動設定
4. ラベルが長い場合は改行または省略
5. 日付フォーマットは統一（例: "2024 Q1", "Jan 2024"）

### レイアウトマネージャー連携
```javascript
const titleRect = layout.getRect('timelineSlide.title');
const areaRect = layout.getRect('timelineSlide.area');
```

## データスキーマ例

### 基本形（3マイルストーン）
```json
{
  "type": "timeline",
  "title": "Product Roadmap 2024",
  "milestones": [
    {
      "label": "Q1 Launch",
      "date": "January 2024",
      "description": "Initial product release",
      "state": "done"
    },
    {
      "label": "Q2 Update",
      "date": "April 2024",
      "description": "Feature enhancements",
      "state": "next"
    },
    {
      "label": "Q3 Expansion",
      "date": "July 2024",
      "description": "Global rollout",
      "state": "todo"
    }
  ],
  "notes": "2024年の製品ロードマップをタイムラインで表示。Q1は完了、Q2が進行中、Q3が予定です。"
}
```

### 5ステップのプロジェクトタイムライン
```json
{
  "type": "timeline",
  "title": "Project Milestones",
  "subhead": "Development Timeline",
  "milestones": [
    {
      "label": "Research",
      "date": "Week 1-2",
      "state": "done"
    },
    {
      "label": "Design",
      "date": "Week 3-4",
      "state": "done"
    },
    {
      "label": "Development",
      "date": "Week 5-8",
      "state": "next"
    },
    {
      "label": "Testing",
      "date": "Week 9-10",
      "state": "todo"
    },
    {
      "label": "Launch",
      "date": "Week 11",
      "state": "todo"
    }
  ]
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createTimelineSlide()`
- **レイアウト定義**: `src/layoutManager.js` - `timelineSlide` 定義
- **図形描画**: 円形と線の描画は SlidesApp の shape 機能を使用

## バリエーション検討
1. **垂直タイムライン**: 縦方向のタイムライン
2. **ジグザグ配置**: ラベルを上下交互に配置
3. **アイコン付き**: 各ノードにアイコンを追加
4. **日付軸**: 実際の日付スケールに沿った配置

## アクセシビリティ
- **カラーに依存しない**: 状態を色だけでなく形状でも区別
- **明確なラベル**: すべてのノードにラベルを付ける
- **読みやすい配置**: ラベルの重なりを避ける
- **時系列順**: 左から右へ時間が進む配置
