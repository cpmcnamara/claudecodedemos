// HUD - Heads-Up Display for timer, score, and objectives
class HUD {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;
        this.timeRemaining = 30;
        this.reuseRate = 0;
        this.arrRate = 0;

        this.create();
    }

    create() {
        const padding = 20;

        // Timer (top left)
        this.timerBg = this.scene.add.rectangle(padding + 80, padding + 20, 140, 40, COLORS.SLATE)
            .setAlpha(0.8);

        this.timerText = this.scene.add.text(padding, padding, '', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#00C1D5',
            fontStyle: 'bold'
        });

        // Score (top right)
        this.scoreBg = this.scene.add.rectangle(
            GAME_CONFIG.width - padding - 100,
            padding + 20,
            180,
            40,
            COLORS.SLATE
        ).setAlpha(0.8);

        this.scoreText = this.scene.add.text(
            GAME_CONFIG.width - padding,
            padding,
            '',
            {
                fontSize: '20px',
                fontFamily: 'Arial',
                color: '#F2C94C'
            }
        ).setOrigin(1, 0);

        // Objective (bottom center)
        this.objectiveBg = this.scene.add.rectangle(
            GAME_CONFIG.width / 2,
            GAME_CONFIG.height - padding - 20,
            600,
            50,
            COLORS.SLATE
        ).setAlpha(0.9);

        this.objectiveText = this.scene.add.text(
            GAME_CONFIG.width / 2,
            GAME_CONFIG.height - padding - 20,
            '',
            {
                fontSize: '16px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center'
            }
        ).setOrigin(0.5);

        this.update();
    }

    update() {
        // Update timer
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = Math.floor(this.timeRemaining % 60);
        this.timerText.setText(`⏱ ${seconds}s`);

        // Change color based on urgency
        if (this.timeRemaining < 10) {
            this.timerText.setColor('#FF0000');
        } else if (this.timeRemaining < 20) {
            this.timerText.setColor('#F2C94C');
        } else {
            this.timerText.setColor('#00C1D5');
        }

        // Update score
        this.scoreText.setText(`Score: ${this.score}`);
    }

    startTimer(duration, onComplete) {
        this.timeRemaining = duration;

        this.timerEvent = this.scene.time.addEvent({
            delay: 100,
            callback: () => {
                this.timeRemaining -= 0.1;
                this.update();

                if (this.timeRemaining <= 0) {
                    this.timeRemaining = 0;
                    this.update();
                    if (onComplete) onComplete();
                }
            },
            loop: true
        });
    }

    stopTimer() {
        if (this.timerEvent) {
            this.timerEvent.remove();
        }
    }

    addScore(points) {
        this.score += points;
        this.update();

        // Visual feedback
        this.scene.tweens.add({
            targets: this.scoreText,
            scaleX: 1.3,
            scaleY: 1.3,
            duration: 200,
            yoyo: true
        });
    }

    addTime(seconds) {
        this.timeRemaining += seconds;
        this.update();

        // Flash green
        this.timerText.setColor('#00FF00');
        this.scene.time.delayedCall(500, () => {
            this.update();
        });
    }

    removeTime(seconds) {
        this.timeRemaining -= seconds;
        this.update();
    }

    setObjective(text) {
        this.objectiveText.setText(text);

        // Fade in animation
        this.objectiveText.setAlpha(0);
        this.scene.tweens.add({
            targets: this.objectiveText,
            alpha: 1,
            duration: 500
        });
    }

    showTutorial(text) {
        const tutorial = this.scene.add.text(
            GAME_CONFIG.width / 2,
            100,
            text,
            {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: '#00C1D5',
                backgroundColor: '#20303C',
                padding: { x: 20, y: 10 }
            }
        ).setOrigin(0.5);

        this.scene.tweens.add({
            targets: tutorial,
            alpha: { from: 1, to: 0 },
            y: 80,
            duration: 3000,
            onComplete: () => tutorial.destroy()
        });
    }

    getTimeRemaining() {
        return this.timeRemaining;
    }

    destroy() {
        this.stopTimer();
    }
}
