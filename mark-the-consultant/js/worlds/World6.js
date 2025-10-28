// World 6 - Platform Enterprise (Future State)
class World6 extends Phaser.Scene {
    constructor() {
        super({ key: 'World6' });
    }

    init(data) {
        this.totalScore = data.score || 0;
    }

    create() {
        this.worldComplete = false;

        // Background - city skyline
        this.cameras.main.setBackgroundColor(0x1a1a2e);

        // Create city of skyscrapers
        this.createCity();

        // Create player
        this.player = new Mark(this, 100, 500);

        // Create connect beam
        this.connectBeam = new ConnectBeam(this);

        // Create HUD
        this.hud = new HUD(this);
        this.hud.score = this.totalScore;
        this.hud.update();
        this.hud.setObjective('Scale Platform • Connect and balance all towers');
        this.hud.showTutorial('SCALE PLATFORM');

        // Create core hub
        this.coreHub = this.createCoreHub();

        // Create product towers
        this.towers = this.createTowers();

        // Power management
        this.powerLevels = [50, 50, 50, 50, 50]; // One per tower
        this.targetPower = 70;
        this.balancedTime = 0;
        this.requiredBalanceTime = 10; // Seconds

        // Start timer
        this.hud.startTimer(30, () => this.failWorld());

        // Ground
        const ground = this.add.rectangle(600, 620, 1200, 40, COLORS.SLATE);
        this.physics.add.existing(ground, true);
        this.physics.add.collider(this.player.sprite, ground);

        // Create platforms
        this.createPlatforms();

        // ARR meter
        this.arrMeter = this.createARRMeter();
    }

    createCity() {
        // Parallax background with data streams
        for (let i = 0; i < 20; i++) {
            const stream = this.add.rectangle(
                Phaser.Math.Between(0, 1200),
                Phaser.Math.Between(0, 600),
                2,
                Phaser.Math.Between(50, 150),
                COLORS.CYAN,
                0.3
            );

            this.tweens.add({
                targets: stream,
                y: 700,
                duration: Phaser.Math.Between(3000, 6000),
                repeat: -1,
                delay: Phaser.Math.Between(0, 2000)
            });
        }
    }

