# Apple Design Style Guide

## Overview

This guide documents how to use the Apple-style design features in the Google Slides Generator. The implementation follows Apple's Human Interface Guidelines (HIG) and provides minimal, elegant presentations.

## Quick Start

### Enable Apple Style

1. Open your Google Slides presentation
2. Go to Extensions → Apps Script
3. Open the script editor
4. Deploy the updated code
5. In your settings, enable:
   - `appleStyleTitle: true` - For minimal title slides
   - `appleStyleTable: true` - For horizontal-only table lines
   - `themeMode: 'light'` or `'dark'` - For color scheme

### Basic Example

```javascript
const slideData = [
  {
    type: 'title',
    title: 'Innovation',
    notes: 'Hero title slide in Apple style'
  },
  {
    type: 'table',
    title: 'Features Comparison',
    headers: ['Feature', 'Value'],
    rows: [
      ['Performance', 'Fast'],
      ['Design', 'Minimal'],
      ['Quality', 'Premium']
    ]
  }
];

const settings = {
  appleStyleTitle: true,
  appleStyleTable: true,
  themeMode: 'light',
  primaryColor: '#0A84FF', // Apple blue
  fontFamily: 'Inter, SF Pro Display, -apple-system, system-ui'
};

// Generate presentation
createPresentation(slideData, settings);
```

## Design Principles

### 1. Minimalism

**Philosophy**: Less is more. Every element should have a purpose.

**Application**:
- Title slides have only one text element
- Maximum 3-4 objects per slide
- Generous white space (negative space)
- No decorative elements

**Example**:
```javascript
// ✅ Good: Minimal title slide
{
  type: 'title',
  title: 'Think Different'
}

// ❌ Bad: Cluttered title slide
{
  type: 'title',
  title: 'Think Different',
  subtitle: 'Our Philosophy',
  logo: 'logo.png',
  date: '2024.10.17',
  backgroundImage: 'pattern.jpg'
}
```

### 2. Typography

**Hierarchy**: Use size, weight, and spacing to create hierarchy.

**Scale** (from `CONFIG.APPLE_TOKENS.typography`):
```
largeTitle: 72pt  - Hero titles only
title1: 48pt      - Main section titles
title2: 32pt      - Subsection titles
title3: 24pt      - Card headers
headline: 20pt    - Emphasized text
body: 16pt        - Standard text
callout: 14pt     - Secondary text
subhead: 13pt     - Tertiary text
footnote: 12pt    - Small text
caption1: 11pt    - Captions
caption2: 10pt    - Tiny labels
```

**Line Height**:
- Tight (1.1): Headlines and large titles
- Normal (1.2): Body text
- Relaxed (1.5): Long-form content
- Loose (1.8): Quotes and callouts

**Example**:
```javascript
// Using Apple typography scale
applyAppleTextStyle(textRange, {
  size: CONFIG.APPLE_TOKENS.typography.headline,
  lineHeight: CONFIG.APPLE_TOKENS.lineHeights.normal,
  color: CONFIG.COLORS.text_primary
});
```

### 3. Spacing

**8pt Grid**: All spacing must be a multiple of 8px (4, 8, 16, 24, 32, 48, 64).

**Safe Margins**:
- Horizontal: 6% of slide width
- Vertical: 7.5% of slide height

**Example**:
```javascript
// Using Apple spacing tokens
const padding = CONFIG.APPLE_TOKENS.spacing.lg; // 24px
const gap = CONFIG.APPLE_TOKENS.spacing.md;     // 16px

// Safe margins for important content
const safeLeft = layout.pageW_pt * CONFIG.APPLE_TOKENS.safeMargins.horizontal;
const safeTop = layout.pageH_pt * CONFIG.APPLE_TOKENS.safeMargins.vertical;
```

### 4. Color

**Semantic Colors**: Use meaning-based color names, not visual names.

**Light Mode Palette**:
```javascript
{
  background: '#FFFFFF',          // Pure white
  backgroundSecondary: '#F5F5F7', // Light gray
  text: '#1D1D1F',                // Almost black
  textSecondary: '#86868B',       // Medium gray
  accent: '#0A84FF',              // Apple blue
  border: '#D2D2D7',              // Light border
  separator: '#E5E5EA'            // Subtle separator
}
```

