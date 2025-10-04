#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, 'src', 'config.js');
const OUTPUT_DIR = path.join(ROOT, 'img', 'svg_mockups');

function loadConfig(configPath) {
  const code = fs.readFileSync(configPath, 'utf8');
  const context = { Math, Date };
  vm.createContext(context);
  const instrumented = `${code}\nthis.CONFIG = CONFIG;`;
  vm.runInContext(instrumented, context);
  if (!context.CONFIG) {
    throw new Error('Failed to load CONFIG from ' + configPath);
  }
  return context.CONFIG;
}

const CONFIG = loadConfig(CONFIG_PATH);
const BASE_W = CONFIG.BASE_PX.W;
const BASE_H = CONFIG.BASE_PX.H;

const palette = {
  backgroundTop: '#040717',
  backgroundBottom: '#0b1224',
  panel: '#121d36',
  panelAlt: '#162240',
  panelSoft: '#1c2a4b',
  panelMuted: '#253558',
  stroke: '#24324f',
  strokeSoft: '#2f3e62',
  accent: '#38bdf8',
  accentAlt: '#2563eb',
  accentWarm: '#f97316',
  textBright: '#f8fafc',
  textSoft: '#cbd5f5',
  textMuted: '#8aa0c8'
};

const styleMap = {
  title:      { fill: palette.panel, stroke: palette.stroke, strokeWidth: 1.8, rx: 18, textColor: palette.textBright },
  subhead:    { fill: palette.panelAlt, stroke: palette.stroke, strokeWidth: 1.5, rx: 14, textColor: palette.textSoft },
  body:       { fill: palette.panelSoft, stroke: palette.stroke, strokeWidth: 1.4, rx: 20, textColor: palette.textSoft },
  bodyAlt:    { fill: palette.panelMuted, stroke: palette.strokeSoft, strokeWidth: 1.2, rx: 18, textColor: palette.textSoft },
  card:       { fill: palette.panelAlt, stroke: palette.stroke, strokeWidth: 1.4, rx: 16, textColor: palette.textBright },
  headerCard: { fill: palette.accentAlt, stroke: 'none', strokeWidth: 0, rx: 12, textColor: palette.textBright },
  cardBody:   { fill: palette.panelSoft, stroke: palette.stroke, strokeWidth: 1.2, rx: 14, textColor: palette.textSoft },
  highlight:  { fill: palette.accent, stroke: 'none', strokeWidth: 0, rx: 12, textColor: '#051427' },
  metric:     { fill: palette.panelAlt, stroke: palette.strokeSoft, strokeWidth: 1.3, rx: 18, textColor: palette.textBright },
  note:       { fill: 'none', stroke: palette.stroke, strokeWidth: 1, rx: 10, textColor: palette.textMuted },
  logo:       { fill: '#1b2644', stroke: palette.strokeSoft, strokeWidth: 1.2, rx: 14, textColor: palette.textSoft },
  underline:  { fill: palette.accent, stroke: 'none', strokeWidth: 0, rx: 2 },
  bar:        { fill: palette.accentAlt, stroke: 'none', strokeWidth: 0, rx: 8 },
  barTrack:   { fill: '#1f2d4a', stroke: 'none', strokeWidth: 0, rx: 8 },
  line:       { stroke: palette.strokeSoft, strokeWidth: 2 },
  fineLine:   { stroke: palette.stroke, strokeWidth: 1 },
  ghostText:  { fill: 'none', stroke: 'none', strokeWidth: 0, textColor: '#1f2937' }
};

