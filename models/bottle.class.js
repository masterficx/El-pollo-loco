class Bottle extends DrawableObject {
    width = 50;
    height = 50;
    offset = {
        top: 15,
        left: 20,
        right: 15,
        bottom: 5,
    };
    y = 380;
    bottlePickUp = new Audio('Assets/audio/bottle_pickup.mp3');
    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.x = x + Math.random()*300;

    }
}