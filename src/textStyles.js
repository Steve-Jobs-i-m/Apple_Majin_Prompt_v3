// ========================================
// 8. テキストスタイリング関数群
// ========================================

/**
 * Apply Apple-style typography settings
 * Uses Apple design tokens for consistent typography
 * @param {TextRange} textRange - Text range to style
 * @param {Object} opt - Options
 * @param {number} opt.size - Font size (from APPLE_TOKENS.typography)
 * @param {string} opt.color - Text color
 * @param {boolean} opt.bold - Bold weight
 * @param {string} opt.weight - Font weight (light, regular, medium, semibold, bold)
 * @param {number} opt.lineHeight - Line height multiplier
 * @param {number} opt.letterSpacing - Letter spacing in px
 * @param {SlidesApp.ParagraphAlignment} opt.align - Text alignment
 */
function applyAppleTextStyle(textRange, opt = {}) {
  const style = textRange.getTextStyle();
  
  // Set font family with Apple fallback chain
  style.setFontFamily(CONFIG.FONTS.family);
  
  // Set color (semantic colors for light/dark mode)
  style.setForegroundColor(opt.color || CONFIG.COLORS.text_primary);
  
  // Set font size (prefer Apple typography scale)
  const fontSize = opt.size || CONFIG.APPLE_TOKENS.typography.body;
  style.setFontSize(fontSize);
  
  // Set font weight
  // Note: Apps Script doesn't support numeric font weights directly
  // We approximate with bold on/off
  if (opt.weight) {
    const isBold = ['semibold', 'bold'].includes(opt.weight);
    style.setBold(isBold);
  } else {
    style.setBold(opt.bold || false);
  }
  
  // Apply paragraph-level styles
  if (opt.align || opt.lineHeight) {
    try {
      textRange.getParagraphs().forEach(p => {
        const paraStyle = p.getRange().getParagraphStyle();
        
        // Set alignment
        if (opt.align) {
          paraStyle.setParagraphAlignment(opt.align);
        }
        
        // Set line height (Apps Script uses percentage: 100 = single spacing)
        if (opt.lineHeight) {
          const lineHeightPercent = Math.round(opt.lineHeight * 100);
          paraStyle.setLineSpacing(lineHeightPercent);
        }
      });
    } catch (e) {
      Logger.log(`Paragraph style error: ${e.message}`);
    }
  }
  
  // Letter spacing is not supported in Apps Script
  // This is noted for future reference
}

function applyTextStyle(textRange, opt) {
  const style = textRange.getTextStyle();
  style.setFontFamily(CONFIG.FONTS.family).setForegroundColor(opt.color || CONFIG.COLORS.text_primary).setFontSize(opt.size || CONFIG.FONTS.sizes.body).setBold(opt.bold || false);
  if (opt.align) {
    try {
      textRange.getParagraphs().forEach(p => {
        p.getRange().getParagraphStyle().setParagraphAlignment(opt.align);
      });
    } catch (e) {}
  }
}

function setStyledText(shapeOrCell, rawText, baseOpt) {
  const parsed = parseInlineStyles(rawText || '');
  const tr = shapeOrCell.getText().setText(parsed.output);
  applyTextStyle(tr, baseOpt || {});
  applyStyleRanges(tr, parsed.ranges);
}

function setBulletsWithInlineStyles(shape, points) {
  const joiner = '\n\n';
  let combined = '';
  const ranges = [];
  (points || []).forEach((pt, idx) => {
    const parsed = parseInlineStyles(String(pt || ''));
    // 中黒を追加しない、またはオフセット計算を修正
    const bullet = parsed.output;  // '• ' を削除
    if (idx > 0) combined += joiner;
    const start = combined.length;
    combined += bullet;
    parsed.ranges.forEach(r => ranges.push({
      start: start + r.start,  // オフセットを削除
      end: start + r.end,
      bold: r.bold,
      color: r.color
    }));
  });
  const tr = shape.getText().setText(combined || '—');
  applyTextStyle(tr, {
    size: CONFIG.FONTS.sizes.body
  });
  // 箇条書きスタイルを別途適用する場合はここで
  try {
    tr.getParagraphs().forEach(p => {
      p.getRange().getParagraphStyle().setLineSpacing(100).setSpaceBelow(6);
      // 必要に応じて箇条書きプリセットを適用
      // p.getRange().getListStyle().applyListPreset(...);
    });
  } catch (e) {}
  applyStyleRanges(tr, ranges);
}

function parseInlineStyles(s) {
  const ranges = [];
  let out = '';
  let i = 0;
  
  while (i < s.length) {
    // **[[]] 記法を優先的に処理
    if (s[i] === '*' && s[i + 1] === '*' && 
        s[i + 2] === '[' && s[i + 3] === '[') {
      const contentStart = i + 4;
      const close = s.indexOf(']]**', contentStart);
      if (close !== -1) {
        const content = s.substring(contentStart, close);
        const start = out.length;
        out += content;
        const end = out.length;
        const rangeObj = {
          start,
          end,
          bold: true,
          color: CONFIG.COLORS.primary_color
        };
        ranges.push(rangeObj);
        i = close + 4;
        continue;
      }
    }
    
    // [[]] 記法の処理
    if (s[i] === '[' && s[i + 1] === '[') {
      const close = s.indexOf(']]', i + 2);
      if (close !== -1) {
        const content = s.substring(i + 2, close);
        const start = out.length;
        out += content;
        const end = out.length;
        const rangeObj = {
          start,
          end,
          bold: true,
          color: CONFIG.COLORS.primary_color
        };
        ranges.push(rangeObj);
        i = close + 2;
        continue;
      }
    }
    
    // ** 記法の処理
    if (s[i] === '*' && s[i + 1] === '*') {
      const close = s.indexOf('**', i + 2);
      if (close !== -1) {
        const content = s.substring(i + 2, close);
        
        // [[]] が含まれていない場合のみ処理
        if (content.indexOf('[[') === -1) {
          const start = out.length;
          out += content;
          const end = out.length;
          ranges.push({
            start,
            end,
            bold: true
          });
          i = close + 2;
          continue;
        } else {
          // [[]] が含まれている場合は ** をスキップ
          i += 2;
          continue;
        }
      }
    }
    
    out += s[i];
    i++;
  }
  
  return {
    output: out,
    ranges
  };
}

