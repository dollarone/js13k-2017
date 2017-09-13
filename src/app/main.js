"use strict"

import HiHat from './hihat.js'
import Bass from './bass.js'
import Snare from './snare.js'
import Crash from './crash.js'
import Bullet from './bullet.js'
import Player from './player.js'
import Lamp from './lamp.js'
import ParticleManager from './particlemanager.js'
import BulletManager from './bulletmanager.js'

class Main {
	constructor(hihat, snare, bass) {
		this.hihat_sound = document.getElementById("hihat")
		this.snare_sound = document.getElementById("snare")
		this.bass_sound = document.getElementById("bass")
		this.crash_sound = document.getElementById("crash")
		this.bell_sound = document.getElementById("bell")
		this.song1_sound = document.getElementById("song1")

		this.canvas = document.getElementById('a')
		this.context = this.canvas.getContext('2d')

		this.step = 0
		//this.startDate = new Date();
		this.update = this.update.bind(this)
		this.render = this.render.bind(this)
		this.click = this.click.bind(this)
		this.triggerBase = this.triggerBase.bind(this)
		this.startGame = this.startGame.bind(this)
		this.levelUp = this.levelUp.bind(this)
		this.enemies = []
		this.beats = []
		this.currentBeat = 0
		this.gameStarted = false

		this.hihatTowerTimers = []
		this.snareTowerTimers = []
		this.bassTowerTimers = []
		this.maxHihatTowers = 4
		this.maxsnareTowerTimers = 2
		this.maxbassTowerTimers = 1


		this.lampsStartX = 295
		this.lampsStartY = 10

		this.beat = new Lamp()
		this.beat.x = this.lampsStartX
		this.beat.y = this.lampsStartY
		this.beat.currentColour = '#977'

		this.towerColumns = 8

		this.crash = new Crash(500,this.canvas.height / 2)
		this.particleManager = new ParticleManager()
		this.player = new Player(500,this.canvas.height / 2, this.particleManager)
		this.bulletManager = new BulletManager(this.particleManager, this.player)


		for(let i=0; i<this.towerColumns; i++) {
			let enemy2 = new Lamp("hihat", i, this.player)
			enemy2.y = this.lampsStartY + enemy2.radius * 2
			enemy2.x = this.lampsStartX + i * enemy2.radius * 2
			enemy2.currentColour = '#000'
			this.hihatTowerTimers.push(enemy2)
			let enemy3 = new Lamp("snare", i, this.player)
			enemy3.y = this.lampsStartY + enemy2.radius * 4
			enemy3.x = this.lampsStartX + i * enemy3.radius * 2
			enemy3.currentColour = '#000'
			this.snareTowerTimers.push(enemy3)
			let enemy4 = new Lamp("bass", i, this.player)
			enemy4.y = this.lampsStartY + enemy2.radius * 6
			enemy4.x = this.lampsStartX + i * enemy4.radius * 2
			enemy4.currentColour = '#000'
			this.bassTowerTimers.push(enemy4)
		}
		this.hihatTowerTimers[1].activeBeat = 1
		this.hihatTowerTimers[3].activeBeat = 3
		this.hihatTowerTimers[4].activeBeat = 4

		this.snareTowerTimers[2].activeBeat = 2
		this.snareTowerTimers[6].activeBeat = 6

		this.bassTowerTimers[0].activeBeat = 0

		this.hihatTowers = []
		this.snareTowers = []
		this.bassTowers = []
		let circle = new HiHat(180,this.canvas.height / 2)
		let circle2 = new HiHat(115,this.canvas.height / 2)
		this.hihatTowers.push(circle)
		this.hihatTowers.push(circle2)

		let bigcircle = new Bass(350,this.canvas.height / 2)
		this.bassTowers.push(bigcircle)

		let snareEx = new Snare(260,this.canvas.height / 2)
		this.snareTowers.push(snareEx)

		this.context.font = "30px Verdana"
		this.gradient = this.context.createLinearGradient(0,0,this.canvas.width,0)
		this.colorStart = 0.10
		this.colorStartChange = -0.03
		this.gradient.addColorStop("0", "#7027C3")
		this.gradient.addColorStop(this.colorStart, "magenta")
		this.gradient.addColorStop(this.colorStart+0.10, "black")
		this.gradient.addColorStop(this.colorStart+0.70, "black")
		this.gradient.addColorStop(this.colorStart+0.80, "magenta")
		this.gradient.addColorStop("1.0","#7027C3")
		
		this.textStartX = this.canvas.width
		this.textX = this.textStartX+200
		this.textStartY = 600
		this.textStartXChange = -1
		this.textStartYChange = -0.3
		this.point2X = this.textStartX + 30
		this.point2Y = this.textStartX
		this.tab = "                                                 "
		this.tutorialText = "hello!                   and welcome to the tutorial!"
			+this.tab+"feel free to skip the tutorial at any time by pressing the 'start' button below"
			+this.tab+"so, you're Frank. the smiling dude above. and you're lost. very lost"
			+this.tab+"you've entered some crazy disco dimension where your only defence is a good beat"
			+this.tab+"anyway: you got three types of drums: hihat (pink), snare (green) and bass drum (blue)"
			+this.tab+"these are spread around you as your defences and they will emit a protective sonar attack when activated in the beat above"
			+this.tab+"your challenge is thus to create a beat that defends you well against the army of angry bullets"
			+this.tab+"you also have a crash (dark blue) that you can hit at a cost"
			+this.tab+"you can add more drums to the beat above! this costs money"
			+this.tab+"hihat costs $10000 + $1 per hit"
			+this.tab+"snare costs $20000 + $2 per hit"
			+this.tab+"bass drum costs $30000 + $3 per hit"
			+this.tab+"click on a position to add to your beat. try it! here's some money to play with! don't worry, money will reset after the tutorial"
			+this.tab+this.tab+"you can also sell for half of the cost by clicking again"
			+this.tab+"your crash is on the house but costs $3000 per hit. press the dark blue circle to activate it."
			+this.tab+"if you can keep the beat to a minimum, you'll have more money later"
			+this.tab+"although beware of being too greedy: each time a bullet hits you, you lose a life"
			+this.tab+"you start with 20 lives, like a super cat"
			+this.tab+"each bullet you destroy will earn you some money!"
			+this.tab+"can you find a beat that will beat 'em all?"
			+this.tab+"that is your challenge. good luck, Frank!"
			+this.tab+this.tab+this.tab+"press the 'start' button below to start"

		this.startButton = new Lamp("start", 0, this.player)
		this.startButton.x = 500
		this.startButton.y = 920
		this.startButton.radius = 50
		this.startButton.currentColour = '#000'
		
		this.fontSize = 1
		this.win = false
		this.smallBulletReward = 200
		this.bigBulletReward = 100

//		this.song1_sound.play()

	}

