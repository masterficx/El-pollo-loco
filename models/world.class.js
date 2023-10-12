class World {
    character = new Character();
    backgroundMusic = new Audio('Assets/audio/background_queiter.mp3');
    killedChickenAudio = new Audio('Assets/audio/chicken_killed.mp3');
    endBossHitAudio = new Audio('Assets/audio/endboss_hit.mp3');
    youLostMusic = new Audio('Assets/audio/you_lost.mp3');
    youWonMusic = new Audio('Assets/audio/you_won.mp3');
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new HealthStatusBar();
    bottleStatusBar = new BottleStatusBar();
    coinStatusBar = new CoinStatusBar();
    endbossStatusBar = new EndBossStatusBar();
    endBossStatusBarIcon = new EndBossBarIcon();
    throwableObjects = [];
    collectedBottles = 0;
    collectedCoins = 0;
    endBoss = this.level.enemies[this.level.enemies.length - 1];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.draw();
        this.setWorld();
        this.run();

    }

    setWorld() {
        this.character.world = this;
    }

    /**This is the main function that starts all intervalls that handle the logic in the game, and plays the background music also. */

    run() {
        this.playBgMusic = setInterval(() => {
            this.backgroundMusic.play()
        }, 1);

        setInterval(() => {

            if (this.gameIsPaused == true) {

            } else {
                this.killChicken()
            };
        }, 20);

        setInterval(() => {
            if (this.gameIsPaused == true) {

            } else {
                this.collectBottles();
                this.collectCoins();
                this.charReachedEndBoss();
                this.bottleHitsEnemy();
                this.checkThrowObjects();
                this.isGameOver();
            }

        }, 50);

        setInterval(() => {
            if (this.gameIsPaused == true) {

            } else {
                this.charIsHit();
            }

        }, 100);
    }

    /** This function handles the creation of the Throwable object class, when certain criterias are met. */

    checkThrowObjects() {
        if (this.keyboard.D && this.hasBottles()) {
            if (this.character.otherDirection) {
                this.throwableObjectLeft();
            } else if (!this.character.otherDirection) {
                this.throwableObjectRight();
            }
        }
    }

    /**This function checks the energy of the main player or the main boss and with that decides if the game has ended. */

    isGameOver() {
        if (this.endBoss.energy == 0 || this.character.energy == 0) {
            if (this.endBoss.energy == 0) {
                endGame('won');
            } else {
                endGame('lost');
            }
        } else {

        }
    }

    /**This is a smaller help function that creates an instance of the Throwable object class that is to be displayed/thrown to the left of the main player. */

    throwableObjectLeft() {
        let bottle = new ThrowableObject(this.character.x, this.character.y + 70, 'left');
        this.throwableObjects.push(bottle);
        this.collectedBottles--;
        this.bottleStatusBar.setPercentage(this.collectedBottles);
    }

    /**This is a smaller help function that creates an instance of the Throwable object class that is to be displayed/thrown to the right of the main player. */

    throwableObjectRight() {
        let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 70, 'right');
        this.throwableObjects.push(bottle);
        this.collectedBottles--;
        this.bottleStatusBar.setPercentage(this.collectedBottles);
    }

    /**This is the function that checks if the main player was hurt from an enemy. */

    charIsHit() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            };
        })
    }

    /** This function checks if there was a collision with a throwable object and one of the enemies. It basically checks if the main player managed to hit the enemy. */

    bottleHitsEnemy() {

        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy, j) => {
                if (bottle.isColliding(enemy)) {
                    bottle.playSplashAnimation = true;
                    this.reduceEnemyEnergy(enemy, j, bottle);
                }
            });
        });
    }

    /**This function decides who gets to habe his energy reduced, depending on that if it is a smaller enemy or the main boss. */

    reduceEnemyEnergy(enemy, indexOfChicken, bottle) {
        if (enemy == this.endBoss) {
            this.reduceEndbossHP(enemy, indexOfChicken, bottle);
        } else {
            this.chickenIsDead(enemy, indexOfChicken, bottle);
            indexOfChicken = indexOfChicken - 1;
        }


    }

    /**This function handles the removal of the smaller enemy after it has been hit with a bottle. */

    chickenIsDead(enemy, indexOfChicken, bottle) {
        enemy.energy = 0;
        enemy.speed = 0;
        this.level.enemies.splice(indexOfChicken, 1);
        setTimeout(() => {
            this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
        }, 100);
    }

    /**This function reduces the energy of the main boss by a certain procent after being hit by a bottle.  */

    reduceEndbossHP(bottle) {
        this.endBoss.energy -= 20;
        this.endBossHitAudio.play();
        setTimeout(() => {
            this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
        }, 30);
        this.endbossStatusBar.setPercentage(this.endBoss.energy);
    }

    /**This function checks if the main player reached the point where the final battle with the main boss is to start. */

    charReachedEndBoss() {
        if (this.character.x > 2700) {
            this.endBoss.charIsHere = true;
        }
    }

    /**This function handles the removal of a smaller enemy from the world after being stepped on by the main player. */

    killChicken() {
        this.level.enemies.forEach((enemy, i) => {
            if (enemy.dead) {
                this.level.enemies.splice(i, 1)
            }
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.energy == 0) {
                if (enemy == this.endBoss) {
                } else {
                    this.character.smallJump();
                    enemy.energy = 0;
                    enemy.speed = 0;
                    this.killedChickenAudio.play();
                    setTimeout(() => {
                        enemy.dead = true;
                    }, 100);
                    // i = i - 1;
                }
            };
        })
    }

    /**This function checks for collision between the main player and the bottles on the ground and increases the ammount of the collected bottles. */

    collectBottles() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                bottle.bottlePickUp.play();
                this.collectedBottles++;
                this.level.bottles.splice(i, 1);
                this.bottleStatusBar.setPercentage(this.collectedBottles);
            };
        })
    }

    /**This function checks for collision between the main player and the coins in the world and increases the ammount of the collected coins. */


    collectCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                coin.coinPickUp.play();
                this.collectedCoins++;
                this.level.coins.splice(i, 1);
                this.coinStatusBar.setPercentage(this.collectedCoins);
            };
        })
    }

    /**This is a help function that checks if the main player has bottles at all. */

    hasBottles() {
        return this.collectedBottles > 0;
    }

    /**This is the draw function that draws all of the movable and static objects on the canvas as well as the background objects. */

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addAllBackgroundObjectsToMap();
        this.addBottlesAndCoinsToMap();
        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects
        this.addAllStatusBarsToMap();
        this.ctx.translate(this.camera_x, 0);
        this.addAllMovableObjectsToMap();
        this.ctx.translate(-this.camera_x, 0);
        // Draw() will be executed repeatedly.
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**This is a small function that adds the movable objects to the canvas */

    addAllMovableObjectsToMap() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**This is a small function that adds the bottles and coins to the canvas */

    addBottlesAndCoinsToMap() {
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
    }

    /**This is a small function that adds the background objects to the canvas */

    addAllBackgroundObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**This is a small function that adds the status bars to the canvas */

    addAllStatusBarsToMap() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addEndBossStatusBar();
    }

    /**This is a small function that adds the main boss health status bar to the canvas */
    
    addEndBossStatusBar() {
        if (this.endBoss.charIsHere) {
            this.addToMap(this.endbossStatusBar);
            this.addToMap(this.endBossStatusBarIcon);
        }
    }

    /**This is a small help function that adds the the static objects to the canvas */

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**This is a small help function that adds the movable to the canvas in the corresponding direction*/

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**This is a small help function that flips the image in the other direction. */

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**This is a small help function that flips the image back in the other direction. */

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}