function fmt(num) {
  return Number.parseFloat(num.toFixed(2));
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function createSvgBuilder(patternKey) {
  const shapes = [];
  const texts = [];
  const defs = [];
  const gradientId = `bg-${patternKey}`;
  defs.push(`  <linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">`);
  defs.push(`    <stop offset="0%" stop-color="${palette.backgroundTop}" />`);
  defs.push(`    <stop offset="100%" stop-color="${palette.backgroundBottom}" />`);
  defs.push('  </linearGradient>');

  function addRect(rect, styleName, label, options = {}) {
    if (!rect || rect.width <= 0) return;
    const width = rect.width;
    const height = rect.height > 0 ? rect.height : (options.fallbackHeight || Math.max(36, width * 0.35));
    const style = styleMap[styleName] || {};
    const rx = options.rx !== undefined ? options.rx : (style.rx !== undefined ? style.rx : Math.min(18, height / 4));
    const fill = options.fill || style.fill || 'none';
    const stroke = options.stroke || style.stroke || 'none';
    const strokeWidth = options.strokeWidth !== undefined ? options.strokeWidth : (style.strokeWidth || 0);
    shapes.push(`<rect x="${fmt(rect.x)}" y="${fmt(rect.y)}" width="${fmt(width)}" height="${fmt(height)}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" rx="${fmt(rx)}" ry="${fmt(rx)}" />`);
    if (label) {
      const fontSize = options.fontSize || Math.min(24, Math.max(12, height / 4));
      const textColor = options.textColor || style.textColor || palette.textSoft;
      const textX = rect.x + width / 2;
      const textY = rect.y + height / 2 + fontSize * 0.36;
      texts.push(`<text x="${fmt(textX)}" y="${fmt(textY)}" fill="${textColor}" font-size="${fmt(fontSize)}" font-family="Inter, 'Noto Sans JP', sans-serif" text-anchor="middle">${escapeXml(label)}</text>`);
    }
  }

  function addLine(x1, y1, x2, y2, styleName = 'line') {
    const style = styleMap[styleName] || styleMap.line;
    shapes.push(`<line x1="${fmt(x1)}" y1="${fmt(y1)}" x2="${fmt(x2)}" y2="${fmt(y2)}" stroke="${style.stroke || palette.stroke}" stroke-width="${style.strokeWidth || 2}" stroke-linecap="round" />`);
  }

  function addCircle(cx, cy, r, styleName = 'card', label, options = {}) {
    const style = styleMap[styleName] || {};
    const fill = options.fill || style.fill || palette.panel;
    const stroke = options.stroke || style.stroke || palette.stroke;
    const strokeWidth = options.strokeWidth !== undefined ? options.strokeWidth : (style.strokeWidth || 1.5);
    shapes.push(`<circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`);
    if (label) {
      const fontSize = options.fontSize || Math.min(22, Math.max(12, r * 0.9));
      const textColor = options.textColor || style.textColor || palette.textBright;
      texts.push(`<text x="${fmt(cx)}" y="${fmt(cy + fontSize * 0.35)}" fill="${textColor}" font-size="${fmt(fontSize)}" font-family="Inter, 'Noto Sans JP', sans-serif" text-anchor="middle">${escapeXml(label)}</text>`);
    }
  }

  function addText(x, y, text, options = {}) {
    if (!text) return;
    const fill = options.fill || palette.textSoft;
    const fontSize = options.fontSize || 16;
    const anchor = options.anchor || 'start';
    const fontFamily = options.fontFamily || "Inter, 'Noto Sans JP', sans-serif";
    const dy = options.dy || 0;
    const baseline = options.baseline || 'hanging';
    const fontWeight = options.fontWeight || 'normal';
    texts.push(`<text x="${fmt(x)}" y="${fmt(y + dy)}" fill="${fill}" font-size="${fmt(fontSize)}" font-family="${fontFamily}" font-weight="${fontWeight}" text-anchor="${anchor}" dominant-baseline="${baseline}">${escapeXml(text)}</text>`);
  }

  function splitRect(rect, count, gap = 16, direction = 'horizontal') {
    const pieces = [];
    if (!rect || count <= 0) return pieces;
    if (direction === 'horizontal') {
      const totalGap = gap * (count - 1);
      const width = (rect.width - totalGap) / count;
      for (let i = 0; i < count; i++) {
        pieces.push({ x: rect.x + i * (width + gap), y: rect.y, width, height: rect.height });
      }
    } else {
      const totalGap = gap * (count - 1);
      const height = (rect.height - totalGap) / count;
      for (let i = 0; i < count; i++) {
        pieces.push({ x: rect.x, y: rect.y + i * (height + gap), width: rect.width, height });
      }
    }
    return pieces;
  }

  function addUnderline(rect, widthRatio = 0.6) {
    if (!rect) return;
    const width = rect.width * widthRatio;
    const left = rect.x;
    const underlineRect = { x: left, y: rect.y, width, height: rect.height };
    addRect(underlineRect, 'underline');
  }

  function addBullets(rect, count, options = {}) {
    if (!rect || count <= 0) return;
    const gap = rect.height / (count * 2);
    const lineHeight = (rect.height - gap * (count + 1)) / count;
    for (let i = 0; i < count; i++) {
      const top = rect.y + gap * (i + 1) + lineHeight * i;
      const bulletRect = {
        x: rect.x + (options.indent || 24),
        y: top,
        width: rect.width - (options.indent || 24) * 1.5,
        height: lineHeight * 0.6
      };
      addRect(bulletRect, options.style || 'bodyAlt');
      const dotSize = Math.min(10, lineHeight * 0.4);
      addCircle(rect.x + (options.indent || 24) / 2, top + bulletRect.height / 2, dotSize / 2, 'highlight');
    }
  }

  function buildSvg(patternTitle) {
    const defsBlock = defs.length ? `<defs>\n${defs.join('\n')}\n</defs>` : '';
    const background = `<rect x="0" y="0" width="${BASE_W}" height="${BASE_H}" fill="url(#${gradientId})" />`;
    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      `<svg xmlns="http://www.w3.org/2000/svg" width="${BASE_W}" height="${BASE_H}" viewBox="0 0 ${BASE_W} ${BASE_H}">`,
      defsBlock,
      background,
      ...shapes,
      ...texts,
      `<title>${escapeXml(patternTitle)}</title>`,
      '</svg>'
    ].filter(Boolean).join('\n');
  }

  return {
    addRect,
    addLine,
    addCircle,
    addText,
    addUnderline,
    addBullets,
    splitRect,
    buildSvg
  };
}