	update() {	
		this.step = this.step + 1
		

		if (this.player.dead == false && this.win == false) {
			for(let i=0; i<this.hihatTowers.length; i++) {
				this.hihatTowers[i].update(this.bulletManager.bullets)
			}
			for(let i=0; i<this.snareTowers.length; i++) {
				this.snareTowers[i].update(this.bulletManager.bullets)
			}
			for(let i=0; i<this.bassTowers.length; i++) {
				this.bassTowers[i].update(this.bulletManager.bullets)
			}
			this.crash.update(this.bulletManager.bullets)

			this.player.update(this.bulletManager.bullets)
		}
		if (this.gameStarted == false) {
			if (this.step % 240 == 190) {
				this.bulletManager.activate('#FFFF01', -1, this.canvas.height / 2, 3, 2, 0, this.smallBulletReward)
			}
			if (this.step % 240 == 115) {
				this.bulletManager.activate('#FFFF01', -1, this.canvas.height / 2, 3, 2, 0, this.smallBulletReward)
			}

			if (this.step == 9000) {
				this.bulletManager.activate('#FFFF01', this.canvas.width + 3, this.canvas.height / 2, 3, -2, 0, this.smallBulletReward)
			}

			if (this.step % 120 == 100) {
				this.bulletManager.activate('#FF6600', -1, this.canvas.height / 2, 7, 1, 0, this.bigBulletReward)
			}
			if( this.textStartX < -100) {
				this.textStartXChange = 0.5
			}
			if( this.textStartY < -100) {
				this.textStartYChange = 0.1
			}
			if( this.textStartX > this.canvas.width + 200) {
				this.textStartXChange = -0.45
			}
			if( this.textStartY > this.canvas.height + 100) {
				this.textStartYChange = -0.15
			}
			this.textStartX += this.textStartXChange
			this.textStartY += this.textStartYChange

			this.textX -= 3

			if (this.step == 6500) {
				this.player.money += 100000
			}

		}
		else {

			switch (this.level) {
				case 10:
				case 9:
				case 8:
				case 7:
				case 6:
					if (this.step % this.specialBulletRate == 0) {
						this.bulletManager.activate('#FFFF01', this.canvas.width, this.canvas.height / 2 - this.canvas.width/2, 3, -2, 2, this.smallBulletReward)
					}
				case 5:
					if (this.step % this.specialBulletRate == 5) {
						this.bulletManager.activate('#FFFF01', this.canvas.width, this.canvas.height, 3, -2, -2, this.smallBulletReward)
					}
				case 4:
					if (this.step % this.specialBulletRate == 0) {
						this.bulletManager.activate('#FFFF01', -1, this.canvas.height / 2 - this.canvas.width/2 -1, 3, 2, 2, this.smallBulletReward)
					}
				case 3:
					if (this.step % this.specialBulletRate == 3) {
						this.bulletManager.activate('#FFFF01', this.canvas.width + 3, this.canvas.height / 2, 3, -2, 0, this.smallBulletReward)
					}
				case 2:
					if (this.step % this.specialBulletRate == 0) {
						this.bulletManager.activate('#FFFF01', 2, this.canvas.height+1, 3, 2, -2, this.smallBulletReward)
					}
				default:
					if (this.step > 240 && this.step % this.specialBulletRate == 10) {
						this.bulletManager.activate('#FFFF01', -1, this.canvas.height / 2, 3, 2, 0, this.smallBulletReward)
					}
					if (this.step > 480 && this.step % this.bulletRate == 100) {
						this.bulletManager.activate('#FF6600', -1, this.canvas.height / 2, 7, 1, 0, this.bigBulletReward)
					}
					if (this.step > 960 && this.step % this.bulletRate == 115) {
						this.bulletManager.activate('#FF6600', -1, this.canvas.height / 2, 7, 1, 0, this.bigBulletReward)
					}
					if (this.step > 1300 && this.step % this.bulletRate == 100) {
						this.bulletManager.activate('#FF6600', this.canvas.width, this.canvas.height, 7, -1, -1, this.bigBulletReward)
					}
					if (this.step > 1600 && this.step % this.bulletRate == 95) {
						this.bulletManager.activate('#FF6600', this.canvas.width + 3, 0, 7, -1, 1, this.bigBulletReward)
					}
					if (this.step > 1900 && this.step % this.bulletRate == 95) {
						this.bulletManager.activate('#FF6600', this.canvas.width + 3, 0, 7, -1, 1, this.bigBulletReward)
					}

					if (this.step > 2240 && this.step % 951 == 10) {
						this.bulletManager.activate('#E1FDE9', -1, this.canvas.height, 10, this.level, -this.level, 300)
					}

					if (this.step > 2800 && this.step % this.bulletRate == 25) {
						this.bulletManager.activate('#FF6600', 0, this.canvas.height, 7, 1, -1, this.bigBulletReward)
					}

					if (this.step > 3200 && this.step % this.bulletRate == 35) {
						this.bulletManager.activate('#FF6600', -1, -1, 7, 1, 1, this.bigBulletReward)
					}

					if (this.step > 3800 && this.step % this.bulletRate == 5) {
						this.bulletManager.activate('#FF6600', this.canvas.width + 3, this.canvas.height / 2, 7, -1, 0, this.bigBulletReward)
					}

					if (this.step > 4100 && this.step % 651 == 10) {
						this.bulletManager.activate('#E1FDE9', this.canvas.width, this.canvas.height, 10, -this.level, -this.level, 300)
					}

					if (this.step > 4400 && this.step % this.bulletRate == 100) {
						this.bulletManager.activate('#FF6600', -1, -1, 7, 1, 1, this.bigBulletReward)
					}

					if (this.step > 5000 && this.step % this.bulletRate == 95) {
						this.bulletManager.activate('#FF6600', this.canvas.width + 3, this.canvas.height / 2, 7, -1, 0, this.bigBulletReward)
					}

					if (this.step > 5400 && this.step % 756 == 3) {
						this.bulletManager.activate('#E1FDE9',  -1, -1, 10, this.level-1, this.level-1, 300)
					}

					if (this.step > 5800 && this.step % this.bulletRate == 120) {
						this.bulletManager.activate('#FF6600', 0, this.canvas.height, 7, 1, -1, this.bigBulletReward)
					}

					if (this.step > 6200 && this.step % this.bulletRate == 0) {
						this.bulletManager.activate('#FF6600', -1, -1, 7, 1, 1, this.bigBulletReward)
					}

					if (this.step > 6700 && this.step % this.bulletRate == 205) {
						this.bulletManager.activate('#FF6600', this.canvas.width + 3, this.canvas.height / 2, 7, -1, 0, this.bigBulletReward)
					}

					if (this.step > 7100 && this.step % this.bulletRate == 220) {
						this.bulletManager.activate('#FF6600', this.canvas.width, this.canvas.height, 7, -1, -1, this.bigBulletReward)
					}

					if (this.step > 8000 && this.step % this.bulletRate == 1) {
						this.bulletManager.activate('#FF6600', -1, -1, 7, 1, 1, this.bigBulletReward)
					}

					if (this.step > 8800 && this.step % 499 == 3) {
						this.bulletManager.activate('#E1FDE9', this.canvas.width + 3, this.canvas.height / 2, 10, -this.level, 0, 300)
					}

					if (this.step > 8800 && this.step % this.bulletRate == 3) {
						this.bulletManager.activate('#FF6600', this.canvas.width + 3, this.canvas.height / 2, 7, -1, 0, this.bigBulletReward)
					}

					if (this.step > 9200 && this.step % this.bulletRate == 20) {
						this.bulletManager.activate('#FF6600', this.canvas.width, this.canvas.height, 7, -1, -1, this.bigBulletReward)
					}

					if (this.step > 12240 && this.step % 451 == 10) {
						this.bulletManager.activate('#E1FDE9', -1, this.canvas.height / 2, 10, this.level, 0, 300)
					}

					if (this.step > 14060 && this.step % 757 == 310) {
						this.bulletManager.activate('#E1FDE9', this.canvas.width, -1, 10, -this.level+1, this.level-1, 300)
					}

					if (this.step % 2500 == 0) {
						this.levelUp()
					}

			}			

			
		}
		if (this.step % 30 == 0) {
			this.currentBeat = (this.currentBeat+1) % this.towerColumns
			for(let i=0; i<this.towerColumns; i++) {
				this.hihatTowerTimers[i].update(this.currentBeat)
				this.snareTowerTimers[i].update(this.currentBeat)
				this.bassTowerTimers[i].update(this.currentBeat)
			}

			if(this.hihatTowerTimers[this.currentBeat].hit(this.currentBeat)) {
				for(let i=0; i<this.hihatTowers.length; i++) {
					this.hihatTowers[i].trigger()
					if (this.player.dead==false && this.win==false) {
						this.player.money -= 1
					}
					if (this.hihat_sound.paused) {
						this.hihat_sound.play()
					}
					else {
						this.hihat_sound.currentTime = 0
					}
				}
			}
			if(this.snareTowerTimers[this.currentBeat].hit(this.currentBeat)) {
				for(let i=0; i<this.snareTowers.length; i++) {
					this.snareTowers[i].trigger()
					if (this.player.dead==false && this.win==false) {
						this.player.money -= 2
					}
					if (this.snare_sound.paused) {
						this.snare_sound.play()
					}
					else {
						this.snare_sound.currentTime = 0
					}
				}
			}
			if(this.bassTowerTimers[this.currentBeat].hit(this.currentBeat)) {
				for(let i=0; i<this.bassTowers.length; i++) {
					this.bassTowers[i].trigger()
					if (this.player.dead==false && this.win==false) {
						this.player.money -= 3
					}
					if (this.bass_sound.paused) {
						this.bass_sound.play()
					}
					else {
						this.bass_sound.currentTime = 0
					}
				}
			}
		}
		this.bulletManager.update()
		this.particleManager.update()

		if ((this.player.dead || this.win) && this.fontSize < 120) {
			this.fontSize += 1
		}

	}

