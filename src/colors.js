/**
 * Google Slide Generator Web Application
 * 
 * JSONデータからGoogleスライドを自動生成するWebアプリケーション
 * 
 * @author まじん
 * @version 3.0.0
 * @requires Google Apps Script
 * @requires Google Slides API
 * @requires Google Drive API
 * @license CC BY-NC 4.0
 * @see https://creativecommons.org/licenses/by-nc/4.0/
 */

/**
 * ========================================
 * 色彩操作ヘルパー関数
 * ========================================
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: h * 360,
    s: s * 100,
    l: l * 100
  };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function generateTintedGray(tintColorHex, saturation, lightness) {
  const rgb = hexToRgb(tintColorHex);
  if (!rgb) return '#F8F9FA';
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return hslToHex(hsl.h, saturation, lightness);
}

/**
 * ピラミッド用カラーグラデーション生成
 * @param {string} baseColor - ベースとなるプライマリカラー
 * @param {number} levels - レベル数
 * @return {string[]} 上から下へのグラデーションカラー配列
 */
function generatePyramidColors(baseColor, levels) {
  const colors = [];
  for (let i = 0; i < levels; i++) {
    // 上から下に向かって徐々に薄くなる (0% → 60%まで)
    const lightenAmount = (i / Math.max(1, levels - 1)) * 0.6;
    colors.push(lightenColor(baseColor, lightenAmount));
  }
  return colors;
}

/**
 * 色を明るくする関数
 * @param {string} color - 元の色 (#RRGGBB形式)
 * @param {number} amount - 明るくする量 (0.0-1.0)
 * @return {string} 明るくした色
 */
function lightenColor(color, amount) {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const lighten = (c) => Math.min(255, Math.round(c + (255 - c) * amount));
  const newR = lighten(rgb.r);
  const newG = lighten(rgb.g);
  const newB = lighten(rgb.b);
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

/**
 * 色を暗くする関数
 * @param {string} color - 元の色 (#RRGGBB形式)
 * @param {number} amount - 暗くする量 (0.0-1.0)
 * @return {string} 暗くした色
 */
function darkenColor(color, amount) {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const darken = (c) => Math.max(0, Math.round(c * (1 - amount)));
  const newR = darken(rgb.r);
  const newG = darken(rgb.g);
  const newB = darken(rgb.b);
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

/**
 * StepUp用カラーグラデーション生成（左から右に濃くなる）
 * @param {string} baseColor - ベースとなるプライマリカラー
 * @param {number} steps - ステップ数
 * @return {string[]} 左から右へのグラデーションカラー配列（薄い→濃い）
 */
function generateStepUpColors(baseColor, steps) {
  const colors = [];
  for (let i = 0; i < steps; i++) {
    // 左から右に向かって徐々に濃くなる (60% → 0%)
    const lightenAmount = 0.6 * (1 - (i / Math.max(1, steps - 1)));
    colors.push(lightenColor(baseColor, lightenAmount));
  }
  return colors;
}

/**
 * Process用カラーグラデーション生成（上から下に濃くなる）
 * @param {string} baseColor - ベースとなるプライマリカラー
 * @param {number} steps - ステップ数
 * @return {string[]} 上から下へのグラデーションカラー配列（薄い→濃い）
 */
function generateProcessColors(baseColor, steps) {
  const colors = [];
  for (let i = 0; i < steps; i++) {
    // 上から下に向かって徐々に濃くなる (50% → 0%)
    const lightenAmount = 0.5 * (1 - (i / Math.max(1, steps - 1)));
    colors.push(lightenColor(baseColor, lightenAmount));
  }
  return colors;
}

/**
 * Timeline用カードグラデーション生成（左から右に濃くなる）
 * @param {string} baseColor - ベースとなるプライマリカラー
 * @param {number} milestones - マイルストーン数
 * @return {string[]} 左から右へのグラデーションカラー配列（薄い→濃い）
 */
function generateTimelineCardColors(baseColor, milestones) {
  const colors = [];
  for (let i = 0; i < milestones; i++) {
    // 左から右に向かって徐々に濃くなる (40% → 0%)
    const lightenAmount = 0.4 * (1 - (i / Math.max(1, milestones - 1)));
    colors.push(lightenColor(baseColor, lightenAmount));
  }
  return colors;
}

/**
 * Compare系用の左右対比色生成
 * @param {string} baseColor - ベースとなるプライマリカラー
 * @return {Object} {left: 濃い色, right: 元の色}の組み合わせ
 */
function generateCompareColors(baseColor) {
  return {
    left: darkenColor(baseColor, 0.3),   // 左側：30%暗く（Before/導入前）- 視認性向上
    right: baseColor                     // 右側：元の色（After/導入後）
  };
}

/**
 * Apple-style semantic color generation
 * Generates colors that follow Apple HIG principles with proper contrast
 * @param {string} baseColor - Base primary color
 * @param {string} mode - 'light' or 'dark' mode
 * @return {Object} Semantic color palette
 */
function generateAppleSemanticColors(baseColor, mode = 'light') {
  const isLight = mode === 'light';
  
  if (isLight) {
    return {
      background: '#FFFFFF',
      backgroundSecondary: generateTintedGray(baseColor, 5, 98),
      backgroundTertiary: generateTintedGray(baseColor, 8, 95),
      text: '#1D1D1F',
      textSecondary: '#86868B',
      textTertiary: '#AEAEB2',
      accent: baseColor,
      accentHover: darkenColor(baseColor, 0.1),
      border: '#D2D2D7',
      separator: '#E5E5EA',
      cardBg: generateTintedGray(baseColor, 10, 96)
    };
  } else {
    return {
      background: '#000000',
      backgroundSecondary: '#1C1C1E',
      backgroundTertiary: '#2C2C2E',
      text: '#FFFFFF',
      textSecondary: '#98989D',
      textTertiary: '#636366',
      accent: baseColor,
      accentHover: lightenColor(baseColor, 0.2),
      border: '#38383A',
      separator: '#48484A',
      cardBg: '#1C1C1E'
    };
  }
}

/**
 * Calculate WCAG 2.1 contrast ratio between two colors
 * @param {string} color1 - First color in hex format
 * @param {string} color2 - Second color in hex format
 * @return {number} Contrast ratio (1 to 21)
 */
function calculateContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;
  
  const luminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const l1 = luminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = luminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color pair meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
 * @param {string} foreground - Foreground color
 * @param {string} background - Background color
 * @param {boolean} isLargeText - Is the text large (18pt+ or 14pt+ bold)
 * @return {boolean} True if compliant
 */
function meetsWCAG_AA(foreground, background, isLargeText = false) {
  const ratio = calculateContrastRatio(foreground, background);
  return ratio >= (isLargeText ? 3.0 : 4.5);
}

/**
 * Apple-style tinted gray with better contrast control
 * Uses Apple's approach of subtle tinting while maintaining readability
 * @param {string} tintColorHex - Color to tint with
 * @param {number} tintStrength - How much to tint (0-20 recommended)
 * @param {number} lightness - Target lightness (0-100)
 * @return {string} Hex color
 */
function generateAppleTintedGray(tintColorHex, tintStrength = 5, lightness = 96) {
  // Apple uses very subtle tints - cap at 20% saturation
  const cappedSaturation = Math.min(20, Math.max(0, tintStrength));
  return generateTintedGray(tintColorHex, cappedSaturation, lightness);
}

