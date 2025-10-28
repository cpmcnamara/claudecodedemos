// Connect Beam Mechanic - Links NPCs and Nodes
class ConnectBeam {
    constructor(scene) {
        this.scene = scene;
        this.beams = [];
        this.connections = [];
        this.activeBeam = null;
    }

    fire(fromX, fromY, targetX, targetY, onConnect) {
        // Create visual beam
        const beam = this.scene.add.line(
            0, 0,
            fromX, fromY,
            targetX, targetY,
            COLORS.CYAN
        ).setLineWidth(3).setOrigin(0, 0);

        // Animate beam
        this.scene.tweens.add({
            targets: beam,
            alpha: { from: 1, to: 0.5 },
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        this.beams.push(beam);

        // Play connect sound (placeholder)
        this.playConnectSound();

        // Execute callback
        if (onConnect) onConnect();

        return beam;
    }

    connect(source, target) {
        const connection = {
            source: source,
            target: target,
            beam: this.fire(source.x, source.y, target.x, target.y, () => {
                source.connected = true;
                target.connected = true;

                // Change color to indicate connection
                if (target.setFillStyle) {
                    target.setFillStyle(COLORS.CYAN);
                }
            })
        };

        this.connections.push(connection);
        return connection;
    }

    raycast(fromX, fromY, angle, maxDistance, targets) {
        // Simple raycast to find first target in range
        const dirX = Math.cos(angle);
        const dirY = Math.sin(angle);

        for (let target of targets) {
            const dx = target.x - fromX;
            const dy = target.y - fromY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= maxDistance) {
                // Check if roughly in direction
                const dotProduct = (dx * dirX + dy * dirY) / distance;
                if (dotProduct > 0.7) { // Within ~45 degree cone
                    return target;
                }
            }
        }

        return null;
    }

    playConnectSound() {
        // Placeholder - would use actual sound file
        console.log("🔊 Connect ping!");
    }

    clearBeams() {
        this.beams.forEach(beam => beam.destroy());
        this.beams = [];
        this.connections = [];
    }

    getConnectionCount() {
        return this.connections.length;
    }
}
