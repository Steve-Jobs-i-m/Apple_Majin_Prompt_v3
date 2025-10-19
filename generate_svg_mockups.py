#!/usr/bin/env python3
"""
SVG Mockup Generator for Apple-like Slide Templates
Generates SVG mockups based on Apple design principles.
"""

import os
import math

# Design tokens based on Apple style guide
CANVAS_WIDTH = 1920
CANVAS_HEIGHT = 1080
BG_COLOR = "#000000"
BG_DARK_ALT = "#121212"
TEXT_WHITE = "#FFFFFF"
TEXT_GRAY = "#A1A1AA"
TEXT_GRAY_LIGHT = "#E5E5EA"
ACCENT_BLUE = "#0A84FF"
ACCENT_AQUA = "#0FD6FF"
ACCENT_GREEN = "#30D158"
ACCENT_ORANGE = "#FF9F0A"
BORDER_RADIUS = 24
SPACING = 80

# Slide type mappings based on pattern analysis
SLIDE_TYPES = {
    1: "hero_title",
    2: "cpu_spec",
    3: "gpu_spec",
    4: "benchmark_bars",
    5: "benchmark_cards",
    6: "product_highlights",
    7: "battery",
    8: "pricing",
    9: "timeline",
    10: "split_table",
    11: "pie_chart",
    12: "bar_chart",
    13: "icon_trio",
    14: "image_collage",
    15: "hero_photo",
    16: "testimonial",
    17: "before_after",
    18: "kpi_contrast",
    19: "feature_slots",
    20: "closing",
    21: "content_focus",
    22: "feature_comparison",
    23: "stat_highlight",
    24: "process_flow",
    25: "split_content",
    26: "card_layout",
    27: "diagram",
    28: "quote",
    29: "image_text",
    30: "metric_dashboard",
    31: "section_divider",
    32: "end_slide",
}

def create_svg_header():
    """Create SVG header with proper namespace and viewBox."""
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{CANVAS_WIDTH}" height="{CANVAS_HEIGHT}" viewBox="0 0 {CANVAS_WIDTH} {CANVAS_HEIGHT}" 
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&amp;display=swap');
      text {{
        font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
        fill: {TEXT_WHITE};
      }}
    </style>
  </defs>
  <rect width="{CANVAS_WIDTH}" height="{CANVAS_HEIGHT}" fill="{BG_COLOR}"/>
'''

def create_svg_footer():
    """Create SVG footer."""
    return '</svg>\n'

def create_hero_title():
    """Generate hero title slide (001)."""
    svg = create_svg_header()
    svg += f'''
  <text x="{CANVAS_WIDTH/2}" y="{CANVAS_HEIGHT/2 - 100}" 
        text-anchor="middle" font-size="160" font-weight="600">
    Think Different
  </text>
  <text x="{CANVAS_WIDTH/2}" y="{CANVAS_HEIGHT/2 + 80}" 
        text-anchor="middle" font-size="64" font-weight="400" fill="{TEXT_GRAY}">
    Innovation that matters
  </text>
'''
    svg += create_svg_footer()
    return svg

def create_cpu_spec():
    """Generate CPU spec slide (002)."""
    svg = create_svg_header()
    svg += f'''
  <g transform="translate(200, {CANVAS_HEIGHT/2 - 200})">
    <text font-size="72" font-weight="600">M4 Chip</text>
    <rect x="0" y="100" width="300" height="4" fill="{ACCENT_AQUA}"/>
    <text y="180" font-size="32" font-weight="400" fill="{TEXT_GRAY}">
      <tspan x="0" dy="0">• 10-core CPU</tspan>
      <tspan x="0" dy="50">• 4 performance cores</tspan>
      <tspan x="0" dy="50">• 6 efficiency cores</tspan>
    </text>
  </g>
  <g transform="translate({CANVAS_WIDTH - 500}, {CANVAS_HEIGHT/2 - 250})">
    <rect x="0" y="0" width="400" height="400" rx="48" fill="{BG_DARK_ALT}" stroke="{ACCENT_AQUA}" stroke-width="2"/>
    <rect x="80" y="80" width="240" height="240" rx="32" fill="{ACCENT_AQUA}" opacity="0.2"/>
    <text x="200" y="220" text-anchor="middle" font-size="96" font-weight="700">M4</text>
  </g>
