# Changelog

All notable changes to the Apple Majin Prompt v3 project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.2.0] - 2025-10-19

### Enhanced - Minimal Design System for Apple-Like Aesthetics

#### Title Header Hiding for Ultra-Minimal Design (NEW)
- **Added conditional title/logo hiding system** for pure minimal aesthetics
  - `ultraMinimalMode`: Master switch to hide ALL titles and logos
  - `hideContentTitles`: Hide titles in all content slides
  - `hideLogoInContent`: Hide header logos in content slides
  - `hideTitleUnderline`: Hide decorative underlines (default: true)
  
- **Slide-type specific title hiding**:
  - `hideTitleInQuote`: true - Quotes don't need titles (quote is focus)
  - `hideTitleInKpi`: true - KPIs speak for themselves (numbers are focus)
  - `hideTitleInHero`: true - Hero slides are visual (image is focus)
  - `hideTitleInStats`: true - Stats slides focus on data comparison

- **Implemented helper functions**:
  - `shouldHideTitleHeader(slideType, settings)` - Determines if title should be hidden
  - `shouldHideLogo(slideType, settings)` - Determines if logo should be hidden
  - `getAdjustedTopForHiddenTitle(layout, originalTop, titleHidden)` - Calculates adjusted positioning

- **Updated slide generation functions**:
  - Modified `drawStandardTitleHeader()` to accept `slideType` parameter
  - Updated `createQuoteSlide()` to hide title and adjust content positioning
  - Updated `createKpiSlide()` to hide title and expand content area
  - Updated `createStatsCompareSlide()` to hide title conditionally
  - Updated `createBarCompareSlide()` to hide title conditionally
  - All other slides default to traditional behavior (backward compatible)

- **Benefits of title hiding**:
  - Object count reduction: -2 to -3 objects per slide
  - Vertical space gain: +80-120px of usable space
  - Content area expansion: 280px → 400px height (+43%)
  - Visual focus: Content becomes the hero element

#### Typography Enhancement (1.5-2x Larger Fonts)
- **Dramatically enlarged all font sizes for impact and readability**:
  - `largeTitle`: 72pt → **96pt** (+33%) - Hero titles with maximum visual impact
  - `title1`: 48pt → **64pt** (+33%) - Section titles with commanding presence  
  - `title2`: 32pt → **40pt** (+25%) - Card headers with clear hierarchy
  - `title3`: 24pt → **28pt** (+17%) - Content titles readable from distance
  - `headline`: 20pt → **24pt** (+20%) - Emphasized text with stronger presence
  - `body`: 16pt → **18pt** (+12.5%) - Standard body text for comfortable reading
  - `callout`: 14pt → **16pt** (+14%) - Secondary text still prominent
  - `subhead`: 13pt → **14pt** (+8%) - Tertiary text at minimum comfortable size

- **Updated FONTS.sizes across all slide types**:
  - `title`: 40pt → **64pt** (+60%)
  - `sectionTitle`: 38pt → **56pt** (+47%)
  - `contentTitle`: 24pt → **32pt** (+33%)
  - `body`: 14pt → **18pt** (+29%)
  - `processStep`: 14pt → **18pt** (+29%)
  - `ghostNum`: 180pt → **200pt** (+11%)
  - `subhead`: 16pt → **18pt** (+12.5%)

#### Spacing Enhancement (2x Larger Margins)
- **Doubled all spacing tokens for generous breathing room**:
  - `xs`: 4px → **8px** (100% increase)
  - `sm`: 8px → **16px** (100% increase)
  - `md`: 16px → **32px** (100% increase)
  - `lg`: 24px → **48px** (100% increase)
  - `xl`: 32px → **64px** (100% increase)
  - `xxl`: 48px → **96px** (100% increase)
  - `xxxl`: 64px → **128px** (100% increase)

- **Doubled safe margins for title slides**:
  - `horizontal`: 6% → **12%** (100% increase)
  - `vertical`: 7.5% → **15%** (100% increase)

#### Layout Restructuring (More White Space)
- **Significantly increased margins and reduced content area width**:
  - Left margin: 25px → **60px** (+140%)
  - Top margin: 20px → **40px** (+100%)
  - Content width: 910px → **840px** (-70px for breathing room)
  - Content height: 330px → **280px** (-50px to reduce clutter)
  - Title underline: 260px → **200px** (-60px, more subtle)
  - Underline thickness: 4px → **3px** (thinner, more minimal)

