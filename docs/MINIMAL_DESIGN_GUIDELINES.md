# ミニマルデザインガイドライン / Minimal Design Guidelines

## 概要 / Overview

このドキュメントは、Appleらしい洗練されたミニマルスライドを実現するための設計指針をまとめています。

**キーコンセプト**: **Less is More** - 少ない要素で最大の印象を

---

## 🎯 ミニマルデザインの3原則

### 1. **オブジェクト数の厳格な制限**

各スライドの視覚要素を最小限に保つことで、メッセージの明確さを最大化します。

```javascript
// CONFIG.APPLE_TOKENS.minimalRules
{
  titleSlideObjectLimit: 1,      // タイトルスライド: 1つのみ
  heroSlideObjectLimit: 2,       // ヒーロースライド: 最大2つ
  contentSlideObjectLimit: 3,    // コンテンツスライド: 最大3つ
  cardLayoutMaxItems: 3,         // カードレイアウト: 最大3枚
  processStepsMax: 3,            // プロセス: 最大3ステップ
  enforceStrictMode: true        // 厳格モードを有効化
}
```

#### 適用例

- ✅ **良い例**: タイトル + 画像1枚 + キャプション = 3オブジェクト
- ❌ **悪い例**: タイトル + 箇条書き5項目 + 画像2枚 + グラフ = 9オブジェクト

---

### 2. **余白の最大化**

Appleデザインの真髄は「何を入れるか」ではなく「何を入れないか」です。

#### 余白の定義（2倍に拡大済み）

```javascript
// CONFIG.APPLE_TOKENS.spacing (全て2倍に拡大)
spacing: {
  md: 32,    // 標準スペース (16px → 32px)
  lg: 48,    // 大きなスペース (24px → 48px)
  xl: 64,    // セクション間 (32px → 64px)
  xxl: 96,   // 主要セクション間 (48px → 96px)
  xxxl: 128  // ヒーロースペース (64px → 128px)
}

// 安全余白 (2倍に拡大)
safeMargins: {
  horizontal: 0.12,  // 左右12% (6% → 12%)
  vertical: 0.15     // 上下15% (7.5% → 15%)
}
```

#### ホワイトスペース比率

```javascript
// CONFIG.APPLE_TOKENS.whiteSpaceRatios
{
  titleSlide: 0.8,      // 80%を空白に
  heroSlide: 0.6,       // 60%を空白に
  contentSlide: 0.4,    // 40%を空白に
  minimumEmptySpace: 0.3 // 常に最低30%を確保
}
```

---

### 3. **タイポグラフィの強化**

小さなフォントを太字にするのではなく、**サイズ自体を大きく**します。

#### フォントサイズ（1.5〜2倍に拡大済み）

```javascript
// CONFIG.APPLE_TOKENS.typography
typography: {
  largeTitle: 96,  // 72pt → 96pt (33%増)
  title1: 64,      // 48pt → 64pt (33%増)
  title2: 40,      // 32pt → 40pt (25%増)
  headline: 24,    // 20pt → 24pt (20%増)
  body: 18,        // 16pt → 18pt (12.5%増)
  callout: 16      // 14pt → 16pt (14%増)
}

// CONFIG.FONTS.sizes
sizes: {
  title: 64,           // 40pt → 64pt (60%増)
  sectionTitle: 56,    // 38pt → 56pt (47%増)
  contentTitle: 32,    // 24pt → 32pt (33%増)
  body: 18,            // 14pt → 18pt (29%増)
  processStep: 18,     // 14pt → 18pt (29%増)
  ghostNum: 200        // 180pt → 200pt (11%増)
}
```

#### タイポグラフィルール

```javascript
// CONFIG.APPLE_TOKENS.typographyEnhancement
{
  preferBoldOverSize: false,     // サイズ優先、太字は最小限
  minHeadingSize: 28,            // 見出しは最低28pt
  maxTextLinesBeforeSplit: 5,    // 5行超えたら自動分割
  lineHeightMultiplier: 1.2,     // 行間を広く
  letterSpacingTight: -0.5,      // 大きなタイトルは詰める
  letterSpacingNormal: 0,        // 本文は標準
  letterSpacingWide: 0.5         // 小さい文字は広げる
}
```

