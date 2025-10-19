#!/usr/bin/env python3
"""
SVG Mockup Generator for Apple-like Slide Templates
Generates minimal SVG mockups (3-4 objects max per slide) based on Apple design principles.
"""

import os
import math

# Design tokens based on Apple style guide - MINIMAL MODE
CANVAS_WIDTH = 1920
CANVAS_HEIGHT = 1080

# Color palette (limited to 3 colors per slide)
BG_COLOR = "#000000"           # Pure black background
TEXT_WHITE = "#FFFFFF"         # Primary text
TEXT_GRAY = "#86868B"          # Secondary text
ACCENT_BLUE = "#0A84FF"        # Apple Blue (only for emphasis)

# Spacing (doubled for generous whitespace)
SPACING_MD = 64                # Medium spacing (32px → 64px)
SPACING_LG = 96                # Large spacing (48px → 96px)
SPACING_XL = 128               # Extra large spacing (64px → 128px)

# Safe margins (12% horizontal, 15% vertical)
MARGIN_H = int(CANVAS_WIDTH * 0.12)   # 230px
MARGIN_V = int(CANVAS_HEIGHT * 0.15)  # 162px

# Typography (enlarged)
FONT_HERO = 96                 # Hero title
FONT_TITLE = 64                # Section title
FONT_BODY = 32                 # Body text
FONT_CAPTION = 24              # Caption text

# Minimal corner radius
RADIUS = 24

# Slide type mappings
SLIDE_TYPES = {
    1: "title",                 # Title slide
    2: "content_two_column",    # 2-column content
    3: "image_text",            # Image + text
    4: "bar_compare",           # Bar comparison
    5: "cards_grid",            # Card grid
    6: "kpi_display",           # KPI display
    7: "pricing",               # Pricing
    8: "timeline",              # Timeline
    9: "table_two_column",      # 2-column table
    10: "diagram_pie",          # Pie diagram
    11: "bar_chart_simple",     # Simple bar chart
    12: "icon_trio",            # 3 icons
    13: "image_collage",        # Image collage
    14: "hero_image",           # Hero image
    15: "quote_testimonial",    # Quote
    16: "before_after",         # Before/after
    17: "stats_contrast",       # Stats contrast
    18: "feature_slots",        # Feature slots
    19: "section_divider",      # Section divider
    20: "content_text_focused", # Text-focused
    21: "process_steps",        # Process steps
    22: "header_cards",         # Header cards
    23: "bullet_cards",         # Bullet cards
    24: "progress_bar",         # Progress bar
    25: "cycle_diagram",        # Cycle diagram
    26: "triangle_diagram",     # Triangle diagram
    27: "pyramid_diagram",      # Pyramid diagram
    28: "flow_chart",           # Flow chart
    29: "step_up_diagram",      # Step-up diagram
    30: "faq_slide",            # FAQ
    31: "agenda_slide",         # Agenda
    32: "closing_slide",        # Closing
}

def create_svg_header():
    """Create SVG header with proper namespace and viewBox."""
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{CANVAS_WIDTH}" height="{CANVAS_HEIGHT}" viewBox="0 0 {CANVAS_WIDTH} {CANVAS_HEIGHT}" 
     xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;display=swap');
      text {{
        font-family: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
        fill: {TEXT_WHITE};
        letter-spacing: -0.5px;
      }}
    </style>
  </defs>
  <rect width="{CANVAS_WIDTH}" height="{CANVAS_HEIGHT}" fill="{BG_COLOR}"/>
