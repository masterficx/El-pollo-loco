/**
 * This is the main function that calles all other functions to check the orientation on page load
 */
function handleOrientation() {
    handleOrientationPortrait();
    handleOrientationLandscape();
    checkOrientation();
}


/**
 * This function checks the orientation on page load when the device is in portrait mode 
 */
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

/**This is a smaller help function to restore the page content */

function restoreContent() {
    removeClasslist('start_game_btn', 'd-none');
    removeClasslist('upper_frame', 'd-none');
    removeClasslist('start_screen', 'd-none');
    removeClasslist('frame', 'd-none');
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


/**
 * This function checks the orientation on page load when the device is in landscape mode 
 */
function handleOrientationLandscape() {
    if (window.orientation !== undefined && window.orientation === 90 || window.orientation !== undefined && window.orientation === -90) {
        restoreContent();
        removeOrientationHint();

    }
}


/**
 * This function is used to check the current orientation on orientation change
 */
function checkOrientation() {
    window.addEventListener("orientationchange", function () {
        if (window.orientation === 0) {
            removeContent();
            showOrientationHint();
        }

        if ((window.orientation === 90 || window.orientation === -90) && gameStarted == true) {
            removeOrientationHint();
            removeClasslist('frame', 'd-none');
            removeClasslist('upper_frame', 'd-none');
            removeClasslist('lower_frame', 'd-none');

        }

        if ((window.orientation === 90 || window.orientation === -90) && gameStarted == false) {
            removeOrientationHint();
            restoreContent();
        }
    });
}