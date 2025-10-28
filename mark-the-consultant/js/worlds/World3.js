// World 3 - Process Guilds (Expertise to System)
class World3 extends Phaser.Scene {
    constructor() {
        super({ key: 'World3' });
    }

    init(data) {
        this.totalScore = data.score || 0;
    }

    create() {
        this.worldComplete = false;

        // Create circular arena
        this.createArena();

        // Create player
        this.player = new Mark(this, 600, 500);

        // Create connect beam
        this.connectBeam = new ConnectBeam(this);

        // Create HUD
        this.hud = new HUD(this);
        this.hud.score = this.totalScore;
        this.hud.update();
        this.hud.setObjective('Encode Guilds • Tag 6 experts and arrange patterns');
        this.hud.showTutorial('ENCODE GUILDS');

        // Create guild towers
        this.towers = this.createTowers();

        // Create wandering experts
        this.experts = this.createExperts();

        // Forge (center)
        this.forge = this.createForge();

        // Fragments collected
        this.fragments = [];

        // Start timer
        this.hud.startTimer(30, () => this.failWorld());

        // Ground
        const ground = this.add.circle(600, 650, 400, COLORS.SLATE, 0.3);
        this.physics.add.existing(ground, true);
        this.physics.add.collider(this.player.sprite, ground);
    }

    createArena() {
        // Circular ring
        const ring = this.add.circle(600, 400, 350);
        ring.setStrokeStyle(4, COLORS.CYAN);
        ring.setFillStyle(COLORS.SLATE, 0.1);
    }

    createTowers() {
        const guilds = [
            'Supply Chain',
            'Quality',
            'Finance',
            'Manufacturing',
            'Planning',
            'Operations'
        ];

        const towers = [];
        const radius = 300;
        const centerX = 600;
        const centerY = 400;

        guilds.forEach((guild, i) => {
            const angle = (i / guilds.length) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            const tower = this.add.rectangle(x, y, 60, 80, COLORS.PURPLE, 0.5)
                .setStrokeStyle(2, COLORS.GOLD);

            const label = this.add.text(x, y + 50, guild, {
                fontSize: '10px',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);

            towers.push({ sprite: tower, label, guild, x, y });
        });

        return towers;
    }

    createExperts() {
        const expertGroup = this.physics.add.group();

        for (let i = 0; i < 6; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 100 + Math.random() * 150;
            const x = 600 + Math.cos(angle) * radius;
            const y = 300 + Math.sin(angle) * radius;

            const expert = this.add.circle(x, y, 15, COLORS.GOLD);
            this.physics.add.existing(expert);
            expert.body.setVelocity(
                Phaser.Math.Between(-30, 30),
                Phaser.Math.Between(-30, 30)
            );
            expert.body.setBounce(1);
            expert.body.setCollideWorldBounds(true);
            expert.tagged = false;

            // Add "head" indicator
            expert.head = this.add.circle(x, y - 10, 8, 0xFFAAAA);

            expertGroup.add(expert);
        }

        return expertGroup;
    }

    createForge() {
        const forge = this.add.circle(600, 400, 60, COLORS.RED, 0.3)
            .setStrokeStyle(3, COLORS.GOLD);

        this.add.text(600, 400, 'Knowledge\nForge', {
            fontSize: '12px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        return forge;
    }

    update() {
        this.player.update();

        // Update expert head positions
        this.experts.children.entries.forEach(expert => {
            if (expert.head) {
                expert.head.x = expert.x;
                expert.head.y = expert.y - 20;
            }
        });

        // Tag experts with E key
        if (Phaser.Input.Keyboard.JustDown(this.player.keyE)) {
            const target = this.connectBeam.raycast(
                this.player.sprite.x,
                this.player.sprite.y,
                0,
                150,
                this.experts.children.entries
            );

            if (target && !target.tagged) {
                this.tagExpert(target);
            }
        }

        // Check if near forge with all fragments
        if (this.fragments.length === 6) {
            const distance = Phaser.Math.Distance.Between(
                this.player.sprite.x,
                this.player.sprite.y,
                this.forge.x,
                this.forge.y
            );

            if (distance < 100) {
                this.encodeGuilds();
            }
        }
    }

    tagExpert(expert) {
        expert.tagged = true;
        expert.setFillStyle(COLORS.CYAN);

        // Create fragment
        const fragment = this.add.rectangle(
            expert.x,
            expert.y,
            20,
            20,
            COLORS.GOLD
        );

        this.tweens.add({
            targets: fragment,
            x: this.player.sprite.x,
            y: this.player.sprite.y,
            duration: 500,
            onComplete: () => {
                fragment.destroy();
                this.fragments.push({ type: 'rule' });
                this.hud.addScore(SCORING.orbCollect);
                this.hud.setObjective(`Fragments: ${this.fragments.length}/6 • Go to forge`);
            }
        });

        // Play connect sound
        this.connectBeam.playConnectSound();
    }

    encodeGuilds() {
        if (this.worldComplete) return;

        // Create encode puzzle at forge
        const puzzle = new EncodePuzzle(this, this.forge.x, this.forge.y - 100, () => {
            this.completeGuildEncoding();
        });

        puzzle.autoSolve();
        this.fragments = []; // Clear fragments
    }

    completeGuildEncoding() {
        // Emit gold pattern crystal
        const crystal = this.add.star(this.forge.x, this.forge.y, 5, 20, 40, COLORS.GOLD);

        this.tweens.add({
            targets: crystal,
            angle: 360,
            scale: 2,
            alpha: 0,
            duration: 2000,
            onComplete: () => {
                crystal.destroy();
                this.completeWorld();
            }
        });

        // Clear duplication ghosts
        this.experts.children.entries.forEach(expert => {
            this.tweens.add({
                targets: [expert, expert.head],
                alpha: 0,
                duration: 1000
            });
        });

        this.hud.addScore(SCORING.patternComplete);
        this.hud.setObjective('Guild patterns encoded! Duplication eliminated!');
    }

    completeWorld() {
        if (this.worldComplete) return;
        this.worldComplete = true;

        this.hud.stopTimer();

        const timeBonus = Math.floor(this.hud.getTimeRemaining() * SCORING.timeBonus);
        this.hud.addScore(timeBonus);

        this.cameras.main.fade(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
            this.scene.start('World4', { score: this.hud.score });
        });
    }

    failWorld() {
        this.scene.restart();
    }
}
