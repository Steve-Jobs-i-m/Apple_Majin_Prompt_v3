# フローチャートスライド要件定義

## 目的
意思決定プロセスや条件分岐を含むフローを図式化します。業務フローやアルゴリズムの説明に最適です。

## 対応画像
- **参照画像**: `Apple_like_template/Apple_like_template.028.jpeg`
- **画像説明**: 黒背景にボックスと矢印で構成されたフローチャート

## 既存スライド型
- **type**: `flowChart`
- **実装関数**: `createFlowChartSlide()` (`src/slides.js`)

## レイアウト仕様
- **スライド比率**: 16:9
- **背景**: ブラック (`#000000`)
- **フローエリア**: 中央配置
- **ノード配置**: 横または縦の流れ

## タイポグラフィ
- **タイトル**: 48pt, Bold, `#FFFFFF`
- **ノードテキスト**: 16pt, Regular, `#FFFFFF`

## カラーパレット
- **背景色**: `#000000`
- **ノード背景**: `#1E1E1E` または `CONFIG.COLORS.primary`
- **決定ノード**: ひし形、`#FFB300`
- **矢印**: `#757575`
- **テキスト**: `#FFFFFF`

## ビジュアル要素
- **プロセスノード**: 角丸矩形、150pt × 60pt
- **決定ノード**: ひし形、120pt × 120pt
- **矢印**: 直線または折れ線

## データスキーマ例
```json
{
  "type": "flowChart",
  "title": "承認プロセス",
  "nodes": [
    {"id": 1, "type": "process", "label": "申請提出"},
    {"id": 2, "type": "decision", "label": "予算内？"},
    {"id": 3, "type": "process", "label": "承認"},
    {"id": 4, "type": "process", "label": "却下"}
  ],
  "connections": [
    {"from": 1, "to": 2},
    {"from": 2, "to": 3, "label": "Yes"},
    {"from": 2, "to": 4, "label": "No"}
  ],
  "notes": "承認プロセスをフローチャートで表示。"
}
```

## 参考実装
- **既存実装**: `src/slides.js` - `createFlowChartSlide()`