	render() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.radial = this.context.createRadialGradient(this.textStartX, this.textStartY,800,this.textStartX*1.1, this.textStartY,2000)
		this.radial.addColorStop(0,"#7027C3")
		this.radial.addColorStop(1,"magenta")

		// Fill with gradient
		this.context.fillStyle = this.radial
		this.context.fillRect(0,0,this.canvas.width, this.canvas.height)

		this.crash.render()

		for(let i=0; i<this.hihatTowers.length; i++) {
			this.hihatTowers[i].render()
		}
		for(let i=0; i<this.snareTowers.length; i++) {
			this.snareTowers[i].render()
		}
		for(let i=0; i<this.bassTowers.length; i++) {
			this.bassTowers[i].render()
		}

		for(let i=0; i<this.towerColumns; i++) {
			//this.beats[i].render()
			this.hihatTowerTimers[i].render()
			this.snareTowerTimers[i].render()
			this.bassTowerTimers[i].render()
		}
		this.bulletManager.render()
		this.player.render()
		this.particleManager.render()
		this.context.font = "30px Verdana"

		this.startButton.render()
		this.context.strokeStyle = "magenta"
		this.context.strokeText("start", 464, 940)
		if (this.gameStarted == false) {
			this.context.strokeStyle = this.gradient
			this.context.strokeText(this.tutorialText, this.textX, 800)
		}
		else {
			this.context.strokeText("re-", 478, 912)
			this.context.strokeStyle = "#000000"
			this.context.strokeText("level: " + this.level, 444, 800)
		}

