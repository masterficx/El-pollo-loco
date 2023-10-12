class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 50;
    charIsHere = false;
    offset = {
        top: 135,
        left: 40,
        right: 40,
        bottom: 100,
    };
    IMAGES_WALKING = [
        'Assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'Assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'Assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'Assets/img/4_enemie_boss_chicken/1_walk/G4.png'

    ];

    IMAGES_ATACKING = [
        'Assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'Assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'Assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'Assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'Assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'Assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'Assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'Assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_DEAD = [
        'Assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'Assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'Assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATACKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3000;
        this.animate();
    }

    /**This function decides which animation is to be played depending on certain conditions. */

    animate() {

        setInterval(() => {
            if (gameIsPaused) {

            } else {
                if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                } else {
                    if (!this.charIsHere) {
                        this.playAnimation(this.IMAGES_WALKING);
                    } else if (this.charIsHere) {
                        this.playAnimation(this.IMAGES_ATACKING);
                    }


                }
            }
        }, 100)
    }
}