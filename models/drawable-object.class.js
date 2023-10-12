class DrawableObject {

    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 175;
    height = 150;
    width = 100;

     /** This function creates a new instance of the Image class with a certain path, and saves it in the img variable for it to be called later from the draw() function */
     loadImage(path) {
        this.img = new Image(); 
        this.img.src = path;
    }

    /**This function draws an image on certain coordinates on the canvas */

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };

    drawOffsetFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.offset.x, this.offset.y, this.offset.width, this.offset.height);
            ctx.stroke();
        }
    }

    /**
     * This function creates an new instance of the class Image for each object in the array that has been given to the function as a parameter. It is later stored as an image cache in the array.
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}