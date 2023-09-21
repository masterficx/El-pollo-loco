class Chicken extends MovableObject {
        y = 360;
        height = 65;
        width =65;
        IMAGES_WALKING = [
            'Assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
            'Assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
            'Assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
        ];
        constructor(){
            super().loadImage('Assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
            this.loadImages(this.IMAGES_WALKING);
            this.speed = 0.15 + Math.random() * 0.45;
            this.x = 200 + Math.random() * 500;
            this.animate();
        }

        animate(){
            this.moveLeft();
            setInterval(() => {
                let i = this.currentImage % this.IMAGES_WALKING.length; //let i = 7 % 6; => 1, Rest 1
                // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, ....
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }, 100)
        }
}