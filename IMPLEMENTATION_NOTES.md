# Apple-Style Implementation Notes

## Overview
This document tracks the implementation of Apple design principles in the Google Slides generator based on `docs/Requirements/requirements.md`.

**Current Version:** 3.3.0 (Minimal Design System)  
**Last Updated:** 2025-10-19

## Version 3.3.0 Updates 🆕

### Major Changes
1. **Minimal Design System**: Complete overhaul to 1-4 object limit per slide
2. **Typography Enhancement**: Enlarged to 96pt hero, 64pt titles, 32pt body
3. **Doubled Whitespace**: Safe margins increased to 12%/15% (from 6%/7.5%)
4. **SVG Mockup System**: 32 minimal SVG references with strict object counting
5. **Object Validation**: New helper functions to enforce limits

### Updated Design Tokens (v3.3.0)
```javascript
APPLE_TOKENS: {
  version: '3.3.0',
  typography: {
    hero: 96,      // [NEW] Maximum impact titles
    title: 64,     // [UPDATED] 48→64pt
    subtitle: 32,  // [UPDATED] Body enlarged
    caption: 24    // [UPDATED] Minimum readable
  },
  safeMargins: {
    horizontal: 0.12,    // [DOUBLED] 6%→12%
    vertical: 0.15,      // [DOUBLED] 7.5%→15%
    horizontalPx: 115,   // At 960×540 base
    verticalPx: 81       // At 960×540 base
  },
  limits: {
    maxObjectsPerSlide: 4,        // [STRICT] 1-4 objects
    maxObjectsPerSlideStrict: 3,  // [RECOMMENDED] 3 objects
    maxTextLength: 100,           // [REDUCED] 150→100
    maxBulletPoints: 3,           // [REDUCED] 4→3
    maxLinesInCard: 2             // [REDUCED] 3→2
  }
}
```

### New Helper Functions (v3.3.0)
- `countSlideObjects(slide)` - Count all objects on a slide
- `validateSlideObjectCount(slide, type)` - Validate against v3.3.0 limits
- `logSlideObjectCount(slide, type, title)` - Debug logging with warnings

### Updated Slide Positioning (v3.3.0)
All `POS_PX` values updated to 12%/15% margins:
- `left: 115px` (was 25px or 60px)
- `top: 81px` (was 20px or 40px)
- `width: 730px` (was 830px or 910px)
- Content area heights reduced proportionally

## Completed Requirements

### FR-04: Design Token System ✅
- Added `CONFIG.APPLE_TOKENS` in `config.js`
- **[v3.3.0]** Updated to minimal design system with version tracking
- Includes typography scale, spacing, safe margins, corner radius, shadows, line heights, and semantic colors
- Supports both light and dark modes

### FR-05: Font Fallback ✅
- Updated font family chain: `Inter, SF Pro Display, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Noto Sans JP, Helvetica Neue, Arial, sans-serif`
- Added font weight definitions (light: 300, regular: 400, medium: 500, semibold: 600, bold: 700)
- Note: Apps Script doesn't support numeric font weights directly

### FR-11: Table Layout (chatgpt.com style) ✅
- Implemented Apple-style table rendering with horizontal lines only
- No vertical lines or filled backgrounds
- Generous row spacing with bold headers
- Controlled by `settings.appleStyleTable` flag

### FR-12: Object Limiting ✅ [UPDATED v3.3.0]
- **[v3.3.0]** Updated to 1-4 object strict limit (was 3-4)
- Added `splitItemsForAppleStyle()` helper to limit objects per slide
- Added `truncateToAppleLength()` for text length management
- **[NEW]** `countSlideObjects()`, `validateSlideObjectCount()`, `logSlideObjectCount()`
- Default limits defined in `CONFIG.APPLE_TOKENS.limits`

### FR-13 & FR-14: Title Slide Minimal Style ✅ [UPDATED v3.3.0]
- Single centered text object only (1 object limit)
- **[v3.3.0]** Safe margins: 12% horizontal, 15% vertical (DOUBLED)
- **[v3.3.0]** Font size: 96pt hero titles (was 64pt)
- No logos, no dates, no subtitles when `settings.appleStyleTitle` is enabled
- Font: Inter 600-700 weight (approximated with bold in Apps Script)
- Letter spacing: 0-0.5px (documented but not supported in Apps Script)

### FR-15: Rounded Corners and Shadows ✅ [UPDATED v3.3.0]
- Added `createAppleCard()` helper for consistent card creation
- **[v3.3.0]** Corner radius: 24px (was 20-24px range)
- **[v3.3.0]** Shadows: none or minimal only
- Shadow definitions in tokens (limited support in Apps Script API)

### FR-06: WCAG AA Contrast ✅
- Added `calculateContrastRatio()` function in `colors.js`
- Added `meetsWCAG_AA()` checker for accessibility compliance
- Contrast ratio calculation follows WCAG 2.1 guidelines

## Color System

### Apple Semantic Colors
Implemented `generateAppleSemanticColors()` with proper light/dark mode support:

**Light Mode:**
- Background: #FFFFFF
- Text: #1D1D1F
- Accent: #0A84FF (default)
- Border: #D2D2D7
- Separator: #E5E5EA

**Dark Mode:**
- Background: #000000
- Text: #FFFFFF
- Accent: #0A84FF
- Border: #38383A
- Separator: #48484A

