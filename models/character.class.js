class Character extends MovableObject {
    world;
    lastKeyPressed;
    y = 230;
    height = 200;
    width = 100;
    speed = 10;
    offset = {
        top: 110,
        left: 40,
        right: 40,
        bottom: 5,
    };

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

    IMAGES_IDLE = [
        'Assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'Assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'Assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'Assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'Assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'Assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'Assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'Assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'Assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'Assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'Assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'Assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'Assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'Assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'Assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'Assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'Assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'Assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'Assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'Assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];



    walking_sound = new Audio('Assets/audio/walking.mp3');
    constructor() {
        super().loadImage('Assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.animate();
        this.applyGravity();
    }
    animate() {

        /**This function starts the intervals that depending on certain conditions, move the main player and also handle the starting of the animation.  */
        setInterval(() => {
            this.walking_sound.pause();
            if (!gameIsPaused) {
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
            }
            this.lastPressedKey();
        }, 1000 / 60);

        setInterval(() => {
            if (!gameIsPaused) {
                if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                } else if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                } else if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMPING);
                } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else if (this.startLongIdle()) {
                    this.playAnimation(this.IMAGES_LONG_IDLE)
                } else if (this.speedY == 0 && !this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_IDLE)
                }
            }
        }, 120)

    }

    /**This function makes the movable object jump, by setting the speed on the Y axis to a certain value. */
    jump() {
        this.speedY = 30;
    }

    /**This function checks if the difference in time between the last keypress and the current time is greater than a predetermined value, so that when it is greater the character
     * can go enter a "long idle" state.*/
    startLongIdle() {
        let timepassed = new Date().getTime() - this.lastKeyPressed;
        timepassed = timepassed / 1000;
        return (timepassed > 8);
    }

    /**This function saves the time of the last keypress as a variable. */
    lastPressedKey() {
        if (this.keyIsPressed()) {
            this.lastKeyPressed = new Date().getTime();
        }
    }

    /**This function checks if any of the predetermined keys was pressed. */
    keyIsPressed() {
        return keyboard.LEFT || keyboard.RIGHT || keyboard.UP || keyboard.DOWN || keyboard.SPACE || keyboard.D
    }

}

