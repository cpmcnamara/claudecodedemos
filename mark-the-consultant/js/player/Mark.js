// Mark Landry - The Consultant
class Mark {
    constructor(scene, x, y) {
        this.scene = scene;

        // Create player sprite (placeholder: blue rectangle with blazer effect)
        this.sprite = scene.add.rectangle(x, y, 30, 50, COLORS.BLUE);
        scene.physics.add.existing(this.sprite);
        this.sprite.body.setCollideWorldBounds(true);

        // Add "head" (gray hair indicator)
        this.head = scene.add.circle(x, y - 25, 12, 0x999999);

        // Add tablet indicator (white rectangle)
        this.tablet = scene.add.rectangle(x, y + 10, 15, 10, COLORS.WHITE);

        // Properties
        this.canDoubleJump = true;
        this.isDashing = false;
        this.connectBeamActive = false;

        // Input
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.keyE = scene.input.keyboard.addKey('E');
        this.keyQ = scene.input.keyboard.addKey('Q');
        this.keyShift = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    }

    update() {
        const body = this.sprite.body;

        // Update head and tablet positions to follow body
        this.head.x = this.sprite.x;
        this.head.y = this.sprite.y - 30;
        this.tablet.x = this.sprite.x;
        this.tablet.y = this.sprite.y + 10;

        // Horizontal movement
        if (this.cursors.left.isDown && !this.isDashing) {
            body.setVelocityX(-PLAYER_CONFIG.speed);
        } else if (this.cursors.right.isDown && !this.isDashing) {
            body.setVelocityX(PLAYER_CONFIG.speed);
        } else if (!this.isDashing) {
            body.setVelocityX(0);
        }

        // Jump
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            if (body.touching.down) {
                body.setVelocityY(PLAYER_CONFIG.jumpVelocity);
                this.canDoubleJump = true;
            } else if (this.canDoubleJump) {
                body.setVelocityY(PLAYER_CONFIG.jumpVelocity);
                this.canDoubleJump = false;
            }
        }

        // Dash
        if (Phaser.Input.Keyboard.JustDown(this.keyShift) && !this.isDashing) {
            this.dash();
        }

        // Reset double jump when on ground
        if (body.touching.down) {
            this.canDoubleJump = true;
        }
    }

    dash() {
        this.isDashing = true;
        const direction = this.cursors.left.isDown ? -1 : 1;
        this.sprite.body.setVelocityX(PLAYER_CONFIG.dashSpeed * direction);

        // Dash trail effect
        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0.5,
            duration: PLAYER_CONFIG.dashDuration / 2,
            yoyo: true
        });

        this.scene.time.delayedCall(PLAYER_CONFIG.dashDuration, () => {
            this.isDashing = false;
        });
    }

    takeDamage() {
        // Flash red
        this.sprite.setFillStyle(COLORS.RED);
        this.scene.time.delayedCall(200, () => {
            this.sprite.setFillStyle(COLORS.BLUE);
        });

        return 5; // Return time penalty in seconds
    }

    destroy() {
        this.sprite.destroy();
        this.head.destroy();
        this.tablet.destroy();
    }
}
