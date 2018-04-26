import 'phaser';

let cat;
let dog;
let platforms;
let gate1;
let gate2;
let cloud2;
let cloud3;
let controlsCat;
let controlsDog;
let scoreDog = 0;
let scoreCat = 0;
let gameOver = false;
let scoreText;
let ball;
let backMenu;
let audio2;

function hitBall (player, ball) {
    hitBallForBothPlayers(controlsCat, player, ball, 'cat');
    hitBallForBothPlayers(controlsDog, player, ball, 'dog');
}

function hitBallForBothPlayers(controls, player, ball, type) {
    //hit hard
    if ((controlsCat.hitUp.isDown && player.texture.key === 'cat') || (controlsDog.hitUp.isDown && player.texture.key === 'dog')) {
        if ((controlsCat.hitHard.isDown && player.texture.key === 'cat') || (controlsDog.hitHard.isDown && player.texture.key === 'dog')) {
            ball.setVelocity(0, -850);
        }
        else {
            ball.setVelocity(0, -400);
        }
    }

    //hit2
    if ((controlsCat.hit2.isDown && player.texture.key === 'cat') || (controlsDog.hit2.isDown && player.texture.key === 'dog')) {
        if (player.x < ball.x) {
            if ((controlsCat.hitHard.isDown && player.texture.key === 'cat') || (controlsDog.hitHard.isDown && player.texture.key === 'dog')) {
                ball.setVelocity(800, -600);
            }
            else {
                ball.setVelocity(400, -500);
            }
        }
        if (player.x > ball.x) {
            if ((controlsCat.hitHard.isDown && player.texture.key === 'cat') || (controlsDog.hitHard.isDown && player.texture.key === 'dog')) {
                ball.setVelocity(-800, -600);
            }
            else {
                ball.setVelocity(-400, -500);
            }
        }
    }

    //hit3
    if ((controlsCat.hit3.isDown && player.texture.key === 'cat') || (controlsDog.hit3.isDown && player.texture.key === 'dog')) {
        if (player.x < ball.x) {
            if ((controlsCat.hitHard.isDown && player.texture.key === 'cat') || (controlsDog.hitHard.isDown && player.texture.key === 'dog')) {
                ball.setVelocity(800, -300);
            }
            else {
                ball.setVelocity(400, -200);
            }
        }
        if (player.x > ball.x) {
            if ((controlsCat.hitHard.isDown && player.texture.key === 'cat') || (controlsDog.hitHard.isDown && player.texture.key === 'dog')) {
                ball.setVelocity(-800, -300);
            }
            else {
                ball.setVelocity(-400, -200);
            }
        }
    }

    //hit straight
    if ((controlsCat.hitStraight.isDown && player.texture.key === 'cat') || (controlsDog.hitStraight.isDown && player.texture.key === 'dog')) {
        if (player.x < ball.x) {
            if ((controlsCat.hitHard.isDown && player.texture.key === 'cat') || (controlsDog.hitHard.isDown && player.texture.key === 'dog')) {
                ball.setVelocity(800, 0);
            }
            else {
                ball.setVelocity(400, 0);
            }
        }
        if (player.x > ball.x) {
            if ((controlsCat.hitHard.isDown && player.texture.key === 'cat') || (controlsDog.hitHard.isDown && player.texture.key === 'dog')) {
                ball.setVelocity(-800, 0);
            }
            else {
                ball.setVelocity(-400, 0);
            }
        }
    }

    //hit with head
    if ((controlsCat.up.isDown && player.texture.key === 'cat') || (controlsDog.up.isDown && player.texture.key === 'dog')) {
        if (ball.y < 550) {
            if ((controlsCat.left.isDown && player.texture.key === 'cat') || (controlsDog.up.left && player.texture.key === 'dog'))
            {
                ball.setVelocity(-300, -700);
            } else if ((controlsCat.right.isDown && player.texture.key === 'cat') || (controlsDog.right.isDown && player.texture.key === 'dog'))
            {
                ball.setVelocity(300, -700);
            } else {
                ball.setVelocity(0, -700);
            }
        }
    }
}

