# Mark the Consultant - Rise of the Capability Platform

A 2D platformer game that demonstrates Capgemini Invent's Capability Platform Model transformation.

## Game Overview

**Genre:** 2D Side-scrolling Platformer (Mario-style)
**Session Length:** Approximately 3 minutes (6 worlds × 30 seconds each)
**Technology:** Phaser.js 3 (HTML5/JavaScript)

## Core Message

Experience the transformation from traditional siloed consulting pyramids to the modern Capability Platform Model:

**Core Studios → Process Guilds → Industries → Fusion Pods → Deals → Platform Enterprise**

## How to Play

### Installation

1. Open `index.html` in a modern web browser
2. No installation or build process required!

### Controls

- **← →** Move left/right
- **SPACE** Jump (press again for double jump)
- **E** Connect Beam (link NPCs and nodes)
- **Q** Summon Fusion Pod
- **SHIFT** Dash (Blueprint slide)
- **↑ ↓** Adjust power (World 6 only)
- **1-5** Select tower (World 6 only)

## The Six Worlds

### World 1: The Pyramid Collapse
**Objective:** Escape the collapsing pyramid and connect three silos
**Message:** Old hierarchy is fragile; connections create speed

**Gameplay:**
- Avoid latency blobs that slow you down
- Use Connect Beam (E) to link three elevators (Strategy/Ops/Tech)
- Watch the pyramid transform into a network grid
- Exit to the right

### World 2: Core Studios (Hub Build)
**Objective:** Collect and install 9 orbs (3 per Core Studio)
**Message:** Core Studios build foundation for reuse and capability

**Gameplay:**
- Collect blue (Data), purple (Design), and gray (Systems) orbs
- Each set of 3 orbs activates a console
- Watch all three Cores light up
- Central Reactor spins when complete

**Core Studios:**
- AI & Data
- Design
- Technology & Systems

### World 3: Process Guilds
**Objective:** Capture expert NPCs and encode their rules into Guild patterns
**Message:** Guilds codify processes; duplication eliminated

**Gameplay:**
- Tag 6 wandering experts with Connect Beam (E)
- Collect rule fragments
- Take fragments to the Knowledge Forge (center)
- Watch the gold Pattern Crystal emerge

**Guilds:**
- Supply Chain
- Quality
- Finance
- Manufacturing
- Planning
- Operations

### World 4: Industry Fronts
**Objective:** Deliver value to all six industries using Fusion Pods
**Message:** Industries pull from Core; Fusion Pods execute governed deployments

**Gameplay:**
- Press Q to summon pods based on deal size
- Navigate unique obstacles for each industry:
  - **Life Sciences:** Compliance lasers (timing)
  - **Automotive:** Conveyor belts (speed)
  - **Resources:** Cave-ins (windows)
  - **Aerospace:** Zero-G jumps
  - **Tech:** Code walls
  - **Consumer Products:** Feedback loops

### World 5: Deal Review Process
**Objective:** Pass three Deal Gates with correct pod mix
**Message:** Fusion Pods allocated by deal size through review; discipline not chaos

**Gameplay:**
- Gate 1: Small deal → 1 pod
- Gate 2: Medium deal → 2 pods
- Gate 3: Large deal → 3 pods
- Get green approval stamps

### World 6: Platform Enterprise
**Objective:** Keep all product lines active for 30 seconds
**Message:** Transition from service delivery to productized platform

**Gameplay:**
- Connect cables from Core Hub to 5 towers (E key)
- Balance power loads with arrow keys (↑↓)
- Use number keys (1-5) to select towers
- Keep all bars in green zone
- Watch ARR meter fill
- Enjoy the fireworks!

**Product Lines:**
- AI for Quality
- Scheduling
- Compliance
- Yield
- Customer Experience

## Scoring System

- **+10 pts** per orb/pattern/deal
- **+5s bonus** per second under target time
- **Final metrics:**
  - Reuse Rate %
  - Industry Coverage %
  - ARR Growth %

## Design System

### Capgemini Color Palette

- **Blue (#0065A4):** Primary brand color
- **Purple (#6E1E96):** Secondary accent
- **Cyan (#00C1D5):** Connections and energy
- **Gold (#F2C94C):** Success and achievements
- **Slate (#20303C):** Backgrounds and structures

### Character: Mark Landry

- Age: 55 years
- Appearance: Lean, short gray hair
- Outfit: Blue blazer, white shirt
- Idle animation: Tapping on tablet

## Technical Architecture

### File Structure

```
mark-the-consultant/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Capgemini design system
├── js/
│   ├── config.js          # Game configuration
│   ├── main.js            # Game bootstrap & scenes
│   ├── player/
│   │   └── Mark.js        # Player character
│   ├── mechanics/
│   │   ├── ConnectBeam.js
│   │   ├── FusionPodManager.js
│   │   ├── EncodePuzzle.js
│   │   └── DealGate.js
│   ├── ui/
│   │   └── HUD.js         # Timer, score, objectives
│   └── worlds/
│       ├── World1.js      # Pyramid Collapse
│       ├── World2.js      # Core Studios
│       ├── World3.js      # Process Guilds
│       ├── World4.js      # Industry Fronts
│       ├── World5.js      # Deal Review
│       └── World6.js      # Platform Enterprise
└── assets/                # (Future: sprites, audio)
```

### Core Mechanics

**ConnectBeam()** - Raycast system that links NPCs and nodes, changes colors, unlocks bridges

**EncodePuzzle()** - Drag-and-drop puzzle assembling Data-Design-Systems icons (auto-solves in current version)

**FusionPodManager()** - Spawns 1-3 assist bots based on deal size; bots auto-follow and interact

**DealGate()** - Door object with deal size requirements; opens when pod count matches

**Timer()** - 30-second countdown per world; success if objective reached

**PulseBack()** - Glowing pulse feedback loop animation

## Development Notes

### Current Implementation

- Placeholder graphics (colored shapes)
- Simplified auto-solve puzzles for rapid prototyping
- Browser-based sound effects (console logs)
- Responsive controls and physics

### Future Enhancements

1. **Art Assets:**
   - Professional sprite sheets for Mark
   - Detailed background art for each world
   - Particle effects and animations
   - Capgemini-branded UI elements

2. **Audio:**
   - Electronic background music (tempo increases per world)
   - Sound effects (ping, chime, whoosh)
   - Voice-over for Mark

3. **Gameplay:**
   - Interactive drag-and-drop puzzles
   - More complex obstacle patterns
   - Leaderboard system
   - Mobile touch controls

4. **Polish:**
   - Cutscenes between worlds
   - Achievement system
   - Tutorial overlay animations
   - Accessibility options

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Credits

**Concept:** Capgemini Invent - Capability Platform Model
**Game Design:** Production-level functional specification
**Technology:** Phaser.js 3.60.0
**Implementation:** Claude Code

## Message

> "Invent Learned to Learn"

This game demonstrates how Capgemini Invent's Capability Platform Model replaces traditional consulting silos with a connected, scalable, productized approach that delivers value across industries.

---

**Play the game and experience the transformation!**
