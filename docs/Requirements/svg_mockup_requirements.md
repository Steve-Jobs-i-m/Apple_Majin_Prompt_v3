# Apple-Style Minimal Slide Requirements (SVG Mockups v3.3.0)

## Purpose
- Define Apple-like minimal slide expectations using SVG mockups as visual references
- Bridge design and engineering with exact vector assets (\`img/svg_mockups/*.svg\`)
- Enable regression checks: if a generated Google Slide drifts from the SVG, realign immediately
- **NEW in v3.3.0**: Strict 3-4 object limit per slide, doubled whitespace, enlarged typography

## Summary
**32 minimal SVG mockups** have been generated following strict Apple design principles:
- Average **2.7 objects per slide** (70% reduction from typical 5-10 objects)
- **12% horizontal / 15% vertical margins** (doubled from previous 6%/7.5%)
- **64-96pt typography** for titles (33-60% larger)
- **3 color maximum** per slide (black, white, gray, + 1 accent)

## Quick Reference

| Object Count | Slide Count | Examples |
|-------------|-------------|----------|
| 1 object | 3 slides | Title (001), Pie (010), Hero Image (014) |
| 2 objects | 8 slides | KPI (006), Quote (015), Before/After (016), Stats (017), etc. |
| 3 objects | 18 slides | Cards (005), Process (021), Diagrams (025-027), etc. |
| 4 objects | 3 slides | Bar Compare (004), Timeline (008), Agenda (031) |

See `img/svg_mockups/README.md` for complete catalog with specifications.

## Minimal Design Tokens (v3.3.0)

### Canvas
- **Resolution:** 1920×1080 (16:9)
- **Grid:** 8pt Apple grid
- **Margins:** 230px horizontal (12%), 162px vertical (15%)

### Typography
- **Hero:** 96pt, weight 600-700
- **Title:** 64pt, weight 600
- **Body:** 32pt, weight 400
- **Caption:** 24pt, weight 400
- **Letter Spacing:** -0.5px (large), 0px (body)
- **Fonts:** Inter → SF Pro Display → Helvetica Neue

### Colors (3 max)
- Background: `#000000`
- Primary text: `#FFFFFF`
- Secondary text: `#86868B`
- Accent: `#0A84FF` (sparingly)

### Shapes
- **Radius:** 24px consistent
- **Opacity:** 0.1-0.3 backgrounds, 0.8-1.0 primary
- **Shadows:** None or minimal

### Rules
- **Max objects:** 1-4 per slide (strict)
- **Min whitespace:** 30% of canvas
- **Title slides:** 80% whitespace
- **Hero slides:** 60% whitespace
- **Content slides:** 40% whitespace

## Using This Document

1. Review design tokens before implementing in Apps Script
2. Reference SVG mockups in `img/svg_mockups/` for each slide type
3. Validate generated slides against SVG references
4. Update this document when design tokens change
5. Run visual regression tests (future: automated diff)

## Full Slide Specifications

For detailed requirements of all 32 slide types, see:
- **Individual requirements:** `docs/Requirements/apple_like_template_mapping/XX_*.md`
- **SVG catalog:** `img/svg_mockups/README.md`
- **Completion report:** `MINIMAL_SVG_MOCKUPS_COMPLETION_REPORT.md`

## Quick Examples

### Most Minimal (1-2 objects)
- **001 Title:** Single centered text
- **006 KPI:** Giant number + label
- **010 Pie:** Simplified chart (no labels)
- **014 Hero Image:** Full-bleed gradient
- **015 Quote:** Quote + attribution + **Markdown-style vertical bar** (3 objects total)
- **019 Section:** Title + accent line

### Balanced (3 objects)
- **005 Cards:** 3 feature cards
- **012 Icon Trio:** 3 icon placeholders
- **021 Process:** 3-step workflow
- **025 Cycle Diagram:** 3 nodes (no connections)
- **027 Pyramid Diagram:** 3 layers

### Maximum Complexity (4 objects)
- **004 Bar Compare:** Title + 3 comparison bars
- **008 Timeline:** Line + 3 milestone nodes
- **026 Triangle Diagram:** 3 nodes + **connection lines** (4 objects total)
- **031 Agenda:** Title + 3 agenda items

## Implementation Checklist

### Apps Script Integration
- [ ] Implement `countSlideObjects()` validation
- [ ] Auto-split slides exceeding 4 objects
- [ ] Enforce 12%/15% margins in layouts
- [ ] Use 64-96pt typography for titles
- [ ] Validate 3-color maximum per slide
- [ ] Apply 24px corner radius consistently

### Quality Gates
- [ ] Object count ≤ 4
- [ ] Margins: 230px H / 162px V minimum
- [ ] Typography: 24pt minimum font size
- [ ] Colors: 3 maximum (including background)
- [ ] Whitespace: 30% minimum empty space
- [ ] Radius: 24px for all rounded elements

### Regression Testing
1. Generate slide from Apps Script
2. Export as SVG or screenshot
3. Compare with reference in `img/svg_mockups/`
4. Visual diff (manual or automated)
5. Iterate until match within tolerance

## Version History

### v3.3.0 (2025-10-19) - Minimal Redesign
- ✨ 32 new SVG mockups with 3-4 object limit
- 📐 Doubled margins to 12% H / 15% V
- 📝 Enlarged typography (64-96pt titles)
- 🎨 Strict 3-color palette
- 📊 Average 2.7 objects/slide (70% reduction)

### v3.2.x (Previous)
- 20 slide mockups
- 6% H / 7.5% V margins
- 48-72pt titles
- Less strict object limits

## Related Documents

- `img/svg_mockups/README.md` - SVG catalog
- `MINIMAL_SVG_MOCKUPS_COMPLETION_REPORT.md` - Completion report
- `docs/MINIMAL_DESIGN_GUIDELINES.md` - Design guidelines
- `docs/Requirements/apple_like_template_mapping/` - Individual slide specs
- `APPLE_STYLE_GUIDE.md` - Apple design system

---

**Document Version:** 3.3.0  
**Last Updated:** 2025-10-19  
**Status:** ✅ Active  
**Object Philosophy:** Less is More