    createCoreHub() {
        const hub = this.add.circle(200, 500, 50, COLORS.GOLD)
            .setStrokeStyle(4, COLORS.CYAN);

        this.add.text(200, 500, 'CORE\nHUB', {
            fontSize: '14px',
            color: '#000000',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Pulse animation
        this.tweens.add({
            targets: hub,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        return hub;
    }

    createTowers() {
        const towerConfigs = [
            { x: 400, y: 300, label: 'AI Quality', height: 200 },
            { x: 550, y: 250, label: 'Scheduling', height: 250 },
            { x: 700, y: 300, label: 'Compliance', height: 200 },
            { x: 850, y: 350, label: 'Yield', height: 150 },
            { x: 1000, y: 300, label: 'Customer XP', height: 200 }
        ];

        return towerConfigs.map((config, index) => {
            // Tower body
            const tower = this.add.rectangle(
                config.x,
                600 - config.height / 2,
                60,
                config.height,
                COLORS.SLATE
            ).setStrokeStyle(2, COLORS.BLUE);

            // Label
            const label = this.add.text(config.x, 600 - config.height - 20, config.label, {
                fontSize: '12px',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);

            // Connection port
            const port = this.add.circle(config.x, 600 - config.height / 2, 15, COLORS.PURPLE);
            port.connected = false;

            // Power indicator
            const powerBar = this.add.rectangle(
                config.x + 40,
                600 - config.height / 2,
                10,
                100,
                COLORS.RED
            );

            return {
                sprite: tower,
                label: label,
                port: port,
                powerBar: powerBar,
                x: config.x,
                y: 600 - config.height / 2,
                index: index,
                active: false
            };
        });
    }

    createPlatforms() {
        const platforms = [
            { x: 300, y: 550 },
            { x: 450, y: 500 },
            { x: 600, y: 450 },
            { x: 750, y: 500 },
            { x: 900, y: 550 },
            { x: 1050, y: 500 }
        ];

        this.platforms = this.physics.add.staticGroup();

        platforms.forEach(pos => {
            const platform = this.add.rectangle(pos.x, pos.y, 100, 15, COLORS.SLATE);
            this.physics.add.existing(platform, true);
            this.platforms.add(platform);
        });

        this.physics.add.collider(this.player.sprite, this.platforms);
    }

    createARRMeter() {
        const meterBg = this.add.rectangle(1100, 100, 60, 200, COLORS.SLATE)
            .setStrokeStyle(2, COLORS.GOLD);

        const meterFill = this.add.rectangle(1100, 200, 50, 0, COLORS.CYAN);
        meterFill.fillAmount = 0;

        this.add.text(1100, 50, 'ARR', {
            fontSize: '16px',
            color: '#F2C94C',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        return { bg: meterBg, fill: meterFill };
    }

    update() {
        this.player.update();

        // Connect cables with E key
        if (Phaser.Input.Keyboard.JustDown(this.player.keyE)) {
            const target = this.connectBeam.raycast(
                this.player.sprite.x,
                this.player.sprite.y,
                0,
                200,
                this.towers.map(t => t.port)
            );

            if (target && !target.connected) {
                this.connectTower(target);
            }
        }

        // Power management with arrow keys
        if (this.cursors === undefined) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }

        // Select tower with number keys
        if (!this.selectedTower) this.selectedTower = 0;

        const key1 = this.input.keyboard.addKey('ONE');
        const key2 = this.input.keyboard.addKey('TWO');
        const key3 = this.input.keyboard.addKey('THREE');
        const key4 = this.input.keyboard.addKey('FOUR');
        const key5 = this.input.keyboard.addKey('FIVE');

        if (Phaser.Input.Keyboard.JustDown(key1)) this.selectedTower = 0;
        if (Phaser.Input.Keyboard.JustDown(key2)) this.selectedTower = 1;
        if (Phaser.Input.Keyboard.JustDown(key3)) this.selectedTower = 2;
        if (Phaser.Input.Keyboard.JustDown(key4)) this.selectedTower = 3;
        if (Phaser.Input.Keyboard.JustDown(key5)) this.selectedTower = 4;

        // Adjust power
        if (this.cursors.up.isDown) {
            this.powerLevels[this.selectedTower] = Math.min(100, this.powerLevels[this.selectedTower] + 1);
        }
        if (this.cursors.down.isDown) {
            this.powerLevels[this.selectedTower] = Math.max(0, this.powerLevels[this.selectedTower] - 1);
        }

        // Update power bars
        this.towers.forEach((tower, index) => {
            const power = this.powerLevels[index];
            tower.powerBar.setSize(10, power);
            tower.powerBar.y = tower.y + (50 - power / 2);

            // Color based on power level
            if (power >= this.targetPower - 10 && power <= this.targetPower + 10) {
                tower.powerBar.setFillStyle(COLORS.GREEN);
            } else {
                tower.powerBar.setFillStyle(COLORS.RED);
            }
        });

        // Check if all towers balanced
        const allBalanced = this.powerLevels.every(p =>
            p >= this.targetPower - 10 && p <= this.targetPower + 10
        );

        if (allBalanced && this.towers.every(t => t.active)) {
            this.balancedTime += 0.016; // Approx 60fps

            // Update ARR meter
            const fillPercent = Math.min(this.balancedTime / this.requiredBalanceTime, 1);
            this.arrMeter.fill.setSize(50, 180 * fillPercent);
            this.arrMeter.fill.y = 200 - (180 * fillPercent) / 2;

            if (this.balancedTime >= this.requiredBalanceTime) {
                this.completeWorld();
            }
        } else {
            this.balancedTime = Math.max(0, this.balancedTime - 0.032); // Decay faster
        }
    }

    connectTower(port) {
        // Connect from core to tower
        this.connectBeam.connect(this.coreHub, port);

        const tower = this.towers.find(t => t.port === port);
        if (tower) {
            tower.active = true;
            tower.sprite.setFillStyle(COLORS.BLUE);

            this.hud.addScore(SCORING.orbCollect);

            // Pulse back to core
            this.createPulseBack(port.x, port.y);
        }

        // Check if all connected
        if (this.towers.every(t => t.active)) {
            this.hud.setObjective('Balance power! Use ↑↓ arrows and 1-5 keys');
        }
    }

    createPulseBack(fromX, fromY) {
        const pulse = this.add.circle(fromX, fromY, 10, COLORS.CYAN);

        this.tweens.add({
            targets: pulse,
            x: this.coreHub.x,
            y: this.coreHub.y,
            alpha: 0,
            scale: 0.2,
            duration: 1000,
            onComplete: () => pulse.destroy()
        });
    }

    completeWorld() {
        if (this.worldComplete) return;
        this.worldComplete = true;

        this.hud.stopTimer();

        const timeBonus = Math.floor(this.hud.getTimeRemaining() * SCORING.timeBonus);
        this.hud.addScore(timeBonus);

        // Fireworks!
        this.createFireworks();

        this.hud.setObjective('PLATFORM ENTERPRISE ACHIEVED!');

        this.time.delayedCall(3000, () => {
            this.showEndDashboard();
        });
    }

    createFireworks() {
        for (let i = 0; i < 10; i++) {
            this.time.delayedCall(i * 300, () => {
                const x = Phaser.Math.Between(200, 1000);
                const y = Phaser.Math.Between(100, 400);

                const colors = [COLORS.CYAN, COLORS.GOLD, COLORS.PURPLE, COLORS.BLUE];
                const color = Phaser.Math.RND.pick(colors);

                const firework = this.add.circle(x, y, 5, color);

                this.tweens.add({
                    targets: firework,
                    scale: 10,
                    alpha: 0,
                    duration: 1000,
                    onComplete: () => firework.destroy()
                });
            });
        }
    }

    showEndDashboard() {
        this.cameras.main.fade(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
            this.scene.start('EndDashboard', { score: this.hud.score });
        });
    }

    failWorld() {
        this.scene.restart();
    }
}
