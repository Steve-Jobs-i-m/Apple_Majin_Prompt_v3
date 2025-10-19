# 超ミニマルモード 使用ガイド / Ultra Minimal Mode Guide

## 概要 / Overview

**超ミニマルモード**は、Appleのキーノートで見られる究極にシンプルなスライドデザインを実現する機能です。タイトル見出し、ロゴ、装飾線を排除し、**コンテンツそのものを主役**にします。

---

## 🎯 コンセプト

### Appleの哲学
> "Simplicity is the ultimate sophistication."  
> — Steve Jobs

Appleのスライドは**何を入れるか**ではなく、**何を入れないか**で定義されます。

---

## 🔧 設定方法

### 方法1: マスタースイッチ（全スライド一括）

全てのスライドでタイトル・ロゴを一括非表示にします：

```javascript
// src/config.js
CONFIG.APPLE_TOKENS.minimalRules = {
  ultraMinimalMode: true,  // これ1つでOK
  // ...他の設定
};
```

### 方法2: 個別設定（細かい制御）

スライドタイプごとに制御します：

```javascript
// src/config.js
CONFIG.APPLE_TOKENS.minimalRules = {
  ultraMinimalMode: false,      // マスターは無効
  
  // 一般設定
  hideContentTitles: true,      // 全コンテンツスライドのタイトル非表示
  hideLogoInContent: false,     // ロゴは表示
  hideTitleUnderline: true,     // アンダーラインは非表示
  
  // スライドタイプ別（より細かい制御）
  hideTitleInQuote: true,       // 引用スライドのみ非表示
  hideTitleInKpi: true,         // KPIスライドのみ非表示
  hideTitleInHero: true,        // ヒーロースライドのみ非表示
  hideTitleInStats: true        // 統計スライドのみ非表示
};
```

### 方法3: 特定のスライドのみ

引用スライドとKPIスライドだけミニマル化：

```javascript
CONFIG.APPLE_TOKENS.minimalRules = {
  ultraMinimalMode: false,
  hideContentTitles: false,
  
  // この2つだけtrue
  hideTitleInQuote: true,
  hideTitleInKpi: true,
  
  // 他はfalse
  hideTitleInHero: false,
  hideTitleInStats: false
};
```

---

## 📊 効果の比較

### オブジェクト数の削減

| スライドタイプ | Before | After | 削減率 |
|----------------|--------|-------|--------|
| Quote（引用） | 5個 | 2個 | **-60%** |
| KPI（数値） | 7個 | 4個 | **-43%** |
| Stats（統計） | 6個 | 3個 | **-50%** |
| Content | 5個 | 3個 | **-40%** |

### 余白の拡大

| 要素 | Before | After | 増加 |
|------|--------|-------|------|
| 上部余白 | 60px | 140px | **+133%** |
| コンテンツ高さ | 280px | 400px | **+43%** |
| コンテンツ開始位置 | 200px | 60px | **-70%** |

---

## 🎨 ビジュアル例

### 引用スライド (Quote)

#### Before（タイトルあり）
```
┌───────────────────────────────────────┐
│ [Logo]          お客様の声           │ ← タイトル（オブジェクト+2）
│ ────────                              │ ← アンダーライン（+1）
│                                       │
│  ┌─────────────────────────────────┐ │
│  │                                 │ │
│  │  "このプロダクトは素晴らしい！" │ │ ← 引用文
│  │  — 田中様                       │ │
│  │                                 │ │
│  └─────────────────────────────────┘ │
│                                       │
│                                   1/10│
└───────────────────────────────────────┘
```

#### After（タイトルなし）
```
┌───────────────────────────────────────┐
│                                       │ ← 余白拡大
│                                       │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │                                 │ │
│  │  "このプロダクトは素晴らしい！" │ │ ← 引用文が中央に
│  │                                 │ │
│  │  — 田中様                       │ │
│  │                                 │ │
│  └─────────────────────────────────┘ │
│                                       │
│                                   1/10│
└───────────────────────────────────────┘
```

**削減**: オブジェクト -3個、視覚的ノイズ -60%