function getRect(pathOrSpec) {
  const spec = typeof pathOrSpec === 'string' ? resolveSpec(pathOrSpec) : pathOrSpec;
  if (!spec) return null;
  const left = spec.left !== undefined ? spec.left : (spec.right !== undefined && spec.width !== undefined ? BASE_W - spec.right - spec.width : 0);
  return {
    x: left,
    y: spec.top || 0,
    width: spec.width || 0,
    height: spec.height || 0
  };
}

function resolveSpec(path) {
  const parts = String(path).split('.');
  if (parts.length !== 2) return null;
  const [group, key] = parts;
  const layout = CONFIG.POS_PX[group];
  if (!layout) return null;
  return layout[key];
}

function ensureOutputDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeSvgFile(filename, content) {
  fs.writeFileSync(filename, content, 'utf8');
}

function withFooter(builder) {
  const bottomBar = getRect('bottomBar');
  if (bottomBar) builder.addRect(bottomBar, 'underline');
  const footerLeft = getRect('footer.leftText');
  const footerRight = getRect('footer.rightPage');
  if (footerLeft) builder.addRect(footerLeft, 'note', 'Footer');
  if (footerRight) builder.addRect(footerRight, 'note', 'Page');
}

function drawStandardHeader(builder, layoutKey, labels = {}) {
  const logoRect = getRect(`${layoutKey}.headerLogo`);
  if (logoRect) builder.addRect(logoRect, 'logo', 'Logo');
  const titleRect = getRect(`${layoutKey}.title`);
  if (titleRect) builder.addRect(titleRect, 'title', labels.title || 'Title');
  const underlineRect = getRect(`${layoutKey}.titleUnderline`);
  if (underlineRect) builder.addRect(underlineRect, 'underline');
  if (labels.includeSubhead !== false) {
    const subheadRect = getRect(`${layoutKey}.subhead`);
    if (subheadRect) builder.addRect(subheadRect, 'subhead', labels.subhead || 'Subhead');
  }
}

const patterns = [
  {
    key: 'title',
    title: 'Title Slide',
    render(builder) {
      const titleRect = getRect('titleSlide.title');
      const logoRect = getRect('titleSlide.logo');
      const dateRect = getRect('titleSlide.date');
      if (logoRect) builder.addRect(logoRect, 'logo', 'Logo');
      if (titleRect) builder.addRect(titleRect, 'title', 'Title');
      if (dateRect) builder.addRect(dateRect, 'note', 'Date');
      withFooter(builder);
    }
  }
];


