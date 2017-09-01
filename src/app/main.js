"use strict"

import Circle from './circle.js'
import BigCircle from './bigcircle.js'
import Soldier from './soldier.js'

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
		this.circle = new Circle(100,403)
		this.circle2 = new Circle(150,509)
		this.bigcircle = new BigCircle(200,527)
		this.enemies = []
	}


	update() {	
		this.step = this.step + 1
		console.log(this.step)
		this.circle.update(this.enemies)
		this.circle2.update(this.enemies)
		this.bigcircle.update(this.enemies)
		if (this.step % 100 == 0) {
			let enemy = new Soldier()
			this.enemies.push(enemy)
		}
		for(let i=0; i<this.enemies.length; i++) {
			this.enemies[i].update()
		}

	}

	render() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.circle.render()
		this.circle2.render()
		this.bigcircle.render()
		for(let i=0; i<this.enemies.length; i++) {
			this.enemies[i].render()
		}

	}

}

export default Main