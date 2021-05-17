import {bigPlanets, smallPlanets} from "./data.js"

class test extends Phaser.Scene{
    constructor (){
        super();
    }

    preload (){
        this.load.image('bg', './assets/bg.png');
        // Creamos y colocamos los planetas grandes
        for (let i = 0; i<bigPlanets.length; i++){
            this.load.image(bigPlanets[i].name, bigPlanets[i].filename);
        }
        for (let i = 0; i<smallPlanets.length; i++){
            this.load.image(smallPlanets[i].name, smallPlanets[i].filename);
        }

		for (let i = 0; i<9; i++){
        	this.load.image("spaceShip"+i, "./assets/spaceship_0" + i + ".png");
		}

		for (let i = 0; i<24; i++){
        	this.load.image("star"+i, "./assets/star/star_" + i.toString().padStart(2, "0") + ".png");
		}

		
		this.load.image('red', './assets/red.png');
    }
    create (){
        this.add.image(640,360, 'bg');

        this.bPlanets = []
        this.sPlanets = []
        let velocity = -50

		for (let i = 0; i<bigPlanets.length; i++){
            let item = this.add.image(bigPlanets[i].posx, bigPlanets[i].posy, bigPlanets[i].name);
            this.bPlanets.push(item);
        }

        for (let i = 0; i<smallPlanets.length; i++){
            let item = this.add.image(smallPlanets[i].posx, smallPlanets[i].posy, smallPlanets[i].name);
            item.scale = 0.3;
            this.sPlanets.push(item);
        }

        this.physics.world.enable(this.bPlanets.concat(this.sPlanets));
        
        for (let i = 0; i<this.bPlanets.length; i++){
            this.bPlanets[i].body.setVelocity(velocity, 0).setBounce(1, 1).setCollideWorldBounds(false);
        }
        velocity = -10
        for (let i = 0; i<this.sPlanets.length; i++){
            this.sPlanets[i].body.setVelocity(velocity, 0).setBounce(1, 1).setCollideWorldBounds(false);
        }

        this.add.container(200, 50, this.bPlanets);

        this.anims.create({
            key: 'spaceShip',
            frames: [
                { key: 'spaceShip0' },
                { key: 'spaceShip1' },
                { key: 'spaceShip2' },
                { key: 'spaceShip3' },
                { key: 'spaceShip4' },
                { key: 'spaceShip5' },
                { key: 'spaceShip6' },
                { key: 'spaceShip7' },
                { key: 'spaceShip8' }
            ],
            frameRate: 9,
            repeat: -1
        });

		this.anims.create({
            key: 'star',
            frames: [
                { key: 'star0' },
                { key: 'star1' },
                { key: 'star2' },
                { key: 'star3' },
                { key: 'star4' },
                { key: 'star5' },
                { key: 'star6' },
                { key: 'star7' },
                { key: 'star8' },
                { key: 'star9' },
                { key: 'star10' },
                { key: 'star11' },
                { key: 'star12' },
                { key: 'star13' },
                { key: 'star14' },
                { key: 'star15' },
                { key: 'star16' },
                { key: 'star17' },
                { key: 'star18' },
                { key: 'star19' },
                { key: 'star20' },
                { key: 'star21' },
                { key: 'star22' },
                { key: 'star23' }
            ],
            frameRate: 24,
            repeat: -1
        });

		this.stars = this.physics.add.group();

		this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
		this.score = 0;
        this.spaceShip = this.physics.add.sprite(100, 400, 'spaceShip0').play('spaceShip');
		this.spaceShip.setCollideWorldBounds(true);
		// this.particles = this.add.particles('red');

		this.physics.add.overlap(this.spaceShip, this.stars, collectStar, null, this);

		setInterval(() => {
			createStar(this.stars)
		}, 3000);


		function collectStar (spaceShip, star){
			star.disableBody(true, true);
			this.score += 10;
			this.scoreText.setText('Score: ' + this.score);
	
		}

		function createStar(stars){
			let newStar = stars.create(1280,  Phaser.Math.Between(100, 620), 'star0');
			newStar.play('star')
			newStar.setBounce(1);
			newStar.setCollideWorldBounds(false);
			newStar.setVelocity(Phaser.Math.Between(-200, -100),0);
		}
    }
    update(){
		let dif = 2800;
        for (let i = 0; i<this.bPlanets.length; i++){
            if (this.bPlanets[i].body.x< -100) this.bPlanets[i].body.x=dif;
        }
		for (let i = 0; i<this.sPlanets.length; i++){
            if (this.sPlanets[i].body.x< -100) this.sPlanets[i].body.x=dif/2;
        }

		// Animate the ship so it's swaying back and forth
		if (this.spaceShip.angle>7) this.dir = 1;
		if (this.spaceShip.angle<-7) this.dir = 0;
		this.spaceShip.angle = this.dir==0 ? this.spaceShip.angle + .25 : this.spaceShip.angle - .25;

		this.cursors = this.input.keyboard.createCursorKeys();
		if (this.cursors.up.isDown) {
			this.spaceShip.setVelocityY(-160);
			// this.emitter = this.particles.createEmitter({
			// 	speed: 100,
			// 	scale: { start: 0.5, end: 0 },
			// 	blendMode: 'ADD'
			// });
			// this.emitter.startFollow(this.spaceShip);
		} else if (this.cursors.down.isDown) {
			this.spaceShip.setVelocityY(160);
		} else {
			this.spaceShip.setVelocityY(0);
			// this.particles.removeEmitter(this.emitter);
		}
    }
};


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-test',
    width: 1280,
    height: 720,
    backgroundColor: '#304858',
    scene: [ test ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
};

let game = new Phaser.Game(config);