		this.context.strokeStyle = "#000000"
		this.context.strokeText("money: $" + this.player.money, 90, 940)
		this.context.strokeText("life: " + this.player.hp, 790, 940)
		

		if (this.player.dead) {
			this.context.font = this.fontSize + "px Verdana"
			this.context.strokeStyle = "#000000";
			this.context.strokeText("you lose", 500 - this.fontSize*2, 720);
		}
		else if (this.win) {
			this.context.font = this.fontSize + "px Verdana"
			this.context.strokeStyle = "#000000";
			this.context.strokeText("you win", 500 - this.fontSize*2, 720);
		}
		if (this.startButton.radius == 49) {
			this.startGame()
		}
		if (this.startButton.radius < 50) {
			this.startButton.radius += 1
		}

		
	}

	click() {

		let dx = click_x - this.crash.x
		let dy = click_y - this.crash.y
		let distance = Math.sqrt(dx * dx + dy * dy)

		if (distance < this.crash.maxRadius) {
			this.triggerBase()
		}
		else {
			for(let i=0; i<this.hihatTowerTimers.length; i++) {
				dx = click_x - this.hihatTowerTimers[i].x
				dy = click_y - this.hihatTowerTimers[i].y
				distance = Math.sqrt(dx * dx + dy * dy)
				if (distance < this.hihatTowerTimers[i].maxRadius) {
					this.hihatTowerTimers[i].click(i)
					break
				}
				dx = click_x - this.snareTowerTimers[i].x
				dy = click_y - this.snareTowerTimers[i].y
				distance = Math.sqrt(dx * dx + dy * dy)
				if (distance < this.snareTowerTimers[i].maxRadius) {
					this.snareTowerTimers[i].click(i)
					break
				}
				dx = click_x - this.bassTowerTimers[i].x
				dy = click_y - this.bassTowerTimers[i].y
				distance = Math.sqrt(dx * dx + dy * dy)
				if (distance < this.bassTowerTimers[i].maxRadius) {
					this.bassTowerTimers[i].click(i)
					break
				}
			}
		}
		dx = click_x - 500
		dy = click_y - 920
		distance = Math.sqrt(dx * dx + dy * dy)
		if (distance < 50) {
			this.startButton.radius = 48
		}
		//console.log(distance + " vs " + this.crash.maxRadius)
	}

	startGame() {
		this.bulletManager.killAll()
		for(let i=0; i<this.towerColumns; i++) {
			this.hihatTowerTimers[i].activeBeat = -1
			this.hihatTowerTimers[i].currentColour = this.hihatTowerTimers[i].backColour
			this.snareTowerTimers[i].activeBeat = -1
			this.snareTowerTimers[i].currentColour = this.snareTowerTimers[i].backColour
			this.bassTowerTimers[i].activeBeat = -1
			this.bassTowerTimers[i].currentColour = this.bassTowerTimers[i].backColour
		}
		this.hihatTowerTimers[0].currentColour = this.hihatTowerTimers[0].beatColour
		this.snareTowerTimers[0].currentColour = this.snareTowerTimers[0].beatColour
		this.bassTowerTimers[0].currentColour = this.bassTowerTimers[0].beatColour
		this.gameStarted = true
		this.step = 0
		this.player.money = 100000
		this.player.hp = 20
		this.player.dead = false
		this.fontSize = 1
		this.win = false
		this.startButton.radius = 50
		this.currentBeat = 0
		this.level = 1
		this.bulletRate = 240
		this.specialBulletRate = 240

		let circle = new HiHat(880,this.canvas.height / 2)
		let circle2 = new HiHat(840,this.canvas.height / 2)
		this.hihatTowers.push(circle)
		this.hihatTowers.push(circle2)
		circle = new HiHat(690,this.canvas.height / 2)
		circle2 = new HiHat(640,this.canvas.height / 2)
		this.hihatTowers.push(circle)
		this.hihatTowers.push(circle2)

		let bigcircle = new Bass(750,this.canvas.height / 2)
		this.bassTowers.push(bigcircle)

		circle = new HiHat(500 + 140, this.canvas.height / 2 - 140)
		this.hihatTowers.push(circle)
		let snareEx = new Snare(500 + 200,this.canvas.height / 2 - 190)
		this.snareTowers.push(snareEx)
		snareEx = new Snare(500 + 100,this.canvas.height / 2 - 100)
		this.snareTowers.push(snareEx)


		circle = new HiHat(500-100,this.canvas.height / 2-100)
		circle2 = new HiHat(500-200,this.canvas.height / 2-200)
		this.hihatTowers.push(circle)
		this.hihatTowers.push(circle2)
		circle = new HiHat(500-140,this.canvas.height / 2-140)
		circle2 = new HiHat(500-230,this.canvas.height / 2-230)
		this.hihatTowers.push(circle)
		this.hihatTowers.push(circle2)
		circle = new HiHat(500-170,this.canvas.height / 2-170)
		this.hihatTowers.push(circle)


		circle = new HiHat(500+90,this.canvas.height / 2+90)
		circle2 = new HiHat(500+120,this.canvas.height / 2+120)
		this.hihatTowers.push(circle)
		this.hihatTowers.push(circle2)
		circle = new HiHat(500+135,this.canvas.height / 2+135)
		this.hihatTowers.push(circle)
		snareEx = new Snare(500 + 190,this.canvas.height / 2 + 210)
		this.snareTowers.push(snareEx)
		snareEx = new Snare(500 + 270,this.canvas.height / 2 + 250)
		this.snareTowers.push(snareEx)
		circle = new HiHat(500+300,this.canvas.height / 2+300)
		circle2 = new HiHat(500+320,this.canvas.height / 2+320)
		this.hihatTowers.push(circle)
		this.hihatTowers.push(circle2)

		snareEx = new Snare(500 - 145,this.canvas.height / 2 + 153)
		this.snareTowers.push(snareEx)
		snareEx = new Snare(500 - 207,this.canvas.height / 2 + 230)
		this.snareTowers.push(snareEx)
		snareEx = new Snare(500 - 272,this.canvas.height / 2 + 253)
		this.snareTowers.push(snareEx)
		bigcircle = new Bass(500-200,this.canvas.height / 2+171)
		this.bassTowers.push(bigcircle)
		circle = new HiHat(500-310,this.canvas.height / 2+310)
		this.hihatTowers.push(circle)


	}

	levelUp() {
		this.level++
		if (this.level > 10) {
			this.level = 10
			this.win = true
		}
		else {
			if (this.bell_sound.paused) {
				this.bell_sound.play()
			}
			else {
				this.bell_sound.currentTime = 0
			}
		}
		this.bulletRate = 240
		this.specialBulletRate = 240
		if (this.level == 3) {
			 //this.bulletRate = 300 - 30*this.level
			 this.specialBulletRate = 120
		}
		if (this.level == 5) {
			 //this.bulletRate = 300 - 30*this.level
			 this.specialBulletRate = 90
		}
		if (this.level == 7) {
			 //this.bulletRate = 300 - 30*this.level
			 this.specialBulletRate = 60
		}
		if (this.level == 8) {
			 //this.bulletRate = 300 - 30*this.level
			 this.specialBulletRate = 45
		}
		if (this.level == 9) {
			 //this.bulletRate = 300 - 30*this.level
			 this.specialBulletRate = 30
		}
		if (this.level > 9) {
			this.specialBulletRate = 15
		}

	}
	triggerBase() {

		if(this.player.money > this.crash.cost) {
			this.player.money -= this.crash.cost
			this.crash.trigger()

			if (this.crash_sound.paused) {
				this.crash_sound.play()
			}
			else {
				this.crash_sound.currentTime = 0
			}
		}
	}
}

export default Main