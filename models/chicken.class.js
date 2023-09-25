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
            setInterval(() => {
                this.moveLeft();
            }, 1000 / 60);
            
            setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
            }, 100)
        }
}