class Endboss extends MovableObject {
        height = 400;
        width = 350;
        y= 50;
    IMAGES_WALKING = [
        'Assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'Assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'Assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'Assets/img/4_enemie_boss_chicken/1_walk/G4.png'

    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 3000;
        this.animate();

    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100)
    }
}