/**
 * スピーカーノートから強調記法を除去する関数
 * @param {string} notesText - 元のノートテキスト
 * @return {string} クリーンなテキスト
 */
function cleanSpeakerNotes(notesText) {
  if (!notesText) return '';
  
  let cleaned = notesText;
  
  // **太字** を除去
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '$1');
  
  // [[強調語]] を除去
  cleaned = cleaned.replace(/\[\[([^\]]+)\]\]/g, '$1');
  
  // *イタリック* を除去（念のため）
  cleaned = cleaned.replace(/\*([^*]+)\*/g, '$1');
  
  // _下線_ を除去（念のため）
  cleaned = cleaned.replace(/_([^_]+)_/g, '$1');
  
  // ~~取り消し線~~ を除去（念のため）
  cleaned = cleaned.replace(/~~([^~]+)~~/g, '$1');
  
  // `コード` を除去（念のため）
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');
  
  return cleaned;
}

function applyStyleRanges(textRange, ranges) {
  ranges.forEach(r => {
    try {
      const sub = textRange.getRange(r.start, r.end);
      if (!sub) return;
      const st = sub.getTextStyle();
      if (r.bold) st.setBold(true);
      if (r.color) st.setForegroundColor(r.color);
    } catch (e) {}
  });
}

function isAgendaTitle(title) {
  return /(agenda|アジェンダ|目次|本日お伝えすること)/i.test(String(title || ''));
}

function buildAgendaFromSlideData() {
  return __SLIDE_DATA_FOR_AGENDA.filter(d => d && d.type === 'section' && d.title).map(d => d.title.trim());
}

function drawCompareBox(slide, layout, rect, title, items, settings, isLeft = false) {
  const box = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, rect.left, rect.top, rect.width, rect.height);
  box.getFill().setSolidFill(CONFIG.COLORS.background_gray);
  box.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.lane_border);
  const th = layout.pxToPt(40);
  const titleBarBg = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, rect.left, rect.top, rect.width, th);
  
  // 左右対比色の適用
  const compareColors = generateCompareColors(settings.primaryColor);
  const headerColor = isLeft ? compareColors.left : compareColors.right;
  titleBarBg.getFill().setSolidFill(headerColor);
  titleBarBg.getBorder().setTransparent();
  const titleTextShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, rect.left, rect.top, rect.width, th);
  titleTextShape.getFill().setTransparent();
  titleTextShape.getBorder().setTransparent();
  setStyledText(titleTextShape, title, {
    size: CONFIG.FONTS.sizes.laneTitle,
    bold: true,
    color: CONFIG.COLORS.background_white,
    align: SlidesApp.ParagraphAlignment.CENTER
  });
  const pad = layout.pxToPt(12);
  const body = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, rect.left + pad, rect.top + th + pad, rect.width - pad * 2, rect.height - th - pad * 2);
  setBulletsWithInlineStyles(body, items);
}

/**
 * [修正4] レーン図の矢印をカード間を結ぶ線（コネクタ）に変更
 */
function drawArrowBetweenRects(slide, a, b, arrowH, arrowGap, settings) {
  const fromX = a.left + a.width;
  const fromY = a.top + a.height / 2;
  const toX = b.left;
  const toY = b.top + b.height / 2;

  // 描画するスペースがある場合のみ線を描画
  if (toX - fromX <= 0) return;

  const line = slide.insertLine(SlidesApp.LineCategory.STRAIGHT, fromX, fromY, toX, toY);
  line.getLineFill().setSolidFill(settings.primaryColor);
  line.setWeight(1.5);
  line.setEndArrow(SlidesApp.ArrowStyle.FILL_ARROW);
}


function drawNumberedItems(slide, layout, area, items, settings) {
  // アジェンダ用の座布団を作成
  createContentCushion(slide, area, settings, layout);
  
  // 番号なしの改行箇条書きとして表示
  const padding = layout.pxToPt(30); // パディング
  const textRect = {
    left: area.left + padding,
    top: area.top + padding,
    width: area.width - (padding * 2),
    height: area.height - (padding * 2)
  };
  
  // 改行で結合（中黒なし、番号なし）
  const cleanItems = items.map(item => {
    let cleanText = String(item || '');
    // 先頭の数字を除去
    cleanText = cleanText.replace(/^\s*\d+[\.\s]*/, '');
    return cleanText;
  });
  
  const bodyShape = slide.insertShape(
    SlidesApp.ShapeType.TEXT_BOX, 
    textRect.left, 
    textRect.top, 
    textRect.width, 
    textRect.height
  );
  
  // 改行で結合（中黒や番号を追加しない）
  const combinedText = cleanItems.join('\n\n');
  setStyledText(bodyShape, combinedText, { 
    size: CONFIG.FONTS.sizes.body,
    align: SlidesApp.ParagraphAlignment.START
  });
  
  // 行間を調整
  try {
    bodyShape.getText().getParagraphs().forEach(p => {
      p.getRange().getParagraphStyle().setLineSpacing(130).setSpaceAbove(8).setSpaceBelow(8);
    });
  } catch (e) {
    Logger.log(`Paragraph spacing error: ${e.message}`);
  }
}

