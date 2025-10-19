# Apple-Style Minimal Slide Requirements (SVG Mockups v3.3.0)

## Purpose
- Define Apple-like minimal slide expectations using SVG mockups as visual references.
- Bridge design and engineering with exact vector assets (`img/svg_mockups/*.svg`).
- Enable regression checks: if a generated Google Slide drifts from the SVG, realign immediately.
- **NEW in v3.3.0**: Strict 3-4 object limit per slide, doubled whitespace, enlarged typography.

## How to Use This Document
1. Review the **Minimal Design Tokens** before implementing layouts in Apps Script.
2. For each slide section, reference the requirements and SVG preview.
3. When tokens or layouts change, update both SVG and requirements, then circulate to design reviewers.
4. **Object count badges** indicate visual element limits for each slide type.

## Minimal Design Tokens and Principles (v3.3.0)

### Canvas & Grid
- **Resolution:** 1920×1080 (16:9)
- **Grid System:** 8pt Apple grid
- **Safe Margins:** 
  - Horizontal: **12%** (230px) - *doubled from 6%*
  - Vertical: **15%** (162px) - *doubled from 7.5%*

### Typography (Enlarged 33-60%)
- **Hero Title:** 96pt (weight 600-700) - *was 72pt*
- **Section Title:** 64pt (weight 600) - *was 48pt*
- **Body Text:** 32pt (weight 400) - *was 24pt*
- **Caption:** 24pt (weight 400) - *was 16pt*
- **Letter Spacing:** -0.5px for large titles, 0px for body
- **Fallback Fonts:** Inter → SF Pro Display → Helvetica Neue → Arial

### Color Palette (3 Colors Maximum)
- **Background:** `#000000` (pure black)
- **Primary Text:** `#FFFFFF` (pure white)
- **Secondary Text:** `#86868B` (medium gray)
- **Accent:** `#0A84FF` (Apple Blue) - use sparingly
- **Success:** `#30D158` (green) - data visualization only
- **Warning:** `#FF9F0A` (orange) - data visualization only

### Shapes & Radii
- **Corner Radius:** 24px (consistent across all elements)
- **Shadows:** Minimal or none - rely on color contrast
- **Opacity:** 0.1-0.3 for backgrounds, 0.8-1.0 for primary elements

### Object Count Limits (STRICT)
- **Title Slides:** 1 object (text only)
- **Hero Slides:** 2 objects (text + image OR number + label)
- **Content Slides:** 3 objects (title + 2 elements OR 3 cards)
- **Complex Slides:** 4 objects maximum (e.g., timeline with nodes)
- **Rule:** If exceeding 4 objects, split into multiple slides

### Whitespace Philosophy
- **Minimum Empty Space:** 30% of canvas must remain empty
- **Hero Slides:** 60% whitespace
- **Title Slides:** 80% whitespace
- **Content Slides:** 40% whitespace minimum

---

### 001 Hero Title (`apple_template_001_hero_title.svg`)
- Full-bleed black canvas with centered white hero title and muted subtitle.
- Title weight 600 at ~160pt, subtitle weight 400 at ~64pt.
- No logos, shadows, or additional adornments; focus on precise vertical centering.

<img src="../../img/svg_mockups/apple_template_001_hero_title.svg" alt="Hero Title SVG" width="640" />

### 002 CPU Spec (`apple_template_002_cpu_spec.svg`)
- Two-column layout: copy on the left, chip illustration on the right.
- Heading with thin aqua divider, subhead bullets describing performance/efficiency cores.
- Chip graphic uses nested rounded squares culminating in `M4` typography.

<img src="../../img/svg_mockups/apple_template_002_cpu_spec.svg" alt="CPU Spec SVG" width="640" />

### 003 GPU Spec (`apple_template_003_gpu_spec.svg`)
- Mirrored arrangement of CPU slide to maintain parity.
- Chip illustration sits left; bullet list (dynamic caching, mesh shading, 2× ray tracing, scheduler) sits right.
- Divider and headings repeat teal accent to reinforce pairing.

<img src="../../img/svg_mockups/apple_template_003_gpu_spec.svg" alt="GPU Spec SVG" width="640" />

### 004 Affinity Benchmark – Bars (`apple_template_004_affinity_benchmark_dark.svg`)
- Title at top center, followed by three horizontal comparison bars (M4, M3, M1).
- Each entry contains chip badge, model label, and right-aligned performance delta.
- Spotlight M4 bar with aqua gradient; others remain neutral grayscale.

<img src="../../img/svg_mockups/apple_template_004_affinity_benchmark_dark.svg" alt="Affinity Benchmark Bars SVG" width="640" />

### 005 Affinity Benchmark – Cards (`apple_template_005_affinity_benchmark_cards.svg`)
- Card-based variant with stacked rounded rectangles and inner progress tracks.
- Headline matches slide 004; each card houses model name and delta copy.
- Progress widths encode relative speed (M4 > M3 > baseline M1).

<img src="../../img/svg_mockups/apple_template_005_affinity_benchmark_cards.svg" alt="Affinity Benchmark Cards SVG" width="640" />

### 006 Product Highlights Mosaic (`apple_template_006_product_highlights.svg`)
- Central device mock flanked by six spec tiles.
- Tiles use concise two-line copy (headline + supporting line) with consistent padding.
- Maintain symmetrical spacing and identical corner radii across all tiles.

<img src="../../img/svg_mockups/apple_template_006_product_highlights.svg" alt="Product Highlights Mosaic SVG" width="640" />

