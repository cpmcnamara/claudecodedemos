// World 2 - Core Studios (Hub Build)
class World2 extends Phaser.Scene {
    constructor() {
        super({ key: 'World2' });
    }

    init(data) {
        this.totalScore = data.score || 0;
    }

    create() {
        this.worldComplete = false;

        // Background - futuristic lab
        this.createLab();

        // Create player
        this.player = new Mark(this, 100, 500);

        // Create HUD
        this.hud = new HUD(this);
        this.hud.score = this.totalScore;
        this.hud.update();
        this.hud.setObjective('Build Core • Collect 9 orbs (3 per studio)');
        this.hud.showTutorial('BUILD CORE');

        // Create three zones
        this.createZones();

        // Create orbs
        this.orbs = this.createOrbs();

        // Create consoles
        this.consoles = this.createConsoles();

        // Puzzle tracker
        this.orbsCollected = { data: 0, design: 0, systems: 0 };
        this.puzzlesCompleted = 0;

        // Start timer
        this.hud.startTimer(30, () => this.failWorld());

        // Collision
        this.physics.add.overlap(this.player.sprite, this.orbs, (player, orb) => {
            this.collectOrb(orb);
        });
    }

    createLab() {
        // Three colored zones
        const zones = [
            { x: 200, y: 450, color: COLORS.BLUE, alpha: 0.2 },
            { x: 600, y: 450, color: COLORS.PURPLE, alpha: 0.2 },
            { x: 1000, y: 450, color: 0x808080, alpha: 0.2 }
        ];

        zones.forEach(zone => {
            this.add.rectangle(zone.x, zone.y, 300, 400, zone.color, zone.alpha);
        });

        // Zone labels
        this.add.text(200, 250, 'AI & Data', { fontSize: '18px', color: '#00C1D5' }).setOrigin(0.5);
        this.add.text(600, 250, 'Design', { fontSize: '18px', color: '#6E1E96' }).setOrigin(0.5);
        this.add.text(1000, 250, 'Technology', { fontSize: '18px', color: '#808080' }).setOrigin(0.5);

        // Ground
        const ground = this.add.rectangle(600, 650, 1200, 50, COLORS.SLATE);
        this.physics.add.existing(ground, true);
        this.physics.add.collider(this.player.sprite, ground);
    }

    createZones() {
        // Platforms for each zone
        const platforms = [
            // Data zone
            { x: 150, y: 550 },
            { x: 200, y: 450 },
            { x: 250, y: 350 },
            // Design zone
            { x: 550, y: 550 },
            { x: 600, y: 450 },
            { x: 650, y: 350 },
            // Systems zone
            { x: 950, y: 550 },
            { x: 1000, y: 450 },
            { x: 1050, y: 350 }
        ];

        this.platforms = this.physics.add.staticGroup();

        platforms.forEach(pos => {
            const platform = this.add.rectangle(pos.x, pos.y, 100, 20, COLORS.SLATE);
            this.physics.add.existing(platform, true);
            this.platforms.add(platform);
        });

        this.physics.add.collider(this.player.sprite, this.platforms);
    }

    createOrbs() {
        const orbGroup = this.physics.add.group();

        const orbPositions = [
            // Data orbs (blue)
            { x: 150, y: 520, type: 'data', color: COLORS.BLUE },
            { x: 200, y: 420, type: 'data', color: COLORS.BLUE },
            { x: 250, y: 320, type: 'data', color: COLORS.BLUE },
            // Design orbs (purple)
            { x: 550, y: 520, type: 'design', color: COLORS.PURPLE },
            { x: 600, y: 420, type: 'design', color: COLORS.PURPLE },
            { x: 650, y: 320, type: 'design', color: COLORS.PURPLE },
            // Systems orbs (gray)
            { x: 950, y: 520, type: 'systems', color: 0x808080 },
            { x: 1000, y: 420, type: 'systems', color: 0x808080 },
            { x: 1050, y: 320, type: 'systems', color: 0x808080 }
        ];

        orbPositions.forEach(pos => {
            const orb = this.add.circle(pos.x, pos.y, 12, pos.color);
            this.physics.add.existing(orb);
            orb.body.setAllowGravity(false);
            orb.orbType = pos.type;

            // Glow effect
            this.tweens.add({
                targets: orb,
                alpha: { from: 1, to: 0.5 },
                scale: { from: 1, to: 1.2 },
                duration: 1000,
                yoyo: true,
                repeat: -1
            });

            orbGroup.add(orb);
        });

        return orbGroup;
    }

    createConsoles() {
        const consolePositions = [
            { x: 200, y: 600, type: 'data' },
            { x: 600, y: 600, type: 'design' },
            { x: 1000, y: 600, type: 'systems' }
        ];

        return consolePositions.map(pos => {
            const console = this.add.rectangle(pos.x, pos.y, 80, 80, COLORS.SLATE)
                .setStrokeStyle(3, COLORS.CYAN);

            return {
                sprite: console,
                type: pos.type,
                active: false
            };
        });
    }

    collectOrb(orb) {
        const type = orb.orbType;
        this.orbsCollected[type]++;

        orb.destroy();
        this.hud.addScore(SCORING.orbCollect);

        // Check if zone is complete
        if (this.orbsCollected[type] === 3) {
            this.activateConsole(type);
        }
    }

    activateConsole(type) {
        const console = this.consoles.find(c => c.type === type);

        if (console && !console.active) {
            console.active = true;

            // Create encode puzzle (auto-solve)
            const puzzle = new EncodePuzzle(this, console.sprite.x, console.sprite.y - 150, () => {
                this.completeCore(type);
            });

            puzzle.autoSolve();
        }
    }

    completeCore(type) {
        this.puzzlesCompleted++;
        this.hud.addScore(SCORING.patternComplete);

        const console = this.consoles.find(c => c.type === type);
        console.sprite.setFillStyle(COLORS.CYAN);

        // Check if all cores complete
        if (this.puzzlesCompleted === 3) {
            this.activateReactor();
        }
    }

    activateReactor() {
        // Create central reactor
        const reactor = this.add.circle(600, 400, 50, COLORS.GOLD);

        this.tweens.add({
            targets: reactor,
            angle: 360,
            scale: { from: 1, to: 1.5 },
            duration: 2000,
            repeat: -1
        });

        this.hud.setObjective('Core complete! Reactor active!');

        // Complete world after short delay
        this.time.delayedCall(2000, () => this.completeWorld());
    }

    update() {
        this.player.update();
    }

    completeWorld() {
        if (this.worldComplete) return;
        this.worldComplete = true;

        this.hud.stopTimer();

        const timeBonus = Math.floor(this.hud.getTimeRemaining() * SCORING.timeBonus);
        this.hud.addScore(timeBonus);

        this.cameras.main.fade(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
            this.scene.start('World3', { score: this.hud.score });
        });
    }

    failWorld() {
        this.scene.restart();
    }
}