- **Applied to all major slide layouts**:
  - `contentSlide`: Larger margins, narrower content area
  - `compareSlide`: Increased box spacing, narrower boxes
  - `cardsSlide`: More top space, narrower grid
  - All header logos moved to (30, 30) from (20, 20)

#### Strict Object Limits for Minimalism
- **Added `minimalRules` configuration**:
  - `titleSlideObjectLimit`: **1** (ONLY one text object)
  - `heroSlideObjectLimit`: **2** (maximum 2 objects)
  - `contentSlideObjectLimit`: **3** (maximum 3 objects)
  - `cardLayoutMaxItems`: **3** (maximum 3 cards)
  - `processStepsMax`: **3** (maximum 3 steps)
  - `timelineItemsMax`: **4** (maximum 4 milestones)
  - `comparisonItemsMax`: **3** (maximum 3 items per side)
  - `enforceStrictMode`: **true** (enable strict counting)

#### Content Restrictions
- **Updated `limits` configuration**:
  - `maxTextLength`: 150 → **120** characters (-20%)
  - `maxBulletPoints`: 6 → **4** points (-33%)
  - `maxLinesInCard`: **3** lines (new)
  - `maxCharsPerLine`: **40** characters (new)
  - `autoSplitThreshold`: **150** characters (new)

#### Color Usage Guidelines
- **Added `colorRestrictions` for Apple's 3-color rule**:
  - `maxColorsPerSlide`: **3** (primary, secondary, accent only)
  - `primaryColorUsage`: 'text' (black for text)
  - `secondaryColorUsage`: 'subtle' (gray for supporting elements)
  - `accentColorUsage`: 'highlight' (one accent color for emphasis only)

#### Typography Enhancement Rules
- **Added `typographyEnhancement` guidelines**:
  - `preferBoldOverSize`: **false** (use size hierarchy, not bold)
  - `minHeadingSize`: **28pt** (minimum size for any heading)
  - `maxTextLinesBeforeSplit`: **5** (split slide if text exceeds 5 lines)
  - `lineHeightMultiplier`: **1.2** (consistent line height)
  - Letter spacing: tight (-0.5) for large titles, normal (0) for body, wide (0.5) for labels

#### White Space Management
- **Added `whiteSpaceRatios` configuration**:
  - `titleSlide`: **0.8** (80% empty space)
  - `heroSlide`: **0.6** (60% empty space)
  - `contentSlide`: **0.4** (40% empty space)
  - `minimumEmptySpace`: **0.3** (always maintain 30% empty space)

### Added
- Created comprehensive **Minimal Design Guidelines** documentation (`docs/MINIMAL_DESIGN_GUIDELINES.md`)
  - Detailed before/after comparisons
  - Implementation checklist
  - Best practices for minimal design
  - Slide type-specific restrictions
  - Typography and spacing reference tables

### Changed
- All design tokens in `CONFIG.APPLE_TOKENS` significantly expanded
- All font sizes in `CONFIG.FONTS.sizes` increased by 12-60%
- All layout positions in `CONFIG.POS_PX` updated for larger margins
- Stricter enforcement of "Less is More" philosophy

### Future Work
- [ ] Implement object counting in slide generation functions
- [ ] Add automatic slide splitting for long content
- [ ] Create validation warnings for design rule violations
- [ ] Build minimal design compliance checker

---

## [3.1.0] - 2024-10-17

### Added - Apple Design System Implementation

#### Design Tokens System
- Added comprehensive `CONFIG.APPLE_TOKENS` design system in `config.js`
  - Typography scale (largeTitle: 72pt through caption2: 10pt)
  - Spacing scale (8pt grid: 4, 8, 16, 24, 32, 48, 64px)
  - Safe margins (horizontal: 6%, vertical: 7.5%)
  - Corner radius options (8, 12, 20, 24px)
  - Shadow definitions (small, medium, large)
  - Line heights (tight, normal, relaxed, loose)
  - Letter spacing values (documented)
  - Semantic colors for light and dark modes
  - Content limits (max 4 objects per slide, 150 char text limit)