### Tinted Grays
- Implemented `generateAppleTintedGray()` with subtle saturation (max 20%)
- Maintains Apple's approach of barely-there tints

## Typography System

### Apple Typography Scale (v3.3.0)
From `CONFIG.APPLE_TOKENS.typography`:
- **hero: 96pt** - [v3.3.0] Hero/Large titles (maximum impact)
- **title: 64pt** - [v3.3.0] Main titles (bold statements)  
- **subtitle: 32pt** - [v3.3.0] Subtitles/body (comfortable reading)
- **caption: 24pt** - [v3.3.0] Captions/labels (minimum readable)

### FONTS.sizes (v3.3.0) 
Updated to match v3.3.0 scale:
- title: 96pt (was 64pt) - Hero impact
- sectionTitle: 64pt (was 56pt) - Section emphasis
- contentTitle: 64pt (was 32pt) - Content hierarchy
- body: 32pt (was 18pt) - Comfortable reading
- subhead: 24pt (was 18pt) - Clear labels
- All other sizes proportionally increased
- caption1: 11pt (Captions)
- caption2: 10pt (Tiny text)

### Line Heights
- tight: 1.1
- normal: 1.2
- relaxed: 1.5
- loose: 1.8

## Spacing System

### 8pt Grid
All spacing follows Apple's 8pt grid system:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px
- xxxl: 64px

## Settings

### New Settings Added
1. `appleStyleTitle` (boolean): Enable Apple minimal title slide
2. `appleStyleTable` (boolean): Enable horizontal-only table lines
3. `themeMode` (string): 'light' or 'dark' mode

### Default Values
- Primary color: #0A84FF (Apple blue)
- Selected preset: 'apple'
- Theme mode: 'light'

## Apps Script Limitations

### Not Supported
1. **Numeric Font Weights**: Can only approximate with bold on/off
2. **Letter Spacing**: No API support
3. **Custom Corner Radius**: ROUND_RECTANGLE uses default radius
4. **Advanced Shadows**: Limited shadow API
5. **Gradient Fills**: Only solid fills supported for shapes

### Workarounds
1. Use `setBold(true)` to approximate semibold/bold weights
2. Document letter-spacing requirements in comments
3. Use ROUND_RECTANGLE shape type for rounded corners
4. Use color opacity for subtle shadow effects
5. Create gradient-like effects with multiple overlapping shapes

## File Changes Summary

### config.js
- Added `APPLE_TOKENS` object with complete design system
- Updated font family chain
- Added font weight definitions

### colors.js
- Added `generateAppleSemanticColors()`
- Added `calculateContrastRatio()`
- Added `meetsWCAG_AA()`
- Added `generateAppleTintedGray()`

### slides.js
- Updated `createTitleSlide()` with Apple minimal style
- Updated `createTableSlide()` with horizontal-only lines

### helpers.js
- Added `createAppleCard()`
- Added `splitItemsForAppleStyle()`
- Added `truncateToAppleLength()`

### textStyles.js
- Added `applyAppleTextStyle()` with Apple token support
- Documented typography system

### webApp.js
- Added Apple-style settings to `saveSettings()`
- Added Apple-style settings to `loadSettings()`
- Updated default values

### presentation.js
- Updated `updateDynamicColors()` to use semantic colors
- Added theme mode support

## Testing Checklist

### Manual Testing Required
- [ ] Deploy to Apps Script with clasp push
- [ ] Test title slide with appleStyleTitle enabled
- [ ] Test table slide with appleStyleTable enabled
- [ ] Verify font fallback works (test without SF Pro installed)
- [ ] Test light/dark mode switching
- [ ] Verify contrast ratios meet WCAG AA
- [ ] Test object limiting with >4 items
- [ ] Verify rounded corners on cards
- [ ] Test all color generation functions
- [ ] Verify responsive margins (6%/7.5%)

### Integration Testing
- [ ] Generate full presentation with Apple style
- [ ] Verify consistency across all slide types
- [ ] Test with different primary colors
- [ ] Verify accessibility with screen readers
- [ ] Test on different screen sizes

## Future Enhancements

### Potential Improvements
1. Add custom menu item for theme switching
2. Implement preview mode before generation
3. Add more granular Apple token controls in UI
4. Support for custom accent color palettes
5. Animation timing tokens (already defined but not used)
6. Better shadow approximations
7. Image processing for Apple-style treatments

### Deferred Items (Out of Scope per Requirements)
- 3D animation generation
- External API integrations
- Official Apple asset distribution
- Real-time collaboration features

## References

### Requirements Documents
- `docs/Requirements/requirements.md` - Main requirements
- `docs/Requirements/component_requirements.md` - Component specs
- `docs/Requirements/dark_mode_requirements_and_design.md` - Dark mode specs
- `docs/Requirements/apple_like_template_mapping/` - Template mappings

### Apple Design Guidelines
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- Apple's 8pt grid system
- SF Pro font family
- iOS/macOS color system

### Accessibility Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- Contrast ratio requirements (AA: 4.5:1 for normal text, 3:1 for large text)

## Version History

### v3.1.0 (Current)
- Apple design token system
- Apple-style title and table slides
- Semantic color system with light/dark modes
- Typography scale
- Accessibility features (WCAG checking)
- Helper functions for Apple-style components

### v3.0.0 (Previous)
- Basic slide generation
- Majin-style layouts
- Custom menu system
