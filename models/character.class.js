class Character extends MovableObject {
    y = 80;
    height = 250;
    width = 100;
    speed = 10;
    IMAGES_WALKING = [
        'Assets/img/2_character_pepe/2_walk/W-21.png',
        'Assets/img/2_character_pepe/2_walk/W-22.png',
        'Assets/img/2_character_pepe/2_walk/W-23.png',
        'Assets/img/2_character_pepe/2_walk/W-24.png',
        'Assets/img/2_character_pepe/2_walk/W-25.png',
        'Assets/img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'Assets/img/2_character_pepe/3_jump/J-31.png',
        'Assets/img/2_character_pepe/3_jump/J-32.png',
        'Assets/img/2_character_pepe/3_jump/J-33.png',
        'Assets/img/2_character_pepe/3_jump/J-34.png',
        'Assets/img/2_character_pepe/3_jump/J-35.png',
        'Assets/img/2_character_pepe/3_jump/J-36.png',
        'Assets/img/2_character_pepe/3_jump/J-37.png',
        'Assets/img/2_character_pepe/3_jump/J-38.png',
        'Assets/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'Assets/img/2_character_pepe/4_hurt/H-41.png',
        'Assets/img/2_character_pepe/4_hurt/H-42.png',
        'Assets/img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'Assets/img/2_character_pepe/5_dead/D-51.png',
        'Assets/img/2_character_pepe/5_dead/D-52.png',
        'Assets/img/2_character_pepe/5_dead/D-53.png',
        'Assets/img/2_character_pepe/5_dead/D-54.png',
        'Assets/img/2_character_pepe/5_dead/D-55.png',
        'Assets/img/2_character_pepe/5_dead/D-56.png',
        'Assets/img/2_character_pepe/5_dead/D-57.png'
    ];

    world;

    walking_sound = new Audio('Assets/audio/walking.mp3');
    constructor() {
        super().loadImage('Assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.animate();
        this.applyGravity();
    }
    animate() {

        setInterval(() => {
            this.walking_sound.pause();

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();

            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50)
    }
    jump() {
        this.speedY = 30;
    }
}