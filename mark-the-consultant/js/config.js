// Capgemini Color Palette
const COLORS = {
    BLUE: 0x0065A4,
    PURPLE: 0x6E1E96,
    CYAN: 0x00C1D5,
    GOLD: 0xF2C94C,
    SLATE: 0x20303C,
    WHITE: 0xFFFFFF,
    RED: 0xFF0000,
    GREEN: 0x00FF00
};

// Game Configuration
const GAME_CONFIG = {
    width: 1200,
    height: 675,
    worldDuration: 30000, // 30 seconds per world
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    backgroundColor: COLORS.SLATE
};

// Player Configuration
const PLAYER_CONFIG = {
    speed: 200,
    jumpVelocity: -400,
    dashSpeed: 400,
    dashDuration: 300
};

// Scoring
const SCORING = {
    orbCollect: 10,
    patternComplete: 10,
    dealComplete: 10,
    timeBonus: 5
};
