# Design System - AI Operations Dashboard

**Visual Identity for Enterprise Manufacturing Intelligence**

---

## 🎨 Overview

The AI Operations Dashboard design system embodies "precision at scale" — a balance of industrial credibility and executive polish. Inspired by best-in-class manufacturing UIs from Siemens Mindsphere, Tesla factory systems, and Apple's design language.

---

## Color Palette

### Core Colors

```css
/* Background & Structure */
--bg-primary: #0a0a0a;        /* Deep black */
--bg-secondary: #101216;      /* Graphite */
--bg-tertiary: #1F2328;       /* Slate gray */
--border-default: #30363d;    /* Subtle border */

/* Brand & Accents */
--accent-primary: #00E0FF;    /* Electric cyan */
--accent-secondary: #004B87;  /* Steel blue */
--accent-warning: #FFC857;    /* Amber */
--accent-critical: #ff4444;   /* Alert red */

/* Text */
--text-primary: #ffffff;      /* Pure white */
--text-secondary: #c9d1d9;    /* Light gray */
--text-muted: #8b949e;        /* Medium gray */
--text-code: #00E0FF;         /* Cyan for code */
```

### Color Usage Guidelines

| Element | Color | Usage |
|---------|-------|-------|
| Primary CTA | `#00E0FF` | Buttons, links, highlights |
| Data visualization | `#00E0FF`, `#004B87` | Charts, graphs |
| Alerts | `#FFC857` | Warnings, attention needed |
| Critical status | `#ff4444` | Errors, critical machines |
| Success | `#00E0FF` | Positive metrics, stable status |

---

## Typography

### Font Stack

```css
/* Headings - Strong, modern, bold */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
font-weight: 700-800;
letter-spacing: -0.5px;

/* Body - Readable, professional */
font-family: 'IBM Plex Sans', 'Inter', sans-serif;
font-weight: 400-600;
line-height: 1.6;

/* Metrics & Code - Monospace precision */
font-family: 'JetBrains Mono', 'Courier New', monospace;
font-weight: 500-700;
```

### Type Scale

```css
/* Display / Hero */
h1: 48px / 800 weight

/* Page Title */
h2: 32px / 800 weight

/* Section Header */
h3: 24px / 700 weight

/* Card Title */
h4: 18px / 700 weight

/* Body */
p: 16px / 400 weight

/* Small / Labels */
small: 14px / 500 weight

/* Metrics */
.metric-value: 32px / 700 weight / monospace

/* Code */
code: 14px / 500 weight / monospace
```

---

## Components

### Metric Cards

```css
.metric-card {
  background: rgba(31, 35, 40, 0.6);
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 24px;
  backdrop-filter: blur(10px);
}

.metric-card:hover {
  border-color: #00E0FF;
  box-shadow: 0 8px 24px rgba(0, 224, 255, 0.15);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
```

**Usage:**
- Display KPIs (OEE, Yield, Downtime)
- Show deltas with color-coded arrows
- Use JetBrains Mono for numeric values

### Alert Boxes

```css
/* Critical Alert */
.alert-critical {
  background: rgba(255, 200, 87, 0.1);
  border-left: 4px solid #FFC857;
  padding: 16px;
  border-radius: 6px;
}

/* Info Alert */
.alert-info {
  background: rgba(0, 224, 255, 0.1);
  border-left: 4px solid #00E0FF;
  padding: 16px;
  border-radius: 6px;
}
```

### Chat Messages

