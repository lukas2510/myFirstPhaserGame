// Create our only scene called mainScene, in the game.js file
class mainScene {
    // The three methods currently empty

    preload() {
        // This method is called once at the beginning
        // It will load all the assets, like sprites and sounds
        // Parameters: name of the sprite, path of the image
        this.load.image('player', 'assets/player.png');
        this.load.image('coin', 'assets/coin.png');
    }
    create() {
        // This method is called once, just after preload()
        // It will initialize our scene, like the positions of the sprites
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.coin = this.physics.add.sprite(300, 300, 'coin');
        this.score = 0;
        let style = { font: '20px Arial', fill: '#fff' };
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
        this.arrow = this.input.keyboard.createCursorKeys();
    }
    update() {
        // This method is called 60 times per second after create() 
        // It will handle all the game's logic, like movements
        // Handle horizontal movements
        if (this.physics.overlap(this.player, this.coin)) {
            this.hit();
        }
        if (this.arrow.right.isDown) {
            // If the right arrow is pressed, move to the right
            this.player.x += 3;
        } else if (this.arrow.left.isDown) {
            // If the left arrow is pressed, move to the left
            this.player.x -= 3;
        }

        // Do the same for vertical movements
        if (this.arrow.down.isDown) {
            this.player.y += 3;
        } else if (this.arrow.up.isDown) {
            this.player.y -= 3;
        }
    }

    hit() {
        this.coin.x = Phaser.Math.Between(100, 600);
        this.coin.y = Phaser.Math.Between(100, 200);

        this.score += 10;
        this.scoreText.setText('score: ' + this.score);

        this.tweens.add({
            targets: this.player,
            duration: 200,
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo: true,
        });
    }
}


new Phaser.Game({
    width: 700,
    height: 300,
    backgroundColor: '#3498db',
    scene: mainScene,
    physics: { default: 'arcade' },
    parent: 'game',
});