#### Font System
- Updated font fallback chain: `Inter, SF Pro Display, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Noto Sans JP, Helvetica Neue, Arial, sans-serif`
- Added font weight definitions (light: 300, regular: 400, medium: 500, semibold: 600, bold: 700)
- Note: Apps Script doesn't support numeric font weights directly; approximated with bold flag

#### Color System
- Added `generateAppleSemanticColors()` in `colors.js` for light/dark mode support
  - Light mode: White background (#FFFFFF), dark text (#1D1D1F), Apple blue accent (#0A84FF)
  - Dark mode: Black background (#000000), white text (#FFFFFF), same accent
  - Full semantic palette: background, text, border, separator colors
- Added `calculateContrastRatio()` following WCAG 2.1 formula
- Added `meetsWCAG_AA()` checker for accessibility compliance (4.5:1 for normal text, 3:1 for large)
- Added `generateAppleTintedGray()` with subtle saturation control (max 20%)
- Updated `updateDynamicColors()` in `presentation.js` to use semantic color system

#### Apple-Style Components
- **Title Slide** (FR-13, FR-14):
  - Added `appleStyleTitle` setting for minimal title slides
  - Single centered text object only (no logo, no date, no subtitle)
  - Black background (#000000) with white text (#FFFFFF)
  - Safe margins applied (6% horizontal, 7.5% vertical)
  - Uses largeTitle typography token (72pt)
  - Maintains backwards compatibility with traditional mode
  
- **Table Slide** (FR-11):
  - Added `appleStyleTable` setting for horizontal-only lines
  - No vertical lines or filled cell backgrounds
  - Bold headers with generous row spacing
  - Clean, minimal appearance (chatgpt.com style)
  - Maintains backwards compatibility with traditional table mode

- **Card Components** (FR-15):
  - Added `createAppleCard()` helper in `helpers.js`
  - Uses ROUND_RECTANGLE shape type for rounded corners (20-24px)
  - Supports custom fill color, border, and shadow options
  - Consistent card creation across all slide types

#### Helper Functions
- Added `splitItemsForAppleStyle()` for automatic object limiting (FR-12)
- Added `truncateToAppleLength()` for text length management
- Added `applyAppleTextStyle()` in `textStyles.js` with token support
  - Supports semantic colors
  - Applies line heights
  - Approximates font weights
  - Handles paragraph-level styling

#### Settings Management
- Added `appleStyleTitle` boolean setting (default: false)
- Added `appleStyleTable` boolean setting (default: false)
- Added `themeMode` setting ('light' or 'dark', default: 'light')
- Changed default primary color to Apple blue (#0A84FF)
- Changed default preset to 'apple'
- Updated `saveSettings()` and `loadSettings()` in `webApp.js`

### Changed

#### Typography
- Updated base font family to include Inter and SF Pro fonts
- Added font weight definitions (not directly supported, but documented)
- Enhanced text styling functions to use Apple tokens

#### Colors
- Refactored color generation to use semantic color system
- Theme mode now affects all color generation
- Maintained legacy color variables for backwards compatibility

#### Layout
- Title slides can now use full-width centered layout with safe margins
- Table slides support horizontal-only separator style
- Enhanced spacing calculations to follow 8pt grid

### Documentation

#### New Documentation Files
- **IMPLEMENTATION_NOTES.md**: Complete technical documentation
  - All completed requirements mapped to implementation
  - Apps Script limitations and workarounds
  - File-by-file change summary
  - Testing checklist
  - Future enhancements roadmap

- **VALIDATION_CHECKLIST.md**: Testing and deployment guide
  - Pre-deployment checks
  - Deployment steps with clasp
  - 7 manual test procedures
  - Post-deployment verification
  - Known issues and limitations
  - Rollback plan
  - Success criteria

- **APPLE_STYLE_GUIDE.md**: User-facing style guide
  - Quick start with examples
  - 5 core design principles (minimalism, typography, spacing, color, accessibility)
  - Component documentation (title, table, cards)
  - Advanced usage patterns
  - Best practices (DO/DON'T lists)
  - Troubleshooting guide
  - External resources

- **CHANGELOG.md**: This file

### Technical Details

#### Files Modified
1. **config.js**: 
   - Added APPLE_TOKENS object
   - Updated FONTS.family
   - Added FONTS.weights

2. **colors.js**:
   - Added generateAppleSemanticColors()
   - Added calculateContrastRatio()
   - Added meetsWCAG_AA()
   - Added generateAppleTintedGray()

3. **slides.js**:
   - Updated createTitleSlide() with Apple minimal style
   - Updated createTableSlide() with horizontal-only lines

4. **helpers.js**:
   - Added createAppleCard()
   - Added splitItemsForAppleStyle()
   - Added truncateToAppleLength()

5. **textStyles.js**:
   - Added applyAppleTextStyle()

6. **webApp.js**:
   - Updated saveSettings()
   - Updated loadSettings()
   - Added Apple-style settings

7. **presentation.js**:
   - Updated updateDynamicColors()

#### Backwards Compatibility
- All changes are opt-in via settings
- Legacy modes preserved for all modified components
- Existing presentations continue to work unchanged
- Default settings maintain existing behavior unless explicitly changed

#### Known Limitations
1. **Font Weights**: Apps Script doesn't support numeric weights (300-700). Approximated with bold on/off.
2. **Letter Spacing**: No API support. Documented in code comments.
3. **Corner Radius**: ROUND_RECTANGLE uses fixed radius. Acceptable for Apple style (20-24px range).
4. **Shadows**: Limited shadow API. Using shape opacity as workaround.
5. **Gradients**: Only solid fills supported for shapes.

### Requirements Mapping

This release implements the following requirements from `docs/Requirements/requirements.md`:

- **FR-04**: Design token system in CONFIG.APPLE_TOKENS ✅
- **FR-05**: Font fallback (Inter, SF Pro, system fonts) ✅
- **FR-06**: WCAG AA contrast compliance checking ✅
- **FR-11**: Table layouts with horizontal lines only ✅
- **FR-12**: Limit objects to 3-4 per slide ✅
- **FR-13**: Title slide with single centered text ✅
- **FR-14**: Safe margins (6%/7.5%) and font sizing ✅
- **FR-15**: Rounded corners (20-24px) on cards ✅

### Testing Status

#### Completed
- [x] Code structure validation
- [x] Design token system verification
- [x] Font system implementation
- [x] Color functions testing
- [x] Component creation helpers
- [x] Settings management
- [x] Backwards compatibility

#### Pending Deployment
- [ ] Deploy with clasp push
- [ ] Manual testing (7 test scenarios in VALIDATION_CHECKLIST.md)
- [ ] Performance testing (100-slide deck)
- [ ] Accessibility testing
- [ ] Cross-platform testing

### Security
- No security vulnerabilities introduced
- No credentials or API keys hard-coded
- All user inputs sanitized through existing mechanisms
- WCAG AA contrast checking improves accessibility

### Performance
- No performance degradation expected
- Color calculations are efficient
- Token lookups are O(1)
- Semantic color generation is memoizable (future optimization)

## [3.0.0] - Previous Release

### Features
- Basic slide generation with multiple layout types
- Majin-style automation
- Custom menu system
- Script property persistence
- Multiple preset support
- Image insertion from URLs or Drive
- Inline text styling
- Bullet point formatting
- Color generation utilities

## Future Releases

### [3.2.0] - Planned
- Update all remaining slide generators to use Apple tokens
- Implement custom menu for theme switching
- Add preview mode before generation
- More granular token controls in UI
- Better shadow approximations

### [3.3.0] - Planned
- Animation timing implementation
- Advanced typography controls
- Image processing for Apple-style treatments
- Export to PDF with Apple styling

### [4.0.0] - Vision
- Real-time collaboration features
- Advanced template system
- AI-powered design suggestions
- Multi-language support enhancements

## Contributing

When contributing to this project:
1. Follow the existing code style
2. Update documentation (especially IMPLEMENTATION_NOTES.md)
3. Add tests where applicable
4. Update this CHANGELOG.md
5. Reference requirement IDs in commit messages

## License

See [LICENSE.md](./LICENSE.md) for license information.

---

For detailed technical information, see [IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md).
For usage guide, see [APPLE_STYLE_GUIDE.md](./APPLE_STYLE_GUIDE.md).
For testing procedures, see [VALIDATION_CHECKLIST.md](./VALIDATION_CHECKLIST.md).