'''
    svg += create_svg_footer()
    return svg

def create_gpu_spec():
    """Generate GPU spec slide (003)."""
    svg = create_svg_header()
    svg += f'''
  <g transform="translate(200, {CANVAS_HEIGHT/2 - 250})">
    <rect x="0" y="0" width="400" height="400" rx="48" fill="{BG_DARK_ALT}" stroke="{ACCENT_AQUA}" stroke-width="2"/>
    <rect x="80" y="80" width="240" height="240" rx="32" fill="{ACCENT_AQUA}" opacity="0.2"/>
    <text x="200" y="220" text-anchor="middle" font-size="72" font-weight="700">GPU</text>
  </g>
  <g transform="translate({CANVAS_WIDTH - 800}, {CANVAS_HEIGHT/2 - 200})">
    <text font-size="72" font-weight="600">10-core GPU</text>
    <rect x="0" y="100" width="300" height="4" fill="{ACCENT_AQUA}"/>
    <text y="180" font-size="32" font-weight="400" fill="{TEXT_GRAY}">
      <tspan x="0" dy="0">• Dynamic caching</tspan>
      <tspan x="0" dy="50">• Hardware ray tracing</tspan>
      <tspan x="0" dy="50">• Mesh shading</tspan>
    </text>
  </g>
'''
    svg += create_svg_footer()
    return svg

def create_benchmark_bars():
    """Generate benchmark bars slide (004)."""
    svg = create_svg_header()
    svg += f'''
  <text x="{CANVAS_WIDTH/2}" y="200" text-anchor="middle" font-size="64" font-weight="600">
    Performance Comparison
  </text>
  <g transform="translate(400, 400)">
    <rect x="0" y="0" width="1000" height="100" rx="{BORDER_RADIUS}" fill="{ACCENT_AQUA}" opacity="0.9"/>
    <text x="40" y="60" font-size="48" font-weight="600">M4</text>
    <text x="920" y="60" text-anchor="end" font-size="48" font-weight="600">2.0×</text>
  </g>
  <g transform="translate(400, 530)">
    <rect x="0" y="0" width="700" height="100" rx="{BORDER_RADIUS}" fill="{TEXT_GRAY}" opacity="0.3"/>
    <text x="40" y="60" font-size="48" font-weight="600" fill="{TEXT_GRAY}">M3</text>
    <text x="620" y="60" text-anchor="end" font-size="48" font-weight="600" fill="{TEXT_GRAY}">1.4×</text>
  </g>
  <g transform="translate(400, 660)">
    <rect x="0" y="0" width="500" height="100" rx="{BORDER_RADIUS}" fill="{TEXT_GRAY}" opacity="0.2"/>
    <text x="40" y="60" font-size="48" font-weight="600" fill="{TEXT_GRAY}">M1</text>
    <text x="420" y="60" text-anchor="end" font-size="48" font-weight="600" fill="{TEXT_GRAY}">1.0×</text>
  </g>
