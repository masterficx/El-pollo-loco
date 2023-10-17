class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    lastHit = 0;
    characterDirection = 'right';
    dead = false;

    /**This function applies gravity on the movable object. */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.returnCharToGroundProperly();
            }
        }, 1000 / 25);
    }

    /**This function sets the character to the ground on the right coordinate of the Y axis, when needed. */
    returnCharToGroundProperly() {
        if (this instanceof Character) {
            this.speedY = 0;
            this.y = 230;
        }
    }

    /** This function checks if the movable object is above the ground, depending on its position on the Y axis. */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable objects should always fall
            return true;
        } else {
            return this.y < 230;
        }
    }

    /**This function checks if collision occurs on all sides of the two movable objects */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**This function is used to check if the character is falling. */
    isFalling() {
        return this.speedY < 0;
    };

    /** This function reduces the energy of the main player after a collision with an enemy.  */
    hit() {
        if (this instanceof Endboss) {
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        } else {
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    /** This function checks the time between the last time the movable object collided and the current time. */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**This is a small help function that checks if the movable object is dead by checking the ammount of energy it has. */
    isDead() {
        return this.energy == 0;
    }

    /**This is a function that goes through an array of images and returns the url of the needed image, as well as going through the array indefinitely using the modulo operator */
    playAnimation(images) {
        let i = this.currentImage % images.length; //let i = 7 % 6; => 1, Rest 1, i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, ....
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**This is the function that increases the coordinate on the x axis of the movable object, thus simulating a movement to the right. */
    moveRight() {
        if (this instanceof Character) {
            this.characterDirection = 'right';
        }
        this.x += this.speed;
    }

    /**This is the function that decreases the coordinate on the x axis of the movable object, thus simulating a movement to the left. */
    moveLeft() {
        if (this instanceof Character) {
            this.characterDirection = 'left';
        }
        this.x -= this.speed;
    }

    /**This function sets the speed with which the movable object moves negatively on the Y axis, thus simulating a jump. */
    jump() {
        this.speedY = 10;
    }

    /**This function sets the speed with which the movable object moves negatively on the Y axis, thus simulating a smaller jump. */
    smallJump() {
        this.speedY = 15;
    }
}