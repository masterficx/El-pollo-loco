class Cloud extends MovableObject {
    y = 20;
    width = 720;
    height = 250;
    
constructor(sP){

    super().loadImage('Assets/img/5_background/layers/4_clouds/1.png');
    this.x = sP + Math.random() * 500;
    this.animate();
}

/**This function starts the interval that repeatedly moves the clouds negatively on the x axis simulating a movement to the left, depending if the game is paused or not.*/
    animate() {
        setInterval(() => {
            if (gameIsPaused) {
                
            } else {
          this.moveLeft();
      }  }, 30);
    
    }

   
}
