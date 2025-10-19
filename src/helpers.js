// ========================================
// 9. ヘルパー関数群
// ========================================

/**
 * Create an Apple-style card shape with proper rounded corners (FR-15)
 * @param {Slide} slide - Slide object
 * @param {number} left - Left position
 * @param {number} top - Top position  
 * @param {number} width - Width
 * @param {number} height - Height
 * @param {Object} options - Optional styling
 * @return {Shape} Card shape
 */
function createAppleCard(slide, left, top, width, height, options = {}) {
  const card = slide.insertShape(
    SlidesApp.ShapeType.ROUND_RECTANGLE, 
    left, top, width, height
  );
  
  // Apply Apple-style corner radius (FR-15: 20-24px)
  const cornerRadius = options.cornerRadius || CONFIG.APPLE_TOKENS.cornerRadius.large;
  // Note: Apps Script doesn't support setting corner radius directly
  // The ROUND_RECTANGLE shape uses a default radius
  
  // Apply fill color
  if (options.fillColor) {
    card.getFill().setSolidFill(options.fillColor);
  }
  
  // Apply border
  if (options.borderColor) {
    card.getBorder().getLineFill().setSolidFill(options.borderColor);
    card.getBorder().setWeight(options.borderWeight || 1);
  } else if (options.noBorder) {
    card.getBorder().setTransparent();
  }
  
  // Apply subtle shadow (FR-15)
  if (options.shadow) {
    const shadowDef = CONFIG.APPLE_TOKENS.shadows[options.shadow] || CONFIG.APPLE_TOKENS.shadows.small;
    // Note: Apps Script has limited shadow support
    // This is a placeholder for future enhancement
  }
  
  return card;
}

/**
 * Check if items need to be split across multiple slides (FR-12)
 * FR-12: 各スライドの表示要素は 3〜4 オブジェクト以内に制限し、超過する場合は自動でスライドを分割すること
 * @param {Array} items - Array of items to display
 * @param {number} maxPerSlide - Maximum items per slide (default: 4)
 * @return {Array} Array of item groups, each representing one slide
 */
function splitItemsForAppleStyle(items, maxPerSlide = null) {
  const max = maxPerSlide || CONFIG.APPLE_TOKENS.limits.maxObjectsPerSlide;
  if (!items || items.length <= max) {
    return [items];
  }
  
  const groups = [];
  for (let i = 0; i < items.length; i += max) {
    groups.push(items.slice(i, i + max));
  }
  return groups;
}

/**
 * Truncate text to Apple-style length limit (FR-12)
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length (default from tokens)
 * @return {string} Truncated text
 */
function truncateToAppleLength(text, maxLength = null) {
  const max = maxLength || CONFIG.APPLE_TOKENS.limits.maxTextLength;
  if (!text || text.length <= max) {
    return text;
  }
  return text.substring(0, max - 3) + '...';
}

/**
 * 安全にレイアウト矩形を取得するヘルパー関数
 * @param {Object} layout - レイアウトマネージャー
 * @param {string} path - レイアウトパス
 * @return {Object|null} レイアウト矩形またはnull
 */
function safeGetRect(layout, path) {
  try {
    const rect = layout.getRect(path);
    if (rect && 
        (typeof rect.left === 'number' || rect.left === undefined) && 
        typeof rect.top === 'number' && 
        typeof rect.width === 'number' && 
        typeof rect.height === 'number') {
      
      // leftがundefinedの場合、rightから計算されるべき値が入っていない可能性がある
      // その場合は null を返す
      if (rect.left === undefined) {
        Logger.log(`[safeGetRect] Warning: rect.left is undefined for path ${path}`);
        return null;
      }
      
      return rect;
    }
    // headerLogoパスについてはログを出力しない（よく使われるが存在しない場合が多い）
    if (!path.includes('headerLogo')) {
      Logger.log(`[safeGetRect] Invalid rect for path ${path}:`, JSON.stringify(rect));
    }
    return null;
  } catch (e) {
    // headerLogoパスについてはログを出力しない  
    if (!path.includes('headerLogo')) {
      Logger.log(`[safeGetRect] Error for path ${path}:`, e.message);
    }
    return null;
  }
}

/**
 * 小見出しの下で「本文開始位置」として使える候補を順に探す
 * @param {Object} layout - レイアウトマネージャー
 * @param {string} key - スライドキー
 * @return {Object|null} コンテンツ矩形またはnull
 */
function findContentRect(layout, key) {
  const candidates = [
    'body',        // contentSlide 等
    'area',        // timeline / process / table / progress 等
    'gridArea',    // cards / kpi / headerCards 等
    'lanesArea',   // diagram
    'pyramidArea', // pyramid
    'stepArea',    // stepUp
    'singleRow',   // flowChart（1行）
    'twoColLeft',  // content 2カラム
    'leftBox',     // compare 左
    'leftText'     // imageText 左テキスト 等
  ];
  for (const name of candidates) {
    const r = safeGetRect(layout, `${key}.${name}`);
    if (r && r.top != null) return r;
  }
  return null;
}

