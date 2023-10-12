let level1; 

function initLevel(){

level1 = new Level(
    [
        new Chicken(480),
        new SmallChicken(500), 
        new Chicken(600),
        new SmallChicken(750),
        new SmallChicken(780),
        new Chicken(1200),
        new Chicken(1800),
        new SmallChicken(1800),
        new Chicken(2200),
        new Endboss(),
    ],
    [
        new Cloud(1),
        new Cloud(1000),
        new Cloud(2000),
    ],
    [
        new BackgroundObject('Assets/img/5_background/layers/air.png', -719),
        new BackgroundObject('Assets/img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('Assets/img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('Assets/img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('Assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('Assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('Assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('Assets/img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('Assets/img/5_background/layers/air.png', 719),
        new BackgroundObject('Assets/img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('Assets/img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('Assets/img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('Assets/img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('Assets/img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('Assets/img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('Assets/img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundObject('Assets/img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('Assets/img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('Assets/img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('Assets/img/5_background/layers/1_first_layer/2.png', 719 * 3),

        new BackgroundObject('Assets/img/5_background/layers/air.png', 719 * 4),
        new BackgroundObject('Assets/img/5_background/layers/3_third_layer/1.png', 719 * 4),
        new BackgroundObject('Assets/img/5_background/layers/2_second_layer/1.png', 719 * 4),
        new BackgroundObject('Assets/img/5_background/layers/1_first_layer/1.png', 719 * 4),
        new BackgroundObject('Assets/img/5_background/layers/air.png', 719 * 5),
        new BackgroundObject('Assets/img/5_background/layers/3_third_layer/2.png', 719 * 5),
        new BackgroundObject('Assets/img/5_background/layers/2_second_layer/2.png', 719 * 5),
        new BackgroundObject('Assets/img/5_background/layers/1_first_layer/2.png', 719 * 5),

    ],
    [
 
        new Bottle('Assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 650),
        new Bottle('Assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 850),
        new Bottle('Assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1050),
        new Bottle('Assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1550),
        new Bottle('Assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 2050),

    ],
    [
        new Coin('Assets/img/8_coin/coin_1.png', 350),
        new Coin('Assets/img/8_coin/coin_1.png', 800),
        new Coin('Assets/img/8_coin/coin_1.png', 900),
        new Coin('Assets/img/8_coin/coin_1.png', 1500),
        new Coin('Assets/img/8_coin/coin_1.png', 1950),

    ]
)
}