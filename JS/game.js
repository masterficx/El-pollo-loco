let canvas;
let ctx;
let keyboard = new Keyboard();
let touchCtrImage = 1;
let soundCtrlImage = 1;
let youWon = false;
let gameStarted = false;
let gameIsPaused = false;

/**This is a small help function to make the code shorter and cleaner. It sets/changes attributes to certain elements. */

function changeAttribute(id, name, content) {
    document.getElementById(id).setAttribute(name, content);
}

/**This is a small help function to make the code shorter and cleaner. It adds classes to certain elements. */

function addClasslist(id, theClass) {
    document.getElementById(id).classList.add(theClass);
}

/**This is a small help function to make the code shorter and cleaner. It removes classes from certain elements. */

function removeClasslist(id, theClass) {
    document.getElementById(id).classList.remove(theClass);
}

/**This is a small help function to make the code shorter and cleaner. It enables a certain button. */

function enableButton(id) {
    document.getElementById(id).disabled = false;
}

/**This is a small help function to make the code shorter and cleaner. It disables a certain button. */

function disableButton(id) {
    document.getElementById(id).disabled = true;
}

/**This is a small help function to make the code shorter and cleaner. It changes the background image url of a certain element. */

function changeBgImage(id, url){
    document.getElementById(id).style.backgroundImage = "";
    document.getElementById(id).style.backgroundImage = url;
}

/**This is a function that is called to start the game. */

function startGame() {
    closeHowToPlay();
    closeStory();
    addClasslist('start_screen', 'd-none');
    removeClasslist('canvas', 'd-none');
    initLevel();
    initWorld();
    handleBtnsOnGameStart();
    touchCtrlButtons();
    gameStarted = true;
}

/**This is a function that is called when the game is to be started again. */

function restartGame() {
    gameStarted = true;
    addClasslist('start_screen', 'd-none');
    removeClasslist('canvas', 'd-none');
    initLevel();
    initWorld();
    addClasslist('home_btn', 'd-none');
    addClasslist('new_game_btn', 'd-none');
    removeClasslist('pause_btn', 'd-none');
    pauseEndGameMusic();
}

/**This is a function that is called when the game ends due to win or loss. */

function endGame(x) {
    setTimeout(() => {
        clearAllIntervals();
        addClasslist('canvas', 'd-none')
        gameStarted = false;
        removeClasslist('start_screen', 'd-none')
        displayEndScreen(x);
        pauseBackgroundMusic();
        playEndGameMusic(x);
    }, 2500);
}

/**This is a function that is called after the game ends and it shows the winner or loser screen depending on the outcome. */

function displayEndScreen(x) {
    if (x == 'won') {
        displayYouWonScreen();
    } else {
        displayYouLostScreen();
    }
}

/**This is a small help function to make the code cleaner. It removes the buttons on the start screen and displays the in-game button. */

function handleBtnsOnGameStart() {
    addClasslist('start_game_btn', 'd-none');
    addClasslist('story_btn', 'd-none');
    addClasslist('how_to_play_btn', 'd-none');
    removeClasslist('pause_btn', 'd-none');
}

/**This is a function that is called to stop the winn/lose music after game end when a new game is immediately to be started.  */

function pauseEndGameMusic() {
    world.youLostMusic.pause();
    world.youLostMusic.currentTime = 0;
    world.youWonMusic.pause();
    world.youWonMusic.currentTime = 0;
}

/** This is a function that is called in order to pause the game. */

function pauseGame() {
    gameIsPaused = true;
    showPausedGameBtns();
    changeAttribute('pause_btn', 'onclick', 'resumeGame()');
    changeAttribute('pause_icon', 'src', 'Assets/img/icons/resume.png');
}

/** This is a function that is called in order to resume the game. */

function resumeGame() {
    gameIsPaused = false;
    closeHowToPlay();
    closePausedGameBtns();
    changeAttribute('pause_btn', 'onclick', 'pauseGame()');
    changeAttribute('pause_icon', 'src', 'Assets/img/icons/pause.png');
}

/**This is a function that displays the game in fullscreen. */