function adjustColorBrightness(hex, factor) {
  const c = hex.replace('#', '');
  const rgb = parseInt(c, 16);
  let r = (rgb >> 16) & 0xff,
    g = (rgb >> 8) & 0xff,
    b = (rgb >> 0) & 0xff;
  r = Math.min(255, Math.round(r * factor));
  g = Math.min(255, Math.round(g * factor));
  b = Math.min(255, Math.round(b * factor));
  return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function setMainSlideBackground(slide, layout) {
  setBackgroundImageFromUrl(slide, layout, CONFIG.BACKGROUND_IMAGES.main, CONFIG.COLORS.background_white);
}

function setBackgroundImageFromUrl(slide, layout, imageUrl, fallbackColor) {
  slide.getBackground().setSolidFill(fallbackColor);
  if (!imageUrl) return;
  try {
    const image = insertImageFromUrlOrFileId(imageUrl);
    if (!image) return;
    
    slide.insertImage(image).setWidth(layout.pageW_pt).setHeight(layout.pageH_pt).setLeft(0).setTop(0).sendToBack();
  } catch (e) {
    Logger.log(`Background image failed: ${e.message}. URL: ${imageUrl}`);
  }
}

/**
 * URLまたはGoogle Drive FileIDから画像を取得
 * @param {string} urlOrFileId - 画像URLまたはGoogle Drive FileID
 * @return {Blob|string} 画像データまたはURL
 */
function insertImageFromUrlOrFileId(urlOrFileId) {
  if (!urlOrFileId) return null;
  
  // URLからFileIDを抽出する関数
  function extractFileIdFromUrl(url) {
    const patterns = [
      /\/file\/d\/([a-zA-Z0-9_-]+)/,
      /id=([a-zA-Z0-9_-]+).*file/,
      /file\/([a-zA-Z0-9_-]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  }
  
  // FileIDの形式かチェック（GoogleドライブのFileIDは通常28-33文字の英数字）
  const fileIdPattern = /^[a-zA-Z0-9_-]{25,}$/;
  
  // URLからFileIDを抽出
  const extractedFileId = extractFileIdFromUrl(urlOrFileId);
  
  if (extractedFileId && fileIdPattern.test(extractedFileId)) {
    // Google Drive FileIDとして処理
    try {
      const file = DriveApp.getFileById(extractedFileId);
      return file.getBlob();
    } catch (e) {
      Logger.log(`Drive file access failed: ${e.message}. FileID: ${extractedFileId}`);
      return null;
    }
  } else if (fileIdPattern.test(urlOrFileId)) {
    // 直接FileIDとして処理
    try {
      const file = DriveApp.getFileById(urlOrFileId);
      return file.getBlob();
    } catch (e) {
      Logger.log(`Drive file access failed: ${e.message}. FileID: ${urlOrFileId}`);
      return null;
    }
  } else {
    // URLとして処理
    return urlOrFileId;
  }
}

function normalizeImages(arr) {
  return (arr || []).map(v => typeof v === 'string' ? {
    url: v
  } : (v && v.url ? v : null)).filter(Boolean).slice(0, 6);
}

function renderImagesInArea(slide, layout, area, images) {
  if (!images || !images.length) return;
  const n = Math.min(6, images.length);
  let cols = n === 1 ? 1 : (n <= 4 ? 2 : 3);
  const rows = Math.ceil(n / cols);
  const gap = layout.pxToPt(10);
  const cellW = (area.width - gap * (cols - 1)) / cols,
    cellH = (area.height - gap * (rows - 1)) / rows;
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols),
      c = i % cols;
    try {
      const img = slide.insertImage(images[i].url);
      const scale = Math.min(cellW / img.getWidth(), cellH / img.getHeight());
      const w = img.getWidth() * scale,
        h = img.getHeight() * scale;
      img.setWidth(w).setHeight(h).setLeft(area.left + c * (cellW + gap) + (cellW - w) / 2).setTop(area.top + r * (cellH + gap) + (cellH - h) / 2);
    } catch (e) {}
  }
}

function createGradientRectangle(slide, x, y, width, height, colors) {
  const numStrips = Math.max(20, Math.floor(width / 2));
  const stripWidth = width / numStrips;
  const startColor = hexToRgb(colors[0]),
    endColor = hexToRgb(colors[1]);
  if (!startColor || !endColor) return null;
  const shapes = [];
  for (let i = 0; i < numStrips; i++) {
    const ratio = i / (numStrips - 1);
    const r = Math.round(startColor.r + (endColor.r - startColor.r) * ratio);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * ratio);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * ratio);
    const strip = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, x + (i * stripWidth), y, stripWidth + 0.5, height);
    strip.getFill().setSolidFill(r, g, b);
    strip.getBorder().setTransparent();
    shapes.push(strip);
  }
  if (shapes.length > 1) {
    return slide.group(shapes);
  }
  return shapes[0] || null;
}