### 007 Battery Duration (`apple_template_007_battery.svg`)
- Oversized battery glyph with neon interior; text “24 hours” centered inside.
- Right-hand nub extends battery silhouette; outer body uses layered blacks.
- Text color flips to black for high contrast against green fill.

<img src="../../img/svg_mockups/apple_template_007_battery.svg" alt="Battery Duration SVG" width="640" />

### 008 Pricing Stack (`apple_template_008_pricing.svg`)
- Vertical typesetting: product name, size, and price.
- Soft spotlight gradient background reminiscent of Apple keynotes.
- Device placeholder beneath text to ground the pricing context.

<img src="../../img/svg_mockups/apple_template_008_pricing.svg" alt="Pricing Stack SVG" width="640" />

### 009 Timeline (`apple_template_009_timeline.svg`)
- Horizontal rule with evenly spaced nodes.
- Each node features tilted title (~−28°) and centered caption below the baseline.
- Circles filled white; copy remains white with muted gray subtext.

<img src="../../img/svg_mockups/apple_template_009_timeline.svg" alt="Timeline SVG" width="640" />

### 010 Split Table (`apple_template_010_split_table.svg`)
- Rounded rectangular table shell with vertical divider.
- Left column: performance metrics; right column: efficiency narrative.
- Headings in weight 600, body copy in light neutral gray. No horizontal row rules.

<img src="../../img/svg_mockups/apple_template_010_split_table.svg" alt="Split Table SVG" width="640" />

### 011 Pie Chart (`apple_template_011_pie_chart.svg`)
- Central pie with four colored segments: blue, green, violet, orange.
- Underlay circle adds depth via darker neutral tone.
- No labels or legends on slide; use in-narration callouts instead.

<img src="../../img/svg_mockups/apple_template_011_pie_chart.svg" alt="Pie Chart SVG" width="640" />

### 012 Bar Chart Icon (`apple_template_012_bar_chart.svg`)
- Minimal icon of four ascending bars with constant width and radius.
- Blue fill applied universally; baseline sits above slide edge to create floating effect.
- No axes/ticks; acts as graphic accent rather than data viz.

<img src="../../img/svg_mockups/apple_template_012_bar_chart.svg" alt="Bar Chart SVG" width="640" />

### 013 Icon Trio (`apple_template_013_icon_trio.svg`)
- Outlined lamp, chair, and bed icons evenly spaced over baseline.
- Consistent stroke width and rounded joints to maintain cohesion.
- Thin baseline anchors the trio visually.

<img src="../../img/svg_mockups/apple_template_013_icon_trio.svg" alt="Icon Trio SVG" width="640" />

### 014 Image Collage (`apple_template_014_image_collage.svg`)
- Left: large landscape frame; right: two stacked portrait frames.
- Subtle gradient overlay adds depth; all frames share identical radii.
- Equal gutter spacing between frames; right column aligns vertically.

<img src="../../img/svg_mockups/apple_template_014_image_collage.svg" alt="Image Collage SVG" width="640" />

### 015 Hero Photo (`apple_template_015_hero_photo.svg`)
- Full-bleed gradient representing hero photography.
- Transparent black overlay (12%) to keep future text legible.
- No additional text or framing; slide acts as visual palate cleanser.

<img src="../../img/svg_mockups/apple_template_015_hero_photo.svg" alt="Hero Photo SVG" width="640" />

### 016 Testimonial (`apple_template_016_testimonial.svg`)
- Left-aligned Japanese testimonial headline spanning two lines.
- Attribution placed near lower left in muted gray.
- Maintain generous left margin (≥260px) for future decorative quotes if needed.

<img src="../../img/svg_mockups/apple_template_016_testimonial.svg" alt="Testimonial SVG" width="640" />

### 017 Before/After Split (`apple_template_017_before_after.svg`)
- Vertical split: left light-gray “Before”, right black “After”.
- Center divider slightly translucent white to blend edges.
- Typography centered both horizontally and vertically within each half.

<img src="../../img/svg_mockups/apple_template_017_before_after.svg" alt="Before After SVG" width="640" />

### 018 KPI Contrast (`apple_template_018_kpi_contrast.svg`)
- Two large numeric callouts (positive/negative) with captions beneath.
- Baselines align horizontally; ample negative space around figures.
- Neutral gray captions in Japanese to reinforce localization guidance.

<img src="../../img/svg_mockups/apple_template_018_kpi_contrast.svg" alt="KPI Contrast SVG" width="640" />

### 019 Feature Slots (`apple_template_019_feature_slots.svg`)
- Four evenly spaced rounded-square outlines for future iconography.
- Stroke weight uniform; interior remains transparent.
- Set on black background to emphasize potential contents.

<img src="../../img/svg_mockups/apple_template_019_feature_slots.svg" alt="Feature Slots SVG" width="640" />

### 020 Closing Slide (`apple_template_020_closing.svg`)
- Centered “Thank you.” headline with aqua underline.
- Secondary caption enumerates platforms (macOS / iPadOS / Apple Intelligence).
- Maintain symmetrical margins; ensure underline aligns to text width.

<img src="../../img/svg_mockups/apple_template_020_closing.svg" alt="Closing Slide SVG" width="640" />

---

## Change Control Checklist
- Update SVG and requirement bullets together.
- Notify design lead for review when typography scale or spacing shifts.
- Run automated diff (future work) to compare Apps Script output against these SVGs.

## Related Documents
- `docs/Requirements/component_requirements.md` – original textual brief per component.
- `img/svg_mockups/README.md` – quick index describing each SVG mockup.
- `docs/Requirements/requirements.md` – high-level functional and non-functional requirements.