'''

def create_svg_footer():
    """Create SVG footer."""
    return '</svg>\n'

def create_text(x, y, text, size=FONT_BODY, weight=400, color=TEXT_WHITE, anchor="start"):
    """Helper to create text element."""
    return f'  <text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{color}" text-anchor="{anchor}">{text}</text>\n'

def create_rect(x, y, w, h, fill=TEXT_GRAY, opacity=0.2, radius=RADIUS):
    """Helper to create rectangle element."""
    return f'  <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" opacity="{opacity}"/>\n'

def create_line(x1, y1, x2, y2, color=TEXT_GRAY, width=2):
    """Helper to create line element."""
    return f'  <line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{width}"/>\n'

# ============================================================================
# SLIDE GENERATORS (3-4 objects maximum per slide)
# ============================================================================

def create_title():
    """001: Title slide - 1 object only (text)"""
    svg = create_svg_header()
    svg += create_text(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 20, "Think Different", 
                       FONT_HERO, 600, TEXT_WHITE, "middle")
    svg += create_svg_footer()
    return svg

def create_content_two_column():
    """002: 2-column content - 3 objects (title, text, shape)"""
    svg = create_svg_header()
    # Title
    svg += create_text(MARGIN_H, MARGIN_V + 50, "Innovation", FONT_TITLE, 600)
    # Body text
    svg += create_text(MARGIN_H, MARGIN_V + 150, "Powerful performance", FONT_BODY, 400, TEXT_GRAY)
    # Visual element (right side)
    svg += create_rect(CANVAS_WIDTH - MARGIN_H - 500, MARGIN_V + 100, 500, 600, TEXT_GRAY, 0.1)
    svg += create_svg_footer()
    return svg

def create_image_text():
    """003: Image + text - 2 objects"""
    svg = create_svg_header()
    # Large image placeholder
    svg += create_rect(MARGIN_H, MARGIN_V, 700, 700, TEXT_GRAY, 0.15)
    # Text block
    svg += create_text(MARGIN_H + 800, CANVAS_HEIGHT/2, "Beautiful design", FONT_TITLE, 600)
    svg += create_svg_footer()
    return svg

def create_bar_compare():
    """004: Bar comparison - 3 objects (3 bars)"""
    svg = create_svg_header()
    svg += create_text(CANVAS_WIDTH/2, MARGIN_V + 50, "Performance", FONT_TITLE, 600, TEXT_WHITE, "middle")
    # Bar 1
    svg += create_rect(MARGIN_H + 200, 400, 1000, 80, ACCENT_BLUE, 0.9)
    svg += create_text(MARGIN_H + 220, 450, "M4", FONT_BODY, 600)
    # Bar 2
    svg += create_rect(MARGIN_H + 200, 520, 700, 80, TEXT_GRAY, 0.5)
    svg += create_text(MARGIN_H + 220, 570, "M3", FONT_BODY, 600, TEXT_GRAY)
    # Bar 3
    svg += create_rect(MARGIN_H + 200, 640, 500, 80, TEXT_GRAY, 0.3)
    svg += create_text(MARGIN_H + 220, 690, "M1", FONT_BODY, 600, TEXT_GRAY)
    svg += create_svg_footer()
    return svg

def create_cards_grid():
    """005: Card grid - 3 cards maximum"""
    svg = create_svg_header()
    card_w = 400
    card_h = 500
    spacing = (CANVAS_WIDTH - 2*MARGIN_H - 3*card_w) / 2
    y = MARGIN_V + 100
    for i in range(3):
        x = MARGIN_H + i * (card_w + spacing)
        svg += create_rect(x, y, card_w, card_h, TEXT_GRAY, 0.1)
        svg += create_text(x + card_w/2, y + card_h/2, f"Feature {i+1}", FONT_BODY, 600, TEXT_WHITE, "middle")
    svg += create_svg_footer()
    return svg

def create_kpi_display():
    """006: KPI display - 2 objects (number + label)"""
    svg = create_svg_header()
    svg += create_text(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 50, "24", 200, 700, ACCENT_BLUE, "middle")
    svg += create_text(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 100, "hours", FONT_TITLE, 400, TEXT_GRAY, "middle")
    svg += create_svg_footer()
    return svg

def create_pricing():
    """007: Pricing - 3 objects (product, price, description)"""
    svg = create_svg_header()
    svg += create_text(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 150, "MacBook Pro", FONT_TITLE, 600, TEXT_WHITE, "middle")
    svg += create_text(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, "$1,599", FONT_HERO, 700, TEXT_WHITE, "middle")
    svg += create_text(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 100, "14-inch model", FONT_BODY, 400, TEXT_GRAY, "middle")
    svg += create_svg_footer()
    return svg

def create_timeline():
    """008: Timeline - 4 objects (line + 3 nodes)"""
    svg = create_svg_header()
    # Timeline line
    svg += create_line(MARGIN_H + 200, CANVAS_HEIGHT/2, CANVAS_WIDTH - MARGIN_H - 200, CANVAS_HEIGHT/2, TEXT_GRAY, 3)
    # 3 nodes
    years = ["2022", "2023", "2024"]
    node_spacing = (CANVAS_WIDTH - 2*MARGIN_H - 400) / 2
    for i, year in enumerate(years):
        x = MARGIN_H + 200 + i * node_spacing
        svg += f'  <circle cx="{x}" cy="{CANVAS_HEIGHT/2}" r="16" fill="{TEXT_WHITE}"/>\n'
        svg += create_text(x, CANVAS_HEIGHT/2 - 80, year, FONT_BODY, 600, TEXT_WHITE, "middle")
    svg += create_svg_footer()
    return svg

def create_table_two_column():
    """009: 2-column table - 3 objects (2 columns + divider)"""
    svg = create_svg_header()
    mid = CANVAS_WIDTH / 2
    # Left column
    svg += create_text(MARGIN_H + 150, CANVAS_HEIGHT/2 - 100, "Performance", FONT_TITLE, 600)
    svg += create_text(MARGIN_H + 150, CANVAS_HEIGHT/2 + 50, "2× faster", FONT_BODY, 400, TEXT_GRAY)
    # Divider
    svg += create_line(mid, MARGIN_V + 100, mid, CANVAS_HEIGHT - MARGIN_V - 100, TEXT_GRAY, 1)
    # Right column
    svg += create_text(mid + 150, CANVAS_HEIGHT/2 - 100, "Efficiency", FONT_TITLE, 600)
    svg += create_text(mid + 150, CANVAS_HEIGHT/2 + 50, "All-day battery", FONT_BODY, 400, TEXT_GRAY)
    svg += create_svg_footer()
    return svg

def create_diagram_pie():
    """010: Pie diagram - 1 object (simplified pie)"""
    svg = create_svg_header()
    cx, cy = CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2
    radius = 300
    # Simple 3-segment pie
    svg += f'  <circle cx="{cx}" cy="{cy}" r="{radius}" fill="{ACCENT_BLUE}" opacity="0.3"/>\n'
    svg += f'  <path d="M {cx} {cy} L {cx} {cy-radius} A {radius} {radius} 0 0 1 {cx+radius} {cy} Z" fill="{ACCENT_BLUE}" opacity="0.7"/>\n'
    svg += create_svg_footer()
    return svg

def create_bar_chart_simple():
    """011: Simple bar chart - 3 objects (3 bars)"""
    svg = create_svg_header()
    bars = [(600, 300, 100, ACCENT_BLUE), (900, 450, 100, ACCENT_BLUE), (1200, 250, 100, ACCENT_BLUE)]
    for x, h, w, color in bars:
        svg += create_rect(x, CANVAS_HEIGHT - MARGIN_V - h - 100, w, h, color, 0.8, 12)
    svg += create_svg_footer()
    return svg

def create_icon_trio():
    """012: Icon trio - 3 objects (3 icons)"""
    svg = create_svg_header()
    icons_x = [500, 960, 1420]
    y = CANVAS_HEIGHT / 2
    for i, x in enumerate(icons_x):
        svg += f'  <circle cx="{x}" cy="{y}" r="80" fill="none" stroke="{TEXT_WHITE}" stroke-width="3"/>\n'
        svg += create_text(x, y + 150, f"Feature {i+1}", FONT_CAPTION, 400, TEXT_GRAY, "middle")
    svg += create_svg_footer()
    return svg

def create_image_collage():
    """013: Image collage - 3 objects (3 image frames)"""
    svg = create_svg_header()
    # Large frame
    svg += create_rect(MARGIN_H, MARGIN_V, 800, 750, TEXT_GRAY, 0.15)
    # Top right
    svg += create_rect(MARGIN_H + 900, MARGIN_V, 700, 350, TEXT_GRAY, 0.15)
    # Bottom right
    svg += create_rect(MARGIN_H + 900, MARGIN_V + 450, 700, 300, TEXT_GRAY, 0.15)
    svg += create_svg_footer()
    return svg

def create_hero_image():
    """014: Hero image - 1 object (full-bleed image)"""
    svg = create_svg_header()
    svg += create_rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, ACCENT_BLUE, 0.3, 0)
    svg += create_svg_footer()
    return svg

def create_quote_testimonial():
    """015: Quote - 3 objects (vertical bar + quote + attribution)
    Markdown-style blockquote with thin gray vertical bar on left"""
    svg = create_svg_header()
    # Vertical blockquote bar (Markdown-style)
    bar_x = MARGIN_H + 150
    bar_y = CANVAS_HEIGHT/2 - 110
    svg += create_rect(bar_x, bar_y, 4, 210, TEXT_GRAY, 0.4, 2)
    # Quote text (without quotation marks for cleaner look)
    svg += create_text(MARGIN_H + 200, CANVAS_HEIGHT/2 - 50, "Revolutionary design", FONT_TITLE, 600)
    # Attribution
    svg += create_text(MARGIN_H + 200, CANVAS_HEIGHT/2 + 80, "— Tech Review", FONT_BODY, 400, TEXT_GRAY)
    svg += create_svg_footer()
    return svg

def create_before_after():
    """016: Before/after - 2 objects (2 sides)"""
    svg = create_svg_header()
    mid = CANVAS_WIDTH / 2
    # Before (left)
    svg += create_rect(0, 0, mid, CANVAS_HEIGHT, "#333333", 1, 0)
    svg += create_text(mid/2, CANVAS_HEIGHT/2, "Before", FONT_TITLE, 600, "#CCCCCC", "middle")
    # After (right)
    svg += create_rect(mid, 0, mid, CANVAS_HEIGHT, BG_COLOR, 1, 0)
    svg += create_text(mid + mid/2, CANVAS_HEIGHT/2, "After", FONT_TITLE, 600, TEXT_WHITE, "middle")
    svg += create_svg_footer()
    return svg

def create_stats_contrast():
    """017: Stats contrast - 2 objects (2 numbers)"""
    svg = create_svg_header()
    svg += create_text(MARGIN_H + 300, CANVAS_HEIGHT/2, "+47%", 120, 700, "#30D158")
    svg += create_text(CANVAS_WIDTH - MARGIN_H - 300, CANVAS_HEIGHT/2, "-32%", 120, 700, "#FF9F0A", "end")
    svg += create_svg_footer()
    return svg

def create_feature_slots():
    """018: Feature slots - 3 objects (3 slots)"""
    svg = create_svg_header()
    positions = [(MARGIN_H + 200, CANVAS_HEIGHT/2 - 150), 
                 (CANVAS_WIDTH/2 - 150, CANVAS_HEIGHT/2 - 150),
                 (CANVAS_WIDTH - MARGIN_H - 500, CANVAS_HEIGHT/2 - 150)]
    for x, y in positions:
        svg += f'  <rect x="{x}" y="{y}" width="300" height="300" rx="{RADIUS}" fill="none" stroke="{TEXT_GRAY}" stroke-width="2"/>\n'
    svg += create_svg_footer()
    return svg

def create_section_divider():
    """019: Section divider - 2 objects (text + line)"""
    svg = create_svg_header()
    svg += create_text(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 50, "Next", FONT_HERO, 600, TEXT_WHITE, "middle")
    svg += create_line(CANVAS_WIDTH/2 - 150, CANVAS_HEIGHT/2 + 50, CANVAS_WIDTH/2 + 150, CANVAS_HEIGHT/2 + 50, ACCENT_BLUE, 4)
    svg += create_svg_footer()
    return svg

def create_content_text_focused():
    """020: Text-focused - 2 objects (heading + body)"""
    svg = create_svg_header()
    svg += create_text(MARGIN_H + 200, MARGIN_V + 200, "Innovation", FONT_TITLE, 600)
    svg += create_text(MARGIN_H + 200, MARGIN_V + 320, "Pushing boundaries every day", FONT_BODY, 400, TEXT_GRAY)
    svg += create_svg_footer()
    return svg

def create_process_steps():
    """021: Process steps - 3 objects (3 steps)"""
    svg = create_svg_header()
    steps = ["Design", "Build", "Launch"]
    step_w = 400
    spacing = (CANVAS_WIDTH - 2*MARGIN_H - 3*step_w) / 2
    y = CANVAS_HEIGHT/2 - 50
    for i, step in enumerate(steps):
        x = MARGIN_H + i * (step_w + spacing)
        svg += create_text(x + step_w/2, y, f"{i+1}", FONT_HERO, 700, TEXT_GRAY, "middle")
        svg += create_text(x + step_w/2, y + 120, step, FONT_BODY, 600, TEXT_WHITE, "middle")
    svg += create_svg_footer()
    return svg

def create_header_cards():
    """022: Header cards - 3 objects (3 cards)"""
    svg = create_svg_header()
    card_w = 450
    spacing = (CANVAS_WIDTH - 2*MARGIN_H - 3*card_w) / 2
    y = MARGIN_V + 150
    for i in range(3):
        x = MARGIN_H + i * (card_w + spacing)
        svg += create_rect(x, y, card_w, 400, TEXT_GRAY, 0.1)
        svg += create_text(x + card_w/2, y + 80, f"Title {i+1}", FONT_BODY, 600, TEXT_WHITE, "middle")
    svg += create_svg_footer()
    return svg

def create_bullet_cards():
    """023: Bullet cards - 3 objects (3 cards with bullets)"""
    svg = create_svg_header()
    card_w = 450
    spacing = (CANVAS_WIDTH - 2*MARGIN_H - 3*card_w) / 2
    y = MARGIN_V + 150
    for i in range(3):
        x = MARGIN_H + i * (card_w + spacing)
        svg += create_rect(x, y, card_w, 450, TEXT_GRAY, 0.1)
        svg += create_text(x + 40, y + 80, f"• Feature {i+1}", FONT_CAPTION, 400, TEXT_GRAY)
    svg += create_svg_footer()
    return svg

def create_progress_bar():
    """024: Progress bar - 3 objects (3 bars)"""
    svg = create_svg_header()
    labels = ["Design", "Development", "Launch"]
    progress = [1.0, 0.7, 0.3]
    bar_w = 900
    x_start = MARGIN_H + 300
    y_start = MARGIN_V + 250
    for i, (label, prog) in enumerate(zip(labels, progress)):
        y = y_start + i * 150
        # Background
        svg += create_rect(x_start, y, bar_w, 60, TEXT_GRAY, 0.2, 30)
        # Progress
        svg += create_rect(x_start, y, bar_w * prog, 60, ACCENT_BLUE, 0.8, 30)
        svg += create_text(x_start, y - 20, label, FONT_CAPTION, 400, TEXT_GRAY)
    svg += create_svg_footer()
    return svg

def create_cycle_diagram():
    """025: Cycle diagram - 3 objects (3 nodes in circle)"""
    svg = create_svg_header()
    cx, cy = CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2
    radius = 280
    for i in range(3):
        angle = (i * 120 - 90) * math.pi / 180
        x = cx + radius * math.cos(angle)
        y = cy + radius * math.sin(angle)
        svg += f'  <circle cx="{x}" cy="{y}" r="60" fill="{ACCENT_BLUE}" opacity="0.3"/>\n'
        svg += create_text(x, y + 10, f"{i+1}", FONT_BODY, 600, TEXT_WHITE, "middle")
    svg += create_svg_footer()
    return svg

def create_triangle_diagram():
    """026: Triangle diagram - 4 objects (3 nodes + connection lines)
    Differentiated from cycle/pyramid with connecting lines between nodes"""
    svg = create_svg_header()
    cx, cy = CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2
    h = 300
    points = [
        (cx, cy - h),                    # Top
        (cx - h * 0.866, cy + h/2),      # Bottom left
        (cx + h * 0.866, cy + h/2)       # Bottom right
    ]
    
    # Connection lines (4th visual element for differentiation)
    svg += f'  <line x1="{points[0][0]}" y1="{points[0][1] + 60}" x2="{points[1][0]}" y2="{points[1][1] - 60}" stroke="{TEXT_GRAY}" stroke-width="2" opacity="0.4"/>\n'
    svg += f'  <line x1="{points[0][0]}" y1="{points[0][1] + 60}" x2="{points[2][0]}" y2="{points[2][1] - 60}" stroke="{TEXT_GRAY}" stroke-width="2" opacity="0.4"/>\n'
    svg += f'  <line x1="{points[1][0]}" y1="{points[1][1]}" x2="{points[2][0]}" y2="{points[2][1]}" stroke="{TEXT_GRAY}" stroke-width="2" opacity="0.4"/>\n'
    
    # Nodes
    for i, (x, y) in enumerate(points):
        svg += f'  <circle cx="{x}" cy="{y}" r="60" fill="{ACCENT_BLUE}" opacity="0.3"/>\n'
        svg += create_text(x, y + 10, f"{i+1}", FONT_BODY, 600, TEXT_WHITE, "middle")
    svg += create_svg_footer()
    return svg

def create_pyramid_diagram():
    """027: Pyramid diagram - 3 objects (3 levels)"""
    svg = create_svg_header()
    cx = CANVAS_WIDTH / 2
    y_base = CANVAS_HEIGHT - MARGIN_V - 100
    widths = [1000, 700, 400]
    for i, w in enumerate(widths):
        y = y_base - i * 180
        x = cx - w/2
        svg += create_rect(x, y, w, 140, ACCENT_BLUE, 0.3 + i * 0.2)
        svg += create_text(cx, y + 80, f"Level {3-i}", FONT_BODY, 600, TEXT_WHITE, "middle")
    svg += create_svg_footer()
    return svg

def create_flow_chart():
    """028: Flow chart - 3 objects (3 nodes)"""
    svg = create_svg_header()
    node_w = 300
    spacing = 200
    y = CANVAS_HEIGHT / 2 - 75
    x_start = (CANVAS_WIDTH - 3*node_w - 2*spacing) / 2
    for i in range(3):
        x = x_start + i * (node_w + spacing)
        svg += create_rect(x, y, node_w, 150, TEXT_GRAY, 0.15)
        svg += create_text(x + node_w/2, y + 90, f"Step {i+1}", FONT_BODY, 600, TEXT_WHITE, "middle")
        # Arrow
        if i < 2:
            arrow_x = x + node_w + 30
            svg += f'  <line x1="{arrow_x}" y1="{y + 75}" x2="{arrow_x + spacing - 60}" y2="{y + 75}" stroke="{TEXT_GRAY}" stroke-width="2"/>\n'
    svg += create_svg_footer()
    return svg

def create_step_up_diagram():
    """029: Step-up diagram - 3 objects (3 ascending boxes)"""
    svg = create_svg_header()
    box_w = 350
    for i in range(3):
        x = MARGIN_H + 300 + i * 400
        h = 200 + i * 100
        y = CANVAS_HEIGHT - MARGIN_V - 100 - h
        svg += create_rect(x, y, box_w, h, ACCENT_BLUE, 0.3 + i * 0.2)
        svg += create_text(x + box_w/2, y + h/2 + 10, f"{i+1}", FONT_TITLE, 600, TEXT_WHITE, "middle")
    svg += create_svg_footer()
    return svg

def create_faq_slide():
    """030: FAQ - 3 objects (3 Q&A pairs)"""
    svg = create_svg_header()
    y_start = MARGIN_V + 150
    for i in range(3):
        y = y_start + i * 220
        svg += create_text(MARGIN_H + 200, y, f"Q{i+1}. Question here?", FONT_BODY, 600)
        svg += create_text(MARGIN_H + 200, y + 80, "Answer goes here", FONT_CAPTION, 400, TEXT_GRAY)
    svg += create_svg_footer()
    return svg

def create_agenda_slide():
    """031: Agenda - 3 objects (3 agenda items)"""
    svg = create_svg_header()
    svg += create_text(MARGIN_H + 200, MARGIN_V + 100, "Agenda", FONT_TITLE, 600)
    items = ["Introduction", "Key Features", "Conclusion"]
    y_start = MARGIN_V + 250
    for i, item in enumerate(items):
        y = y_start + i * 120
        svg += create_text(MARGIN_H + 250, y, f"{i+1}. {item}", FONT_BODY, 400, TEXT_GRAY)
    svg += create_svg_footer()
    return svg

def create_closing_slide():
    """032: Closing - 2 objects (text + line)"""
    svg = create_svg_header()
    svg += create_text(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 50, "Thank you", FONT_HERO, 600, TEXT_WHITE, "middle")
    svg += create_line(CANVAS_WIDTH/2 - 200, CANVAS_HEIGHT/2 + 50, CANVAS_WIDTH/2 + 200, CANVAS_HEIGHT/2 + 50, ACCENT_BLUE, 4)
    svg += create_svg_footer()
    return svg

def generate_svg_mockup(slide_num):
    """Generate SVG mockup for a specific slide number."""
    slide_type = SLIDE_TYPES.get(slide_num, f"unknown_{slide_num}")
    
    # Map slide types to generator functions
    generators = {
        "title": create_title,
        "content_two_column": create_content_two_column,
        "image_text": create_image_text,
        "bar_compare": create_bar_compare,
        "cards_grid": create_cards_grid,
        "kpi_display": create_kpi_display,
        "pricing": create_pricing,
        "timeline": create_timeline,
        "table_two_column": create_table_two_column,
        "diagram_pie": create_diagram_pie,
        "bar_chart_simple": create_bar_chart_simple,
        "icon_trio": create_icon_trio,
        "image_collage": create_image_collage,
        "hero_image": create_hero_image,
        "quote_testimonial": create_quote_testimonial,
        "before_after": create_before_after,
        "stats_contrast": create_stats_contrast,
        "feature_slots": create_feature_slots,
        "section_divider": create_section_divider,
        "content_text_focused": create_content_text_focused,
        "process_steps": create_process_steps,
        "header_cards": create_header_cards,
        "bullet_cards": create_bullet_cards,
        "progress_bar": create_progress_bar,
        "cycle_diagram": create_cycle_diagram,
        "triangle_diagram": create_triangle_diagram,
        "pyramid_diagram": create_pyramid_diagram,
        "flow_chart": create_flow_chart,
        "step_up_diagram": create_step_up_diagram,
        "faq_slide": create_faq_slide,
        "agenda_slide": create_agenda_slide,
        "closing_slide": create_closing_slide,
    }
    
    generator = generators.get(slide_type)
    if generator:
        return generator()
    else:
        # Fallback to generic slide
        return create_title()

def main():
    """Main function to generate all SVG mockups."""
    output_dir = "img/svg_mockups"
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"🎨 Generating minimal Apple-style SVG mockups...")
    print(f"📁 Output directory: {output_dir}/")
    print(f"🎯 Design principle: 3-4 objects maximum per slide\n")
    
    for i in range(1, 33):
        slide_type = SLIDE_TYPES[i]
        filename = f"apple_template_{i:03d}_{slide_type}.svg"
        filepath = os.path.join(output_dir, filename)
        
        svg_content = generate_svg_mockup(i)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        
        print(f"  ✓ {i:2d}. {filename}")
    
    print(f"\n✨ Successfully generated 32 minimal SVG mockups!")
    print(f"🍎 Each slide follows Apple design principles:")
    print(f"   • Maximum 3-4 visual objects")
    print(f"   • Generous whitespace (12% H / 15% V margins)")
    print(f"   • Large typography (64-96pt titles)")
    print(f"   • Minimal color palette (3 colors max)")
    print(f"\n📖 Open svg_viewer.html to preview all slides")

if __name__ == "__main__":
    main()
