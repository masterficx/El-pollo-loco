class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 50;
    charIsHere = false;
    turnAround = false;
    endbos_end_x = 3900;
    speed = 5
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

    IMAGES_HURT = [
        'Assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'Assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'Assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
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
        this.loadImages(this.IMAGES_HURT);
        this.x = 3000;
        this.animate();
        this.turnBossAround();
        this.moveBoss();
    }

    /**This function decides which animation is to be played depending on certain conditions. */
    animate() {
        setInterval(() => {
            if (!gameIsPaused) {
                if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                } else if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                } else if (this.energy <= 40) {
                    this.playAnimation(this.IMAGES_ATACKING);
                    this.speed = 10;
                } else if (this.charIsHere) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 100)
    }

    /**This function moves the end boss depending on a certain conditions. */
    moveBoss() {
        setInterval(() => {
            if (!gameIsPaused && this.charIsHere && !this.isDead() && !this.isHurt()) {
                if (this.turnAround) {
                    this.moveLeft();
                    this.otherDirection = false;
                }
                if (this.canMoveRight()) {
                    this.moveRight();
                    this.otherDirection = true;
                }
            }
        }, 20);
    }
    /**This is a small help function to make the code shorter and cleaner. It just checks a certain condition and returns true or false if the conditions are met. */
    canMoveRight() {
        return world.endBoss.x + world.endBoss.width < world.endBoss.endbos_end_x && !world.endBoss.turnAround;
    }

    /**This function toggles every three seconds between the true and false state of the turnAround variable in order to switch the movement direction of the end boss.  */
    turnBossAround() {
        setInterval(() => {
            if (this.turnAround) {
                this.turnAround = false;
            }
            else {
                this.turnAround = true;
            }
        }, 3000);
    }
}