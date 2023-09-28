class Cloud extends MovableObject {
    y = 20;
    width = 720;
    height = 250;
    
constructor(sP){

    super().loadImage('Assets/img/5_background/layers/4_clouds/1.png')
    this.x = sP + Math.random() * 500;
    this.animate();
}
    animate() {
        this.moveLeft();
    }

   
}