---

## 🎨 カラーの制限

Appleは**3色ルール**を厳守します：

```javascript
// CONFIG.APPLE_TOKENS.colorRestrictions
{
  maxColorsPerSlide: 3,           // 1スライド最大3色
  primaryColorUsage: 'text',      // 黒（テキスト用）
  secondaryColorUsage: 'subtle',  // グレー（補助用）
  accentColorUsage: 'highlight'   // アクセント1色（強調用のみ）
}
```

### 推奨カラーパレット

#### ライトモード
```
- 主色: #1D1D1F (ほぼ黒 - テキスト)
- 副色: #86868B (中間グレー - 補助要素)
- アクセント: #0A84FF (Apple Blue - 強調)
```

#### ダークモード
```
- 主色: #FFFFFF (純白 - テキスト)
- 副色: #98989D (明るめグレー - 補助要素)
- アクセント: #0A84FF (Apple Blue - 同じ)
```

---

## 📏 レイアウトの余白強化

### Before（従来）vs After（ミニマル強化版）

#### コンテンツスライド

| 要素 | Before | After | 変化 |
|------|--------|-------|------|
| 左マージン | 25px | 60px | **+140%** |
| 上マージン | 20px | 40px | **+100%** |
| コンテンツ幅 | 910px | 840px | -70px（余白増） |
| コンテンツ高さ | 330px | 280px | -50px（詰め込み減） |
| タイトル下余白 | 52px | 80px | **+54%** |

#### カードスライド

| 要素 | Before | After | 変化 |
|------|--------|-------|------|
| グリッド開始位置 | 120px | 200px | **+67%** |
| グリッド幅 | 910px | 840px | -70px |
| グリッド高さ | 340px | 280px | -60px |
| カード最大枚数 | 6枚 | **3枚** | **-50%** |

---

## 🚫 制限事項（厳格に守るべき）

### タイトルヘッダーの非表示設定（NEW）

Appleの最もアイコニックなスライドは**タイトル見出しすら持たない**ことが多いです。
コンテンツ自体が主役となり、余白が最大化されます。

#### 設定オプション

```javascript
// CONFIG.APPLE_TOKENS.minimalRules
{
  // マスタースイッチ
  ultraMinimalMode: false,      // 全スライドのタイトル/ロゴを非表示
  
  // 一般設定
  hideContentTitles: false,     // 全コンテンツスライドのタイトルを非表示
  hideLogoInContent: false,     // 全コンテンツスライドのロゴを非表示
  hideTitleUnderline: true,     // アンダーラインを非表示（デフォルト）
  
  // スライドタイプ別設定
  hideTitleInQuote: true,       // 引用スライド（引用文が主役）
  hideTitleInKpi: true,         // KPIスライド（数値が主役）
  hideTitleInHero: true,        // ヒーロースライド（画像が主役）
  hideTitleInStats: true        // 統計スライド（データが主役）
}
```

#### 効果

| 項目 | タイトルあり | タイトルなし | 削減 |
|------|-------------|-------------|------|
| オブジェクト数 | 5-7個 | 2-4個 | **-40〜60%** |
| 上部余白 | 60px | 140px | **+133%** |
| コンテンツ高さ | 280px | 400px | **+43%** |
| 視覚的焦点 | 分散 | 集中 | ✨ |

#### Before / After

**Before（タイトルあり）**:
```
┌─────────────────────────────────┐
│ [Logo]    Customer Success      │ ← オブジェクト+3
│ ────────                        │
│                                 │
│   "Great product!"              │
│   — Jane Doe                    │
│                                 │
└─────────────────────────────────┘
```

**After（タイトルなし）**:
```
┌─────────────────────────────────┐
│                                 │ ← 余白拡大
│                                 │
│                                 │
│   "Great product!"              │ ← コンテンツが中央に
│   — Jane Doe                    │
│                                 │
│                                 │
└─────────────────────────────────┘
```

**削減**: オブジェクト数 -3個、余白 +80px

---

### テキスト量の制限