function fullScreen() {
    let element = document.getElementById('canvas');
    enterFullscreen(element);
    resumeGame();
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

/**This is a small help function that makes the code cleaner. It displays the menu buttons when the game is paused. */

function showPausedGameBtns() {
    removeClasslist('how_to_play_btn', 'd-none');
    removeClasslist('sound_ctrl_btn', 'd-none');
    removeClasslist('full_screen_btn', 'd-none');
    removeClasslist('show_quit_game_btn', 'd-none');
}

/**This is a small help function that makes the code cleaner. It removes the menu buttons from when the game was paused. */

function closePausedGameBtns() {
    addClasslist('how_to_play_btn', 'd-none');
    addClasslist('sound_ctrl_btn', 'd-none');
    addClasslist('full_screen_btn', 'd-none');
    addClasslist('show_quit_game_btn', 'd-none');
}

/**This is a small help function that makes the code cleaner. It shows the container in which is explained how the game is to be played. */

function showHowToPlay() {
    disableButton('story_btn');
    disableButton('show_quit_game_btn');
    changeAttribute('how_to_play_btn_img', 'src', 'Assets/img/icons/return.png');
    changeAttribute('how_to_play_btn', 'onclick', 'closeHowToPlay()');
    removeClasslist('how_to_play', 'd-none');
}

/**This is a small help function that makes the code cleaner. It removes the container in which was explained how the game is to be played. */


function closeHowToPlay() {
    enableButton('story_btn');
    enableButton('show_quit_game_btn');
    changeAttribute('how_to_play_btn_img', 'src', 'Assets/img/icons/question_mark.png');
    changeAttribute('how_to_play_btn', 'onclick', 'showHowToPlay()');
    addClasslist('how_to_play', 'd-none');
}

/**This is a small help function that makes the code cleaner. It shows the container in which is displayed the choice to end the game or not. */

function showQuitGame(){
    removeClasslist('quit_game_div', 'd-none');
    closePausedGameBtns();
    addClasslist('pause_btn', 'd-none');
}

/**This is a small help function that makes the code cleaner. It removes the container in which wass displayed the choice to end the game or not. */

function closeQuitGame(){
    addClasslist('quit_game_div', 'd-none');
    showPausedGameBtns();
    removeClasslist('pause_btn', 'd-none');
}

/**This is the function that handles the complete ending of the game. */

function quitGame(){
    clearAllIntervals();
    addClasslist('canvas', 'd-none');
    addClasslist('quit_game_div', 'd-none');
    gameIsPaused = false;
    changeAttribute('pause_btn', 'onclick', 'pauseGame()');
    changeAttribute('pause_icon', 'src', 'Assets/img/icons/pause.png');
    showStartScreen();
    world.backgroundMusic.pause();
    world.backgroundMusic.currentTime = 0;
}

/**This is a function that displays the start screen after a game was ended. */

function showStartScreen(){
    addClasslist('end_screen', 'd-none');
    changeBgImage('start_screen', 'Assets/img/9_intro_outro_screens/start/startscreen_1.png');
    addClasslist('new_game_btn', 'd-none');
    addClasslist('home_btn', 'd-none');
    removeClasslist('start_screen', 'd-none');
    removeClasslist('start_game_btn', 'd-none');
    removeClasslist('how_to_play_btn', 'd-none');
    removeClasslist('story_btn', 'd-none');
}

/**This is a small help function that makes the code cleaner. It shows the container in which the background story of the game is told. */


function showStory() {
    disableButton('how_to_play_btn');
    changeAttribute('story_btn_img', 'src', 'Assets/img/icons/return.png');
    changeAttribute('story_btn', 'onclick', 'closeStory()');
    removeClasslist('story_div', 'd-none');
}

/**This is a small help function that makes the code cleaner. Itcloses the container in which the background story of the game was shown. */

function closeStory() {
    enableButton('how_to_play_btn');
    changeAttribute('story_btn_img', 'src', 'Assets/img/icons/book.png');
    changeAttribute('story_btn', 'onclick', 'showStory()');
    addClasslist('story_div', 'd-none');
}

/**This is a function that decides if the winn or lose song is to be played. */

function playEndGameMusic(x) {
    if (x == 'won') {
        world.youWonMusic.play();
    } else {
        world.youLostMusic.play();
    }
}

/**This is a small help function that makes the code cleaner. It handles the displaying of the winner screen */

function displayYouWonScreen() {
    document.getElementById('start_screen').style.backgroundImage = "";
    document.getElementById('start_screen').style.backgroundImage = "url('Assets/img/5_background/first_half_background.png')";
    removeClasslist('end_screen', 'd-none');
    changeAttribute('end_screen', 'src', 'Assets/img/you_won.svg');
    addClasslist('pause_btn', 'd-none');
    addClasslist('start_game_btn', 'd-none');
    removeClasslist('new_game_btn', 'd-none');
    removeClasslist('home_btn', 'd-none');
}

/**This is a small help function that makes the code cleaner. It handles the displaying of the loser screen */

function displayYouLostScreen() {
    document.getElementById('start_screen').style.backgroundImage = "";
    document.getElementById('start_screen').style.backgroundImage = "url('Assets/img/5_background/first_half_background.png')";
    removeClasslist('end_screen', 'd-none');
    changeAttribute('end_screen', 'src', 'Assets/img/9_intro_outro_screens/game_over/oh no you lost!.png');
    addClasslist('pause_btn', 'd-none');
    addClasslist('start_game_btn', 'd-none');
    removeClasslist('new_game_btn', 'd-none');
    removeClasslist('home_btn', 'd-none');
}

/**This is the function that pauses/mutes the background music. */

function pauseBackgroundMusic() {
    clearInterval(world.playBgMusic);
    world.backgroundMusic.pause();
}

/**This is function that handles the initialisation of the world. It basically inserts all other needed classes through the class World.
  Through the class world the entire game logic is started as well. */

function initWorld() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    world = new World(canvas, keyboard);
}

/**This function stops all intervals. */

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**This function is called when the mute button is pressed. It stops the background music. */

function mute() {
    clearInterval(world.playBgMusic);
    world.backgroundMusic.pause();
    document.getElementById('sound_img').src = 'Assets/img/icons/speaker.png';
    changeAttribute('sound_ctrl_btn', 'onclick', 'unmute()');
}

/**This function is called when the unmute button is pressed. It resumes the background music playback */

function unmute() {
    world.backgroundMusic.play();
    document.getElementById('sound_img').src = 'Assets/img/icons/mute.png';
    changeAttribute('sound_ctrl_btn', 'onclick', 'mute()');
}

/**This function handles the keypresses and changes the corresponding variable as long a certaing key is pressed. */

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

/**This function handles the keypresses and changes the corresponding variable when a certaing key is released. */

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

/**This function handles the touch buttons. It changes the corresponding variable when a certain button is pressed or released.*/

function touchCtrlButtons() {
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