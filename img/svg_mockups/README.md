# Apple-like SVG Slide Mockups

This directory contains SVG mockups representing Apple-inspired slide designs for presentation templates.

## Overview

All mockups follow Apple's minimal design principles:
- **Canvas Size**: 1920×1080 (16:9)
- **Typography**: Inter / SF Pro Display with clean hierarchy
- **Color Palette**: Dark backgrounds (#000000, #121212) with accent colors (Aqua #0A84FF, Green #30D158, Orange #FF9F0A)
- **Design Principle**: Minimal elements, generous white space, focus on content

## Mockup Index

### Core Slide Types (001-020)

1. **apple_template_001_hero_title.svg** - Hero Title
   - Full-bleed title slide with centered hero text and subtitle
   - Used for: Opening slides, major section breaks

2. **apple_template_002_cpu_spec.svg** - CPU Specification
   - Two-column layout with specs and chip illustration
   - Used for: Technical specifications, product features

3. **apple_template_003_gpu_spec.svg** - GPU Specification
   - Mirrored layout of CPU slide
   - Used for: Technical specs, feature highlights

4. **apple_template_004_benchmark_bars.svg** - Performance Bars
   - Horizontal bar comparison with gradient highlighting
   - Used for: Performance comparisons, benchmarks

5. **apple_template_005_benchmark_cards.svg** - Performance Cards
   - Card-based performance comparison with progress bars
   - Used for: Comparisons, metrics visualization

6. **apple_template_006_product_highlights.svg** - Product Highlights
   - Central device with surrounding feature tiles
   - Used for: Product overviews, feature summaries

7. **apple_template_007_battery.svg** - Battery Duration
   - Oversized battery icon with duration text
   - Used for: Key metrics, standout features

8. **apple_template_008_pricing.svg** - Pricing Display
   - Vertical pricing stack with spotlight gradient
   - Used for: Pricing, product tiers

9. **apple_template_009_timeline.svg** - Timeline
   - Horizontal timeline with milestone nodes
   - Used for: Roadmaps, history, progress

10. **apple_template_010_split_table.svg** - Split Table
    - Two-column comparison table
    - Used for: Feature comparisons, pros/cons

11. **apple_template_011_pie_chart.svg** - Pie Chart
    - Minimal pie chart with colored segments
    - Used for: Data distribution, market share

12. **apple_template_012_bar_chart.svg** - Bar Chart Icon
    - Ascending bar chart icon
    - Used for: Growth indicators, trends

13. **apple_template_013_icon_trio.svg** - Icon Trio
    - Three outlined icons with baseline
    - Used for: Feature categories, service types

14. **apple_template_014_image_collage.svg** - Image Collage
    - Multi-frame image layout
    - Used for: Photo galleries, visual stories

15. **apple_template_015_hero_photo.svg** - Hero Photo
    - Full-bleed gradient photo background
    - Used for: Visual breaks, atmospheric slides

16. **apple_template_016_testimonial.svg** - Testimonial
    - Left-aligned quote with attribution
    - Used for: Testimonials, quotes, reviews

17. **apple_template_017_before_after.svg** - Before/After Split
    - Vertical split comparison
    - Used for: Transformations, comparisons

18. **apple_template_018_kpi_contrast.svg** - KPI Contrast
    - Two contrasting metrics side by side
    - Used for: Key metrics, performance indicators

19. **apple_template_019_feature_slots.svg** - Feature Slots
    - Grid of outlined boxes for icons
    - Used for: Feature overviews, categories

20. **apple_template_020_closing.svg** - Closing Slide
    - "Thank you" with platform indicators
    - Used for: Closing slides, thank you pages

### Extended Slide Types (021-032)

21. **apple_template_021_content_focus.svg** - Content Focus
22. **apple_template_022_feature_comparison.svg** - Feature Comparison
23. **apple_template_023_stat_highlight.svg** - Stat Highlight
24. **apple_template_024_process_flow.svg** - Process Flow
25. **apple_template_025_split_content.svg** - Split Content
26. **apple_template_026_card_layout.svg** - Card Layout
27. **apple_template_027_diagram.svg** - Diagram
28. **apple_template_028_quote.svg** - Quote
29. **apple_template_029_image_text.svg** - Image with Text
30. **apple_template_030_metric_dashboard.svg** - Metric Dashboard
31. **apple_template_031_section_divider.svg** - Section Divider
32. **apple_template_032_end_slide.svg** - End Slide

## Design Tokens

### Colors
- **Background**: `#000000` (black), `#121212` (dark gray)
- **Text**: `#FFFFFF` (white), `#A1A1AA` (gray), `#E5E5EA` (light gray)
- **Accent Blue**: `#0A84FF`
- **Accent Aqua**: `#0FD6FF`
- **Accent Green**: `#30D158`
- **Accent Orange**: `#FF9F0A`

### Typography
- **Font Family**: Inter, SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif
- **Font Weights**: 300 (light), 400 (regular), 600 (semibold), 700 (bold)
- **Font Sizes**: 
  - Hero: 96-160pt
  - Title: 64-72pt
  - Subtitle: 40-48pt
  - Body: 28-36pt
  - Caption: 20-24pt

### Spacing
- **Border Radius**: 20-48px
- **Margins**: 200-300px from edges
- **Element Spacing**: 40-80px between major elements

## Usage

These SVG mockups serve as:
1. **Design Reference**: Visual guide for implementing slides in Google Apps Script
2. **Documentation**: Clear specifications for each slide type
3. **Quality Check**: Comparison baseline for generated slides
4. **Communication**: Design intent sharing with stakeholders

## Generation

The mockups were generated using `generate_svg_mockups.py` script, which creates standardized Apple-inspired designs based on:
- Official Apple design guidelines
- Requirements documented in `docs/Requirements/svg_mockup_requirements.md`
- JPEG reference images in `Apple_like_template/` directory

## Related Files

- **Source Images**: `/Apple_like_template/*.jpeg` (32 reference images)
- **Requirements**: `/docs/Requirements/svg_mockup_requirements.md`
- **Generator Script**: `/generate_svg_mockups.py`
- **Main README**: `/README.md`

## Validation

Each SVG mockup is:
- ✓ Valid XML syntax
- ✓ 1920×1080 resolution
- ✓ Properly viewBox configured
- ✓ Web font compatible
- ✓ Accessible color contrast
- ✓ Minimal object count (≤4 major elements)

## Future Enhancements

- [ ] Add interactive hover states
- [ ] Include animation variants
- [ ] Light theme versions
- [ ] Localized text variants (English/Japanese)
- [ ] Responsive viewport variants

---

**Last Updated**: 2025-10-19  
**Version**: 1.0.0  
**Generator**: Python 3 SVG Generation Script