'''
    svg += create_svg_footer()
    return svg

def create_benchmark_cards():
    """Generate benchmark cards slide (005)."""
    svg = create_svg_header()
    svg += f'''
  <text x="{CANVAS_WIDTH/2}" y="200" text-anchor="middle" font-size="64" font-weight="600">
    Performance Comparison
  </text>
  <g transform="translate(400, 350)">
    <rect x="0" y="0" width="1100" height="140" rx="{BORDER_RADIUS}" fill="{BG_DARK_ALT}" stroke="{ACCENT_AQUA}" stroke-width="2"/>
    <rect x="20" y="95" width="800" height="20" rx="10" fill="{ACCENT_AQUA}"/>
    <text x="40" y="60" font-size="42" font-weight="600">M4</text>
    <text x="1000" y="60" text-anchor="end" font-size="42" font-weight="600">2.0× faster</text>
  </g>
  <g transform="translate(400, 520)">
    <rect x="0" y="0" width="1100" height="140" rx="{BORDER_RADIUS}" fill="{BG_DARK_ALT}" stroke="{TEXT_GRAY}" stroke-width="1"/>
    <rect x="20" y="95" width="560" height="20" rx="10" fill="{TEXT_GRAY}" opacity="0.5"/>
    <text x="40" y="60" font-size="42" font-weight="600" fill="{TEXT_GRAY}">M3</text>
    <text x="1000" y="60" text-anchor="end" font-size="42" font-weight="600" fill="{TEXT_GRAY}">1.4× faster</text>
  </g>
  <g transform="translate(400, 690)">
    <rect x="0" y="0" width="1100" height="140" rx="{BORDER_RADIUS}" fill="{BG_DARK_ALT}" stroke="{TEXT_GRAY}" stroke-width="1"/>
    <rect x="20" y="95" width="400" height="20" rx="10" fill="{TEXT_GRAY}" opacity="0.3"/>
    <text x="40" y="60" font-size="42" font-weight="600" fill="{TEXT_GRAY}">M1</text>
    <text x="1000" y="60" text-anchor="end" font-size="42" font-weight="600" fill="{TEXT_GRAY}">1.0× baseline</text>
  </g>
'''
    svg += create_svg_footer()
    return svg

def create_product_highlights():
    """Generate product highlights mosaic (006)."""
    svg = create_svg_header()
    # Central device mockup
    svg += f'''
  <rect x="{CANVAS_WIDTH/2 - 200}" y="{CANVAS_HEIGHT/2 - 300}" width="400" height="600" 
        rx="40" fill="{BG_DARK_ALT}" stroke="{TEXT_GRAY}" stroke-width="2"/>
'''
    # Six spec tiles around the device
    tiles = [
        (200, 150, "Retina Display", "True Tone"),
        (200, 480, "Touch ID", "Fast and Secure"),
        (200, 810, "All-day Battery", "Up to 24 hours"),
        (CANVAS_WIDTH - 500, 150, "5G Ready", "Ultra-fast"),
        (CANVAS_WIDTH - 500, 480, "Camera", "12MP Wide"),
        (CANVAS_WIDTH - 500, 810, "Storage", "Up to 2TB"),
    ]
    for x, y, title, subtitle in tiles:
        svg += f'''
  <g transform="translate({x}, {y})">
    <rect width="280" height="140" rx="20" fill="{BG_DARK_ALT}" stroke="{TEXT_GRAY}" stroke-width="1"/>
    <text x="140" y="60" text-anchor="middle" font-size="28" font-weight="600">{title}</text>
    <text x="140" y="95" text-anchor="middle" font-size="20" font-weight="400" fill="{TEXT_GRAY}">{subtitle}</text>
  </g>
'''
    svg += create_svg_footer()
    return svg

def create_battery():
    """Generate battery duration slide (007)."""
    svg = create_svg_header()
    svg += f'''
  <g transform="translate({CANVAS_WIDTH/2 - 350}, {CANVAS_HEIGHT/2 - 150})">
    <!-- Battery body -->
    <rect x="0" y="0" width="700" height="300" rx="40" fill="{BG_DARK_ALT}" stroke="{TEXT_GRAY}" stroke-width="4"/>
    <rect x="20" y="20" width="660" height="260" rx="30" fill="{ACCENT_GREEN}" opacity="0.9"/>
    <!-- Battery terminal -->
    <rect x="700" y="110" width="40" height="80" rx="8" fill="{TEXT_GRAY}"/>
    <!-- Text -->
    <text x="350" y="185" text-anchor="middle" font-size="96" font-weight="700" fill="{BG_COLOR}">24 hrs</text>
  </g>
