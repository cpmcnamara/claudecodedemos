// Deal Gate - Door that requires specific pod configuration
class DealGate {
    constructor(scene, x, y, dealSize) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.dealSize = dealSize;
        this.podsRequired = this.getRequiredPods(dealSize);
        this.approved = false;
        this.open = false;

        this.create();
    }

    create() {
        // Create gate door
        this.door = this.scene.add.rectangle(this.x, this.y, 60, 150, COLORS.RED);
        this.scene.physics.add.existing(this.door, true); // Static body

        // Create deal size label
        this.label = this.scene.add.text(this.x, this.y - 100,
            `${this.dealSize.toUpperCase()}\n${this.podsRequired} pods`, {
            fontSize: '14px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Create requirement indicator
        this.indicator = this.scene.add.circle(this.x, this.y - 80, 12, COLORS.RED);
    }

    checkRequirement(podCount) {
        if (podCount >= this.podsRequired) {
            this.approve();
            return true;
        }
        return false;
    }

    approve() {
        this.approved = true;
        this.indicator.setFillStyle(COLORS.GREEN);

        // Animate door opening
        this.scene.tweens.add({
            targets: this.door,
            y: this.y - 200,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.open = true;
                this.door.body.enable = false; // Disable collision
            }
        });

        // Play approval sound
        console.log("🔊 Deal approved!");
    }

    getRequiredPods(dealSize) {
        switch(dealSize) {
            case 'small': return 1;
            case 'medium': return 2;
            case 'large': return 3;
            default: return 1;
        }
    }

    isOpen() {
        return this.open;
    }

    destroy() {
        this.door.destroy();
        this.label.destroy();
        this.indicator.destroy();
    }
}