function goal(ball, gate) {
    console.log('Goal:', ball.y);
    if (ball.y > 470) {
        if (gate.texture.key === 'gate1') {
            scoreCat++;
        }
        if (gate.texture.key === 'gate2') {
            scoreDog++;
        }
        resetObjects();
        console.log(scoreDog, ":", scoreCat);
        scoreText.setText("Dog vs Cat " + scoreDog + ":" + scoreCat);
        if (scoreCat === 7) {
            scoreText.setText("Cat won!");
            setTimeout(function () {
                scoreText.setText("Dog vs Cat 0 : 0")
            }, 2000);
            scoreCat = 0;
            scoreDog = 0;
        } else if (scoreDog === 7) {
            scoreText.setText("Dog won!");
            setTimeout(function () {
                scoreText.setText("Dog vs Cat 0 : 0")
            }, 2000);
            scoreCat = 0;
            scoreDog = 0;
        }
    }
}

function resetObjects() {
    dog.x = 100;
    dog.y = 400;

    ball.x = 400;
    ball.y = 300;

    cat.x = 750;
    cat.y = 400;

    dog.setVelocity(0, 0);
    ball.setVelocity(0, 0);
    cat.setVelocity(0, 0);
}

let playScene = {
    key: 'play',
    active: true,
    init: (config) => {
        console.log('[Play] init', config);
    },

    preload: function () {
        this.load.image('sky', 'assets/back.jpg');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('gate1', 'assets/gate.png');
        this.load.image('gate2', 'assets/gate.png');
        this.load.image('cloud2', 'assets/cloud2.png');
        this.load.image('cloud3', 'assets/cloud3.png');
        this.load.image('menu', 'assets/menu.jpg');
        this.load.image('bac_menu', 'assets/bac_menu.png');
        this.load.image('audio2', 'assets/audio2.png');
        this.load.audio('theme', 'assets/music.mp3');  this.load.spritesheet('cat', 'assets/cat.png', {frameWidth: 24, frameHeight: 22});
        this.load.spritesheet('dog', 'assets/dog.png', {frameWidth: 24, frameHeight: 19});
    },

    create: function () {
        //  A simple background for our game
        this.add.image(400, 300, 'menu');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();
        gate1 = this.physics.add.staticGroup();
        gate2 = this.physics.add.staticGroup();
        cloud2 = this.physics.add.staticGroup();
        cloud3 = this.physics.add.staticGroup();

        backMenu = this.add.sprite (600, 20, 'bac_menu').setInteractive();

        backMenu.on('pointerdown', () => {
            this.scene.start('menu');
        });

        audio2 = this.add.sprite (760, 20, 'audio2').setInteractive();
        if (!music.isPlaying){
            music.play();
        }

        audio2.on('pointerdown', () => {
            if (music.isPlaying) {
                music.pause();
            } else {
                music.resume();
            }
        });

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 620, 'ground').setScale(2).refreshBody();

        gate1.create(20, 535, 'gate1').refreshBody();

        gate2.create(780, 535, 'gate2').refreshBody();

        cloud2.create(640, 200, 'cloud2').refreshBody();
        cloud3.create(220, 200, 'cloud2').refreshBody();

        // The player and its settings
        cat = this.physics.add.sprite(700, 450, 'cat');
        dog = this.physics.add.sprite(100, 450, 'dog');
        ball = this.physics.add.sprite(400, 300, 'ball');

        //  Player physics properties. Give the little guy a slight bounce.
        cat.setBounce(0.2);
        cat.setCollideWorldBounds(true);

        dog.setBounce(0.2);
        dog.setCollideWorldBounds(true);

        ball.setBounce(0.4);
        ball.setCollideWorldBounds(true);
        ball.body.setCircle(8);

        //  Our player animations, turning, walking left and walking right.

        this.anims.create({
            key: 'cat-left',
            frames: this.anims.generateFrameNumbers('cat', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'cat-turn',
            frames: [{key: 'cat', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'cat-right',
            frames: this.anims.generateFrameNumbers('cat', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'dog-left',
            frames: this.anims.generateFrameNumbers('dog', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'dog-turn',
            frames: [{key: 'dog', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'dog-right',
            frames: this.anims.generateFrameNumbers('dog', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        controlsCat = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            hitUp: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O),
            hit2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P),
            hit3: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.OPEN_BRACKET),
            hitStraight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CLOSED_BRACKET),
            hitHard: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.QUOTES),
            respwan: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE)
        };

        controlsDog = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            hitUp: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V),
            hit2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B),
            hit3: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N),
            hitStraight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M),
            hitHard: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
            respwan: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB),
            respwanBall: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN)
        };

        //  The score
        scoreText = this.add.text(16, 16, 'Dog vs Cat 0 : 0', {fontSize: '18px', fill: '#000'});

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(cat, platforms);
        this.physics.add.collider(dog, platforms);
        this.physics.add.collider(ball, platforms);

        this.physics.add.collider(cat, cloud2);
        this.physics.add.collider(dog, cloud2);
        this.physics.add.collider(ball, cloud2);

        this.physics.add.collider(cat, cloud3);
        this.physics.add.collider(dog, cloud3);
        this.physics.add.collider(ball, cloud3);

        this.physics.add.collider(cat, gate1);
        this.physics.add.collider(dog, gate1);
        this.physics.add.collider(cat, gate2);
        this.physics.add.collider(dog, gate2);

        this.physics.add.collider(ball, gate1, goal, null, this);
        this.physics.add.collider(ball, gate2, goal, null, this);

        this.physics.add.collider(cat, dog);
        this.physics.add.collider(dog, cat);

        this.physics.add.collider(cat, ball, hitBall, null, this);
        this.physics.add.collider(dog, ball, hitBall, null, this);

    },

    update: function () {
        if (gameOver) {
            return;
        }

        if (controlsCat.left.isDown) {
            cat.setVelocityX(-200);

            cat.anims.play('cat-left', true);
        }
        else if (controlsCat.right.isDown) {
            cat.setVelocityX(200);

            cat.anims.play('cat-right', true);
        }
        else {
            cat.setVelocityX(0);

            cat.anims.play('cat-turn');
        }

        if (controlsCat.up.isDown && cat.body.touching.down) {
            cat.setVelocityY(-200);
        }

        if (controlsCat.respwan.isDown) {
            cat.x = 750;
            cat.y = 400;
        }

        if (controlsDog.left.isDown) {
            dog.setVelocityX(-200);

            dog.anims.play('dog-left', true);
        }
        else if (controlsDog.right.isDown) {
            dog.setVelocityX(200);

            dog.anims.play('dog-right', true);
        }
        else {
            dog.setVelocityX(0);

            dog.anims.play('dog-turn');
        }

        if (controlsDog.up.isDown && dog.body.touching.down) {
            dog.setVelocityY(-200);
        }

        if (controlsDog.respwan.isDown) {
            dog.x = 100;
            dog.y = 400;
        }

        if (controlsDog.respwanBall.isDown) {
            ball.x = 400;
            ball.y = 300;
        }
    }
};

let logo;
let start;
let audioMenu;
let music;

let menuScene = {
    key: 'menu',
    active: true,
    init: (config) => {
        console.log('[Menu] init', config);
    },

    preload: function () {
        this.load.image('sky', 'assets/back.jpg');
        this.load.image('logo', 'assets/Head-Soccer.png');
        this.load.image('start', 'assets/START.png');
        this.load.image('audio1', 'assets/audio1.png');
        this.load.audio('theme', 'assets/music.mp3');
    },

    create: function () {
        //  A simple background for our game
        this.add.image(400, 300, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        logo = this.physics.add.staticGroup();
        start = this.add.sprite(400, 400, 'start').setInteractive();
        audioMenu = this.add.sprite(400, 500, 'audio1').setInteractive();

        logo.create(400, 200, 'logo').refreshBody();

        music = this.sound.add('theme');
        if (!music.isPlaying){
            music.play();
        }

        start.on('pointerdown', () => {
            this.scene.start('play');
        });

        audioMenu.on('pointerdown', () => {
            if (music.isPlaying) {
                music.pause();
            } else {
                music.resume();
            }
        });

    },

    update: function () {
    }
};

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: [playScene, menuScene]
};

let game = new Phaser.Game(config);
game.scene.start('menu');

