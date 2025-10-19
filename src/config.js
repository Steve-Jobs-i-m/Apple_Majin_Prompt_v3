// ========================================
// 1. マスターデザイン設定
// ========================================
const CONFIG = {
  BASE_PX: {
    W: 960,
    H: 540
  },
  BACKGROUND_IMAGES: {
    title: '',
    closing: '',
    section: '',
    main: ''
  },
  POS_PX: {
    titleSlide: {
      logo: {
        left: 55,
        top: 60,    // 105 → 60 に変更（45px上に移動）
        width: 135
      },
      title: {
        left: 50,
        top: 200,
        width: 830,
        height: 90
      },
      date: {
        left: 50,
        top: 450,
        width: 250,
        height: 40
      }
    },
    contentSlide: {
      headerLogo: {
        right: 30,         // 20→30: More margin from edge
        top: 30,           // 20→30: More vertical space
        width: 75
      },
      title: {
        left: 60,          // 25→60: Larger left margin
        top: 40,           // 20→40: More top space
        width: 780,        // 830→780: Narrower for breathing room
        height: 80         // 65→80: Taller title area
      },
      titleUnderline: {
        left: 60,          // 25→60: Align with title
        top: 120,          // 80→120: More space below title
        width: 200,        // 260→200: Shorter underline (subtle)
        height: 3          // 4→3: Thinner line (minimal)
      },
      subhead: {
        left: 60,          // 25→60: Align with title
        top: 140,          // 90→140: More space
        width: 840,        // 910→840: Narrower
        height: 50         // 40→50: Taller for breathing room
      },
      body: {
        left: 60,          // 25→60: Larger left margin
        top: 200,          // 132→200: Significantly more top space
        width: 840,        // 910→840: Narrower content area
        height: 280        // 330→280: Less tall (implies less content)
      },
      twoColLeft: {
        left: 60,          // 25→60: Larger margin
        top: 200,          // 132→200: More top space
        width: 380,        // 440→380: Narrower columns
        height: 280        // 330→280: Less tall
      },
      twoColRight: {
        left: 520,         // 495→520: More gap between columns
        top: 200,          // 132→200: More top space
        width: 380,        // 440→380: Narrower columns
        height: 280        // 330→280: Less tall
      }
    },
    compareSlide: {
      headerLogo: {
        right: 30,         // 20→30: More margin
        top: 30,           // 20→30: More space
        width: 75
      },
      title: {
        left: 60,          // 25→60: Larger left margin
        top: 40,           // 20→40: More top space
        width: 780,        // 830→780: Narrower
        height: 80         // 65→80: Taller
      },
      titleUnderline: {
        left: 60,          // 25→60: Align with title
        top: 120,          // 80→120: More space
        width: 200,        // 260→200: Shorter underline
        height: 3          // 4→3: Thinner line
      },
      subhead: {
        left: 60,          // 25→60: Align with title
        top: 140,          // 90→140: More space
        width: 840,        // 910→840: Narrower
        height: 50         // 40→50: Taller
      },
      leftBox: {
        left: 60,          // 25→60: Larger margin
        top: 200,          // 112→200: More top space
        width: 380,        // 445→380: Narrower for breathing room
        height: 280        // 350→280: Less tall
      },
      rightBox: {
        left: 520,         // 490→520: More gap between boxes
        top: 200,          // 112→200: More top space
        width: 380,        // 445→380: Narrower
        height: 280        // 350→280: Less tall
      }
    },
    processSlide: {
      headerLogo: {
        right: 115,        // [v3.3.0] 20→115: 12% horizontal margin
        top: 81,           // [v3.3.0] 20→81: 15% vertical margin
        width: 75
      },
      title: {
        left: 115,         // [v3.3.0] 25→115: 12% margin
        top: 81,           // [v3.3.0] 20→81: 15% margin
        width: 730,        // [v3.3.0] 910→730: Account for doubled margins
        height: 80
      },
      titleUnderline: {
        left: 115,         // [v3.3.0] 25→115: Align with title
        top: 161,          // [v3.3.0] 80→161: More space below title
        width: 180,        // [v3.3.0] 260→180: Shorter underline
        height: 3
      },
      subhead: {
        left: 115,         // [v3.3.0] 25→115: Align with title
        top: 181,          // [v3.3.0] 90→181: More space
        width: 730,        // [v3.3.0] 910→730: Narrower
        height: 50
      },
      area: {
        left: 115,         // [v3.3.0] 25→115: Larger margin
        top: 250,          // [v3.3.0] 132→250: Significantly more top space
        width: 730,        // [v3.3.0] 910→730: Narrower content area
        height: 209        // [v3.3.0] 330→209: Less tall (540-81-250-81 bottom margin)
      }
    },
    timelineSlide: {
      headerLogo: {
        right: 115,        // [v3.3.0] 20→115: 12% margin
        top: 81,           // [v3.3.0] 20→81: 15% margin
        width: 75
      },
      title: {
        left: 115,         // [v3.3.0] 25→115: 12% margin
        top: 81,           // [v3.3.0] 20→81: 15% margin
        width: 730,        // [v3.3.0] 830→730
        height: 80
      },
      titleUnderline: {
        left: 115,         // [v3.3.0] 25→115
        top: 161,          // [v3.3.0] 80→161
        width: 180,        // [v3.3.0] 260→180
        height: 3
      },
      subhead: {
        left: 115,         // [v3.3.0] 25→115
        top: 181,          // [v3.3.0] 90→181
        width: 730,        // [v3.3.0] 910→730
        height: 50
      },
      area: {
        left: 115,         // [v3.3.0] 25→115
        top: 250,          // [v3.3.0] 132→250
        width: 730,        // [v3.3.0] 910→730
        height: 209        // [v3.3.0] 330→209
      }
    },
    diagramSlide: {
      headerLogo: {
        right: 115,        // [v3.3.0] 20→115
        top: 81,           // [v3.3.0] 20→81
        width: 75
      },
      title: {
        left: 115,         // [v3.3.0] 25→115
        top: 81,           // [v3.3.0] 20→81
        width: 730,        // [v3.3.0] 830→730
        height: 80
      },
      titleUnderline: {
        left: 115,         // [v3.3.0] 25→115
        top: 161,          // [v3.3.0] 80→161
        width: 180,        // [v3.3.0] 260→180
        height: 3
      },
      subhead: {
        left: 115,         // [v3.3.0] 25→115
        top: 181,          // [v3.3.0] 90→181
        width: 730,        // [v3.3.0] 910→730
        height: 50
      },
      lanesArea: {
        left: 115,         // [v3.3.0] 25→115
        top: 250,          // [v3.3.0] 132→250
        width: 730,        // [v3.3.0] 910→730
        height: 209        // [v3.3.0] 330→209
      }
    },
    cardsSlide: {
      headerLogo: {
        right: 30,
        top: 30,
        width: 75
      },
      title: {
        left: 60,
        top: 40,
        width: 780,
        height: 80
      },
      titleUnderline: {
        left: 60,
        top: 120,
        width: 200,
        height: 3
      },
      subhead: {
        left: 60,
        top: 140,
        width: 840,
        height: 50
      },
      gridArea: {
        left: 60,          // 25→60: Larger margin
        top: 200,          // 120→200: More top space
        width: 840,        // 910→840: Narrower grid
        height: 280        // 340→280: Less tall (fewer items)
      }
    },
    tableSlide: {
      headerLogo: {
        right: 115,        // [v3.3.0] 20→115
        top: 81,           // [v3.3.0] 20→81
        width: 75
      },
      title: {
        left: 115,         // [v3.3.0] 25→115
        top: 81,           // [v3.3.0] 20→81
        width: 730,        // [v3.3.0] 830→730
        height: 80
      },
      titleUnderline: {
        left: 115,         // [v3.3.0] 25→115
        top: 161,          // [v3.3.0] 80→161
        width: 180,        // [v3.3.0] 260→180
        height: 3
      },
      subhead: {
        left: 115,         // [v3.3.0] 25→115
        top: 181,          // [v3.3.0] 90→181
        width: 730,        // [v3.3.0] 910→730
        height: 50
      },
      area: {
        left: 115,         // [v3.3.0] 25→115
        top: 250,          // [v3.3.0] 130→250
        width: 730,        // [v3.3.0] 910→730
        height: 209        // [v3.3.0] 330→209
      }
    },
    progressSlide: {
      headerLogo: {
        right: 115,        // [v3.3.0] 20→115
        top: 81,           // [v3.3.0] 20→81
        width: 75
      },
      title: {
        left: 115,         // [v3.3.0] 25→115
        top: 81,           // [v3.3.0] 20→81
        width: 730,        // [v3.3.0] 830→730
        height: 80
      },
      titleUnderline: {
        left: 115,         // [v3.3.0] 25→115
        top: 161,          // [v3.3.0] 80→161
        width: 180,        // [v3.3.0] 260→180
        height: 3
      },
      subhead: {
        left: 115,         // [v3.3.0] 25→115
        top: 181,          // [v3.3.0] 90→181
        width: 730,        // [v3.3.0] 910→730
        height: 50
      },
      area: {
        left: 115,         // [v3.3.0] 25→115
        top: 250,          // [v3.3.0] 132→250
        width: 730,        // [v3.3.0] 910→730
        height: 209        // [v3.3.0] 330→209
      }
    },
    quoteSlide: {
      headerLogo: {
        right: 115,        // [v3.3.0] 20→115
        top: 81,           // [v3.3.0] 20→81
        width: 75
      },
      title: {
        left: 115,         // [v3.3.0] 25→115
        top: 81,           // [v3.3.0] 20→81
        width: 730,        // [v3.3.0] 830→730
        height: 80
      },
      titleUnderline: {
        left: 115,         // [v3.3.0] 25→115
        top: 161,          // [v3.3.0] 88→161
        width: 180,        // [v3.3.0] 260→180
        height: 3
      },
      subhead: {
        left: 115,         // [v3.3.0] 25→115
        top: 181,          // [v3.3.0] 100→181
        width: 730,        // [v3.3.0] 910→730
        height: 50
      },
      quoteBar: {
        width: 3,          // [v3.3.0] 4→3: Thinner vertical bar
        leftOffset: 32      // Distance between bar and text
      }
    },
    kpiSlide: {
      headerLogo: {
        right: 115,        // [v3.3.0] 20→115
        top: 81,           // [v3.3.0] 20→81
        width: 75
      },
      title: {
        left: 115,         // [v3.3.0] 25→115
        top: 81,           // [v3.3.0] 20→81
        width: 730,        // [v3.3.0] 830→730
        height: 80
      },
      titleUnderline: {
        left: 115,         // [v3.3.0] 25→115
        top: 161,          // [v3.3.0] 80→161
        width: 180,        // [v3.3.0] 260→180
        height: 3
      },
      subhead: {
        left: 115,         // [v3.3.0] 25→115
        top: 181,          // [v3.3.0] 90→181
        width: 730,        // [v3.3.0] 910→730
        height: 50
      },
      gridArea: {
        left: 115,         // [v3.3.0] 25→115
        top: 250,          // [v3.3.0] 132→250
        width: 730,        // [v3.3.0] 910→730
        height: 209        // [v3.3.0] 330→209
      }
    },
    triangleSlide: {
      headerLogo: {
        right: 115,        // [v3.3.0] 20→115
        top: 81,           // [v3.3.0] 20→81
        width: 75
      },
      title: {
        left: 115,         // [v3.3.0] 25→115
        top: 81,           // [v3.3.0] 20→81
        width: 730,        // [v3.3.0] 830→730
        height: 80
      },
      titleUnderline: {
        left: 115,         // [v3.3.0] 25→115
        top: 161,          // [v3.3.0] 80→161
        width: 180,        // [v3.3.0] 260→180
        height: 3
      },
      subhead: {
        left: 115,         // [v3.3.0] 25→115
        top: 181,          // [v3.3.0] 90→181
        width: 730,        // [v3.3.0] 910→730
        height: 50
      },
      area: {
        left: 115,         // [v3.3.0] 25→115
        top: 250,          // [v3.3.0] 110→250
        width: 730,        // [v3.3.0] 910→730
        height: 209        // [v3.3.0] 350→209
      }
    },
    flowChartSlide: {
      headerLogo: {
        right: 115,        // [v3.3.0] 20→115
        top: 81,           // [v3.3.0] 20→81
        width: 75
      },
      title: {
        left: 115,         // [v3.3.0] 25→115
        top: 81,           // [v3.3.0] 20→81
        width: 730,        // [v3.3.0] 830→730
        height: 80
      },
      titleUnderline: {
        left: 115,         // [v3.3.0] 25→115
        top: 161,          // [v3.3.0] 80→161
        width: 180,        // [v3.3.0] 260→180
        height: 3
      },
      subhead: {
        left: 115,         // [v3.3.0] 25→115
        top: 181,          // [v3.3.0] 90→181
        width: 730,        // [v3.3.0] 910→730
        height: 50
      },
      singleRow: {
        left: 115,         // [v3.3.0] 25→115
        top: 270,          // [v3.3.0] 160→270
        width: 730,        // [v3.3.0] 910→730
        height: 189        // [v3.3.0] 180→189
      },
      upperRow: {
        left: 115,         // [v3.3.0] 25→115
        top: 250,          // [v3.3.0] 150→250
        width: 730,        // [v3.3.0] 910→730
        height: 100        // [v3.3.0] 120→100
      },
      lowerRow: {
        left: 115,         // [v3.3.0] 25→115
        top: 359,          // [v3.3.0] 290→359
        width: 730,        // [v3.3.0] 910→730
        height: 100        // [v3.3.0] 120→100
      }
    },
    stepUpSlide: {
      headerLogo: {
        right: 115,        // [v3.3.0] 20→115
        top: 81,           // [v3.3.0] 20→81
        width: 75
      },
      title: {
        left: 115,         // [v3.3.0] 25→115
        top: 81,           // [v3.3.0] 20→81
        width: 730,        // [v3.3.0] 830→730
        height: 80
      },
      titleUnderline: {
        left: 115,         // [v3.3.0] 25→115
        top: 161,          // [v3.3.0] 80→161
        width: 180,        // [v3.3.0] 260→180
        height: 3
      },
      subhead: {
        left: 115,         // [v3.3.0] 25→115
        top: 181,          // [v3.3.0] 90→181
        width: 730,        // [v3.3.0] 910→730
        height: 50
      },
      stepArea: {
        left: 115,         // [v3.3.0] 25→115
        top: 250,          // [v3.3.0] 130→250
        width: 730,        // [v3.3.0] 910→730
        height: 209        // [v3.3.0] 330→209
      }
    },
    imageTextSlide: {
      headerLogo: {
        right: 115,        // [v3.3.0] 20→115
        top: 81,           // [v3.3.0] 20→81
        width: 75
      },
      title: {
        left: 115,         // [v3.3.0] 25→115
        top: 81,           // [v3.3.0] 20→81
        width: 730,        // [v3.3.0] 830→730
        height: 80
      },
      titleUnderline: {
        left: 115,         // [v3.3.0] 25→115
        top: 161,          // [v3.3.0] 80→161
        width: 180,        // [v3.3.0] 260→180
        height: 3
      },
      subhead: {
        left: 115,         // [v3.3.0] 25→115
        top: 181,          // [v3.3.0] 90→181
        width: 730,        // [v3.3.0] 910→730
        height: 50
      },
      leftImage: {
        left: 115,         // [v3.3.0] 25→115
        top: 250,          // [v3.3.0] 150→250
        width: 330,        // [v3.3.0] 440→330
        height: 179        // [v3.3.0] 270→179: Adjusted for margins
      },
      leftImageCaption: {
        left: 115,         // [v3.3.0] 25→115
        top: 439,          // [v3.3.0] 430→439
        width: 330,        // [v3.3.0] 440→330
        height: 30
      },
      rightText: {
        left: 465,         // [v3.3.0] 485→465
        top: 250,          // [v3.3.0] 150→250
        width: 380,        // [v3.3.0] 450→380
        height: 209        // [v3.3.0] 310→209
      },
      leftText: {
        left: 115,         // [v3.3.0] 25→115
        top: 250,          // [v3.3.0] 150→250
        width: 380,        // [v3.3.0] 450→380
        height: 209        // [v3.3.0] 310→209
      },
      rightImage: {
        left: 515,         // [v3.3.0] 495→515
        top: 250,          // [v3.3.0] 150→250
        width: 330,        // [v3.3.0] 440→330
        height: 179        // [v3.3.0] 270→179
      },
      rightImageCaption: {
        left: 515,         // [v3.3.0] 495→515
        top: 439,          // [v3.3.0] 430→439
        width: 330,        // [v3.3.0] 440→330
        height: 30
      }
    },
      pyramidSlide: {
        headerLogo: {
          right: 115,        // [v3.3.0] 20→115
          top: 81,           // [v3.3.0] 20→81
          width: 75
        },
        title: {
          left: 115,         // [v3.3.0] 25→115
          top: 81,           // [v3.3.0] 20→81
          width: 730,        // [v3.3.0] 830→730
          height: 80
        },
        titleUnderline: {
          left: 115,         // [v3.3.0] 25→115
          top: 161,          // [v3.3.0] 88→161
          width: 180,        // [v3.3.0] 260→180
          height: 3
        },
        subhead: {
          left: 115,         // [v3.3.0] 25→115
          top: 181,          // [v3.3.0] 100→181
          width: 730,        // [v3.3.0] 910→730
          height: 50
        },
        pyramidArea: {
          left: 115,         // [v3.3.0] 25→115
          top: 250,          // [v3.3.0] 120→250
          width: 730,        // [v3.3.0] 910→730
          height: 209        // [v3.3.0] 360→209
        }
      },
    sectionSlide: {
      title: {
        left: 55,
        top: 230,
        width: 840,
        height: 80
      },
      ghostNum: {
        left: 35,
        top: 120,
        width: 400,
        height: 200
      }
    },
    footer: {
      leftText: {
        left: 15,
        top: 505,
        width: 250,
        height: 20
      },
      rightPage: {
        right: 15,
        top: 505,
        width: 50,
        height: 20
      }
    },
    bottomBar: {
      left: 0,
      top: 534,
      width: 960,
      height: 6
    }
  },
  FONTS: {
    family: 'Inter, SF Pro Display, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Noto Sans JP, Helvetica Neue, Arial, sans-serif',
    sizes: {
      // Adjusted Typography Scale: Practical sizes for readable slides
      title: 44,           // Title slide title (readable but impactful)
      date: 14,            // Date text (subtle)
      sectionTitle: 36,    // Section title (clear hierarchy)
      contentTitle: 28,    // Content title (balanced)
      subhead: 16,         // Subhead (clear but not overwhelming)
      body: 18,            // Body text (comfortable reading)
      footer: 11,          // Footer (minimal)
      chip: 13,            // Chip labels
      laneTitle: 16,       // Lane titles
      small: 12,           // Small text
      processStep: 16,     // Process steps
      axis: 14,            // Axis labels
      ghostNum: 200        // Ghost numbers (massive impact) - unchanged
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  COLORS: {
    primary_color: '#4285F4',
    text_primary: '#333333',
    background_white: '#FFFFFF',
    card_bg: '#f6e9f0',
    background_gray: '',
    faint_gray: '',
    ghost_gray: '',
    table_header_bg: '',
    lane_border: '',
    card_border: '',
    neutral_gray: '',
    process_arrow: ''
  },
  DIAGRAM: {
    laneGap_px: 24,
    lanePad_px: 10,
    laneTitle_h_px: 30,
    cardGap_px: 12,
    cardMin_h_px: 48,
    cardMax_h_px: 70,
    arrow_h_px: 10,
    arrowGap_px: 8
  },
  LOGOS: {
    header: '',
    closing: ''
  },
  FOOTER_TEXT: `© ${new Date().getFullYear()} Your Company`,
  
  // ========================================
  // Apple Design Tokens v3.3.0 - Minimal Design System
  // ========================================
  APPLE_TOKENS: {
    // Version
    version: '3.3.0',
    
    // Typography Scale (Adjusted for practical use)
    // Based on readable sizes that fit within slide bounds
    typography: {
      hero: 44,           // Hero/Large Title - impactful but readable
      title: 36,          // Main titles - clear hierarchy
      subtitle: 18,       // Subtitles/body - comfortable reading
      caption: 14,        // Captions/labels - readable size
      
      // Legacy mapping (for backwards compatibility)
      largeTitle: 44,     
      title1: 36,         
      title2: 28,         
      title3: 18,         // Aligned to subtitle
      headline: 16,       // Aligned to subhead
      body: 18,           // Standard body text
      callout: 16,        // Call-out text
      subhead: 16,        // Subhead text
      footnote: 12,       
      caption1: 14,       
      caption2: 11        
    },
    
    // Spacing Scale (8pt grid system) - DOUBLED for breathing room
    spacing: {
      xs: 8,     // 4→8px: Minimal spacing
      sm: 16,    // 8→16px: Tight spacing
      md: 32,    // 16→32px: Standard spacing (DOUBLED)
      lg: 48,    // 24→48px: Generous spacing (DOUBLED)
      xl: 64,    // 32→64px: Section spacing (DOUBLED)
      xxl: 96,   // 48→96px: Major section breaks (DOUBLED)
      xxxl: 128  // 64→128px: Hero spacing (DOUBLED)
    },
    
    // Safe Margins (v3.3.0 - DOUBLED for minimalism)
    // Canvas: 1920×1080 → Horizontal: 230px (12%), Vertical: 162px (15%)
    safeMargins: {
      horizontal: 0.12,  // 6%→12%: Left/right breathing room (DOUBLED)
      vertical: 0.15,    // 7.5%→15%: Top/bottom breathing room (DOUBLED)
      
      // Absolute pixel values (at 960×540 base)
      horizontalPx: 115, // 12% of 960 = 115.2px
      verticalPx: 81     // 15% of 540 = 81px
    },
    
    // Border Radius
    cornerRadius: {
      small: 8,
      medium: 12,
      large: 20,
      xlarge: 24
    },
    
    // Elevation (shadows)
    shadows: {
      none: { blur: 0, offsetX: 0, offsetY: 0, alpha: 0 },
      small: { blur: 4, offsetX: 0, offsetY: 2, alpha: 0.1 },
      medium: { blur: 8, offsetX: 0, offsetY: 4, alpha: 0.12 },
      large: { blur: 16, offsetX: 0, offsetY: 8, alpha: 0.15 }
    },
    
    // Line Heights
    lineHeights: {
      tight: 1.1,
      normal: 1.2,
      relaxed: 1.5,
      loose: 1.8
    },
    
    // Letter Spacing (tracking)
    letterSpacing: {
      tight: -0.5,
      normal: 0,
      wide: 0.5,
      wider: 1.0
    },
    
    // Color Semantics (Light Mode)
    colors: {
      light: {
        background: '#FFFFFF',
        backgroundSecondary: '#F5F5F7',
        backgroundTertiary: '#E8E8ED',
        text: '#1D1D1F',
        textSecondary: '#86868B',
        textTertiary: '#AEAEB2',
        accent: '#0A84FF',
        accentHover: '#0070E0',
        border: '#D2D2D7',
        separator: '#E5E5EA'
      },
      dark: {
        background: '#000000',
        backgroundSecondary: '#1C1C1E',
        backgroundTertiary: '#2C2C2E',
        text: '#FFFFFF',
        textSecondary: '#98989D',
        textTertiary: '#636366',
        accent: '#0A84FF',
        accentHover: '#409CFF',
        border: '#38383A',
        separator: '#48484A'
      }
    },
    
    // Animation Timing (for future use)
    timing: {
      fast: 200,
      normal: 300,
      slow: 500
    },
    
    // Content Limits - v3.3.0 STRICT enforcement for minimalism
    limits: {
      maxObjectsPerSlide: 4,        // [v3.3.0] Hard limit: 1-4 objects maximum
      maxObjectsPerSlideStrict: 3,  // [v3.3.0] Recommended: 3 objects for pure minimalism
      maxTextLength: 100,           // [v3.3.0] 150→100: Even shorter, punchier text
      maxBulletPoints: 3,           // [v3.3.0] 6→3: Fewer bullets, more impact
      maxLinesInCard: 2,            // [v3.3.0] Maximum text lines per card (reduced)
      maxCharsPerLine: 35,          // [v3.3.0] Characters per line for readability
      autoSplitThreshold: 120       // [v3.3.0] Auto-split slides when text exceeds this
    },
    
    // Minimal Design Rules v3.3.0
    minimalRules: {
      titleSlideObjectLimit: 1,     // [v3.3.0] Title slides: ONLY 1 text object
      heroSlideObjectLimit: 1,      // [v3.3.0] Hero slides: ONLY 1 object (image or text)
      contentSlideObjectLimit: 3,   // [v3.3.0] Content slides: Maximum 3 objects
      cardLayoutMaxItems: 3,        // [v3.3.0] Card layouts: Maximum 3 cards
      processStepsMax: 3,           // [v3.3.0] Process slides: Maximum 3 steps
      timelineItemsMax: 4,          // [v3.3.0] Timeline: Maximum 4 milestones
      comparisonItemsMax: 2,        // [v3.3.0] Comparison: Maximum 2 items per side
      enforceStrictMode: true,      // [v3.3.0] Enable strict object counting
      
      // Ultra Minimal Mode Settings
      hideContentTitles: false,     // Hide titles in content slides
      hideLogoInContent: false,     // Hide header logos in content slides
      hideTitleUnderline: true,     // [v3.3.0] Hide decorative underlines (minimal)
      ultraMinimalMode: false,      // MASTER SWITCH: Hide ALL titles, logos, underlines
      
      // Fine-grained control per slide type
      hideTitleInQuote: true,       // Quotes don't need titles (quote is the focus)
      hideTitleInKpi: true,         // KPIs speak for themselves (numbers are the focus)
      hideTitleInHero: true,        // Hero slides are visual (image/text is the focus)
      hideTitleInStats: true        // Stats slides focus on data comparison
    },
    
    // Color Usage Restrictions (v3.3.0 - Apple's 3-color rule)
    colorRestrictions: {
      maxColorsPerSlide: 3,         // [v3.3.0] Use only 3 colors per slide
      primaryColorUsage: 'text',    // Black for text
      secondaryColorUsage: 'subtle',// Gray for supporting elements
      accentColorUsage: 'highlight' // One accent color for emphasis only
    },
    
    // Typography Enhancement (Adjusted)
    typographyEnhancement: {
      preferBoldOverSize: false,    // Use size hierarchy, not bold
      minHeadingSize: 24,           // Minimum size for any heading (practical)
      maxTextLinesBeforeSplit: 6,   // Split slide if text exceeds 6 lines
      lineHeightMultiplier: 1.2,    // Consistent line height
      letterSpacingTight: -0.5,     // For large titles (44pt, 36pt)
      letterSpacingNormal: 0,       // For body text (18pt)
      letterSpacingWide: 0.5        // For small caps/labels (14pt)
    },
    
    // White Space Ratios v3.3.0 (Content vs Empty Space)
    whiteSpaceRatios: {
      titleSlide: 0.85,             // [v3.3.0] 85% empty space on title slides
      heroSlide: 0.70,              // [v3.3.0] 70% empty space on hero slides
      contentSlide: 0.50,           // [v3.3.0] 50% empty space on content slides
      minimumEmptySpace: 0.40       // [v3.3.0] Always maintain 40% empty space
    },
    
    // Object Count Distribution (from SVG mockups)
    objectDistribution: {
      oneObject: ['title', 'pie', 'hero_image'],
      twoObjects: ['kpi', 'quote', 'before_after', 'stats', 'section', 'closing'],
      threeObjects: ['cards', 'process', 'diagrams', 'content', 'comparison'],
      fourObjects: ['bar_compare', 'timeline', 'agenda']
    }
  }
};

