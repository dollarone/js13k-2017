"use strict"

import HiHat from './hihat.js'
import Bass from './bass.js'
import Snare from './snare.js'
import Crash from './crash.js'
import Soldier from './soldier.js'
import BigSoldier from './bigsoldier.js'
import Lamp from './lamp.js'
import ParticleManager from './particlemanager.js'

class Main {
	constructor() {
		this.canvas = document.getElementById('a')
		this.context = this.canvas.getContext('2d')

		console.log("yes2")
		this.step = 0
		console.log(this.step)
		//this.startDate = new Date();
		this.update = this.update.bind(this)
		this.render = this.render.bind(this)
		this.enemies = []
		this.beats = []
		this.currentBeat = 0

		this.hihatTowerTimers = []
		this.snareTowerTimers = []
		this.bassTowerTimers = []
		this.maxHihatTowers = 4
		this.maxsnareTowerTimers = 2
		this.maxbassTowerTimers = 1


		this.lampsStartX = 50
		this.lampsStartY = 50

		this.beat = new Lamp()
		this.beat.x = this.lampsStartX
		this.beat.y = this.lampsStartY
		this.beat.currentColour = '#977'


		for(let i=0; i<8; i++) {
			let enemy = new Lamp()
			enemy.y = this.lampsStartY
			enemy.x = this.lampsStartX + i * enemy.radius * 2
			enemy.currentColour = '#000'
			this.beats.push(enemy)
			let enemy2 = new Lamp()
			enemy2.y = this.lampsStartY + enemy2.radius * 2
			enemy2.x = this.lampsStartX + i * enemy2.radius * 2
			enemy2.currentColour = '#000'
			this.hihatTowerTimers.push(enemy2)
			let enemy3 = new Lamp()
			enemy3.y = this.lampsStartY + enemy2.radius * 4
			enemy3.x = this.lampsStartX + i * enemy3.radius * 2
			enemy3.currentColour = '#000'
			this.snareTowerTimers.push(enemy3)
			let enemy4 = new Lamp()
			enemy4.y = this.lampsStartY + enemy2.radius * 6
			enemy4.x = this.lampsStartX + i * enemy4.radius * 2
			enemy4.currentColour = '#000'
			this.bassTowerTimers.push(enemy4)
		}
		this.hihatTowerTimers[1].currentColour = '#999'		
		this.hihatTowerTimers[3].currentColour = '#999'		
		this.hihatTowerTimers[5].currentColour = '#999'		
		this.hihatTowerTimers[7].currentColour = '#999'	
		this.snareTowerTimers[2].currentColour = '#999'		
		this.snareTowerTimers[6].currentColour = '#999'		
		this.bassTowerTimers[0].currentColour = '#999'

		this.hihatTowers = []
		this.snareTowers = []
		this.bassTowers = []
		let circle = new HiHat(100,this.canvas.height / 2)
		let circle2 = new HiHat(150,this.canvas.height / 2)
		this.hihatTowers.push(circle)
		this.hihatTowers.push(circle2)

		let bigcircle = new Bass(200,this.canvas.height / 2)
		this.bassTowers.push(bigcircle)

		let snare = new Snare(50,this.canvas.height / 2)
		this.snareTowers.push(snare)

		this.crash = new Crash(400,this.canvas.height / 2)


		this.particleManager = new ParticleManager()
		this.particleManager.explode(400,400,20,3,100)
	}

	update() {	
		this.step = this.step + 1
		//console.log(this.step)
		for(let i=0; i<this.hihatTowers.length; i++) {
			this.hihatTowers[i].update(this.enemies)
		}
		for(let i=0; i<this.snareTowers.length; i++) {
			this.snareTowers[i].update(this.enemies)
		}
		for(let i=0; i<this.bassTowers.length; i++) {
			this.bassTowers[i].update(this.enemies)
		}
		this.crash.update(this.enemies)

		if (this.step % 120 == 0) {
			let enemy = new Soldier(this.particleManager)
			this.enemies.push(enemy)
		}
		if (this.step % 1200 == 1) {
			let enemy = new BigSoldier(this.particleManager)
			this.enemies.push(enemy)
		}
		for(let i=0; i<this.enemies.length; i++) {
			this.enemies[i].update()
		}

		if (this.step % 120 == 0) {
			//this.bigcircle.trigger()
		}
		if (this.step % 30 == 0) {
			this.currentBeat = (this.currentBeat+1) % 8
			if(this.hihatTowerTimers[this.currentBeat].currentColour == '#999') {
				for(let i=0; i<this.hihatTowers.length; i++) {
					this.hihatTowers[i].trigger()
				}
			}
			if(this.snareTowerTimers[this.currentBeat].currentColour == '#999') {
				for(let i=0; i<this.snareTowers.length; i++) {
					this.snareTowers[i].trigger()
				}
			}
			if(this.bassTowerTimers[this.currentBeat].currentColour == '#999') {
				for(let i=0; i<this.bassTowers.length; i++) {
					this.bassTowers[i].trigger()
				}
			}
		}
		this.beat.x = this.lampsStartX + (this.currentBeat*this.beat.radius*2)

		this.particleManager.update()

	}

	render() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

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

		for(let i=0; i<this.enemies.length; i++) {
			this.enemies[i].render()
		}
		for(let i=0; i<this.beats.length; i++) {
			this.beats[i].render()
			this.hihatTowerTimers[i].render()
			this.snareTowerTimers[i].render()
			this.bassTowerTimers[i].render()
		}
		this.beat.render()
		this.particleManager.render()
	}
	triggerBase() {
		this.crash.trigger()
	}
}

export default Main