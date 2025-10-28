// Fusion Pod Manager - Spawns and manages assist bots
class FusionPodManager {
    constructor(scene) {
        this.scene = scene;
        this.pods = [];
        this.maxPods = 3;
    }

    summon(x, y, dealSize) {
        const podCount = this.getPodCountForDeal(dealSize);

        for (let i = 0; i < podCount; i++) {
            if (this.pods.length >= this.maxPods) break;

            const pod = this.createPod(x + (i * 40), y - 50, i);
            this.pods.push(pod);
        }

        return this.pods.length;
    }

    createPod(x, y, index) {
        // Different colored pods for Data, Design, Systems
        const colors = [COLORS.BLUE, COLORS.PURPLE, 0x808080]; // Blue, Purple, Gray
        const labels = ['D', 'De', 'S']; // Data, Design, Systems

        const pod = {
            sprite: this.scene.add.circle(x, y, 15, colors[index % 3]),
            label: this.scene.add.text(x, y, labels[index % 3], {
                fontSize: '12px',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5),
            type: index % 3,
            active: true,
            targetX: x,
            targetY: y
        };

        // Add physics
        this.scene.physics.add.existing(pod.sprite);
        pod.sprite.body.setAllowGravity(false);

        // Floating animation
        this.scene.tweens.add({
            targets: pod.sprite,
            y: y - 10,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        return pod;
    }

    followPlayer(playerX, playerY) {
        this.pods.forEach((pod, index) => {
            const offsetX = -60 - (index * 40);
            const offsetY = -30;

            pod.targetX = playerX + offsetX;
            pod.targetY = playerY + offsetY;

            // Smooth follow
            const dx = pod.targetX - pod.sprite.x;
            const dy = pod.targetY - pod.sprite.y;

            pod.sprite.body.setVelocity(dx * 2, dy * 2);
            pod.label.setPosition(pod.sprite.x, pod.sprite.y);
        });
    }

    getPodCountForDeal(dealSize) {
        switch(dealSize) {
            case 'small': return 1;
            case 'medium': return 2;
            case 'large': return 3;
            default: return 1;
        }
    }

    getActivePodCount() {
        return this.pods.filter(p => p.active).length;
    }

    clearPods() {
        this.pods.forEach(pod => {
            pod.sprite.destroy();
            pod.label.destroy();
        });
        this.pods = [];
    }

    interactWithTrigger(trigger) {
        // Pods automatically interact with environment triggers
        const requiredType = trigger.requiredPodType;

        for (let pod of this.pods) {
            if (pod.active && (requiredType === undefined || pod.type === requiredType)) {
                pod.active = false;
                pod.sprite.setAlpha(0.3);
                trigger.activated = true;
                return true;
            }
        }

        return false;
    }
}