patterns.push(
  {
    key: 'section',
    title: 'Section Divider',
    render(builder) {
      const titleRect = getRect('sectionSlide.title');
      const ghostRect = getRect('sectionSlide.ghostNum');
      if (ghostRect) {
        const fontSize = Math.min(180, ghostRect.height * 0.8);
        const x = ghostRect.x + ghostRect.width / 2;
        const y = ghostRect.y + (ghostRect.height - fontSize) / 2;
        builder.addText(x, y, '01', {
          fontSize,
          anchor: 'middle',
          baseline: 'hanging',
          fill: 'rgba(255,255,255,0.08)',
          fontWeight: '700'
        });
      }
      if (titleRect) builder.addRect(titleRect, 'title', 'Section Title');
      withFooter(builder);
    }
  },
  {
    key: 'closing',
    title: 'Closing Slide',
    render(builder) {
      const headline = { x: BASE_W * 0.2, y: BASE_H * 0.28, width: BASE_W * 0.6, height: 90 };
      builder.addRect(headline, 'title', 'Thank you');
      const underline = { x: headline.x, y: headline.y + headline.height + 10, width: headline.width * 0.5, height: 6 };
      builder.addRect(underline, 'underline');
      const graphic = { x: BASE_W * 0.3, y: headline.y + headline.height + 60, width: BASE_W * 0.4, height: 180 };
      builder.addRect(graphic, 'body', 'Logo / Visual');
      withFooter(builder);
    }
  },
  {
    key: 'content',
    title: 'Content Slide',
    render(builder) {
      drawStandardHeader(builder, 'contentSlide');
      const bodyRect = getRect('contentSlide.body');
      if (bodyRect) {
        builder.addRect(bodyRect, 'body', 'Narrative');
        builder.addBullets(bodyRect, 4, { indent: 48 });
      }
      withFooter(builder);
    }
  },
  {
    key: 'agenda',
    title: 'Agenda Slide',
    render(builder) {
      drawStandardHeader(builder, 'processSlide');
      const area = getRect('processSlide.area');
      if (area) {
        builder.addRect(area, 'body', 'Agenda');
        const segments = builder.splitRect(area, 4, 24, 'vertical');
        segments.forEach((segment, index) => {
          const radius = Math.min(18, segment.height * 0.25);
          builder.addCircle(segment.x + radius + 12, segment.y + segment.height / 2, radius, 'highlight', String(index + 1), {
            fontWeight: '700',
            fontSize: 14,
            textColor: '#051427'
          });
          const textRect = {
            x: segment.x + radius * 2 + 32,
            y: segment.y + segment.height * 0.25,
            width: segment.width - radius * 2 - 44,
            height: segment.height * 0.5
          };
          builder.addRect(textRect, 'bodyAlt');
        });
      }
      withFooter(builder);
    }
  },
  {
    key: 'compare',
    title: 'Comparison Slide',
    render(builder) {
      drawStandardHeader(builder, 'compareSlide');
      const leftBox = getRect('compareSlide.leftBox');
      const rightBox = getRect('compareSlide.rightBox');
      if (leftBox) {
        builder.addRect(leftBox, 'body', 'Option A');
        builder.addBullets(leftBox, 4, { indent: 40, style: 'bodyAlt' });
      }
      if (rightBox) {
        builder.addRect(rightBox, 'body', 'Option B');
        builder.addBullets(rightBox, 4, { indent: 40, style: 'bodyAlt' });
      }
      withFooter(builder);
    }
  },
  {
    key: 'process',
    title: 'Process Steps',
    render(builder) {
      drawStandardHeader(builder, 'processSlide');
      const area = getRect('processSlide.area');
      if (area) {
        const steps = builder.splitRect(area, 4, 12, 'vertical');
        const tagWidth = area.width * 0.24;
        steps.forEach((stepRect, index) => {
          const tagRect = {
            x: stepRect.x,
            y: stepRect.y + stepRect.height * 0.12,
            width: tagWidth,
            height: stepRect.height * 0.6
          };
          builder.addRect(tagRect, 'highlight', `STEP ${index + 1}`, { fontSize: 16 });
          const textRect = {
            x: stepRect.x + tagWidth + 14,
            y: stepRect.y + stepRect.height * 0.12,
            width: stepRect.width - tagWidth - 18,
            height: stepRect.height * 0.6
          };
          builder.addRect(textRect, 'bodyAlt');
          if (index < steps.length - 1) {
            const centerX = stepRect.x + tagWidth / 2;
            const bottomY = stepRect.y + stepRect.height;
            builder.addLine(centerX, bottomY + 4, centerX, bottomY + 22, 'line');
          }
        });
      }
      withFooter(builder);
    }
  },
  {
    key: 'processList',
    title: 'Process Checklist',
    render(builder) {
      drawStandardHeader(builder, 'processSlide');
      const area = getRect('processSlide.area');
      if (area) {
        const centerX = area.x + 48;
        builder.addLine(centerX, area.y + 16, centerX, area.y + area.height - 16, 'fineLine');
        const segments = builder.splitRect(area, 4, 18, 'vertical');
        segments.forEach((segment, index) => {
          builder.addCircle(centerX, segment.y + segment.height / 2, 12, 'highlight', String(index + 1), {
            fontSize: 13,
            fontWeight: '700'
          });
          const textRect = {
            x: centerX + 30,
            y: segment.y + segment.height * 0.25,
            width: area.width - (centerX - area.x) - 42,
            height: segment.height * 0.5
          };
          builder.addRect(textRect, 'bodyAlt');
        });
      }
      withFooter(builder);
    }
  },
  {
    key: 'timeline',
    title: 'Timeline Slide',
    render(builder) {
      drawStandardHeader(builder, 'timelineSlide');
      const area = getRect('timelineSlide.area');
      if (area) {
        const startX = area.x + 70;
        const endX = area.x + area.width - 70;
        const y = area.y + area.height / 2;
        builder.addLine(startX, y, endX, y, 'line');
        const nodes = 4;
        const gap = (endX - startX) / (nodes - 1);
        for (let i = 0; i < nodes; i++) {
          const cx = startX + gap * i;
          builder.addCircle(cx, y, 10, 'highlight');
          const cardRect = {
            x: cx - 95,
            y: i % 2 === 0 ? y - 150 : y + 30,
            width: 190,
            height: 100
          };
          builder.addRect(cardRect, 'card', `Milestone ${i + 1}`);
        }
      }
      withFooter(builder);
    }
  },
  {
    key: 'diagram',
    title: 'Swimlane Diagram',
    render(builder) {
      drawStandardHeader(builder, 'diagramSlide');
      const area = getRect('diagramSlide.lanesArea');
      if (area) {
        const lanes = builder.splitRect(area, 3, 18, 'horizontal');
        lanes.forEach((laneRect, index) => {
          const headerHeight = 48;
          builder.addRect({ x: laneRect.x, y: laneRect.y, width: laneRect.width, height: headerHeight }, 'headerCard', `Lane ${index + 1}`);
          const bodyRect = {
            x: laneRect.x,
            y: laneRect.y + headerHeight + 8,
            width: laneRect.width,
            height: laneRect.height - headerHeight - 8
          };
          builder.addRect(bodyRect, 'body');
          const cardsArea = {
            x: bodyRect.x + 12,
            y: bodyRect.y + 12,
            width: bodyRect.width - 24,
            height: bodyRect.height - 24
          };
          const cards = builder.splitRect(cardsArea, 3, 12, 'vertical');
          cards.forEach(card => builder.addRect(card, 'cardBody'));
        });
      }
      withFooter(builder);
    }
  },
  {
    key: 'cycle',
    title: 'Cycle Diagram',
    render(builder) {
      drawStandardHeader(builder, 'contentSlide');
      const area = getRect('contentSlide.body');
      if (area) {
        const center = { x: area.x + area.width / 2, y: area.y + area.height / 2 };
        builder.addCircle(center.x, center.y, 60, 'body', 'Core', { fontSize: 18 });
        const radiusX = area.width / 2.6;
        const radiusY = area.height / 2.6;
        const positions = [
          { x: center.x + radiusX, y: center.y },
          { x: center.x, y: center.y + radiusY },
          { x: center.x - radiusX, y: center.y },
          { x: center.x, y: center.y - radiusY }
        ];
        positions.forEach((pos, index) => {
          const rect = { x: pos.x - 110, y: pos.y - 60, width: 220, height: 120 };
          builder.addRect(rect, 'card', `Item ${index + 1}`);
        });
      }
      withFooter(builder);
    }
  },
  {
    key: 'cards',
    title: 'Cards Grid',
    render(builder) {
      drawStandardHeader(builder, 'cardsSlide');
      const area = getRect('cardsSlide.gridArea');
      if (area) {
        const rows = builder.splitRect(area, 2, 18, 'vertical');
        rows.forEach(row => {
          const cols = builder.splitRect(row, 3, 18, 'horizontal');
          cols.forEach(col => builder.addRect(col, 'card'));
        });
      }
      withFooter(builder);
    }
  },
  {
    key: 'headerCards',
    title: 'Header Cards',
    render(builder) {
      drawStandardHeader(builder, 'cardsSlide');
      const area = getRect('cardsSlide.gridArea');
      if (area) {
        const rows = builder.splitRect(area, 2, 18, 'vertical');
        rows.forEach(row => {
          const cols = builder.splitRect(row, 3, 18, 'horizontal');
          cols.forEach((col, idx) => {
            const headerHeight = col.height * 0.28;
            builder.addRect({ x: col.x, y: col.y, width: col.width, height: headerHeight }, 'headerCard', `Card ${idx + 1}`);
            builder.addRect({ x: col.x, y: col.y + headerHeight, width: col.width, height: col.height - headerHeight }, 'cardBody');
          });
        });
      }
      withFooter(builder);
    }
  },
  {
    key: 'table',
    title: 'Data Table',
    render(builder) {
      drawStandardHeader(builder, 'tableSlide');
      const area = getRect('tableSlide.area');
      if (area) {
        builder.addRect(area, 'body', 'Table');
        const cols = 3;
        for (let i = 1; i < cols; i++) {
          const x = area.x + (area.width / cols) * i;
          builder.addLine(x, area.y, x, area.y + area.height, 'fineLine');
        }
        const rows = 4;
        for (let j = 1; j < rows; j++) {
          const y = area.y + (area.height / rows) * j;
          builder.addLine(area.x, y, area.x + area.width, y, 'fineLine');
        }
      }
      withFooter(builder);
    }
  },
  {
    key: 'progress',
    title: 'Progress Cards',
    render(builder) {
      drawStandardHeader(builder, 'progressSlide');
      const area = getRect('progressSlide.area');
      if (area) {
        const cards = builder.splitRect(area, 3, 18, 'vertical');
        cards.forEach((cardRect, index) => {
          builder.addRect(cardRect, 'body');
          const labelRect = { x: cardRect.x + 24, y: cardRect.y + 18, width: cardRect.width - 160, height: 32 };
          builder.addRect(labelRect, 'cardBody', `Task ${index + 1}`);
          const percentRect = { x: cardRect.x + cardRect.width - 132, y: cardRect.y + 16, width: 108, height: 38 };
          builder.addRect(percentRect, 'highlight', `${(index + 2) * 15}%`, { fontSize: 18 });
          const track = { x: cardRect.x + 24, y: cardRect.y + cardRect.height - 34, width: cardRect.width - 48, height: 14 };
          builder.addRect(track, 'barTrack');
          const fill = { x: track.x, y: track.y, width: track.width * (0.3 + index * 0.2), height: track.height };
          builder.addRect(fill, 'bar');
        });
      }
      withFooter(builder);
    }
  },
  {
    key: 'quote',
    title: 'Quote Card',
    render(builder) {
      drawStandardHeader(builder, 'quoteSlide');
      const card = { x: 80, y: 180, width: BASE_W - 160, height: 260 };
      builder.addRect(card, 'body', 'Quotation');
      const quoteRect = { x: card.x + 40, y: card.y + 40, width: card.width - 80, height: card.height - 120 };
      builder.addRect(quoteRect, 'cardBody');
      const authorRect = { x: card.x + card.width - 220, y: card.y + card.height - 70, width: 200, height: 40 };
      builder.addRect(authorRect, 'note', 'Author');
      withFooter(builder);
    }
  },
  {
    key: 'kpi',
    title: 'KPI Grid',
    render(builder) {
      drawStandardHeader(builder, 'kpiSlide');
      const area = getRect('kpiSlide.gridArea');
      if (area) {
        const rows = builder.splitRect(area, 2, 18, 'vertical');
        rows.forEach(row => {
          const cols = builder.splitRect(row, 3, 18, 'horizontal');
          cols.forEach(col => {
            builder.addRect(col, 'metric');
            const labelRect = { x: col.x + 18, y: col.y + 18, width: col.width - 36, height: 24 };
            builder.addRect(labelRect, 'note', 'Metric Name');
            const valueRect = { x: col.x + 18, y: col.y + 54, width: col.width - 36, height: 54 };
            builder.addRect(valueRect, 'card', '42');
            const deltaRect = { x: col.x + 18, y: col.y + col.height - 62, width: col.width - 36, height: 32 };
            builder.addRect(deltaRect, 'cardBody', '+8%');
          });
        });
      }
      withFooter(builder);
    }
  },
  {
    key: 'bulletCards',
    title: 'Bullet Cards',
    render(builder) {
      drawStandardHeader(builder, 'contentSlide');
      const area = getRect('contentSlide.body');
      if (area) {
        const cards = builder.splitRect(area, 3, 16, 'vertical');
        cards.forEach((cardRect, index) => {
          builder.addRect(cardRect, 'body');
          const titleRect = { x: cardRect.x + 24, y: cardRect.y + 18, width: cardRect.width - 48, height: 32 };
          builder.addRect(titleRect, 'card', `Heading ${index + 1}`);
          const descRect = { x: cardRect.x + 24, y: cardRect.y + 60, width: cardRect.width - 48, height: cardRect.height - 90 };
          builder.addRect(descRect, 'bodyAlt');
        });
      }
      withFooter(builder);
    }
  },
  {
    key: 'faq',
    title: 'FAQ List',
    render(builder) {
      drawStandardHeader(builder, 'contentSlide');
      const area = getRect('contentSlide.body');
      if (area) {
        const cards = builder.splitRect(area, 3, 16, 'vertical');
        cards.forEach((cardRect, index) => {
          builder.addRect(cardRect, 'body');
          const questionRect = { x: cardRect.x + 24, y: cardRect.y + 20, width: cardRect.width - 48, height: 40 };
          builder.addRect(questionRect, 'card', `Q${index + 1}`);
          const answerRect = { x: cardRect.x + 24, y: cardRect.y + 70, width: cardRect.width - 48, height: cardRect.height - 100 };
          builder.addRect(answerRect, 'bodyAlt');
        });
      }
      withFooter(builder);
    }
  },
  {
    key: 'statsCompare',
    title: 'Stats Comparison',
    render(builder) {
      drawStandardHeader(builder, 'compareSlide');
      const area = { x: 25, y: 150, width: BASE_W - 50, height: 300 };
      builder.addRect(area, 'body', 'Comparison');
      const headerHeight = 50;
      const leftWidth = area.width * 0.35;
      const rightWidth = area.width * 0.35;
      const centerWidth = area.width - leftWidth - rightWidth;
      builder.addRect({ x: area.x, y: area.y, width: leftWidth, height: headerHeight }, 'card', 'Current');
      builder.addRect({ x: area.x + leftWidth, y: area.y, width: centerWidth, height: headerHeight }, 'cardBody', 'Metric');
      builder.addRect({ x: area.x + leftWidth + centerWidth, y: area.y, width: rightWidth, height: headerHeight }, 'card', 'Future');
      const rows = 4;
      const rowHeight = (area.height - headerHeight) / rows;
      for (let i = 0; i < rows; i++) {
        const y = area.y + headerHeight + rowHeight * i;
        const labelRect = { x: area.x + leftWidth, y: y + rowHeight * 0.2, width: centerWidth, height: rowHeight * 0.6 };
        builder.addRect(labelRect, 'bodyAlt', `Metric ${i + 1}`);
        const leftValueRect = { x: area.x, y: y + rowHeight * 0.25, width: leftWidth, height: rowHeight * 0.5 };
        builder.addRect(leftValueRect, 'card', '45');
        const rightValueRect = { x: area.x + leftWidth + centerWidth, y: y + rowHeight * 0.25, width: rightWidth, height: rowHeight * 0.5 };
        builder.addRect(rightValueRect, 'card', '68');
        if (i < rows - 1) {
          const lineY = y + rowHeight;
          builder.addLine(area.x + 16, lineY, area.x + area.width - 16, lineY, 'fineLine');
        }
      }
      withFooter(builder);
    }
  },
  {
    key: 'barCompare',
    title: 'Bar Comparison',
    render(builder) {
      drawStandardHeader(builder, 'compareSlide');
      const area = { x: 40, y: 150, width: BASE_W - 80, height: 320 };
      builder.addRect(area, 'body');
      const blocks = builder.splitRect(area, 3, 22, 'vertical');
      blocks.forEach((blockRect, index) => {
        const titleRect = { x: blockRect.x, y: blockRect.y, width: blockRect.width, height: 36 };
        builder.addRect(titleRect, 'cardBody', `Scenario ${index + 1}`);
        const rowHeight = (blockRect.height - 36) / 2;
        const labelWidth = 90;
        const valueWidth = 120;
        const barWidth = blockRect.width - labelWidth - valueWidth - 20;
        const asIsY = blockRect.y + 36;
        const toBeY = asIsY + rowHeight;
        builder.addRect({ x: blockRect.x, y: asIsY, width: labelWidth, height: rowHeight }, 'note', '現状');
        builder.addRect({ x: blockRect.x + blockRect.width - valueWidth, y: asIsY, width: valueWidth, height: rowHeight }, 'card', '45%');
        const track1 = { x: blockRect.x + labelWidth + 10, y: asIsY + rowHeight / 2 - 7, width: barWidth, height: 14 };
        builder.addRect(track1, 'barTrack');
        builder.addRect({ x: track1.x, y: track1.y, width: track1.width * 0.45, height: track1.height }, 'bar');
        builder.addRect({ x: blockRect.x, y: toBeY, width: labelWidth, height: rowHeight }, 'note', '導入後');
        builder.addRect({ x: blockRect.x + blockRect.width - valueWidth, y: toBeY, width: valueWidth, height: rowHeight }, 'card', '70%');
        const track2 = { x: blockRect.x + labelWidth + 10, y: toBeY + rowHeight / 2 - 7, width: barWidth, height: 14 };
        builder.addRect(track2, 'barTrack');
        builder.addRect({ x: track2.x, y: track2.y, width: track2.width * 0.75, height: track2.height }, 'bar');
      });
      withFooter(builder);
    }
  },
  {
    key: 'triangle',
    title: 'Triangle Diagram',
    render(builder) {
      drawStandardHeader(builder, 'triangleSlide');
      const area = getRect('triangleSlide.area');
      if (area) {
        const positions = [
          { x: area.x + area.width / 2, y: area.y + 30 },
          { x: area.x + area.width - 160, y: area.y + area.height - 40 },
          { x: area.x + 160, y: area.y + area.height - 40 }
        ];
        positions.forEach((pos, index) => {
          const card = { x: pos.x - 130, y: pos.y - 70, width: 260, height: 140 };
          builder.addRect(card, 'card', `Node ${index + 1}`);
        });
        builder.addLine(positions[0].x, positions[0].y + 70, positions[1].x, positions[1].y - 70, 'line');
        builder.addLine(positions[1].x - 130, positions[1].y - 70, positions[2].x + 130, positions[2].y - 70, 'line');
        builder.addLine(positions[2].x, positions[2].y - 70, positions[0].x, positions[0].y + 70, 'line');
      }
      withFooter(builder);
    }
  },
  {
    key: 'pyramid',
    title: 'Pyramid Stack',
    render(builder) {
      drawStandardHeader(builder, 'pyramidSlide');
      const area = getRect('pyramidSlide.pyramidArea');
      if (area) {
        const levels = 4;
        const stepHeight = area.height / (levels + 1);
        for (let i = 0; i < levels; i++) {
          const widthRatio = 1 - i * 0.18;
          const levelWidth = area.width * widthRatio;
          const rect = {
            x: area.x + (area.width - levelWidth) / 2,
            y: area.y + stepHeight * i + 20,
            width: levelWidth,
            height: stepHeight - 16
          };
          builder.addRect(rect, 'card', `Level ${levels - i}`);
        }
      }
      withFooter(builder);
    }
  },
  {
    key: 'flowChart',
    title: 'Flow Chart',
    render(builder) {
      drawStandardHeader(builder, 'flowChartSlide');
      const area = getRect('flowChartSlide.singleRow') || { x: 60, y: 200, width: BASE_W - 120, height: 120 };
      const steps = 4;
      const cards = builder.splitRect(area, steps, 24, 'horizontal');
      cards.forEach((cardRect, index) => {
        builder.addRect(cardRect, 'card', `Step ${index + 1}`);
        if (index < cards.length - 1) {
          const arrowX = cardRect.x + cardRect.width + 6;
          const centerY = cardRect.y + cardRect.height / 2;
          builder.addLine(arrowX, centerY, arrowX + 18, centerY, 'line');
        }
      });
      withFooter(builder);
    }
  },
  {
    key: 'stepUp',
    title: 'Step Up',
    render(builder) {
      drawStandardHeader(builder, 'stepUpSlide');
      const area = getRect('stepUpSlide.stepArea');
      if (area) {
        const steps = 4;
        const width = area.width / steps;
        for (let i = 0; i < steps; i++) {
          const height = area.height * (0.5 + (i / (steps - 1)) * 0.45);
          const rect = {
            x: area.x + width * i,
            y: area.y + area.height - height,
            width,
            height
          };
          builder.addRect(rect, 'body');
          const headerRect = { x: rect.x, y: rect.y, width: rect.width, height: 46 };
          builder.addRect(headerRect, 'headerCard', `Stage ${i + 1}`);
        }
      }
      withFooter(builder);
    }
  },
  {
    key: 'imageText',
    title: 'Image + Text',
    render(builder) {
      drawStandardHeader(builder, 'imageTextSlide');
      const imageRect = getRect('imageTextSlide.leftImage');
      const captionRect = getRect('imageTextSlide.leftImageCaption');
      const textRect = getRect('imageTextSlide.rightText');
      if (imageRect) builder.addRect(imageRect, 'card', 'Image');
      if (captionRect) builder.addRect(captionRect, 'note', 'Caption');
      if (textRect) {
        builder.addRect(textRect, 'body', 'Talking Points');
        builder.addBullets(textRect, 4, { indent: 36 });
      }
      withFooter(builder);
    }
  }
);

function main() {
  ensureOutputDir(OUTPUT_DIR);
  patterns.forEach((pattern, index) => {
    const builder = createSvgBuilder(pattern.key);
    pattern.render(builder);
    const svg = builder.buildSvg(pattern.title);
    const filename = `pattern_${String(index + 1).padStart(2, '0')}_${pattern.key}.svg`;
    writeSvgFile(path.join(OUTPUT_DIR, filename), svg);
  });
  console.log(`Generated ${patterns.length} SVG mockup(s) in ${path.relative(ROOT, OUTPUT_DIR)}`);
}

if (require.main === module) {
  main();
}

