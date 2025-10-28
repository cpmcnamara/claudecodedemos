// World 1 - The Pyramid Collapse ("Is Consulting Doomed?")
class World1 extends Phaser.Scene {
    constructor() {
        super({ key: 'World1' });
    }

    create() {
        this.worldComplete = false;

        // Background - pyramid structure
        this.createPyramid();

        // Create player
        this.player = new Mark(this, 100, 500);

        // Create connect beam system
        this.connectBeam = new ConnectBeam(this);

        // Create HUD
        this.hud = new HUD(this);
        this.hud.setObjective('Connect Teams • Escape the pyramid');
        this.hud.showTutorial('CONNECT TEAMS');

        // Create elevators (silos to connect)
        this.elevators = this.createElevators();

        // Create latency blobs
        this.blobs = this.createBlobs();

        // Create exit
        this.exit = this.add.rectangle(1100, 500, 50, 100, COLORS.CYAN).setAlpha(0.3);
        this.physics.add.existing(this.exit, true);

        // Collapse progress
        this.collapseProgress = 0;
        this.maxCollapseTime = 30;

        // Start timer
        this.hud.startTimer(30, () => this.failWorld());

        // Collision
        this.physics.add.overlap(this.player.sprite, this.exit, () => {
            if (this.connectBeam.getConnectionCount() >= 3) {
                this.completeWorld();
            }
        });

        // Blob collision
        this.physics.add.overlap(this.player.sprite, this.blobs, (player, blob) => {
            this.player.sprite.body.velocity.x *= 0.5; // Slow down
        });
    }

    createPyramid() {
        // Create stacked office floors
        const floors = [
            { x: 600, y: 550, width: 800, label: 'Operations' },
            { x: 600, y: 400, width: 600, label: 'Technology' },
            { x: 600, y: 250, width: 400, label: 'Strategy' }
        ];

        this.pyramidFloors = [];

        floors.forEach(floor => {
            const rect = this.add.rectangle(floor.x, floor.y, floor.width, 40, COLORS.SLATE)
                .setStrokeStyle(2, COLORS.BLUE);
            this.physics.add.existing(rect, true);

            const label = this.add.text(floor.x, floor.y, floor.label, {
                fontSize: '14px',
                color: '#ffffff'
            }).setOrigin(0.5);

            this.pyramidFloors.push({ rect, label, floor });
        });

        // Add cracks
        this.cracks = [];
        for (let i = 0; i < 10; i++) {
            const crack = this.add.line(
                0, 0,
                Phaser.Math.Between(200, 1000), Phaser.Math.Between(100, 600),
                Phaser.Math.Between(200, 1000), Phaser.Math.Between(100, 600),
                COLORS.RED
            ).setLineWidth(2).setAlpha(0).setOrigin(0, 0);

            this.cracks.push(crack);
        }
    }

    createElevators() {
        const positions = [
            { x: 400, y: 530 },
            { x: 600, y: 380 },
            { x: 800, y: 230 }
        ];

        return positions.map(pos => {
            const elevator = this.add.rectangle(pos.x, pos.y, 40, 80, COLORS.PURPLE);
            elevator.connected = false;
            return elevator;
        });
    }

    createBlobs() {
        const blobGroup = this.physics.add.group();

        for (let i = 0; i < 8; i++) {
            const blob = this.add.circle(
                Phaser.Math.Between(200, 900),
                Phaser.Math.Between(200, 600),
                20,
                COLORS.RED,
                0.5
            );
            this.physics.add.existing(blob);
            blob.body.setAllowGravity(false);
            blob.body.setVelocity(
                Phaser.Math.Between(-50, 50),
                Phaser.Math.Between(-50, 50)
            );
            blob.body.setBounce(1);
            blob.body.setCollideWorldBounds(true);

            blobGroup.add(blob);
        }

        return blobGroup;
    }

    update() {
        this.player.update();

        // Connect beam on E key
        if (Phaser.Input.Keyboard.JustDown(this.player.keyE)) {
            const target = this.connectBeam.raycast(
                this.player.sprite.x,
                this.player.sprite.y,
                0, // Right direction
                200,
                this.elevators
            );

            if (target && !target.connected) {
                this.connectBeam.connect(this.player.sprite, target);
                this.hud.addScore(SCORING.orbCollect);

                // Check if all connected
                if (this.connectBeam.getConnectionCount() >= 3) {
                    this.transformPyramid();
                }
            }
        }

        // Collapse animation
        if (this.connectBeam.getConnectionCount() < 3) {
            this.collapseProgress += 0.016;
            const progress = Math.min(this.collapseProgress / this.maxCollapseTime, 1);

            this.cracks.forEach((crack, i) => {
                if (i < progress * 10) {
                    crack.setAlpha(1);
                }
            });
        }
    }

    transformPyramid() {
        // Transform pyramid into network grid
        this.pyramidFloors.forEach(floor => {
            this.tweens.add({
                targets: floor.rect,
                alpha: 0.3,
                duration: 1000
            });

            floor.rect.setStrokeStyle(2, COLORS.CYAN);
        });

        // Clear blobs
        this.blobs.clear(true, true);

        // Show exit
        this.exit.setAlpha(1);

        this.hud.setObjective('Exit opened! Head to the right →');
    }

    completeWorld() {
        if (this.worldComplete) return;
        this.worldComplete = true;

        this.hud.stopTimer();

        // Time bonus
        const timeBonus = Math.floor(this.hud.getTimeRemaining() * SCORING.timeBonus);
        this.hud.addScore(timeBonus);

        // Transition
        this.cameras.main.fade(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
            this.scene.start('World2', { score: this.hud.score });
        });
    }

    failWorld() {
        this.scene.restart();
    }
}
