# Carbon Design System Integration Guide

**Migrating AI Operations Dashboard to IBM Carbon Design System**

---

## Overview

This document outlines the complete integration of [Carbon Design System](https://carbondesignsystem.com/) into the AI Operations Dashboard. Carbon is IBM's open-source design system built for enterprise products, providing world-class accessibility, consistency, and scalability.

**Why Carbon?**
- ✅ Built specifically for complex data applications
- ✅ Comprehensive dark theme (Gray 100 theme)
- ✅ WCAG AAA accessibility standards
- ✅ Production-tested by IBM Cloud, Watson, etc.
- ✅ Extensive data visualization guidelines
- ✅ 2px base spacing system for precision
- ✅ Robust motion and interaction patterns

---

## Carbon Design Tokens

### 1. Color System - Gray 100 Theme (Dark)

Carbon uses a **layer-based color system** for dark UIs:

```css
/* === BACKGROUNDS (Layers) === */
--cds-background: #161616;           /* Gray 100 - Main app background */
--cds-layer-01: #262626;             /* Gray 90 - First layer (cards, tiles) */
--cds-layer-02: #393939;             /* Gray 80 - Second layer (nested cards) */
--cds-layer-03: #525252;             /* Gray 70 - Third layer (overlays) */
--cds-layer-accent-01: #393939;      /* Gray 80 - Accent layer */
--cds-field-01: #262626;             /* Gray 90 - Input fields */
--cds-field-02: #393939;             /* Gray 80 - Alternate input fields */

/* === UI ELEMENTS === */
--cds-ui-background: #262626;        /* Gray 90 - Component backgrounds */
--cds-border-subtle: #393939;        /* Gray 80 - Subtle borders */
--cds-border-strong: #8d8d8d;        /* Gray 60 - Strong borders */
--cds-border-interactive: #4589ff;   /* Blue 50 - Interactive borders */

/* === TEXT === */
--cds-text-primary: #f4f4f4;         /* Gray 10 - Primary text */
--cds-text-secondary: #c6c6c6;       /* Gray 30 - Secondary text */
--cds-text-placeholder: #6f6f6f;     /* Gray 60 - Placeholder text */
--cds-text-disabled: #525252;        /* Gray 70 - Disabled text */
--cds-text-on-color: #ffffff;        /* White - Text on colored backgrounds */
--cds-text-inverse: #161616;         /* Gray 100 - Inverse text */

/* === LINK === */
--cds-link-primary: #78a9ff;         /* Blue 40 - Links */
--cds-link-secondary: #a6c8ff;       /* Blue 30 - Secondary links */
--cds-link-visited: #be95ff;         /* Purple 40 - Visited links */

/* === INTERACTIVE STATES === */
--cds-focus: #0f62fe;                /* Blue 60 - Focus indicator */
--cds-hover-primary: #0353e9;        /* Blue 70 - Primary hover */
--cds-hover-secondary: #4c4c4c;      /* Gray 80 hover - Secondary hover */
--cds-active-primary: #002d9c;       /* Blue 80 - Active state */

/* === BRAND COLORS (Blue Scale) === */
--cds-blue-10: #edf5ff;              /* Lightest blue */
--cds-blue-20: #d0e2ff;
--cds-blue-30: #a6c8ff;
--cds-blue-40: #78a9ff;              /* Primary interactive */
--cds-blue-50: #4589ff;              /* Primary brand */
--cds-blue-60: #0f62fe;              /* Primary default */
--cds-blue-70: #0043ce;
--cds-blue-80: #002d9c;
--cds-blue-90: #001d6c;
--cds-blue-100: #001141;             /* Darkest blue */

/* === DATA VIZ COLORS === */
/* Primary Palette (for most charts) */
--cds-data-viz-1: #8a3ffc;           /* Purple */
--cds-data-viz-2: #33b1ff;           /* Cyan */
--cds-data-viz-3: #007d79;           /* Teal */
--cds-data-viz-4: #ff7eb6;           /* Magenta */
--cds-data-viz-5: #fa4d56;           /* Red */
--cds-data-viz-6: #fff1f1;           /* Light pink */
--cds-data-viz-7: #6fdc8c;           /* Green */
--cds-data-viz-8: #4589ff;           /* Blue */
--cds-data-viz-9: #d12771;           /* Deep pink */
--cds-data-viz-10: #d2a106;          /* Gold */
--cds-data-viz-11: #08bdba;          /* Aqua */
--cds-data-viz-12: #bae6ff;          /* Sky blue */

/* Sequential (for heatmaps, gradients) */
--cds-data-viz-sequential-1: #002d9c;
--cds-data-viz-sequential-2: #0043ce;
--cds-data-viz-sequential-3: #0f62fe;
--cds-data-viz-sequential-4: #4589ff;
--cds-data-viz-sequential-5: #78a9ff;

/* Diverging (for correlation matrices) */
--cds-data-viz-diverging-start: #fa4d56;  /* Red end */
--cds-data-viz-diverging-mid: #f4f4f4;    /* Neutral */
--cds-data-viz-diverging-end: #33b1ff;    /* Blue end */

/* === SUPPORT COLORS (Alerts, Status) === */
--cds-support-error: #ff8389;        /* Error - light red */
--cds-support-success: #42be65;      /* Success - green */
--cds-support-warning: #f1c21b;      /* Warning - yellow */
--cds-support-info: #4589ff;         /* Info - blue */
--cds-support-error-inverse: #da1e28;
--cds-support-success-inverse: #24a148;
--cds-support-warning-inverse: #f1c21b;
--cds-support-info-inverse: #0043ce;

/* === BUTTON COLORS === */
--cds-button-primary: #0f62fe;       /* Blue 60 */
--cds-button-primary-hover: #0353e9; /* Blue 70 */
--cds-button-primary-active: #002d9c;/* Blue 80 */
--cds-button-secondary: #6f6f6f;     /* Gray 60 */
--cds-button-danger: #da1e28;        /* Red 60 */
```

### 2. Typography System

Carbon uses **IBM Plex** font family exclusively:

```css
/* === FONT FAMILIES === */
--cds-font-sans: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
--cds-font-mono: 'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Courier New', monospace;

/* === TYPE SCALE === */
/* Carbon uses rem units (1rem = 16px) */

/* Code (Mono) */
--cds-code-01: 0.75rem;              /* 12px */
--cds-code-02: 0.875rem;             /* 14px */

/* Labels */
--cds-label-01: 0.75rem;             /* 12px */
--cds-label-02: 0.875rem;            /* 14px */

/* Helper Text */
--cds-helper-text-01: 0.75rem;       /* 12px */
--cds-helper-text-02: 0.875rem;      /* 14px */

/* Body */
--cds-body-short-01: 0.875rem;       /* 14px / 1.125rem line-height */
--cds-body-short-02: 1rem;           /* 16px / 1.375rem line-height */
--cds-body-long-01: 0.875rem;        /* 14px / 1.25rem line-height */
--cds-body-long-02: 1rem;            /* 16px / 1.5rem line-height */

/* Headings */
--cds-heading-01: 0.875rem;          /* 14px / 1.125rem */
--cds-heading-02: 1rem;              /* 16px / 1.375rem */
--cds-heading-03: 1.25rem;           /* 20px / 1.625rem */
--cds-heading-04: 1.75rem;           /* 28px / 2.25rem */
--cds-heading-05: 2rem;              /* 32px / 2.5rem */
--cds-heading-06: 2.625rem;          /* 42px / 3.125rem */
--cds-heading-07: 3.375rem;          /* 54px / 4rem */

/* Display / Fluid Headings */
--cds-fluid-heading-03: 1.25rem;     /* 20px - responsive */
--cds-fluid-heading-04: 1.75rem;     /* 28px - responsive */
--cds-fluid-heading-05: 2rem;        /* 32px - responsive */
--cds-fluid-heading-06: 2.625rem;    /* 42px - responsive */

/* === FONT WEIGHTS === */
--cds-font-weight-light: 300;
--cds-font-weight-regular: 400;
--cds-font-weight-semibold: 600;

/* === LINE HEIGHTS === */
--cds-line-height-heading: 1.25;
--cds-line-height-body: 1.5;

/* === LETTER SPACING === */
--cds-letter-spacing-01: 0.16px;
--cds-letter-spacing-02: 0.32px;
```

### 3. Spacing System

Carbon uses a **2px base unit** for mathematical precision:

```css
/* === SPACING TOKENS === */
--cds-spacing-01: 0.125rem;          /* 2px */
--cds-spacing-02: 0.25rem;           /* 4px */
--cds-spacing-03: 0.5rem;            /* 8px */
--cds-spacing-04: 0.75rem;           /* 12px */
--cds-spacing-05: 1rem;              /* 16px - Base unit */
--cds-spacing-06: 1.5rem;            /* 24px */
--cds-spacing-07: 2rem;              /* 32px */
--cds-spacing-08: 2.5rem;            /* 40px */
--cds-spacing-09: 3rem;              /* 48px */
--cds-spacing-10: 4rem;              /* 64px */
--cds-spacing-11: 5rem;              /* 80px */
--cds-spacing-12: 6rem;              /* 96px */
--cds-spacing-13: 10rem;             /* 160px */

/* === LAYOUT SPACING === */
--cds-container-01: 1.5rem;          /* 24px - Small containers */
--cds-container-02: 2rem;            /* 32px - Medium containers */
--cds-container-03: 2.5rem;          /* 40px - Large containers */
--cds-container-04: 3rem;            /* 48px - XL containers */
--cds-container-05: 4rem;            /* 64px - XXL containers */

/* === FLUID SPACING === */
--cds-fluid-spacing-01: 0.125rem;    /* 2px */
--cds-fluid-spacing-02: 0.25rem;     /* 4px */
--cds-fluid-spacing-03: 0.5rem;      /* 8px */
--cds-fluid-spacing-04: 1rem;        /* 16px */
```

### 4. Layout Grid

```css
/* === GRID === */
--cds-grid-columns: 16;              /* 16-column grid */
--cds-grid-gutter: 32px;             /* Space between columns */
--cds-grid-margin: 16px;             /* Left/right margins */

/* === BREAKPOINTS === */
--cds-breakpoint-sm: 320px;          /* Small devices */
--cds-breakpoint-md: 672px;          /* Medium devices */
--cds-breakpoint-lg: 1056px;         /* Large devices */
--cds-breakpoint-xlg: 1312px;        /* XL devices */
--cds-breakpoint-max: 1584px;        /* Max width */
```

### 5. Border Radius

```css
/* === BORDER RADIUS === */
--cds-border-radius-none: 0;
--cds-border-radius-sm: 0.125rem;    /* 2px */
--cds-border-radius-md: 0.25rem;     /* 4px */
--cds-border-radius-lg: 0.5rem;      /* 8px */
```

### 6. Elevation (Shadows)

```css
/* === BOX SHADOWS === */
--cds-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
```

### 7. Motion / Animation

```css
/* === DURATION === */
--cds-duration-fast-01: 70ms;        /* Micro-interactions */
--cds-duration-fast-02: 110ms;       /* Micro-interactions */
--cds-duration-moderate-01: 150ms;   /* Small expansion */
--cds-duration-moderate-02: 240ms;   /* Medium expansion */
--cds-duration-slow-01: 400ms;       /* Large expansion */
--cds-duration-slow-02: 700ms;       /* Background dimming */

/* === EASING === */
--cds-ease-standard: cubic-bezier(0.5, 0, 0.1, 1);      /* Standard productive motion */
--cds-ease-entrance: cubic-bezier(0, 0, 0.3, 1);        /* Entrance (enter screen) */
--cds-ease-exit: cubic-bezier(0.5, 0, 1, 1);            /* Exit (leave screen) */
--cds-ease-expressive-standard: cubic-bezier(0.4, 0.14, 0.3, 1);  /* Expressive motion */
--cds-ease-expressive-entrance: cubic-bezier(0, 0, 0.3, 1);
--cds-ease-expressive-exit: cubic-bezier(0.4, 0.14, 1, 1);
```

---

## Component Mapping

### Current → Carbon Migration

| Current Component | Current Colors | Carbon Component | Carbon Colors | Changes Needed |
|-------------------|----------------|------------------|---------------|----------------|
| **Background** | `#0a0a0a`, `#101216` | `cds-background` | `#161616` | Update base background |
| **Cards** | `#1F2328` | `cds-layer-01` | `#262626` | Use layer system |
| **Borders** | `#30363d` | `cds-border-subtle` | `#393939` | Use subtle borders |
| **Primary Accent** | `#00E0FF` (cyan) | `cds-blue-50` | `#4589ff` | Replace with Carbon blue |
| **Secondary Accent** | `#004B87` | `cds-blue-80` | `#002d9c` | Use darker blue |
| **Warning** | `#FFC857` | `cds-support-warning` | `#f1c21b` | Use Carbon warning |
| **Critical** | `#ff4444` | `cds-support-error` | `#ff8389` | Use Carbon error |
| **Text Primary** | `#ffffff` | `cds-text-primary` | `#f4f4f4` | Slightly off-white |
| **Text Secondary** | `#8b949e` | `cds-text-secondary` | `#c6c6c6` | Lighter secondary |
| **Buttons** | Cyan `#00E0FF` | `cds-button-primary` | `#0f62fe` | Blue primary button |
| **Tabs Active** | Cyan gradient | `cds-border-interactive` | `#4589ff` | Use blue accent |
| **Chart Colors** | Cyan/Blue/Amber | Carbon Data Viz palette | Purple/Cyan/Teal/etc | Use 12-color palette |

---

## Implementation Plan

### Phase 1: Foundation (CSS Variables)

```css
:root {
  /* Replace all custom colors with Carbon tokens */

  /* Backgrounds */
  --bg-primary: var(--cds-background, #161616);
  --bg-secondary: var(--cds-layer-01, #262626);
  --bg-tertiary: var(--cds-layer-02, #393939);

  /* Text */
  --text-primary: var(--cds-text-primary, #f4f4f4);
  --text-secondary: var(--cds-text-secondary, #c6c6c6);
  --text-placeholder: var(--cds-text-placeholder, #6f6f6f);

  /* Interactive */
  --interactive-primary: var(--cds-blue-60, #0f62fe);
  --interactive-hover: var(--cds-hover-primary, #0353e9);
  --focus-color: var(--cds-focus, #0f62fe);

  /* Support */
  --error-color: var(--cds-support-error, #ff8389);
  --warning-color: var(--cds-support-warning, #f1c21b);
  --success-color: var(--cds-support-success, #42be65);
  --info-color: var(--cds-support-info, #4589ff);

  /* Spacing (2px base) */
  --spacing-01: 0.125rem;  /* 2px */
  --spacing-02: 0.25rem;   /* 4px */
  --spacing-03: 0.5rem;    /* 8px */
  --spacing-05: 1rem;      /* 16px */
  --spacing-06: 1.5rem;    /* 24px */
  --spacing-07: 2rem;      /* 32px */

  /* Typography */
  --font-sans: 'IBM Plex Sans', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  /* Border radius */
  --radius-sm: 0.125rem;   /* 2px */
  --radius-md: 0.25rem;    /* 4px */
  --radius-lg: 0.5rem;     /* 8px */
}
```

### Phase 2: Component Updates

#### Buttons
```css
.stButton > button {
  background: var(--cds-button-primary, #0f62fe);
  color: var(--cds-text-on-color, #ffffff);
  font-weight: 400;
  border-radius: var(--cds-border-radius-md, 4px);
  padding: var(--cds-spacing-04, 12px) var(--cds-spacing-06, 24px);
  transition: background var(--cds-duration-fast-02, 110ms) var(--cds-ease-standard);
}

.stButton > button:hover {
  background: var(--cds-button-primary-hover, #0353e9);
}

.stButton > button:active {
  background: var(--cds-button-primary-active, #002d9c);
}
```

#### Cards / Tiles
```css
.dashboard-card {
  background: var(--cds-layer-01, #262626);
  border: 1px solid var(--cds-border-subtle, #393939);
  border-radius: var(--cds-border-radius-lg, 8px);
  padding: var(--cds-spacing-06, 24px);
  transition: all var(--cds-duration-moderate-02, 240ms) var(--cds-ease-standard);
}

.dashboard-card:hover {
  border-color: var(--cds-border-interactive, #4589ff);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
```

#### Tabs
```css
.stTabs [data-baseweb="tab-list"] {
  gap: var(--cds-spacing-02, 4px);
  background-color: var(--cds-layer-01, #262626);
  padding: var(--cds-spacing-03, 8px);
  border-radius: var(--cds-border-radius-lg, 8px);
}

.stTabs [aria-selected="true"] {
  background: var(--cds-blue-60, #0f62fe);
  color: var(--cds-text-on-color, #ffffff);
  border-bottom: 2px solid var(--cds-blue-40, #78a9ff);
}
```

#### Alert Boxes
```css
.alert-critical {
  background: rgba(241, 194, 27, 0.1);  /* Warning background */
  border-left: 4px solid var(--cds-support-warning, #f1c21b);
  padding: var(--cds-spacing-05, 16px);
  border-radius: var(--cds-border-radius-md, 4px);
}

.alert-error {
  background: rgba(255, 131, 137, 0.1);  /* Error background */
  border-left: 4px solid var(--cds-support-error, #ff8389);
}

.alert-info {
  background: rgba(69, 137, 255, 0.1);  /* Info background */
  border-left: 4px solid var(--cds-support-info, #4589ff);
}
```

### Phase 3: Data Visualization

```python
# Carbon Charts color palette for Plotly
CARBON_DATA_VIZ_COLORS = [
    '#8a3ffc',  # Purple
    '#33b1ff',  # Cyan
    '#007d79',  # Teal
    '#ff7eb6',  # Magenta
    '#fa4d56',  # Red
    '#fff1f1',  # Light pink
    '#6fdc8c',  # Green
    '#4589ff',  # Blue
    '#d12771',  # Deep pink
    '#d2a106',  # Gold
    '#08bdba',  # Aqua
    '#bae6ff',  # Sky blue
]

plotly_theme_carbon = {
    'template': 'plotly_dark',
    'paper_bgcolor': 'rgba(22, 22, 22, 0)',  # Gray 100
    'plot_bgcolor': 'rgba(38, 38, 38, 0.5)',  # Layer 01
    'font': {
        'family': 'IBM Plex Sans',
        'color': '#c6c6c6',  # Text secondary
        'size': 14
    },
    'colorway': CARBON_DATA_VIZ_COLORS,
    'xaxis': {
        'gridcolor': '#393939',  # Border subtle
        'showline': False,
        'zerolinecolor': '#525252'
    },
    'yaxis': {
        'gridcolor': '#393939',
        'showline': False,
        'zerolinecolor': '#525252'
    }
}
```

### Phase 4: Typography Updates

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;600&family=IBM+Plex+Mono:wght@400;600&display=swap');

/* Headings */
h1 {
  font-family: var(--font-sans);
  font-size: 2.625rem;      /* 42px - heading-06 */
  font-weight: 400;
  line-height: 1.25;
  letter-spacing: 0;
  color: var(--cds-text-primary);
}

h2 {
  font-size: 2rem;          /* 32px - heading-05 */
  font-weight: 400;
}

h3 {
  font-size: 1.75rem;       /* 28px - heading-04 */
  font-weight: 400;
}

/* Body text */
p, .body-text {
  font-family: var(--font-sans);
  font-size: 1rem;          /* 16px - body-long-02 */
  line-height: 1.5;
  font-weight: 400;
  color: var(--cds-text-primary);
}

/* Labels */
label, .label-text {
  font-size: 0.75rem;       /* 12px - label-01 */
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.32px;
  color: var(--cds-text-secondary);
}

/* Metric values */
[data-testid="stMetricValue"] {
  font-family: var(--font-mono);
  font-size: 2rem;          /* 32px */
  font-weight: 600;
  color: var(--cds-blue-50, #4589ff);
}
```

---

## Carbon Icons Integration

### Using Carbon Icons (SVG)

Carbon provides 2000+ icons at https://carbondesignsystem.com/guidelines/icons/library/

**Key Icons for Manufacturing Dashboard:**

| Icon Name | Purpose | Carbon Equivalent |
|-----------|---------|-------------------|
| Predictive Maintenance | Alerts, maintenance | `tool-kit`, `警告` (warning) |
| Machine Performance | Gauges, metrics | `dashboard`, `gauge` |
| Supply Chain | Network | `network`, `flow` |
| AI Recommendation | Insights | `watson`, `chip` |
| Operator Feedback | User interaction | `user--feedback`, `repeat` |
| Digital Twin | Sensors | `iot--platform`, `device-connection` |

**Download from:**
```
https://unpkg.com/@carbon/icons/svg/[size]/[icon-name].svg
```

Example:
```
https://unpkg.com/@carbon/icons/svg/32/dashboard.svg
https://unpkg.com/@carbon/icons/svg/32/warning.svg
https://unpkg.com/@carbon/icons/svg/32/tool-kit.svg
```

---

## Accessibility Improvements

Carbon is WCAG AAA compliant. Key improvements:

### 1. Focus Indicators
```css
*:focus-visible {
  outline: 2px solid var(--cds-focus, #0f62fe);
  outline-offset: 2px;
}
```

### 2. Keyboard Navigation
- All interactive elements must be keyboard accessible
- Tab order follows visual flow
- Skip links for main content

### 3. Color Contrast
- Text on Gray 100: 15.8:1 (AAA)
- Links (Blue 40): 7.1:1 (AA)
- Buttons (Blue 60): 4.5:1 (AA)

### 4. ARIA Labels
```python
# For charts
fig.update_layout(
    title={'text': 'OEE Trend Over Time'},
    xaxis={'title': {'text': 'Date'}},
    yaxis={'title': {'text': 'OEE Percentage'}},
    template='plotly_dark'
)
```

---

## Carbon Motion Guidelines

### Animation Principles

1. **Productive Motion** (Default)
   - Duration: 110-240ms
   - Easing: `cubic-bezier(0.5, 0, 0.1, 1)`
   - Use for: UI transitions, button states, hover effects

2. **Expressive Motion** (Emphasis)
   - Duration: 240-400ms
   - Easing: `cubic-bezier(0.4, 0.14, 0.3, 1)`
   - Use for: Card reveals, page transitions, loading states

### Example Animations

```css
/* Button hover - Productive */
.stButton > button {
  transition: background 110ms cubic-bezier(0.5, 0, 0.1, 1);
}

/* Card reveal - Expressive */
.dashboard-card {
  animation: card-reveal 240ms cubic-bezier(0.4, 0.14, 0.3, 1);
}

@keyframes card-reveal {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Carbon vs Current Design Comparison

| Aspect | Current Design | Carbon Design | Improvement |
|--------|----------------|---------------|-------------|
| **Color System** | Custom cyan/amber | Gray 100 theme + Blue scale | More professional, IBM-backed |
| **Typography** | Inter + IBM Plex | IBM Plex only | Consistency, IBM brand |
| **Spacing** | Arbitrary (12px, 24px) | 2px base scale | Mathematical precision |
| **Accessibility** | WCAG AA | WCAG AAA | Better for users with disabilities |
| **Data Viz** | 4 colors | 12-color palette | More data series supported |
| **Icons** | Custom SVGs | 2000+ Carbon icons | Comprehensive, professional |
| **Motion** | 0.3s ease | Productive/Expressive motion | Refined, purposeful |
| **Grid** | Ad-hoc | 16-column system | Structured, responsive |

---

## Implementation Checklist

### CSS Updates
- [ ] Replace color tokens with Carbon colors
- [ ] Update spacing to 2px base scale
- [ ] Change font imports to IBM Plex only
- [ ] Update border radius to Carbon values
- [ ] Implement Carbon motion/easing

### Component Updates
- [ ] Buttons → Carbon primary button style
- [ ] Cards → Carbon tile/layer system
- [ ] Tabs → Carbon tab component style
- [ ] Alerts → Carbon notification patterns
- [ ] Metrics → Carbon productive heading scale

### Data Visualization
- [ ] Replace chart colors with Carbon data viz palette
- [ ] Update Plotly theme to Carbon dark theme
- [ ] Use IBM Plex Sans for chart labels
- [ ] Implement Carbon grid colors

### Icons
- [ ] Download Carbon icons (dashboard, warning, tool-kit, etc.)
- [ ] Replace current SVGs with Carbon SVGs
- [ ] Ensure 32px size for consistency

### Typography
- [ ] Remove Inter font import
- [ ] Update all headings to Carbon type scale
- [ ] Use IBM Plex Mono for metrics/code
- [ ] Apply proper line heights (1.25 for headings, 1.5 for body)

### Accessibility
- [ ] Add focus indicators (2px outline)
- [ ] Test keyboard navigation
- [ ] Verify color contrast ratios
- [ ] Add ARIA labels to charts

### Documentation
- [ ] Update DESIGN_SYSTEM.md with Carbon references
- [ ] Link to Carbon documentation
- [ ] Document color token mappings
- [ ] Add Carbon component examples

---

## Resources

### Official Carbon Resources
- **Website:** https://carbondesignsystem.com
- **GitHub:** https://github.com/carbon-design-system/carbon
- **Icons:** https://carbondesignsystem.com/guidelines/icons/library/
- **Color Tokens:** https://carbondesignsystem.com/guidelines/color/tokens/
- **Figma Kit:** https://www.figma.com/community/file/1157761560874207208

### Carbon for Data Visualization
- **Carbon Charts:** https://charts.carbondesignsystem.com/
- **Data Viz Guidance:** https://carbondesignsystem.com/data-visualization/getting-started/

### Accessibility
- **Carbon A11y Guide:** https://carbondesignsystem.com/guidelines/accessibility/overview/
- **WCAG Standards:** https://www.w3.org/WAI/WCAG21/quickref/

---

## Next Steps

1. ✅ Complete this design token extraction
2. ⏭️ Update app.py CSS with Carbon tokens
3. ⏭️ Replace chart colors with Carbon data viz palette
4. ⏭️ Download and integrate Carbon icons
5. ⏭️ Test accessibility compliance
6. ⏭️ Update documentation

---

<div align="center">

**Carbon Integration v1.0**

*Bringing IBM's world-class design system to manufacturing intelligence*

</div>
