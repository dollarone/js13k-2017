"use strict"

class HiHat {
	constructor(x,y) {
		let canvas = document.getElementById('a')
		this.x = x
		this.y = y
		this.context = canvas.getContext('2d')
		this.centerX = canvas.width / 2
		this.centerY = canvas.height / 2
		this.radius = 0
		this.maxRadius = 10
		this.stepsPerPixel = 2
		this.update = this.update.bind(this)
		this.render = this.render.bind(this)
		this.trigger = this.trigger.bind(this)
		this.step = 0
		this.attack = 1
		this.isAttacking = false
		this.triggerCountdown = 0
		this.triggerCountdownSteps = 1
		this.startStep = 0
		console.log(this.x + "," + this.y)
	}

	trigger() {
		if (this.triggerCountdown == 0) {
			this.triggerCountdown = this.triggerCountdownSteps
			this.isAttacking = true
			this.startStep = this.step
			this.radius = 0
		}
	}

	update(enemies) {
		if (this.triggerCountdown == 1) {
			this.triggerCountdown = 0	
		}
		else if (this.triggerCountdown > 1) {
			this.triggerCountdown -= 1
		}

		this.step++
		this.radius = (this.step-this.startStep)/this.stepsPerPixel//%this.maxRadius
		if (this.radius >= this.maxRadius) {
			this.isAttacking = false
		}
		if (this.isAttacking) {

			for(let i=0; i<enemies.length; i++) {
			/*
			if (enemies[i].x - enemies[i].radius - this.radius < this.x && 
			    enemies[i].x + enemies[i].radius + this.radius > this.x &&
			    enemies[i].y - enemies[i].radius - this.radius < this.y && 
			    enemies[i].y + enemies[i].radius + this.radius > this.y) {
			//                        var c = this.context.getImageData(enemies[i].x, enemies[i].y, 1, 1).data;     
			            enemies[i].dead = true
			}
			*/

			//            var circle1 = {radius: 20, x: 5, y: 5};
			//var circle2 = {radius: 12, x: 10, y: 5};

			let dx = this.x - enemies[i].x
			let dy = this.y - enemies[i].y
			let distance = Math.sqrt(dx * dx + dy * dy)
			if (enemies[i] != undefined && enemies[i].unit != undefined && enemies[i].unit == "big") {
				console.log(distance)
			}

			if (distance < (this.radius + enemies[i].radius) &&
				distance > (this.radius - enemies[i].radius)
				&& enemies[i].dead == false) {
				// collision detected!
					enemies[i].damage(this.attack)
				}
			}
//			if (enemies[i] != undefined && enemies[i].unit != undefined && enemies[i].unit == "big") {
			//if (distance != undefined) {
			
//			}
		}
	}

	render() {

		this.context.beginPath()
		this.context.arc(this.x, this.y, this.maxRadius, 0, 2 * Math.PI, false)
		this.context.fillStyle = '#9b9'
		this.context.fill()

		if (this.isAttacking) {
			this.context.beginPath()
			this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
			this.context.lineWidth = 1
			this.context.strokeStyle = '#003300'
			this.context.stroke()
		}

	}
}

export default HiHat