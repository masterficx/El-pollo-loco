class SmallChicken extends MovableObject {
    y = 380;
    height = 40;
    width = 40;
    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 10,
    };
    IMAGES_WALKING = [
        'Assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'Assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'Assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'Assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png',
        'Assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor(sP) {
        super().loadImage('Assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.y = 380;
        this.speed = 0.25;
        this.x = sP + Math.random() * 500;
        this.animate();
    }

    /**This function starts all intervalls that, depending on certain conditions, make the small chicken move, or not.
     * The second intervall decides which animation is to be played, and starts it depending if the small chicken is alive or dead. */

    animate() {
        setInterval(() => {
            if (gameIsPaused) {

            } else {
                this.moveLeft();
            }
        }, 1000 / 200);

        setInterval(() => {
            if (gameIsPaused) {

            } else {
                if (!this.isDead()) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                }
            }
        }, 100);
    }

    
}