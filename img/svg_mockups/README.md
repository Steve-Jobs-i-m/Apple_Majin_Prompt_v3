# 🍎 Apple-style Minimal SVG Mockups

## 概要

このディレクトリには、Appleらしいミニマルデザイン原則に基づいた32種類のスライドSVGモックアップが含まれています。

## ミニマルデザイン原則

### 1. オブジェクト数の制限
各スライドは **最大3〜4個のビジュアルオブジェクト** に制限され、メッセージの明確さを最大化しています。

### 2. 余白の最大化
- **水平余白**: 12% (230px)
- **垂直余白**: 15% (162px)
- 余白を恐れず、焦点を絞ったデザイン

### 3. 大きなタイポグラフィ
- **ヒーローサイズ**: 96pt
- **タイトルサイズ**: 64pt
- **本文サイズ**: 32pt
- **キャプションサイズ**: 24pt

### 4. カラーパレットの制限
- **背景**: `#000000` (純黒)
- **主テキスト**: `#FFFFFF` (純白)
- **副テキスト**: `#86868B` (ミディアムグレー)
- **アクセント**: `#0A84FF` (Apple Blue)

## スライド一覧

| # | スライドタイプ | オブジェクト数 | 用途 |
|---|--------------|------------|------|
| 001 | Title | 1 | タイトルスライド |
| 002 | Content Two Column | 3 | 2カラムコンテンツ |
| 003 | Image Text | 2 | 画像＋テキスト |
| 004 | Bar Compare | 4 | バー比較 |
| 005 | Cards Grid | 3 | カードグリッド |
| 006 | KPI Display | 2 | KPI表示 |
| 007 | Pricing | 3 | 価格表示 |
| 008 | Timeline | 4 | タイムライン |
| 009 | Table Two Column | 3 | 2カラムテーブル |
| 010 | Diagram Pie | 1 | 円グラフ |
| 011 | Bar Chart Simple | 3 | シンプルバーチャート |
| 012 | Icon Trio | 3 | 3つのアイコン |
| 013 | Image Collage | 3 | 画像コラージュ |
| 014 | Hero Image | 1 | ヒーロー画像 |
| 015 | Quote Testimonial | 3 | 引用・証言 (縦線バー付き) |
| 016 | Before After | 2 | Before/After比較 |
| 017 | Stats Contrast | 2 | 統計コントラスト |
| 018 | Feature Slots | 3 | 機能スロット |
| 019 | Section Divider | 2 | セクション区切り |
| 020 | Content Text Focused | 2 | テキスト中心 |
| 021 | Process Steps | 3 | プロセスステップ |
| 022 | Header Cards | 3 | ヘッダー付きカード |
| 023 | Bullet Cards | 3 | 箇条書きカード |
| 024 | Progress Bar | 3 | プログレスバー |
| 025 | Cycle Diagram | 3 | サイクル図 |
| 026 | Triangle Diagram | 4 | トライアングル図 (接続線付き) |
| 027 | Pyramid Diagram | 3 | ピラミッド図 |
| 028 | Flow Chart | 3 | フローチャート |
| 029 | Step Up Diagram | 3 | ステップアップ図 |
| 030 | FAQ Slide | 3 | FAQ |
| 031 | Agenda Slide | 4 | アジェンダ |
| 032 | Closing Slide | 2 | クロージング |

## 生成方法

```bash
python3 generate_svg_mockups.py
```

## プレビュー

ブラウザで `svg_viewer.html` を開いて、全スライドをプレビューできます。

```bash
open svg_viewer.html
```

## 技術仕様

- **キャンバスサイズ**: 1920 × 1080px (16:9)
- **フォント**: Inter (Google Fonts) / SF Pro Display フォールバック
- **角丸**: 24px
- **レター スペーシング**: -0.5px (大きなタイトル)
- **形式**: SVG 1.1

## デザイントークン

```javascript
// カラー
BG_COLOR: "#000000"
TEXT_WHITE: "#FFFFFF"
TEXT_GRAY: "#86868B"
ACCENT_BLUE: "#0A84FF"

// スペーシング
SPACING_MD: 64px
SPACING_LG: 96px
SPACING_XL: 128px

// マージン
MARGIN_H: 230px (12%)
MARGIN_V: 162px (15%)

// タイポグラフィ
FONT_HERO: 96pt
FONT_TITLE: 64pt
FONT_BODY: 32pt
FONT_CAPTION: 24pt
```

## 参考資料

- [MINIMAL_DESIGN_GUIDELINES.md](../../docs/MINIMAL_DESIGN_GUIDELINES.md)
- [APPLE_STYLE_GUIDE.md](../../APPLE_STYLE_GUIDE.md)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

---

**生成日**: 2025年10月19日  
**バージョン**: 1.0  
**原則**: Less is More
