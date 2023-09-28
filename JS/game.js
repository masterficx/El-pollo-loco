let canvas;
let ctx;
let keyboard = new Keyboard();
let touchCtrImage = 1;
let soundCtrlImage = 1;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');

    console.log('My character is', world.character);
    touchCtrlButtons();
}


function toggleTouchControls() {
    document.getElementById('lower_frame').classList.toggle('d-none');

    let image = document.getElementById("touch_img");

    if (touchCtrImage === 2) {
        image.src = "Assets/img/icons/touch_enable.png";
        touchCtrImage = 1;
    } else {
        image.src = "Assets/img/icons/touch_disable.png";
        touchCtrImage = 2;
    }
}

function toggleSoundControls() {

    let image = document.getElementById("sound_img");

    if (soundCtrlImage === 1) {
        image.src = "Assets/img/icons/speaker.png";
        soundCtrlImage = 2;
    } else {
        image.src = "Assets/img/icons/mute.png";
        soundCtrlImage = 1;
    }
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

function touchCtrlButtons(){
    document.getElementById('left_btn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('left_btn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('right_btn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('right_btn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('jump_btn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('jump_btn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('throw_btn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('throw_btn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}