'''
    svg += create_svg_footer()
    return svg

def create_pricing():
    """Generate pricing stack slide (008)."""
    svg = create_svg_header()
    # Gradient background
    svg += f'''
  <defs>
    <radialGradient id="spotlightGrad" cx="50%" cy="40%">
      <stop offset="0%" style="stop-color:{ACCENT_BLUE};stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:{BG_COLOR};stop-opacity:0" />
    </radialGradient>
  </defs>
  <ellipse cx="{CANVAS_WIDTH/2}" cy="{CANVAS_HEIGHT/2 - 100}" rx="600" ry="400" fill="url(#spotlightGrad)"/>
  <g transform="translate({CANVAS_WIDTH/2}, 250)">
    <text text-anchor="middle" font-size="64" font-weight="600">MacBook Pro</text>
    <text y="100" text-anchor="middle" font-size="48" font-weight="400" fill="{TEXT_GRAY}">14-inch</text>
    <text y="200" text-anchor="middle" font-size="96" font-weight="700">$1,599</text>
  </g>
  <!-- Device placeholder -->
  <rect x="{CANVAS_WIDTH/2 - 250}" y="600" width="500" height="320" rx="20" fill="{BG_DARK_ALT}" opacity="0.5"/>
'''
    svg += create_svg_footer()
    return svg

def create_timeline():
    """Generate timeline slide (009)."""
    svg = create_svg_header()
    # Timeline line
    svg += f'''
  <line x1="300" y1="{CANVAS_HEIGHT/2}" x2="{CANVAS_WIDTH - 300}" y2="{CANVAS_HEIGHT/2}" 
        stroke="{TEXT_GRAY}" stroke-width="4"/>
'''
    # Timeline nodes
    events = ["2020", "2021", "2022", "2023", "2024"]
    node_spacing = (CANVAS_WIDTH - 600) / (len(events) - 1)
    for i, year in enumerate(events):
        x = 300 + i * node_spacing
        svg += f'''
  <circle cx="{x}" cy="{CANVAS_HEIGHT/2}" r="20" fill="{TEXT_WHITE}"/>
  <text x="{x}" y="{CANVAS_HEIGHT/2 - 60}" text-anchor="middle" font-size="36" font-weight="600"
        transform="rotate(-28 {x} {CANVAS_HEIGHT/2 - 60})">{year}</text>
  <text x="{x}" y="{CANVAS_HEIGHT/2 + 70}" text-anchor="middle" font-size="24" font-weight="400" fill="{TEXT_GRAY}">Milestone</text>
'''
    svg += create_svg_footer()
    return svg

def create_split_table():
    """Generate split table slide (010)."""
    svg = create_svg_header()
    svg += f'''
  <g transform="translate(300, 200)">
    <rect width="1320" height="680" rx="{BORDER_RADIUS}" fill="{BG_DARK_ALT}" stroke="{TEXT_GRAY}" stroke-width="2"/>
    <!-- Vertical divider -->
    <line x1="660" y1="0" x2="660" y2="680" stroke="{TEXT_GRAY}" stroke-width="1" opacity="0.3"/>
    <!-- Left column -->
    <text x="80" y="100" font-size="48" font-weight="600">Performance</text>
    <text x="80" y="200" font-size="28" font-weight="400" fill="{TEXT_GRAY}">
      <tspan x="80" dy="0">• 2× faster CPU</tspan>
      <tspan x="80" dy="60">• 3× faster GPU</tspan>
      <tspan x="80" dy="60">• 40% less power</tspan>
    </text>
    <!-- Right column -->
    <text x="740" y="100" font-size="48" font-weight="600">Efficiency</text>
    <text x="740" y="200" font-size="28" font-weight="400" fill="{TEXT_GRAY}">
      <tspan x="740" dy="0">• All-day battery</tspan>
      <tspan x="740" dy="60">• Thermal design</tspan>
      <tspan x="740" dy="60">• Silent operation</tspan>
    </text>
  </g>
'''
    svg += create_svg_footer()
    return svg

def create_pie_chart():
    """Generate pie chart slide (011)."""
    svg = create_svg_header()
    # Pie chart segments
    colors = [ACCENT_BLUE, ACCENT_GREEN, "#8B5CF6", ACCENT_ORANGE]
    center_x, center_y = CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2
    radius = 300
    
    svg += f'''
  <!-- Underlay circle -->
  <circle cx="{center_x}" cy="{center_y}" r="{radius + 20}" fill="{BG_DARK_ALT}" opacity="0.5"/>
