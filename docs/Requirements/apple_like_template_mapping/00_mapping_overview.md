# Apple_like_template 画像とスライド型のマッピング概要

## 目的
このドキュメントは、`Apple_like_template/` フォルダ内の全32枚の参考画像を、既存のスライド型に置き換えるためのマッピングを定義します。

## 既存スライド型一覧
以下は `src/presentation.js` で定義されている既存のスライド型です：

1. `title` - タイトルスライド
2. `section` - セクション区切りスライド
3. `content` - コンテンツスライド
4. `agenda` - アジェンダスライド
5. `compare` - 比較スライド
6. `process` - プロセス・手順スライド
7. `processList` - プロセスリストスライド
8. `timeline` - タイムラインスライド
9. `diagram` - ダイアグラム（レーン図）スライド
10. `cycle` - サイクル図スライド
11. `cards` - カードスライド
12. `headerCards` - ヘッダー付きカードスライド
13. `table` - テーブルスライド
14. `progress` - プログレスバースライド
15. `quote` - 引用スライド
16. `kpi` - KPI表示スライド
17. `closing` - クロージングスライド
18. `bulletCards` - 箇条書きカードスライド
19. `faq` - FAQスライド
20. `statsCompare` - 統計比較スライド
21. `barCompare` - バー比較スライド
22. `triangle` - トライアングル図スライド
23. `pyramid` - ピラミッド図スライド
24. `flowChart` - フローチャートスライド
25. `stepUp` - ステップアップスライド
26. `imageText` - 画像テキストスライド

## マッピング一覧

| 画像ファイル | スライド型 | 説明 |
|------------|----------|------|
| Apple_like_template.001.jpeg | `title` | タイトルスライド（フルスクリーン、中央揃えテキスト） |
| Apple_like_template.002.jpeg | `content` | 2カラムコンテンツ（左：テキスト、右：画像） |
| Apple_like_template.003.jpeg | `imageText` | 画像テキストレイアウト（左：画像、右：テキスト） |
| Apple_like_template.004.jpeg | `barCompare` | バー比較スライド（横棒グラフ） |
| Apple_like_template.005.jpeg | `cards` | カードグリッドレイアウト |
| Apple_like_template.006.jpeg | `kpi` | 大型KPI表示（バッテリー寿命など） |
| Apple_like_template.007.jpeg | `content` | 製品価格表示（中央揃え） |
| Apple_like_template.008.jpeg | `timeline` | タイムラインスライド（水平ライン＋ノード） |
| Apple_like_template.009.jpeg | `table` | 2カラムテーブル |
| Apple_like_template.010.jpeg | `diagram` | 円グラフ風ダイアグラム |
| Apple_like_template.011.jpeg | `barCompare` | シンプルなバーチャート |
| Apple_like_template.012.jpeg | `cards` | アイコントリオ（3つのアイコン） |
| Apple_like_template.013.jpeg | `imageText` | 画像コラージュレイアウト |
| Apple_like_template.014.jpeg | `imageText` | フルブリード画像 |
| Apple_like_template.015.jpeg | `quote` | 引用・証言スライド |
| Apple_like_template.016.jpeg | `compare` | Before/After 比較 |
| Apple_like_template.017.jpeg | `statsCompare` | KPIコントラスト（2つの大きな数値） |
| Apple_like_template.018.jpeg | `cards` | 特徴スロット（4つの枠） |
| Apple_like_template.019.jpeg | `section` | セクション区切りスライド |
| Apple_like_template.020.jpeg | `content` | テキスト中心コンテンツ |
| Apple_like_template.021.jpeg | `process` | プロセス・ステップ表示 |
| Apple_like_template.022.jpeg | `headerCards` | ヘッダー付きカード |
| Apple_like_template.023.jpeg | `bulletCards` | 箇条書きカード |
| Apple_like_template.024.jpeg | `progress` | プログレスバー表示 |
| Apple_like_template.025.jpeg | `cycle` | サイクル図 |
| Apple_like_template.026.jpeg | `triangle` | トライアングル図 |
| Apple_like_template.027.jpeg | `pyramid` | ピラミッド図 |
| Apple_like_template.028.jpeg | `flowChart` | フローチャート |
| Apple_like_template.029.jpeg | `stepUp` | ステップアップ図 |
| Apple_like_template.030.jpeg | `faq` | FAQスライド |
| Apple_like_template.031.jpeg | `agenda` | アジェンダスライド |
| Apple_like_template.032.jpeg | `closing` | クロージングスライド |

## 要件定義ファイル構成
各テンプレート画像に対して、以下の構成で要件定義ファイルを作成します：

```
docs/Requirements/apple_like_template_mapping/
├── 00_mapping_overview.md (このファイル)
├── 01_title_slide_requirements.md
├── 02_content_two_column_requirements.md
├── 03_image_text_requirements.md
├── 04_bar_compare_requirements.md
├── 05_cards_grid_requirements.md
├── 06_kpi_display_requirements.md
├── 07_pricing_display_requirements.md
├── 08_timeline_requirements.md
├── 09_table_two_column_requirements.md
├── 10_diagram_pie_requirements.md
├── 11_bar_chart_simple_requirements.md
├── 12_icon_trio_requirements.md
├── 13_image_collage_requirements.md
├── 14_hero_image_requirements.md
├── 15_quote_testimonial_requirements.md
├── 16_before_after_compare_requirements.md
├── 17_stats_contrast_requirements.md
├── 18_feature_slots_requirements.md
├── 19_section_divider_requirements.md
├── 20_content_text_focused_requirements.md
├── 21_process_steps_requirements.md
├── 22_header_cards_requirements.md
├── 23_bullet_cards_requirements.md
├── 24_progress_bar_requirements.md
├── 25_cycle_diagram_requirements.md
├── 26_triangle_diagram_requirements.md
├── 27_pyramid_diagram_requirements.md
├── 28_flow_chart_requirements.md
├── 29_step_up_diagram_requirements.md
├── 30_faq_slide_requirements.md
├── 31_agenda_slide_requirements.md
└── 32_closing_slide_requirements.md
```

## 要件定義ファイルの標準フォーマット
各要件定義ファイルには以下の項目を含めます：

1. **目的** - スライドの用途と役割
2. **対応画像** - Apple_like_template の該当ファイル名
3. **既存スライド型** - マッピング先の既存スライド型（type名）
4. **レイアウト仕様** - 配置、サイズ、余白の詳細
5. **タイポグラフィ** - フォント、サイズ、ウェイト、配置
6. **カラーパレット** - 使用する色の定義
7. **ビジュアル要素** - アイコン、図形、背景などの仕様
8. **実装メモ** - GAS実装時の注意点、既存コードとの整合性
9. **データスキーマ例** - slideData での指定方法

## 参考資料
- 既存の要件定義: `docs/Requirements/component_requirements.md`
- 既存のスライド実装: `src/slides.js`
- レイアウト定義: `src/layoutManager.js`
- カラー・フォント設定: `src/config.js`