```javascript
// CONFIG.APPLE_TOKENS.limits
limits: {
  maxTextLength: 120,          // 最大120文字（150→120）
  maxBulletPoints: 4,          // 箇条書きは最大4項目（6→4）
  maxLinesInCard: 3,           // カード内は最大3行
  maxCharsPerLine: 40,         // 1行40文字まで
  autoSplitThreshold: 150      // 150文字超えたら自動分割
}
```

### スライドタイプ別の制限

| スライドタイプ | 最大要素数 | 最大テキスト行数 |
|----------------|------------|------------------|
| タイトル | **1個** | 2行 |
| ヒーロー | **2個** | 3行 |
| コンテンツ | **3個** | 5行 |
| カード | **3枚** | 各3行 |
| プロセス | **3ステップ** | 各2行 |
| タイムライン | **4項目** | 各2行 |

---

## ✅ 実装チェックリスト

### デザイン定義の確認

- [x] `CONFIG.APPLE_TOKENS.typography` - フォントサイズを1.5倍に拡大
- [x] `CONFIG.APPLE_TOKENS.spacing` - スペーシングを2倍に拡大
- [x] `CONFIG.APPLE_TOKENS.safeMargins` - 安全余白を2倍に拡大
- [x] `CONFIG.FONTS.sizes` - 全フォントサイズを拡大
- [x] `CONFIG.POS_PX` - レイアウト座標を更新（余白増加）

### スライド生成関数の修正（次のステップ）

- [ ] `createContentSlide()` - オブジェクト数カウント追加
- [ ] `createCardsSlide()` - 3枚制限の強制
- [ ] `createProcessSlide()` - 3ステップ制限の強制
- [ ] `createTimelineSlide()` - 4項目制限の強制
- [ ] `createBulletCardsSlide()` - 3枚制限の強制

### ユーティリティ関数の追加（今後）

- [ ] `countSlideObjects()` - スライドのオブジェクト数をカウント
- [ ] `enforceObjectLimit()` - 制限超過時に警告/分割
- [ ] `autoSplitLongText()` - 長文の自動分割
- [ ] `validateMinimalDesign()` - ミニマルデザインルールの検証

---

## 📊 ビフォー・アフター比較

### タイポグラフィ

```
Hero Title:     72pt → 96pt   (+33%)
Section Title:  48pt → 64pt   (+33%)
Content Title:  24pt → 32pt   (+33%)
Body Text:      14pt → 18pt   (+29%)
```

### スペーシング

```
Standard Gap:   16px → 32px   (+100%)
Large Gap:      24px → 48px   (+100%)
Section Gap:    32px → 64px   (+100%)
Major Section:  48px → 96px   (+100%)
```

### 安全余白

```
Horizontal:     6% → 12%      (+100%)
Vertical:       7.5% → 15%    (+100%)
```

### コンテンツ制限

```
Objects/Slide:  無制限 → 3-4個  (厳格化)
Bullets:        6個 → 4個       (-33%)
Cards:          6枚 → 3枚       (-50%)
Text Length:    150 → 120文字   (-20%)
```

---

## 🎓 ベストプラクティス

### 1. **1スライド = 1メッセージ**
複数のポイントがある場合は、スライドを分割する

### 2. **画像 > 文字**
可能な限り、テキストを画像に置き換える

### 3. **階層を明確に**
サイズの差で階層を表現し、太字に頼らない

### 4. **余白を恐れない**
空白は「何もない」ではなく、「焦点を絞る」ためのツール

### 5. **色は控えめに**
アクセントカラーは本当に重要な要素にのみ使用

---

## 🚀 次のステップ

1. ✅ **完了**: デザイントークンの定義更新
2. 🔄 **進行中**: スライド生成関数へのオブジェクト制限実装
3. 📋 **予定**: 自動検証・警告システムの構築
4. 📋 **予定**: 長文自動分割機能の実装

---

## 📚 参考資料

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [SF Pro Typography](https://developer.apple.com/fonts/)
- [APPLE_STYLE_GUIDE.md](../APPLE_STYLE_GUIDE.md)

---

**最終更新**: 2025年10月19日  
**バージョン**: 1.0 - Minimal Design Enhancement
