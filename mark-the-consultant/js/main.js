// Main Game Configuration and Bootstrap

// Title Scene
class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    create() {
        this.cameras.main.setBackgroundColor(COLORS.SLATE);

        // Title
        this.add.text(600, 150, 'MARK THE CONSULTANT', {
            fontSize: '48px',
            color: '#00C1D5',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(600, 220, 'Rise of the Capability Platform', {
            fontSize: '24px',
            color: '#F2C94C',
            fontStyle: 'italic'
        }).setOrigin(0.5);

        // Story
        const story = [
            'The old pyramid is collapsing.',
            'Consulting needs a new model.',
            '',
            'Help Mark Landry build the future:',
            'Core Studios → Process Guilds → Industries',
            '→ Fusion Pods → Deals → Platform Enterprise'
        ];

        this.add.text(600, 320, story.join('\n'), {
            fontSize: '16px',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5);

        // Controls
        const controls = [
            'CONTROLS:',
            '← → Move  |  SPACE Jump  |  E Connect',
            'Q Summon Pod  |  SHIFT Dash'
        ];

        this.add.text(600, 480, controls.join('\n'), {
            fontSize: '14px',
            color: '#00C1D5',
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5);

        // Start button
        const startButton = this.add.rectangle(600, 580, 200, 50, COLORS.CYAN)
            .setInteractive({ useHandCursor: true });

        const startText = this.add.text(600, 580, 'START GAME', {
            fontSize: '20px',
            color: '#000000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        startButton.on('pointerover', () => {
            startButton.setFillStyle(COLORS.GOLD);
        });

        startButton.on('pointerout', () => {
            startButton.setFillStyle(COLORS.CYAN);
        });

        startButton.on('pointerdown', () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start('World1');
            });
        });

        // Capgemini branding
        this.add.text(600, 650, 'A Capgemini Invent Experience', {
            fontSize: '12px',
            color: '#6E1E96',
            fontStyle: 'italic'
        }).setOrigin(0.5);

        // Fade in
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }
}

// End Dashboard Scene
class EndDashboard extends Phaser.Scene {
    constructor() {
        super({ key: 'EndDashboard' });
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        this.cameras.main.setBackgroundColor(COLORS.SLATE);

        // Title
        this.add.text(600, 80, 'MISSION COMPLETE', {
            fontSize: '48px',
            color: '#00C1D5',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Mark standing
        this.createMarkFigure(300, 300);

        // Platform city background
        this.createCityBackground();

        // Stats dashboard
        this.createStatsDisplay();

        // Quote
        const quote = this.add.text(600, 550, '"Invent Learned to Learn"', {
            fontSize: '28px',
            color: '#F2C94C',
            fontStyle: 'italic'
        }).setOrigin(0.5);

        // Final message
        this.add.text(600, 600, 'The Platform Enterprise is Active', {
            fontSize: '18px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Restart button
        const restartButton = this.add.rectangle(600, 650, 200, 40, COLORS.CYAN)
            .setInteractive({ useHandCursor: true });

        const restartText = this.add.text(600, 650, 'PLAY AGAIN', {
            fontSize: '16px',
            color: '#000000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        restartButton.on('pointerover', () => {
            restartButton.setFillStyle(COLORS.GOLD);
        });

        restartButton.on('pointerout', () => {
            restartButton.setFillStyle(COLORS.CYAN);
        });

        restartButton.on('pointerdown', () => {
            this.scene.start('TitleScene');
        });

        // Fade in
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    createMarkFigure(x, y) {
        // Mark standing with lit platform city
        const body = this.add.rectangle(x, y, 40, 70, COLORS.BLUE);
        const head = this.add.circle(x, y - 40, 18, 0x999999);
        const tablet = this.add.rectangle(x, y + 15, 20, 15, COLORS.WHITE);

        // Idle animation
        this.tweens.add({
            targets: tablet,
            angle: { from: -5, to: 5 },
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
    }

    createCityBackground() {
        // Lit towers in background
        for (let i = 0; i < 8; i++) {
            const x = 700 + i * 60;
            const height = Phaser.Math.Between(100, 200);
            const tower = this.add.rectangle(x, 600 - height / 2, 40, height, COLORS.BLUE, 0.5)
                .setStrokeStyle(1, COLORS.CYAN);

            // Window lights
            for (let j = 0; j < 5; j++) {
                const light = this.add.circle(
                    x,
                    (600 - height) + j * 30,
                    3,
                    COLORS.GOLD
                );

                this.tweens.add({
                    targets: light,
                    alpha: { from: 0.5, to: 1 },
                    duration: Phaser.Math.Between(500, 1500),
                    yoyo: true,
                    repeat: -1
                });
            }
        }
    }

    createStatsDisplay() {
        const statsX = 600;
        const statsY = 200;

        // Calculate metrics
        const reuseRate = Math.min(95, 60 + Math.floor(this.finalScore / 20));
        const industryCoverage = 100; // All 6 industries
        const arrGrowth = Math.min(150, 80 + Math.floor(this.finalScore / 15));

        const stats = [
            { label: 'Final Score', value: this.finalScore, color: COLORS.GOLD },
            { label: 'Reuse Rate', value: reuseRate + '%', color: COLORS.CYAN },
            { label: 'Industry Coverage', value: industryCoverage + '%', color: COLORS.GREEN },
            { label: 'ARR Growth', value: arrGrowth + '%', color: COLORS.PURPLE }
        ];

        stats.forEach((stat, index) => {
            const y = statsY + index * 60;

            // Label
            this.add.text(statsX - 150, y, stat.label + ':', {
                fontSize: '20px',
                color: '#ffffff'
            });

            // Value
            const valueText = this.add.text(statsX + 50, y, '0', {
                fontSize: '28px',
                color: '#' + stat.color.toString(16).padStart(6, '0'),
                fontStyle: 'bold'
            });

            // Animated count-up
            let current = 0;
            const target = typeof stat.value === 'string' ?
                parseInt(stat.value) : stat.value;

            this.time.addEvent({
                delay: 30,
                callback: () => {
                    current += Math.ceil(target / 50);
                    if (current >= target) {
                        current = target;
                        valueText.setText(stat.value);
                    } else {
                        valueText.setText(current.toString());
                    }
                },
                repeat: 50
            });
        });
    }
}

// Phaser Game Configuration
const config = {
    type: Phaser.AUTO,
    width: GAME_CONFIG.width,
    height: GAME_CONFIG.height,
    parent: 'phaser-game',
    physics: GAME_CONFIG.physics,
    backgroundColor: GAME_CONFIG.backgroundColor,
    scene: [
        TitleScene,
        World1,
        World2,
        World3,
        World4,
        World5,
        World6,
        EndDashboard
    ]
};

// Initialize Game
const game = new Phaser.Game(config);
