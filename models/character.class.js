class Character extends MovableObject {
    y = -10;
    height = 450;
    width = 200;

    IMAGES_WALKING = [
        'Assets/img/2_character_pepe/2_walk/W-21.png',
        'Assets/img/2_character_pepe/2_walk/W-22.png',
        'Assets/img/2_character_pepe/2_walk/W-23.png',
        'Assets/img/2_character_pepe/2_walk/W-24.png',
        'Assets/img/2_character_pepe/2_walk/W-25.png',
        'Assets/img/2_character_pepe/2_walk/W-26.png',
    ];
    constructor() {
        super().loadImage('Assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }
    animate(){
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; //let i = 7 % 6; => 1, Rest 1
            // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, ....
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100)
    }
    jump() {

    }
}