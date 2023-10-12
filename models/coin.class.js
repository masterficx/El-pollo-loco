class Coin extends DrawableObject {
    height = 100;
    width = 100;
    offset = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30,
    };
    coinPickUp = new Audio('Assets/audio/coin_pickup.mp3');
    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.x = x + Math.random()*300;
        this.y = 360 - Math.random()*250;

    }
}