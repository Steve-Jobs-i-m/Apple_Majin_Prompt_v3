# SVG Mockups Index

Each SVG in this directory visualises one of the 26 slide generation patterns supported by `slideGenerators` in the Apps Script project. File names follow the sequence used by the automation script:

| # | Pattern | SVG |
| - | ------- | --- |
| 01 | Title | `pattern_01_title.svg` |
| 02 | Section | `pattern_02_section.svg` |
| 03 | Closing | `pattern_03_closing.svg` |
| 04 | Content | `pattern_04_content.svg` |
| 05 | Agenda | `pattern_05_agenda.svg` |
| 06 | Compare | `pattern_06_compare.svg` |
| 07 | Process | `pattern_07_process.svg` |
| 08 | Process List | `pattern_08_processList.svg` |
| 09 | Timeline | `pattern_09_timeline.svg` |
| 10 | Diagram | `pattern_10_diagram.svg` |
| 11 | Cycle | `pattern_11_cycle.svg` |
| 12 | Cards | `pattern_12_cards.svg` |
| 13 | Header Cards | `pattern_13_headerCards.svg` |
| 14 | Table | `pattern_14_table.svg` |
| 15 | Progress | `pattern_15_progress.svg` |
| 16 | Quote | `pattern_16_quote.svg` |
| 17 | KPI | `pattern_17_kpi.svg` |
| 18 | Bullet Cards | `pattern_18_bulletCards.svg` |
| 19 | FAQ | `pattern_19_faq.svg` |
| 20 | Stats Compare | `pattern_20_statsCompare.svg` |
| 21 | Bar Compare | `pattern_21_barCompare.svg` |
| 22 | Triangle | `pattern_22_triangle.svg` |
| 23 | Pyramid | `pattern_23_pyramid.svg` |
| 24 | Flow Chart | `pattern_24_flowChart.svg` |
| 25 | Step Up | `pattern_25_stepUp.svg` |
| 26 | Image + Text | `pattern_26_imageText.svg` |

To regenerate the assets, run:

```bash
node scripts/generate_svg_mockups.cjs
```

The script pulls coordinates from `src/config.js`, applies a consistent Apple-inspired dark theme, and writes fresh SVGs into this folder.