function applyFill(slide, x, y, width, height, settings) {
  if (settings.enableGradient) {
    createGradientRectangle(slide, x, y, width, height, [settings.gradientStart, settings.gradientEnd]);
  } else {
    const shape = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, x, y, width, height);
    shape.getFill().setSolidFill(settings.primaryColor);
    shape.getBorder().setTransparent();
  }
}

/**
 * プリセット機能追加前のレガシーユーザープロパティを削除する関数
 */
function clearLegacyUserProperties() {
  try {
    // ユーザープロパティを全て取得
    const properties = PropertiesService.getUserProperties().getProperties();
    
    // 削除対象のキー（プリセット機能追加前の設定）
    const legacyKeys = [
      'primaryColor',
      'gradientStart', 
      'gradientEnd',
      'fontFamily',
      'showTitleUnderline',
      'showBottomBar',
      'enableGradient',
      'footerText',
      'headerLogoUrl',
      'closingLogoUrl',
      'titleBgUrl',
      'sectionBgUrl',
      'mainBgUrl',
      'closingBgUrl',
      'driveFolderUrl',
      'driveFolderId'
    ];
    
    // レガシーキーを削除
    const keysToDelete = [];
    legacyKeys.forEach(key => {
      if (properties.hasOwnProperty(key)) {
        keysToDelete.push(key);
      }
    });
    
    if (keysToDelete.length > 0) {
      // 個別にプロパティを削除
      const userProperties = PropertiesService.getUserProperties();
      keysToDelete.forEach(key => {
        userProperties.deleteProperty(key);
      });
      Logger.log(`削除されたレガシープロパティ: ${keysToDelete.join(', ')}`);
      return {
        status: 'success',
        message: `${keysToDelete.length}個のレガシープロパティを削除しました。`,
        deletedKeys: keysToDelete
      };
    } else {
      return {
        status: 'info',
        message: '削除対象のレガシープロパティは見つかりませんでした。'
      };
    }
    
  } catch (e) {
    Logger.log(`レガシープロパティ削除エラー: ${e.message}`);
    return {
      status: 'error',
      message: `レガシープロパティの削除中にエラーが発生しました: ${e.message}`
    };
  }
}

/**
 * Determine if title header should be hidden for minimal design
 * @param {string} slideType - Type of slide (e.g., 'quote', 'kpi', 'content')
 * @param {Object} settings - User settings object
 * @return {boolean} True if title should be hidden
 */
function shouldHideTitleHeader(slideType, settings) {
  const rules = CONFIG.APPLE_TOKENS.minimalRules;
  
  // Ultra minimal mode: hide ALL titles
  if (rules.ultraMinimalMode) {
    return true;
  }
  
  // General content title hiding setting
  if (rules.hideContentTitles) {
    return true;
  }
  
  // Slide-type specific rules
  const hideRules = {
    'quote': rules.hideTitleInQuote,
    'kpi': rules.hideTitleInKpi,
    'hero': rules.hideTitleInHero,
    'stats': rules.hideTitleInStats,
    'statsCompare': rules.hideTitleInStats,
    'barCompare': rules.hideTitleInStats
  };
  
  return hideRules[slideType] || false;
}

/**
 * Determine if logo should be hidden for minimal design
 * @param {string} slideType - Type of slide
 * @param {Object} settings - User settings object
 * @return {boolean} True if logo should be hidden
 */
function shouldHideLogo(slideType, settings) {
  const rules = CONFIG.APPLE_TOKENS.minimalRules;
  
  // Ultra minimal mode: hide ALL logos
  if (rules.ultraMinimalMode) {
    return true;
  }
  
  // General logo hiding setting
  if (rules.hideLogoInContent) {
    return true;
  }
  
  return false;
}

/**
 * Calculate adjusted top position when title is hidden
 * Provides more vertical space and better centering
 * @param {Object} layout - Layout manager
 * @param {number} originalTop - Original top position in pt
 * @param {boolean} titleHidden - Whether title is hidden
 * @return {number} Adjusted top position in pt
 */
function getAdjustedTopForHiddenTitle(layout, originalTop, titleHidden) {
  if (!titleHidden) {
    return originalTop;
  }
  
  // When title is hidden, move content up and center it better
  // Original title area is approximately 120-140pt, reclaim half of it
  const reclaimedSpace = layout.pxToPt(80); // Reclaim 80px worth of space
  return Math.max(layout.pxToPt(60), originalTop - reclaimedSpace);
}

