class BottleStatusBar extends DrawableObject {

    IMAGES = [
        'Assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'Assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'Assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'Assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'Assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'Assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'

    ];
    percentage;

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }

    /**This function sets the percentage in the status bar, and with that displaying the correct status bar image. */
    setPercentage(percentage){
        this.percentage = percentage;  // => 0 ... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.x = 20;
        this.y = 50;
        this.width = 170;
        this.height = 50;
        this.img = this.imageCache[path];

    }

    /**This function decides which number it returns depending on the percentage/energy. 
     * The number is being used in the setPercentage() function as the array id for the correct image that is to be displayed. */
    resolveImageIndex(){
        if(this.percentage >  5){
            return 5;
        } else if(this.percentage == 4){
            return 4;
        } else if(this.percentage == 3){
            return 3;
        } else if(this.percentage == 2){
            return 2;
        } else if(this.percentage == 1){
            return 1;
        } else if(this.percentage == 0){
            return 0;
        } else { 
            return 5;
        }
    }

}