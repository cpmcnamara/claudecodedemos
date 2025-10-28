// World 4 - Industry Fronts (Deployment)
class World4 extends Phaser.Scene {
    constructor() {
        super({ key: 'World4' });
    }

    init(data) {
        this.totalScore = data.score || 0;
    }

    create() {
        this.worldComplete = false;
        this.currentIndustry = 0;

        // Industries configuration
        this.industries = [
            { name: 'Life Sciences', color: 0x4CAF50, dealSize: 'small', obstacle: 'lasers' },
            { name: 'Automotive', color: 0xFF9800, dealSize: 'small', obstacle: 'conveyors' },
            { name: 'Resources', color: 0x795548, dealSize: 'medium', obstacle: 'caves' },
            { name: 'Aerospace', color: 0x2196F3, dealSize: 'medium', obstacle: 'zerog' },
            { name: 'Tech', color: 0x9C27B0, dealSize: 'large', obstacle: 'codewalls' },
            { name: 'Consumer', color: 0xE91E63, dealSize: 'large', obstacle: 'feedback' }
        ];

        // Create player
        this.player = new Mark(this, 100, 500);

        // Create fusion pod manager
        this.podManager = new FusionPodManager(this);

        // Create HUD
        this.hud = new HUD(this);
        this.hud.score = this.totalScore;
        this.hud.update();
        this.hud.setObjective('Deploy Pods • Press Q to summon pods for each industry');
        this.hud.showTutorial('DEPLOY PODS');

        // Start with first industry
        this.setupIndustry(0);

        // Start timer
        this.hud.startTimer(30, () => this.failWorld());
    }

    setupIndustry(index) {
        // Clear previous
        if (this.currentBiome) {
            this.currentBiome.forEach(obj => obj.destroy());
        }

        this.currentIndustry = index;
        const industry = this.industries[index];

        // Background color
        this.cameras.main.setBackgroundColor(industry.color);

        // Create biome
        this.currentBiome = [];

        // Industry label
        const label = this.add.text(600, 50, industry.name, {
            fontSize: '32px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.currentBiome.push(label);

        // Ground
        const ground = this.add.rectangle(600, 600, 1200, 100, COLORS.SLATE);
        this.physics.add.existing(ground, true);
        this.physics.add.collider(this.player.sprite, ground);
        this.currentBiome.push(ground);

        // Create obstacles based on type
        this.createObstacles(industry.obstacle);

        // Exit gate
        this.exitGate = this.add.rectangle(1100, 500, 50, 150, COLORS.CYAN, 0.5);
        this.physics.add.existing(this.exitGate, true);
        this.currentBiome.push(this.exitGate);

        // Reset player
        this.player.sprite.setPosition(100, 500);

        // Update objective
        this.hud.setObjective(`${industry.name} • Summon ${industry.dealSize} pod(s) (Q)`);
    }

    createObstacles(type) {
        switch(type) {
            case 'lasers':
                this.createLasers();
                break;
            case 'conveyors':
                this.createConveyors();
                break;
            case 'caves':
                this.createCaves();
                break;
            case 'zerog':
                this.createZeroG();
                break;
            case 'codewalls':
                this.createCodeWalls();
                break;
            case 'feedback':
                this.createFeedbackLoops();
                break;
        }
    }

    createLasers() {
        // Compliance lasers (force timing)
        for (let i = 0; i < 3; i++) {
            const laser = this.add.rectangle(400 + i * 200, 300, 5, 400, COLORS.RED);
            this.physics.add.existing(laser, true);

            this.tweens.add({
                targets: laser,
                alpha: { from: 0.2, to: 1 },
                duration: 1000,
                yoyo: true,
                repeat: -1
            });

            this.currentBiome.push(laser);
        }
    }

    createConveyors() {
        // Moving platforms
        for (let i = 0; i < 3; i++) {
            const conveyor = this.add.rectangle(400 + i * 150, 400 + i * 50, 100, 20, 0xFF9800);
            this.physics.add.existing(conveyor, true);
            this.physics.add.collider(this.player.sprite, conveyor);

            conveyor.body.setVelocityX(100 * (i % 2 === 0 ? 1 : -1));
            conveyor.body.setImmovable(true);

            this.currentBiome.push(conveyor);
        }
    }

    createCaves() {
        // Falling rocks
        const caveTop = this.add.rectangle(600, 200, 400, 100, 0x795548);
        this.currentBiome.push(caveTop);

        for (let i = 0; i < 3; i++) {
            const rock = this.add.circle(500 + i * 100, 250, 20, 0x4E342E);
            this.physics.add.existing(rock);
            rock.body.setAllowGravity(false);

            this.time.addEvent({
                delay: 2000 + i * 1000,
                callback: () => {
                    if (rock.body) rock.body.setVelocityY(200);
                },
                loop: true
            });

            this.currentBiome.push(rock);
        }
    }

    createZeroG() {
        // Reduce gravity temporarily
        this.player.sprite.body.setGravityY(-600); // Lighter gravity

        const indicator = this.add.text(600, 300, '⚠ Zero-G Zone', {
            fontSize: '24px',
            color: '#2196F3'
        }).setOrigin(0.5);

        this.currentBiome.push(indicator);
    }

    createCodeWalls() {
        // Walls that need connection
        for (let i = 0; i < 2; i++) {
            const wall = this.add.rectangle(500 + i * 300, 450, 20, 200, COLORS.PURPLE);
            wall.needsConnection = true;
            this.currentBiome.push(wall);
        }
    }

    createFeedbackLoops() {
        // Bouncing objects
        for (let i = 0; i < 4; i++) {
            const ball = this.add.circle(400 + i * 150, 300, 15, 0xE91E63);
            this.physics.add.existing(ball);
            ball.body.setVelocity(100 * (i % 2 === 0 ? 1 : -1), -150);
            ball.body.setBounce(1);
            ball.body.setCollideWorldBounds(true);

            this.currentBiome.push(ball);
        }
    }

    update() {
        this.player.update();

        // Update pods to follow player
        if (this.podManager.getActivePodCount() > 0) {
            this.podManager.followPlayer(this.player.sprite.x, this.player.sprite.y);
        }

        // Summon pods with Q
        if (Phaser.Input.Keyboard.JustDown(this.player.keyQ)) {
            const industry = this.industries[this.currentIndustry];
            this.podManager.summon(this.player.sprite.x, this.player.sprite.y, industry.dealSize);
            this.hud.addScore(SCORING.dealComplete);
        }

        // Check if reached exit
        if (this.exitGate) {
            const distance = Phaser.Math.Distance.Between(
                this.player.sprite.x,
                this.player.sprite.y,
                this.exitGate.x,
                this.exitGate.y
            );

            if (distance < 60 && this.podManager.getActivePodCount() > 0) {
                this.nextIndustry();
            }
        }
    }

    nextIndustry() {
        this.currentIndustry++;

        if (this.currentIndustry >= this.industries.length) {
            this.completeWorld();
        } else {
            // Clear pods for next industry
            this.podManager.clearPods();
            this.setupIndustry(this.currentIndustry);
        }
    }

    completeWorld() {
        if (this.worldComplete) return;
        this.worldComplete = true;

        this.hud.stopTimer();

        const timeBonus = Math.floor(this.hud.getTimeRemaining() * SCORING.timeBonus);
        this.hud.addScore(timeBonus);

        this.hud.setObjective('All industries deployed!');

        this.cameras.main.fade(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
            this.scene.start('World5', { score: this.hud.score });
        });
    }

    failWorld() {
        this.scene.restart();
    }
}