'''
    
    # Draw pie segments
    start_angle = 0
    percentages = [35, 25, 20, 20]
    for i, (color, percent) in enumerate(zip(colors, percentages)):
        angle = (percent / 100) * 360
        end_angle = start_angle + angle
        
        # Calculate path
        start_rad = math.radians(start_angle - 90)
        end_rad = math.radians(end_angle - 90)
        
        x1 = center_x + radius * math.cos(start_rad)
        y1 = center_y + radius * math.sin(start_rad)
        x2 = center_x + radius * math.cos(end_rad)
        y2 = center_y + radius * math.sin(end_rad)
        
        large_arc = 1 if angle > 180 else 0
        
        svg += f'''
  <path d="M {center_x} {center_y} L {x1} {y1} A {radius} {radius} 0 {large_arc} 1 {x2} {y2} Z"
        fill="{color}" opacity="0.8"/>
'''
        start_angle = end_angle
    
    svg += create_svg_footer()
    return svg

def create_bar_chart():
    """Generate bar chart icon slide (012)."""
    svg = create_svg_header()
    bars = [
        (CANVAS_WIDTH/2 - 300, 700, 120, 200),
        (CANVAS_WIDTH/2 - 120, 600, 120, 300),
        (CANVAS_WIDTH/2 + 60, 500, 120, 400),
        (CANVAS_WIDTH/2 + 240, 400, 120, 500),
    ]
    for x, y, w, h in bars:
        svg += f'''
  <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="20" fill="{ACCENT_BLUE}"/>
'''
    svg += create_svg_footer()
    return svg

def create_icon_trio():
    """Generate icon trio slide (013)."""
    svg = create_svg_header()
    svg += f'''
  <line x1="400" y1="{CANVAS_HEIGHT/2 + 200}" x2="{CANVAS_WIDTH - 400}" y2="{CANVAS_HEIGHT/2 + 200}" 
        stroke="{TEXT_GRAY}" stroke-width="2"/>
  <!-- Lamp icon -->
  <g transform="translate(580, {CANVAS_HEIGHT/2 - 100})">
    <circle cx="60" cy="30" r="30" fill="none" stroke="{TEXT_WHITE}" stroke-width="3"/>
    <line x1="60" y1="60" x2="60" y2="160" stroke="{TEXT_WHITE}" stroke-width="3"/>
    <line x1="30" y1="160" x2="90" y2="160" stroke="{TEXT_WHITE}" stroke-width="3"/>
  </g>
  <!-- Chair icon -->
  <g transform="translate({CANVAS_WIDTH/2 - 60}, {CANVAS_HEIGHT/2 - 100})">
    <rect x="30" y="0" width="60" height="10" rx="5" fill="none" stroke="{TEXT_WHITE}" stroke-width="3"/>
    <line x1="40" y1="10" x2="40" y2="80" stroke="{TEXT_WHITE}" stroke-width="3"/>
    <line x1="80" y1="10" x2="80" y2="80" stroke="{TEXT_WHITE}" stroke-width="3"/>
    <line x1="40" y1="80" x2="40" y2="160" stroke="{TEXT_WHITE}" stroke-width="3"/>
    <line x1="80" y1="80" x2="80" y2="160" stroke="{TEXT_WHITE}" stroke-width="3"/>
  </g>
  <!-- Bed icon -->
  <g transform="translate({CANVAS_WIDTH - 700}, {CANVAS_HEIGHT/2 - 100})">
    <rect x="0" y="50" width="180" height="15" rx="7" fill="none" stroke="{TEXT_WHITE}" stroke-width="3"/>
    <line x1="20" y1="65" x2="20" y2="140" stroke="{TEXT_WHITE}" stroke-width="3"/>
    <line x1="160" y1="65" x2="160" y2="140" stroke="{TEXT_WHITE}" stroke-width="3"/>
    <circle cx="45" cy="30" r="15" fill="none" stroke="{TEXT_WHITE}" stroke-width="3"/>
  </g>
