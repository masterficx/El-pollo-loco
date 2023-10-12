class HealthStatusBar extends DrawableObject {

    IMAGES = [
        'Assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'Assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'Assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'Assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'Assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'Assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'

    ];


    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    /**This function sets the percentage in the status bar, and with that displaying the correct status bar image. */
    setPercentage(percentage){
        this.percentage = percentage;  // => 0 ... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.x = 20;
        this.y = 10;
        this.width = 170;
        this.height = 50;
        this.img = this.imageCache[path];

    }

    /**This function decides which number it returns depending on the percentage/energy. 
     * The number is being used in the setPercentage() function as the array id for the correct image that is to be displayed. */

    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        } else if(this.percentage > 80){
            return 4;
        } else if(this.percentage > 60){
            return 3;
        } else if(this.percentage > 40){
            return 2;
        } else if(this.percentage > 20){
            return 1;
        } else {
            return 0;
        }
    }

}