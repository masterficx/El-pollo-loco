class ThrowableObject extends MovableObject {
    IMAGES_ROTATING = [
        'Assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'Assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'Assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'Assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASHING = [
        'Assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'Assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'Assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'Assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'Assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'Assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    offset = {
        top: 15,
        left: 20,
        right: 15,
        bottom: 5,
    };

    characterDirection;
    playSplashAnimation;

    constructor(x, y, characterDirection) {
        super().loadImage('Assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_SPLASHING);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(characterDirection);
        this.animate();
    }

    /**This function handles the movement and direction of the object that was to be thrown */
    throw(characterDirection) {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.throwLeftOrRight(characterDirection);
        }, 25);
    }

    /**This function handles the animation of the throwable object. */
    animate() {
        setInterval(() => {
            if(this.playSplashAnimation){
                this.playAnimation(this.IMAGES_SPLASHING); 
            } else {
                this.playAnimation(this.IMAGES_ROTATING);
            }     
        }, 25)
    }

    /**This function decides in which direction is the object to be thrown depending of the direction of the character. */
    throwLeftOrRight(characterDirection) {
        if (characterDirection == 'right') {
            this.throwRight();
        }
        else if (characterDirection == 'left') {
            this.throwLeft();
        }
    }

    /**This function throws the object to the right of the main character. */
    throwRight() {
        this.x += 10;
    }

    /**This function throws the object to the leftt of the main character. */
    throwLeft() {
        this.x -= 10;
    }
}
