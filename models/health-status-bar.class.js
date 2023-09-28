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

    //setPercentage(50);
    setPercentage(percentage){
        this.percentage = percentage;  // => 0 ... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.x = 20;
        this.y = 36;
        this.width = 160;
        this.height = 40;
        this.img = this.imageCache[path];

    }

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