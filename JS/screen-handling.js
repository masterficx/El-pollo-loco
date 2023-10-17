/**This is the main function that calles all other functions to check the orientation on page load*/
function handleOrientation() {
    handleOrientationPortrait();
    handleOrientationLandscape();
    checkOrientation();
}

/**This function checks the orientation on page load when the device is in portrait mode */
function handleOrientationPortrait() {
    if (window.orientation !== undefined && window.orientation === 0) {
        removeContent();
        showOrientationHint();
    }
}

/**This is a smaller help function to remove the page content before showing the screen orientation hint  */
function removeContent() {
    addClasslist('start_game_btn', 'd-none');
    addClasslist('upper_frame', 'd-none');
    addClasslist('start_screen', 'd-none');
    addClasslist('title', 'd-none');
    addClasslist('frame', 'd-none');
    addClasslist('lower_frame', 'd-none');

}

/**This is a smaller help function to restore the page content when the game is not started.*/
function restoreContent() {
    removeClasslist('start_game_btn', 'd-none');
    removeClasslist('upper_frame', 'd-none');
    removeClasslist('start_screen', 'd-none');
    removeClasslist('frame', 'd-none');
    removeClasslist('lower_frame', 'd-none');
}

/**This is a smaller help function to restore the page content when the game is not started.*/
function restoreContentGameIsStarted() {
    removeClasslist('frame', 'd-none');
    removeClasslist('upper_frame', 'd-none');
    removeClasslist('lower_frame', 'd-none');
}

/**This is a smaller help function to show the orientation hint */
function showOrientationHint() {
    removeClasslist('rotate_device', 'd-none');
}

/**This is a smaller help function to hide the orientation hint */
function removeOrientationHint() {
    addClasslist('rotate_device', 'd-none');
}

/**This function checks the orientation on page load when the device is in landscape mode */
function handleOrientationLandscape() {
    if (window.orientation !== undefined && window.orientation === 90 || window.orientation !== undefined && window.orientation === -90) {
        restoreContent();
        removeOrientationHint();

    }
}

/**This function is used to check the current orientation on orientation change*/
function checkOrientation() {
    window.addEventListener("orientationchange", function () {
        if (window.orientation === 0) {
            removeContent();
            showOrientationHint();
        }
        if ((window.orientation === 90 || window.orientation === -90) && gameStarted == true) {
            removeOrientationHint();
            restoreContentGameIsStarted();
        }
        if ((window.orientation === 90 || window.orientation === -90) && gameStarted == false) {
            removeOrientationHint();
            restoreContent();
        }
    });
}

/**This function calculates the font size, depending on the size of the parrent container.  */
function updateTextSize() {
    let frameContainer = document.getElementById("frame");
    let frameWidth = frameContainer.clientWidth;
    let frameHeight = frameContainer.clientHeight;
    let fontSize = Math.min(frameWidth, frameHeight) * 0.037;
    document.getElementById("how_to_description").style.fontSize = fontSize + "px";
    document.getElementById("directions_left").style.fontSize = fontSize + "px";
    document.getElementById("directions_right").style.fontSize = fontSize + "px";
    document.getElementById("how_to_movement").style.fontSize = fontSize + "px";
    document.getElementById("story_div").style.fontSize = fontSize + "px";
    document.getElementById('quit_game_div').style.fontSize = fontSize + "px";
}

/** This is a function to update the text size in certain div containers that are being stretched when the game is entering fullscreen mode.*/
document.addEventListener("DOMContentLoaded", function () {

    /** This is the function that checks when the window is resized and calls the updateTextSize function.*/
    window.addEventListener("resize", updateTextSize);

    /**This function is called on start to set the start font size properly.*/
    updateTextSize();
});

/**This is a function that displays the game in fullscreen. */
function fullScreen() {
    let element = document.getElementById('frame');
    enterFullscreen(element);
    changeAttribute('full_screen_btn', 'onclick', 'normalScreen()');
    changeAttribute('full_screen_img', 'src', 'Assets/img/icons/exit_fullscreen.png');
}

/** This is a function that calls the exitFullscreen(), in order to exit fullscreen mode and it changes the appearance of the fullscreen button. */
function normalScreen() {
    exitFullscreen();
    changeAttribute('full_screen_btn', 'onclick', 'fullScreen()');
    changeAttribute('full_screen_img', 'src', 'Assets/img/icons/full_screen.png');


}

/**This function takes the entire document out of full screen mode, it is written to access multiple browser platforms. */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**This is a help function that handles the display of the desired element in fullscreen mode for different browser types. */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