'''
    svg += create_svg_footer()
    return svg

def create_image_collage():
    """Generate image collage slide (014)."""
    svg = create_svg_header()
    svg += f'''
  <!-- Large left frame -->
  <rect x="200" y="200" width="800" height="680" rx="{BORDER_RADIUS}" fill="{BG_DARK_ALT}"/>
  <defs>
    <linearGradient id="imgGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{ACCENT_BLUE};stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:{ACCENT_AQUA};stop-opacity:0.3" />
    </linearGradient>
  </defs>
  <rect x="200" y="200" width="800" height="680" rx="{BORDER_RADIUS}" fill="url(#imgGrad1)"/>
  
  <!-- Top right frame -->
  <rect x="1080" y="200" width="640" height="320" rx="{BORDER_RADIUS}" fill="{BG_DARK_ALT}"/>
  <rect x="1080" y="200" width="640" height="320" rx="{BORDER_RADIUS}" fill="url(#imgGrad1)"/>
  
  <!-- Bottom right frame -->
  <rect x="1080" y="560" width="640" height="320" rx="{BORDER_RADIUS}" fill="{BG_DARK_ALT}"/>
  <rect x="1080" y="560" width="640" height="320" rx="{BORDER_RADIUS}" fill="url(#imgGrad1)"/>
'''
    svg += create_svg_footer()
    return svg

def create_hero_photo():
    """Generate hero photo slide (015)."""
    svg = create_svg_header()
    svg += f'''
  <defs>
    <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{ACCENT_BLUE};stop-opacity:0.6" />
      <stop offset="50%" style="stop-color:{ACCENT_AQUA};stop-opacity:0.4" />
      <stop offset="100%" style="stop-color:{ACCENT_GREEN};stop-opacity:0.6" />
    </linearGradient>
  </defs>
  <rect width="{CANVAS_WIDTH}" height="{CANVAS_HEIGHT}" fill="url(#heroGrad)"/>
  <rect width="{CANVAS_WIDTH}" height="{CANVAS_HEIGHT}" fill="{BG_COLOR}" opacity="0.12"/>
'''
    svg += create_svg_footer()
    return svg

def create_testimonial():
    """Generate testimonial slide (016)."""
    svg = create_svg_header()
    svg += f'''
  <g transform="translate(260, 350)">
    <text font-size="56" font-weight="600" fill="{TEXT_WHITE}">
      <tspan x="0" dy="0">「革新的なデザインと</tspan>
      <tspan x="0" dy="80">パフォーマンス」</tspan>
    </text>
    <text y="280" font-size="32" font-weight="400" fill="{TEXT_GRAY}">
      — Tech Review Magazine
    </text>
  </g>
'''
    svg += create_svg_footer()
    return svg

def create_before_after():
    """Generate before/after split slide (017)."""
    svg = create_svg_header()
    svg += f'''
  <!-- Before side -->
  <rect x="0" y="0" width="{CANVAS_WIDTH/2}" height="{CANVAS_HEIGHT}" fill="#D1D5DB"/>
  <text x="{CANVAS_WIDTH/4}" y="{CANVAS_HEIGHT/2}" text-anchor="middle" 
        font-size="72" font-weight="600" fill="#1F2937">Before</text>
  
  <!-- After side -->
  <rect x="{CANVAS_WIDTH/2}" y="0" width="{CANVAS_WIDTH/2}" height="{CANVAS_HEIGHT}" fill="{BG_COLOR}"/>
  <text x="{CANVAS_WIDTH * 3/4}" y="{CANVAS_HEIGHT/2}" text-anchor="middle" 
        font-size="72" font-weight="600" fill="{TEXT_WHITE}">After</text>
  
  <!-- Divider -->
  <rect x="{CANVAS_WIDTH/2 - 2}" y="0" width="4" height="{CANVAS_HEIGHT}" fill="{TEXT_WHITE}" opacity="0.3"/>
