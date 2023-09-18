let canvas;
let ctx;

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    ctx = canvas.getContext('2d');

    console.log('My character is', world.character);
}