---

### KPIスライド

#### Before（タイトルあり）
```
┌───────────────────────────────────────┐
│ [Logo]          主要指標             │ ← タイトル
│ ────────                              │
│                                       │
│  ┌────────┐  ┌────────┐  ┌────────┐ │
│  │売上高  │  │利益率  │  │成長率  │ │
│  │        │  │        │  │        │ │
│  │ 10億円 │  │  35%   │  │ +120%  │ │
│  └────────┘  └────────┘  └────────┘ │
│                                       │
└───────────────────────────────────────┘
```

#### After（タイトルなし）
```
┌───────────────────────────────────────┐
│                                       │ ← 余白
│                                       │
│  ┌────────┐  ┌────────┐  ┌────────┐ │
│  │売上高  │  │利益率  │  │成長率  │ │ ← 数値が主役
│  │        │  │        │  │        │ │
│  │ 10億円 │  │  35%   │  │ +120%  │ │
│  │        │  │        │  │        │ │
│  └────────┘  └────────┘  └────────┘ │
│                                       │
│                                       │
└───────────────────────────────────────┘
```

**削減**: オブジェクト -2個、数値への集中度 +100%

---

## ⚙️ 技術詳細

### 実装の仕組み

#### 1. 判定関数（helpers.js）

```javascript
function shouldHideTitleHeader(slideType, settings) {
  const rules = CONFIG.APPLE_TOKENS.minimalRules;
  
  // マスタースイッチ
  if (rules.ultraMinimalMode) return true;
  
  // 一般設定
  if (rules.hideContentTitles) return true;
  
  // スライドタイプ別
  const hideRules = {
    'quote': rules.hideTitleInQuote,
    'kpi': rules.hideTitleInKpi,
    'hero': rules.hideTitleInHero,
    'stats': rules.hideTitleInStats
  };
  
  return hideRules[slideType] || false;
}
```

#### 2. タイトル描画の条件分岐（slides.js）

```javascript
function drawStandardTitleHeader(slide, layout, key, title, settings, slideType) {
  // タイトル非表示判定
  const hideTitle = shouldHideTitleHeader(slideType, settings);
  const hideLogo = shouldHideLogo(slideType, settings);
  
  // 両方非表示なら何も描画しない
  if (hideTitle && hideLogo) {
    Logger.log(`[Minimal Design] Hiding all for: ${slideType}`);
    return;
  }
  
  // ロゴのみ描画
  if (!hideLogo) {
    // ... ロゴ描画コード
  }
  
  // タイトルのみ描画
  if (!hideTitle) {
    // ... タイトル描画コード
  }
}
```

#### 3. コンテンツ位置の自動調整

```javascript
function createQuoteSlide(slide, data, layout, pageNum, settings) {
  // タイトル非表示かチェック
  const titleHidden = shouldHideTitleHeader('quote', settings);
  
  // 位置を調整
  const baseTop = titleHidden ? 80 : 120;  // 40px上に移動
  const areaHeight = titleHidden ? 400 : 320;  // 80px高く
  
  // より中央に配置されたコンテンツ
  const area = {
    top: baseTop,
    height: areaHeight
  };
}
```

---

## 🎓 ベストプラクティス

### 1. **数値中心のスライドは必ずミニマル化**
KPI、統計、比較スライドはタイトルを削除して数値を主役に。

```javascript
hideTitleInKpi: true,
hideTitleInStats: true
```

### 2. **引用スライドは常にミニマル**
引用文自体が強いメッセージなので、タイトルは不要。

```javascript
hideTitleInQuote: true
```

### 3. **ヒーロースライドは画像を主役に**
大きな画像を使うスライドでは、テキストを最小限に。

```javascript
hideTitleInHero: true
```

### 4. **プロセスやタイムラインはタイトル保持**
ステップや時系列が複雑な場合は、タイトルで文脈を提供。

```javascript
hideTitleInProcess: false,
hideTitleInTimeline: false
```

### 5. **ロゴは状況に応じて**
ブランディングが重要なら残す、内部資料なら削除。

