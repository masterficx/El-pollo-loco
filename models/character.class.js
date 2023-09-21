class Character extends MovableObject {
    y = 180;
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

    world;
    constructor() {
        super().loadImage('Assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }
    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }
              if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }

            this.world.camera_x = -this.x + 100; 
            
        }, 1000 / 60);
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGES_WALKING.length; //let i = 7 % 6; => 1, Rest 1
                //i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, ....
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }

            

        }, 50)



    }
    jump() {

    }
}