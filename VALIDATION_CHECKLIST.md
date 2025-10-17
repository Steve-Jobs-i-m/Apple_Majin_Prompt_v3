# Implementation Validation Checklist

## Pre-Deployment Checks

### Code Structure ✅
- [x] All JS files in `/src` are syntactically valid
- [x] No console.log() calls in production code (Logger.log() used instead)
- [x] All functions have proper JSDoc comments
- [x] No hard-coded credentials or API keys

### Design Token System ✅
- [x] `CONFIG.APPLE_TOKENS` exists and is properly structured
- [x] Typography scale includes all required sizes (largeTitle through caption2)
- [x] Spacing follows 8pt grid (4, 8, 16, 24, 32, 48, 64)
- [x] Safe margins defined (6% horizontal, 7.5% vertical)
- [x] Corner radius options available (8, 12, 20, 24)
- [x] Shadow definitions present
- [x] Line height options defined
- [x] Letter spacing values documented
- [x] Semantic colors for both light and dark modes

### Font System ✅
- [x] Font fallback chain includes: Inter, SF Pro Display, SF Pro Text, -apple-system, system-ui
- [x] Noto Sans JP as fallback for Japanese text
- [x] Font weights defined (300, 400, 500, 600, 700)
- [x] Font family applied consistently through `CONFIG.FONTS.family`

### Color Functions ✅
- [x] `generateAppleSemanticColors()` implemented for light/dark modes
- [x] `calculateContrastRatio()` follows WCAG 2.1 formula
- [x] `meetsWCAG_AA()` checks 4.5:1 for normal text, 3:1 for large text
- [x] `generateAppleTintedGray()` caps saturation at 20%
- [x] Existing color functions (generateProcessColors, etc.) still work

### Apple-Style Components ✅
- [x] `createAppleCard()` helper exists
- [x] Uses ROUND_RECTANGLE shape type
- [x] Supports fillColor, borderColor, borderWeight options
- [x] Shadow option documented (Apps Script limitation noted)

### Object Limiting ✅
- [x] `splitItemsForAppleStyle()` splits arrays into max 4 items
- [x] `truncateToAppleLength()` limits text to 150 chars (configurable)
- [x] Default limits in `CONFIG.APPLE_TOKENS.limits`

### Typography Helpers ✅
- [x] `applyAppleTextStyle()` function exists
- [x] Supports Apple typography tokens
- [x] Handles semantic colors
- [x] Applies line height (as percentage)
- [x] Approximates font weights with bold flag
- [x] Letter spacing limitation documented

