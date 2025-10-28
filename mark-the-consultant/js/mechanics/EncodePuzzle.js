// Encode Puzzle - Drag-and-drop mini-puzzle for Data-Design-Systems
class EncodePuzzle {
    constructor(scene, x, y, onComplete) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.onComplete = onComplete;
        this.slots = [];
        this.pieces = [];
        this.completed = false;

        this.correctSequence = ['data', 'design', 'systems'];
        this.currentSequence = [];

        this.create();
    }

    create() {
        // Create 3 slots
        const slotWidth = 80;
        const spacing = 100;
        const startX = this.x - spacing;

        for (let i = 0; i < 3; i++) {
            const slot = this.scene.add.rectangle(
                startX + (i * spacing),
                this.y,
                slotWidth,
                slotWidth,
                COLORS.SLATE
            ).setStrokeStyle(2, COLORS.CYAN);

            this.slots.push({
                sprite: slot,
                filled: false,
                type: null
            });
        }

        // Create puzzle pieces (simplified auto-solve for now)
        this.pieces = [
            { type: 'data', color: COLORS.BLUE, label: 'Data', placed: false },
            { type: 'design', color: COLORS.PURPLE, label: 'Design', placed: false },
            { type: 'systems', color: 0x808080, label: 'Systems', placed: false }
        ];
    }

    autoSolve() {
        // Simplified version - instantly solves puzzle
        this.pieces.forEach((piece, index) => {
            const slot = this.slots[index];
            slot.sprite.setFillStyle(piece.color);
            slot.filled = true;
            slot.type = piece.type;

            // Add label
            this.scene.add.text(slot.sprite.x, slot.sprite.y, piece.label, {
                fontSize: '12px',
                color: '#ffffff'
            }).setOrigin(0.5);

            this.currentSequence.push(piece.type);
        });

        // Check if correct
        if (this.checkSequence()) {
            this.complete();
        }
    }

    checkSequence() {
        if (this.currentSequence.length !== 3) return false;

        for (let i = 0; i < 3; i++) {
            if (this.currentSequence[i] !== this.correctSequence[i]) {
                return false;
            }
        }

        return true;
    }

    complete() {
        this.completed = true;

        // Visual feedback
        this.slots.forEach(slot => {
            this.scene.tweens.add({
                targets: slot.sprite,
                scaleX: 1.2,
                scaleY: 1.2,
                alpha: { from: 1, to: 0.8 },
                duration: 300,
                yoyo: true
            });
        });

        // Play chime sound
        console.log("🔊 Build chime!");

        // Callback
        if (this.onComplete) {
            this.scene.time.delayedCall(500, this.onComplete);
        }
    }

    destroy() {
        this.slots.forEach(slot => slot.sprite.destroy());
        this.slots = [];
    }
}