'''
    svg += create_svg_footer()
    return svg

def create_kpi_contrast():
    """Generate KPI contrast slide (018)."""
    svg = create_svg_header()
    svg += f'''
  <g transform="translate(400, {CANVAS_HEIGHT/2 - 100})">
    <text font-size="120" font-weight="700" fill="{ACCENT_GREEN}">+47%</text>
    <text y="140" font-size="36" font-weight="400" fill="{TEXT_GRAY}">パフォーマンス向上</text>
  </g>
  <g transform="translate({CANVAS_WIDTH - 650}, {CANVAS_HEIGHT/2 - 100})">
    <text font-size="120" font-weight="700" fill="{ACCENT_ORANGE}">-32%</text>
    <text y="140" font-size="36" font-weight="400" fill="{TEXT_GRAY}">消費電力削減</text>
  </g>
'''
    svg += create_svg_footer()
    return svg

def create_feature_slots():
    """Generate feature slots slide (019)."""
    svg = create_svg_header()
    positions = [
        (300, 300), (800, 300), (1300, 300), (550, 650)
    ]
    for x, y in positions:
        svg += f'''
  <rect x="{x}" y="{y}" width="280" height="280" rx="40" 
        fill="none" stroke="{TEXT_GRAY}" stroke-width="3"/>
'''
    svg += create_svg_footer()
    return svg

def create_closing():
    """Generate closing slide (020)."""
    svg = create_svg_header()
    svg += f'''
  <g transform="translate({CANVAS_WIDTH/2}, {CANVAS_HEIGHT/2 - 80})">
    <text text-anchor="middle" font-size="96" font-weight="600">Thank you.</text>
    <rect x="-250" y="40" width="500" height="6" fill="{ACCENT_AQUA}"/>
    <text y="160" text-anchor="middle" font-size="40" font-weight="400" fill="{TEXT_GRAY}">
      macOS • iPadOS • Apple Intelligence
    </text>
  </g>
'''
    svg += create_svg_footer()
    return svg

def create_generic_slide(slide_num, slide_type):
    """Create a generic slide for types 21-32."""
    svg = create_svg_header()
    svg += f'''
  <g transform="translate({CANVAS_WIDTH/2}, {CANVAS_HEIGHT/2})">
    <text text-anchor="middle" font-size="72" font-weight="600">
      Slide {slide_num:03d}
    </text>
    <text y="100" text-anchor="middle" font-size="42" font-weight="400" fill="{TEXT_GRAY}">
      {slide_type.replace('_', ' ').title()}
    </text>
    <rect x="-400" y="150" width="800" height="4" fill="{ACCENT_BLUE}"/>
  </g>
'''
    svg += create_svg_footer()
    return svg

def generate_svg_mockup(slide_num):
    """Generate SVG mockup for a specific slide number."""
    slide_type = SLIDE_TYPES.get(slide_num, f"slide_{slide_num}")
    
    generators = {
        "hero_title": create_hero_title,
        "cpu_spec": create_cpu_spec,
        "gpu_spec": create_gpu_spec,
        "benchmark_bars": create_benchmark_bars,
        "benchmark_cards": create_benchmark_cards,
        "product_highlights": create_product_highlights,
        "battery": create_battery,
        "pricing": create_pricing,
        "timeline": create_timeline,
        "split_table": create_split_table,
        "pie_chart": create_pie_chart,
        "bar_chart": create_bar_chart,
        "icon_trio": create_icon_trio,
        "image_collage": create_image_collage,
        "hero_photo": create_hero_photo,
        "testimonial": create_testimonial,
        "before_after": create_before_after,
        "kpi_contrast": create_kpi_contrast,
        "feature_slots": create_feature_slots,
        "closing": create_closing,
    }
    
    generator = generators.get(slide_type)
    if generator:
        return generator()
    else:
        return create_generic_slide(slide_num, slide_type)

def main():
    """Main function to generate all SVG mockups."""
    output_dir = "img/svg_mockups"
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Generating SVG mockups in {output_dir}/...")
    
    for i in range(1, 33):
        filename = f"apple_template_{i:03d}_{SLIDE_TYPES[i]}.svg"
        filepath = os.path.join(output_dir, filename)
        
        svg_content = generate_svg_mockup(i)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        
        print(f"  Created: {filename}")
    
    print(f"\n✓ Successfully generated {32} SVG mockups!")

if __name__ == "__main__":
    main()