### Title Slide (FR-13, FR-14) ✅
- [x] `settings.appleStyleTitle` flag implemented
- [x] Single text object only when enabled
- [x] Centered horizontally and vertically
- [x] Safe margins applied (6% horizontal, 7.5% vertical)
- [x] Black background for Apple style (#000000)
- [x] White text (#FFFFFF) on black background
- [x] No logo, no date, no subtitle when Apple style enabled
- [x] Uses largeTitle size (72pt) from tokens
- [x] Legacy mode preserved for backwards compatibility

### Table Slide (FR-11) ✅
- [x] `settings.appleStyleTable` flag implemented
- [x] Horizontal lines only (no vertical lines)
- [x] No filled cell backgrounds (transparent)
- [x] Bold headers
- [x] Generous row spacing
- [x] Separator color used for lines
- [x] Legacy table mode preserved

### Settings Management ✅
- [x] `appleStyleTitle` setting saved/loaded
- [x] `appleStyleTable` setting saved/loaded
- [x] `themeMode` setting saved/loaded ('light' or 'dark')
- [x] Default primary color changed to Apple blue (#0A84FF)
- [x] Default preset changed to 'apple'

### Color Updates ✅
- [x] `updateDynamicColors()` uses `generateAppleSemanticColors()`
- [x] Theme mode affects color generation
- [x] Semantic colors applied to CONFIG.COLORS
- [x] Legacy color variables maintained for backwards compatibility

## Deployment Steps

### 1. Code Validation
```bash
# Run from repository root
cd /home/runner/work/Apple_Majin_Prompt_v3/Apple_Majin_Prompt_v3

# Check for syntax errors (if ESLint is available)
# eslint src/*.js

# Verify all files are present
ls -la src/
```

### 2. Clasp Deployment
```bash
# Pull latest from Apps Script (backup)
clasp pull

# Push updated files
clasp push

# Verify deployment
clasp version
```

### 3. Manual Testing

#### Test 1: Apple-Style Title Slide
1. Open Google Slides
2. Open Apps Script menu
3. Enable `appleStyleTitle` in settings
4. Generate presentation with title slide
5. Verify:
   - Single centered text object
   - Black background
   - White text
   - No logo, no date
   - Safe margins (text not touching edges)

#### Test 2: Apple-Style Table
1. Enable `appleStyleTable` in settings
2. Generate slide with table
3. Verify:
   - Only horizontal lines visible
   - No vertical lines
   - Bold headers
   - Generous row spacing
   - Clean, minimal appearance

#### Test 3: Light/Dark Mode
1. Set `themeMode` to 'light'
2. Generate presentation
3. Verify light colors used
4. Change `themeMode` to 'dark'
5. Generate new presentation
6. Verify dark colors used
7. Compare consistency

#### Test 4: Font Fallback
1. Generate presentation
2. Check font inspector in Slides
3. Verify font family shows Inter or fallback
4. Test on system without Inter installed
5. Verify graceful degradation to Noto Sans JP

#### Test 5: WCAG Contrast
1. Generate slides with various color combinations
2. Use contrast checker tool
3. Verify all text/background pairs meet AA standard
4. Test with accent colors

#### Test 6: Rounded Cards
1. Generate slides with cards (cards, KPI, etc.)
2. Verify rounded corners visible
3. Check corner smoothness

#### Test 7: Object Limiting
1. Create slide data with >4 items
2. Generate presentation
3. Verify items split across multiple slides (when implemented)
4. Check that no slide has >4 objects

## Post-Deployment Verification

### Functionality Tests
- [ ] Title slides generate correctly
- [ ] Section slides work
- [ ] Content slides render properly
- [ ] Tables display with correct styling
- [ ] Cards have rounded corners
- [ ] Colors match design tokens
- [ ] Text is readable and properly sized
- [ ] Spacing follows 8pt grid

### Performance Tests
- [ ] Generation completes within 6 minutes (NFR-01)
- [ ] 100-slide deck generates successfully
- [ ] No timeouts or errors
- [ ] Memory usage acceptable

### Accessibility Tests
- [ ] All text meets contrast requirements
- [ ] Font sizes minimum 16px for body text
- [ ] Minimum 16px padding maintained (NFR-04)
- [ ] Minimum 28px heading size (NFR-04)
- [ ] Screen reader can parse content

### Cross-Browser/Platform Tests
- [ ] Works in Chrome
- [ ] Works in Safari
- [ ] Works in Firefox
- [ ] Works on macOS
- [ ] Works on Windows
- [ ] Works on mobile (viewing only)

## Known Issues & Limitations

### Apps Script API Limitations
1. **Numeric Font Weights**: Cannot set exact weight (300-700). Workaround: Use bold on/off
2. **Letter Spacing**: No API support. Documented in code comments
3. **Custom Corner Radius**: ROUND_RECTANGLE uses fixed radius. Acceptable for Apple style
4. **Advanced Shadows**: Limited shadow API. Using shape opacity as workaround
5. **Animation**: Not supported in generation, only manual in Slides UI

### Design Limitations
1. **Inter Font**: Must be installed locally, cannot be embedded
2. **SF Pro Font**: Apple license restricts use, Inter used as alternative
3. **Exact Color Matching**: Monitor calibration affects appearance
4. **Grid Precision**: Slides API uses points, not pixels

## Rollback Plan

If issues are discovered post-deployment:

1. **Immediate Rollback**:
   ```bash
   git revert HEAD
   clasp push
   ```

2. **Selective Rollback**:
   ```bash
   git revert <commit-hash>
   clasp push
   ```

3. **Manual Fix**:
   - Disable `appleStyleTitle` in settings
   - Disable `appleStyleTable` in settings
   - Revert to default preset
   - Clear user properties if needed

## Success Criteria

### Minimum Viable Product
- [x] Apple design tokens implemented
- [x] Title slide supports Apple minimal style
- [x] Table slide supports horizontal-only lines
- [x] Light/dark mode color system
- [x] Font fallback chain working
- [x] WCAG AA contrast checking
- [x] Backwards compatibility maintained

### Future Enhancements
- [ ] All slide types updated to use Apple tokens
- [ ] Custom menu for theme switching
- [ ] Preview mode before generation
- [ ] More granular token controls in UI
- [ ] Animation timing implementation
- [ ] Better shadow approximations

## Sign-Off

### Developer
- Date: _______________
- Name: _______________
- Signature: _______________

### Reviewer
- Date: _______________
- Name: _______________
- Signature: _______________

### Product Owner
- Date: _______________
- Name: _______________
- Signature: _______________
