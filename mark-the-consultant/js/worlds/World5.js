// World 5 - Deal Review Process (Governance & Allocation)
class World5 extends Phaser.Scene {
    constructor() {
        super({ key: 'World5' });
    }

    init(data) {
        this.totalScore = data.score || 0;
    }

    create() {
        this.worldComplete = false;

        // Background - boardroom
        this.cameras.main.setBackgroundColor(COLORS.SLATE);

        // Create floating platforms (boardroom floors)
        this.createBoardroom();

        // Create player
        this.player = new Mark(this, 100, 500);

        // Create fusion pod manager
        this.podManager = new FusionPodManager(this);

        // Create HUD
        this.hud = new HUD(this);
        this.hud.score = this.totalScore;
        this.hud.update();
        this.hud.setObjective('Review Deals • Pass 3 gates with correct pod mix');
        this.hud.showTutorial('REVIEW DEALS');

        // Create three deal gates
        this.gates = this.createGates();

        // Core recharge station
        this.rechargeStation = this.createRechargeStation();

        // Current gate index
        this.currentGate = 0;
        this.gatesPassed = 0;

        // Start timer
        this.hud.startTimer(30, () => this.failWorld());

        // Dashboard displays
        this.createDashboards();
    }

    createBoardroom() {
        // Ground
        const ground = this.add.rectangle(600, 620, 1200, 40, COLORS.SLATE);
        this.physics.add.existing(ground, true);
        this.physics.add.collider(this.player.sprite, ground);

        // Floating platforms
        const platforms = [
            { x: 200, y: 550 },
            { x: 350, y: 500 },
            { x: 550, y: 450 },
            { x: 750, y: 450 },
            { x: 950, y: 500 },
            { x: 1100, y: 550 }
        ];

        this.platforms = this.physics.add.staticGroup();

        platforms.forEach(pos => {
            const platform = this.add.rectangle(pos.x, pos.y, 120, 15, COLORS.BLUE);
            this.physics.add.existing(platform, true);
            this.platforms.add(platform);
        });

        this.physics.add.collider(this.player.sprite, this.platforms);
    }

    createGates() {
        const gateConfigs = [
            { x: 350, y: 420, dealSize: 'small', label: 'Small Deal' },
            { x: 650, y: 370, dealSize: 'medium', label: 'Medium Deal' },
            { x: 950, y: 420, dealSize: 'large', label: 'Large Deal' }
        ];

        return gateConfigs.map(config => {
            const gate = new DealGate(this, config.x, config.y, config.dealSize);
            return gate;
        });
    }

    createRechargeStation() {
        const station = this.add.circle(200, 500, 40, COLORS.CYAN, 0.3)
            .setStrokeStyle(3, COLORS.GOLD);

        this.add.text(200, 500, 'Core\nRecharge', {
            fontSize: '12px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        return station;
    }

    createDashboards() {
        // Holographic displays
        const dashboards = [
            { x: 300, y: 200, text: 'Deal Pipeline' },
            { x: 600, y: 150, text: 'Resource Allocation' },
            { x: 900, y: 200, text: 'Governance Review' }
        ];

        dashboards.forEach(dash => {
            const display = this.add.rectangle(dash.x, dash.y, 150, 80, COLORS.BLUE, 0.2)
                .setStrokeStyle(2, COLORS.CYAN);

            const text = this.add.text(dash.x, dash.y, dash.text, {
                fontSize: '12px',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);

            // Pulse animation
            this.tweens.add({
                targets: display,
                alpha: { from: 0.2, to: 0.4 },
                duration: 1500,
                yoyo: true,
                repeat: -1
            });
        });
    }

    update() {
        this.player.update();

        // Update pods
        if (this.podManager.getActivePodCount() > 0) {
            this.podManager.followPlayer(this.player.sprite.x, this.player.sprite.y);
        }

        // Summon pods with Q
        if (Phaser.Input.Keyboard.JustDown(this.player.keyQ)) {
            const currentGateConfig = ['small', 'medium', 'large'][this.currentGate];
            this.podManager.summon(this.player.sprite.x, this.player.sprite.y, currentGateConfig);
        }

        // Check gate proximity and requirements
        this.gates.forEach((gate, index) => {
            if (index === this.currentGate && !gate.isOpen()) {
                const distance = Phaser.Math.Distance.Between(
                    this.player.sprite.x,
                    this.player.sprite.y,
                    gate.x,
                    gate.y
                );

                if (distance < 100) {
                    const podCount = this.podManager.getActivePodCount();

                    if (gate.checkRequirement(podCount)) {
                        this.passGate(index);
                    }
                }
            }
        });

        // Recharge station
        const distanceToRecharge = Phaser.Math.Distance.Between(
            this.player.sprite.x,
            this.player.sprite.y,
            this.rechargeStation.x,
            this.rechargeStation.y
        );

        if (distanceToRecharge < 60) {
            this.rechargeStation.setStrokeStyle(5, COLORS.GOLD);
        } else {
            this.rechargeStation.setStrokeStyle(3, COLORS.GOLD);
        }
    }

    passGate(index) {
        this.gatesPassed++;
        this.currentGate++;

        this.hud.addScore(SCORING.dealComplete);

        // Green stamp effect
        const stamp = this.add.text(this.gates[index].x, this.gates[index].y, '✓ APPROVED', {
            fontSize: '24px',
            color: '#00FF00',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: stamp,
            alpha: 0,
            y: this.gates[index].y - 50,
            duration: 1500,
            onComplete: () => stamp.destroy()
        });

        // Update objective
        if (this.gatesPassed < 3) {
            this.hud.setObjective(`Gate ${this.gatesPassed} passed! Next: ${this.gates[this.currentGate].dealSize} deal`);
            this.podManager.clearPods();
        } else {
            this.completeWorld();
        }
    }

    completeWorld() {
        if (this.worldComplete) return;
        this.worldComplete = true;

        this.hud.stopTimer();

        const timeBonus = Math.floor(this.hud.getTimeRemaining() * SCORING.timeBonus);
        this.hud.addScore(timeBonus);

        this.hud.setObjective('All deals approved! Governance complete!');

        this.cameras.main.fade(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
            this.scene.start('World6', { score: this.hud.score });
        });
    }

    failWorld() {
        this.scene.restart();
    }
}
