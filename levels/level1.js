const level1 = new Level(
    [
        new Chicken(1),
        new Chicken(1), 
        new Chicken(600),
        new Chicken(600),
        new Chicken(1200),
        new Chicken(1200),
        new Chicken(1800),
        new Chicken(1800),

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

    ]
)