**Dark Mode Palette**:
```javascript
{
  background: '#000000',          // Pure black
  backgroundSecondary: '#1C1C1E', // Dark gray
  text: '#FFFFFF',                // Pure white
  textSecondary: '#98989D',       // Light gray
  accent: '#0A84FF',              // Apple blue (same)
  border: '#38383A',              // Dark border
  separator: '#48484A'            // Subtle separator
}
```

**Usage**:
```javascript
// ✅ Good: Semantic color usage
card.getFill().setSolidFill(CONFIG.COLORS.background_gray);
textStyle.setForegroundColor(CONFIG.COLORS.text_primary);

// ❌ Bad: Hard-coded colors
card.getFill().setSolidFill('#F0F0F0');
textStyle.setForegroundColor('#333333');
```

### 5. Contrast & Accessibility

**WCAG AA Standard**: All text must meet 4.5:1 contrast ratio (3:1 for large text).

**Checking Contrast**:
```javascript
// Check if color pair is accessible
const isAccessible = meetsWCAG_AA(
  foregroundColor, 
  backgroundColor, 
  isLargeText
);

if (!isAccessible) {
  Logger.log('Warning: Color pair does not meet WCAG AA standards');
}
```

**Best Practices**:
- Use semantic colors (they're pre-tested)
- Test custom colors with `calculateContrastRatio()`
- Provide alternative visual cues (not just color)
- Maintain minimum font sizes (16pt for body, 28pt for headings)

## Components

### Title Slide

**Apple Style**: Full-screen, centered, minimal.

```javascript
{
  type: 'title',
  title: 'MacBook Pro'
}
```

**Features**:
- Single text object only
- Black background (#000000)
- White text (#FFFFFF)
- 72pt font size
- Perfect centering
- Safe margins (6% x 7.5%)
- No logo, no date, no subtitle

**When to Use**:
- Opening slide
- Section dividers (as hero moments)
- Single-word impact statements

### Table Slide

**Apple Style**: Horizontal lines only, minimal chrome.

```javascript
{
  type: 'table',
  title: 'Feature Comparison',
  headers: ['Feature', 'Product A', 'Product B'],
  rows: [
    ['Speed', '2x faster', '1x'],
    ['Storage', '512GB', '256GB'],
    ['Battery', '24 hours', '12 hours']
  ]
}
```

**Features**:
- Bold headers
- Horizontal separator lines only
- No vertical lines
- No cell backgrounds
- Generous row spacing
- Center-aligned content

**When to Use**:
- Feature comparisons
- Specifications
- Data presentation
- Stats and metrics

### Card Components

**Apple Style**: Rounded corners, subtle shadows, clean.

```javascript
// Creating an Apple-style card
const card = createAppleCard(slide, left, top, width, height, {
  fillColor: CONFIG.COLORS.background_gray,
  borderColor: CONFIG.COLORS.border,
  borderWeight: 1,
  shadow: 'small',
  noBorder: false
});
```

**Corner Radius Options**:
- Small: 8px - Buttons, chips
- Medium: 12px - Small cards
- Large: 20px - Standard cards
- XLarge: 24px - Large hero cards

**When to Use**:
- Feature highlights
- Product showcases
- Content grouping
- Call-to-action elements

## Advanced Usage

### Custom Color Schemes

```javascript
// Generate semantic colors from any accent color
const myColors = generateAppleSemanticColors('#FF2D55', 'light');

// Apply to presentation
settings.primaryColor = '#FF2D55';
settings.themeMode = 'light';
```

### Responsive Typography

```javascript
// Scale text based on content length
function getResponsiveFontSize(text, baseSize) {
  const length = text.length;
  if (length > 100) return baseSize * 0.85;
  if (length > 50) return baseSize * 0.9;
  return baseSize;
}

const fontSize = getResponsiveFontSize(
  title, 
  CONFIG.APPLE_TOKENS.typography.title1
);
```

### Object Limiting

```javascript
// Automatically split items across slides
const items = [
  'Feature 1', 'Feature 2', 'Feature 3', 
  'Feature 4', 'Feature 5', 'Feature 6'
];

const groups = splitItemsForAppleStyle(items, 3); // Max 3 per slide
// Result: [[Feature 1-3], [Feature 4-6]]

groups.forEach((group, index) => {
  // Create one slide per group
  createSlideWithItems(group, index);
});
```

### Text Truncation

```javascript
// Limit text to maintain readability
const longText = "This is a very long description...";
const shortText = truncateToAppleLength(longText, 100);
// Result: "This is a very long description that goes on and on and on..."
```

## Best Practices

### DO ✅

1. **Use semantic colors**
   ```javascript
   textStyle.setForegroundColor(CONFIG.COLORS.text_primary);
   ```

2. **Follow the typography scale**
   ```javascript
   size: CONFIG.APPLE_TOKENS.typography.body
   ```

3. **Respect safe margins**
   ```javascript
   const margin = pageWidth * CONFIG.APPLE_TOKENS.safeMargins.horizontal;
   ```

4. **Use the 8pt grid**
   ```javascript
   const spacing = CONFIG.APPLE_TOKENS.spacing.lg; // 24px
   ```

5. **Check contrast ratios**
   ```javascript
   if (!meetsWCAG_AA(fg, bg)) { /* adjust colors */ }
   ```

6. **Limit objects per slide**
   ```javascript
   const groups = splitItemsForAppleStyle(items, 4);
   ```

7. **Create cards consistently**
   ```javascript
   const card = createAppleCard(slide, x, y, w, h, options);
   ```

### DON'T ❌

1. **Don't hard-code colors**
   ```javascript
   // ❌ Bad
   card.getFill().setSolidFill('#F0F0F0');
   
   // ✅ Good
   card.getFill().setSolidFill(CONFIG.COLORS.background_gray);
   ```

2. **Don't use non-standard spacing**
   ```javascript
   // ❌ Bad
   const gap = 13; // Random number
   
   // ✅ Good
   const gap = CONFIG.APPLE_TOKENS.spacing.md; // 16px
   ```

3. **Don't exceed object limits**
   ```javascript
   // ❌ Bad
   items.forEach(item => createCard(item)); // Might be > 4
   
   // ✅ Good
   const groups = splitItemsForAppleStyle(items, 4);
   groups.forEach(group => createSlide(group));
   ```

4. **Don't use inaccessible colors**
   ```javascript
   // ❌ Bad
   textStyle.setForegroundColor('#999999'); // May not contrast
   
   // ✅ Good
   if (meetsWCAG_AA('#999999', bgColor)) {
     textStyle.setForegroundColor('#999999');
   }
   ```

5. **Don't clutter title slides**
   ```javascript
   // ❌ Bad (when appleStyleTitle is true)
   { type: 'title', title: 'Hi', subtitle: 'Sub', logo: '...' }
   
   // ✅ Good
   { type: 'title', title: 'Hello' }
   ```

## Troubleshooting

### Issue: Fonts not displaying correctly

**Solution**:
1. Ensure Inter font is installed locally
2. Check font fallback chain is working
3. Verify `CONFIG.FONTS.family` is set correctly
4. Test on different systems

### Issue: Colors look different than expected

**Solution**:
1. Check monitor calibration
2. Verify theme mode (light vs dark)
3. Ensure semantic colors are used
4. Test contrast ratios with `calculateContrastRatio()`

### Issue: Objects not limiting to 4 per slide

**Solution**:
1. Manually call `splitItemsForAppleStyle(items, 4)`
2. Create separate slides for each group
3. Check that function is imported/available

### Issue: Rounded corners not visible

**Solution**:
1. Ensure using `SlidesApp.ShapeType.ROUND_RECTANGLE`
2. Use `createAppleCard()` helper
3. Verify shape size is large enough to show curves
4. Check browser rendering

### Issue: Text too long for cards

**Solution**:
1. Use `truncateToAppleLength(text, maxLength)`
2. Reduce font size
3. Increase card size
4. Split across multiple cards

## Resources

### Documentation
- [IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md) - Technical details
- [VALIDATION_CHECKLIST.md](./VALIDATION_CHECKLIST.md) - Testing guide
- [requirements.md](./docs/Requirements/requirements.md) - Full requirements

### External Resources
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [SF Pro Font Family](https://developer.apple.com/fonts/)
- [Inter Font Family](https://rsms.me/inter/)

## Support

For issues or questions:
1. Check [VALIDATION_CHECKLIST.md](./VALIDATION_CHECKLIST.md) for known issues
2. Review [IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md) for limitations
3. Consult the main [README.md](./README.md) for setup
4. Open an issue in the repository

## License

This implementation follows the same license as the main project.
See [LICENSE.md](./LICENSE.md) for details.