```javascript
hideLogoInContent: false  // ブランディング重視
hideLogoInContent: true   // ミニマル重視
```

---

## 🚀 推奨設定パターン

### パターンA: 超攻撃的ミニマル（プレゼン向け）

全てを削ぎ落とし、最大のインパクトを。

```javascript
CONFIG.APPLE_TOKENS.minimalRules = {
  ultraMinimalMode: true,  // 全部非表示
  // 他は自動的にtrue扱い
};
```

**用途**: キーノート、製品発表、デモ

---

### パターンB: バランス型（推奨）

重要なスライドのみミニマル化。

```javascript
CONFIG.APPLE_TOKENS.minimalRules = {
  ultraMinimalMode: false,
  hideContentTitles: false,
  hideLogoInContent: false,
  hideTitleUnderline: true,
  
  // これらだけtrue
  hideTitleInQuote: true,
  hideTitleInKpi: true,
  hideTitleInHero: true,
  hideTitleInStats: true
};
```

**用途**: ビジネスプレゼン、営業資料、レポート

---

### パターンC: 保守的（内部資料向け）

基本は従来通り、一部のみミニマル化。

```javascript
CONFIG.APPLE_TOKENS.minimalRules = {
  ultraMinimalMode: false,
  hideContentTitles: false,
  hideLogoInContent: false,
  hideTitleUnderline: true,  // これだけtrue
  
  // 全てfalse
  hideTitleInQuote: false,
  hideTitleInKpi: false,
  hideTitleInHero: false,
  hideTitleInStats: false
};
```

**用途**: 社内報告、会議資料、定例報告

---

## 📋 チェックリスト

設定前に確認：

- [ ] スライドの目的は？（社外プレゼン vs 社内資料）
- [ ] ブランディングの重要性は？（ロゴ必要 vs 不要）
- [ ] オーディエンスは？（経営層 vs チームメンバー）
- [ ] スライド枚数は？（少ない vs 多い）
- [ ] メッセージの明確さは？（シンプル vs 複雑）

---

## ⚠️ 注意事項

### 1. **文脈が失われる可能性**
タイトルがないと、スライドの文脈が分かりにくくなる場合があります。
→ **解決策**: スピーカーノートに詳細を記載

### 2. **ナビゲーションの難しさ**
タイトルなしでは、スライド一覧で内容が分かりにくい。
→ **解決策**: ファイル名やフッターで識別

### 3. **印刷時の問題**
紙に印刷すると、タイトルがないと整理しづらい。
→ **解決策**: 印刷用に別バージョンを作成

### 4. **組織の規定**
会社によっては、ロゴやタイトルが必須の場合がある。
→ **解決策**: 規定を確認してから適用

---

## 🎬 実装例

### 例1: 製品発表プレゼン

```javascript
// 超ミニマルで視覚的インパクト最大化
CONFIG.APPLE_TOKENS.minimalRules = {
  ultraMinimalMode: true
};
```

### 例2: 営業資料

```javascript
// KPIと比較スライドのみミニマル化
CONFIG.APPLE_TOKENS.minimalRules = {
  ultraMinimalMode: false,
  hideTitleInKpi: true,
  hideTitleInStats: true,
  hideLogoInContent: false  // ブランディング保持
};
```

### 例3: 内部レポート

```javascript
// アンダーラインのみ削除
CONFIG.APPLE_TOKENS.minimalRules = {
  ultraMinimalMode: false,
  hideTitleUnderline: true,
  // 他は全てfalse
};
```

---

## 📚 参考資料

- [Apple Keynote Analysis](https://www.apple.com/apple-events/)
- [MINIMAL_DESIGN_GUIDELINES.md](./MINIMAL_DESIGN_GUIDELINES.md)
- [APPLE_STYLE_GUIDE.md](../APPLE_STYLE_GUIDE.md)

---

## 🤝 フィードバック

この機能の改善案があれば、issueやプルリクエストでお知らせください！

---

**最終更新**: 2025年10月19日  
**バージョン**: 1.0 - Initial Release