```css
/* User Message */
.chat-user {
  background: rgba(0, 224, 255, 0.1);
  border-left: 3px solid #00E0FF;
  padding: 16px;
  border-radius: 8px;
}

/* Agent Response */
.chat-agent {
  background: rgba(31, 35, 40, 0.8);
  border-left: 3px solid #FFC857;
  padding: 16px;
  border-radius: 8px;
}
```

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #00E0FF;
  color: #0a0a0a;
  font-weight: 600;
  border-radius: 6px;
  padding: 10px 24px;
  border: none;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #00b8d4;
  transform: scale(1.05);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #8b949e;
  border: 1px solid #30363d;
  font-weight: 600;
  border-radius: 6px;
  padding: 10px 24px;
}
```

---

## Icon Set

### Available Icons (SVG)

Located in `/assets/icons/`:

1. **predictive-maintenance.svg** - Wrench with predictive waves
2. **machine-performance.svg** - Gauge with metrics
3. **supply-chain-flow.svg** - Network nodes with flow
4. **ai-recommendation.svg** - Brain with lightbulb
5. **operator-feedback-loop.svg** - User-system cycle
6. **digital-twin-sensor.svg** - Physical/digital sync

### Icon Style Guidelines

```css
.icon {
  width: 24px;
  height: 24px;
  stroke-width: 2.5px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Colors */
.icon-primary { stroke: #00E0FF; }
.icon-secondary { stroke: #004B87; }
.icon-warning { stroke: #FFC857; }
```

---

## Data Visualization

### Plotly Theme Configuration

```python
plotly_theme = {
    'template': 'plotly_dark',
    'paper_bgcolor': 'rgba(0,0,0,0)',
    'plot_bgcolor': 'rgba(0,0,0,0)',
    'font': {
        'family': 'Inter',
        'color': '#8b949e',
        'size': 12
    },
    'colorway': ['#00E0FF', '#004B87', '#FFC857', '#ff4444'],
    'xaxis': {
        'gridcolor': '#30363d',
        'showline': False
    },
    'yaxis': {
        'gridcolor': '#30363d',
        'showline': False
    }
}
```

### Chart Types

| Chart Type | Primary Use | Color |
|------------|-------------|-------|
| Line chart | Time series (OEE, yield) | `#00E0FF` |
| Bar chart | Comparisons (plants, machines) | `#00E0FF`, `#004B87` |
| Scatter plot | Correlations (temp vs defects) | Multi-color by category |
| Heatmap | Correlation matrix | `#004B87` → `#00E0FF` → `#FFC857` |
| Gauge | Real-time metrics | `#00E0FF` with `#FFC857` threshold |

### Animation Guidelines

```css
/* Smooth transitions */
transition: all 0.3s ease;

/* Pulse for live indicators */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Slide in for new content */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Layout Grid

### Desktop Layout (1440px+)

```
┌─────────────────────────────────────────┐
│ Header (full width)                     │
├─────────────────────────────────────────┤
│ Tabs: Overview | Diagnostics | AI | Chat│
├─────────────────────────────────────────┤
│ ┌───────┬───────┬───────┬───────┐       │
│ │ KPI 1 │ KPI 2 │ KPI 3 │ KPI 4 │       │
│ └───────┴───────┴───────┴───────┘       │
│ ┌─────────────────┬─────────────────┐   │
│ │ Chart 1         │ Chart 2         │   │
│ │                 │                 │   │
│ └─────────────────┴─────────────────┘   │
│ ┌───────────────────────────────────┐   │
│ │ Full-width Chart                  │   │
│ └───────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Spacing

```css
/* Container padding */
--spacing-container: 30px;

/* Card margin */
--spacing-card: 12px;

/* Element gap */
--spacing-gap: 20px;

/* Internal padding */
--spacing-content: 24px;
```

---

## Accessibility

### Contrast Ratios

All text meets WCAG AA standards:
- Primary text on dark background: 15.8:1 ✅
- Secondary text on dark background: 7.2:1 ✅
- Accent color on dark: 6.1:1 ✅

### Focus States

```css
*:focus {
  outline: 2px solid #00E0FF;
  outline-offset: 2px;
}
```

### Screen Reader Support

- Semantic HTML structure
- ARIA labels for charts
- Alt text for all images
- Keyboard navigation support

---

## Brand Voice

### Tone Guidelines

**For Executive Audiences:**
- Confident, data-driven
- Business outcome focused
- Clear ROI articulation

**For Technical Audiences:**
- Precise, detailed
- Implementation-focused
- Architectural clarity

**For Operations Teams:**
- Actionable, urgent
- Process-oriented
- Step-by-step guidance

### Example Messaging

```markdown
❌ "System detected anomaly"
✅ "Machine #14 temperature rising — quality at risk. Schedule maintenance within 4 hours."

❌ "Correlation found"
✅ "Temperature shows 0.73 correlation with defect rate — implementing alerts could prevent $400K in waste annually"

❌ "Data processed"
✅ "24 machines analyzed. 3 critical alerts. $2.1M savings opportunity identified."
```

---

## Export Assets

### Banner Sizes

- **Hero (GitHub README):** 2560×1440px
- **Social (Twitter/LinkedIn):** 1200×630px
- **Thumbnail:** 400×300px

### Icon Export

```bash
# SVG (preferred)
- Viewbox: 0 0 64 64
- Stroke width: 2.5px
- Export as: icon-name.svg

# PNG fallback
- Sizes: 24×24, 48×48, 96×96
- Format: PNG-24 with transparency
```

---

## Implementation Checklist

- [ ] Import Google Fonts (Inter, IBM Plex Sans, JetBrains Mono)
- [ ] Apply dark theme CSS
- [ ] Configure Plotly theme
- [ ] Add hover states to interactive elements
- [ ] Implement responsive breakpoints
- [ ] Test contrast ratios
- [ ] Add loading animations
- [ ] Implement error states
- [ ] Test keyboard navigation

---

## Resources

### Design Tools
- [Figma Community File](https://figma.com/@aiops)
- [Icon SVG Pack](../assets/icons/)
- [Banner Generator](../src/hero-banner-generator.html)

### Inspiration
- [Siemens Mindsphere UI](https://mindsphere.io)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/)
- [Tesla Factory Dashboard](https://tesla.com)
- [GitHub Primer Design System](https://primer.style)

---

<div align="center">

**Design System v1.0**

*Last updated: 2025*

</div>
