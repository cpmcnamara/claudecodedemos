# Quick Start Guide - Mark the Consultant

## Play Now!

Simply open `index.html` in your web browser - no installation needed!

## Quick Controls Reference

```
MOVEMENT:
← → Arrow Keys    Move left/right
SPACE             Jump (press twice for double jump)
SHIFT             Dash (speed boost)

ACTIONS:
E                 Connect Beam (link objects)
Q                 Summon Fusion Pods

WORLD 6 ONLY:
↑ ↓               Adjust power levels
1, 2, 3, 4, 5    Select towers
```

## World-by-World Speedrun Guide

### World 1 (30s) - Pyramid Collapse
1. Run right
2. Press E near the 3 purple elevators to connect them
3. Once all 3 are connected (they turn cyan), run to the cyan exit on the right

### World 2 (30s) - Core Studios
1. Jump through the 3 colored zones collecting orbs
2. Blue orbs (left), Purple orbs (middle), Gray orbs (right)
3. Puzzles auto-solve when you collect all 3 orbs of each color
4. Wait for the gold reactor to spin in the center
5. Auto-advances after 2 seconds

### World 3 (30s) - Process Guilds
1. Run around the circular arena
2. Press E near the 6 wandering gold NPCs to tag them
3. Collect all 6 fragments
4. Go to the center red forge
5. Wait for the gold crystal to appear

### World 4 (30s) - Industry Fronts
1. For EACH of the 6 industries:
   - Press Q to summon pods
   - Navigate obstacles
   - Reach the cyan exit on the right
2. Industries auto-switch when you reach the exit
3. Watch for different colored backgrounds

### World 5 (30s) - Deal Review
1. Small deal (left): Press Q once, approach gate
2. Medium deal (middle): Press Q, approach gate
3. Large deal (right): Press Q, approach gate
4. Each gate shows "✓ APPROVED" when passed

### World 6 (30s) - Platform Enterprise
1. Jump around and press E near each of the 5 tower ports to connect them
2. Once all connected, use arrow keys (↑↓) to adjust power
3. Press 1-5 to switch between towers
4. Keep all power bars GREEN for ~10 seconds
5. Watch the ARR meter (right side) fill up
6. Enjoy the fireworks!

## Tips & Tricks

- **Double Jump:** Press SPACE twice to reach high platforms
- **Dash:** Use SHIFT to quickly cross gaps or avoid obstacles
- **Time Bonus:** Complete worlds faster for bonus points
- **Don't Rush World 6:** You need to balance power for 10 seconds, so patience wins!

## Scoring

- Each orb/fragment/connection: **+10 points**
- Time bonus: **+5 points per second** remaining
- Final dashboard shows:
  - Total Score
  - Reuse Rate %
  - Industry Coverage %
  - ARR Growth %

## Troubleshooting

**Game won't load?**
- Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Check browser console (F12) for errors
- Ensure JavaScript is enabled

**Controls not working?**
- Click on the game canvas to focus it
- Try refreshing the page

**Stuck on a world?**
- Each world has a 30-second timer - if you fail, it auto-restarts
- Read the objective text at the bottom center of the screen
- Follow the tutorial messages that appear at the start

## Development Mode

Want to modify the game? All source files are in:
- `js/worlds/World*.js` - Individual world implementations
- `js/mechanics/` - Game mechanics
- `js/player/Mark.js` - Player character
- `js/config.js` - Game settings

Edit these files and refresh your browser to see changes!

## Next Steps

After playing, check out `README.md` for:
- Full game overview
- Design philosophy
- Technical architecture
- Future enhancement ideas

---

**Ready? Open `index.html` and help Mark build the Platform Enterprise!**
