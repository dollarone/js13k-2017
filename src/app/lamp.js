"use strict"

class Lamp {
	constructor() {
		let canvas = document.getElementById('a')
		this.context = canvas.getContext('2d')
		this.x = -1
		this.y = canvas.height / 2
		this.radius = canvas.height / 1000 * 30
		this.update = this.update.bind(this)
		this.render = this.render.bind(this)
		this.damage = this.damage.bind(this)
		this.hurt = this.hurt.bind(this)
		this.step = 0
		this.dead = false
		this.hp = 1
		this.colour = '#733'
		this.hurtColour = '#955'
		this.currentColour = this.colour
		this.hurtCountdown = 0
		this.hurtCountdownSteps = 2
		this.unit = "soldier"
	}

	update() {
		if (this.dead == false) {
			this.step++
			this.x+= 0.4
			if (this.hurtCountdown == 1) {
				this.currentColour = this.colour
				this.hurtCountdown -= 1
			}
			if (this.hurtCountdown > 1) {
				this.hurtCountdown -= 1
			}
		}
	}

	render() {
		if (this.dead == false) {
	    	this.context.beginPath()
	    	this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
	    	this.context.fillStyle = this.currentColour
	    	this.context.fill()
	    }
	}

	damage(dmg) {
		this.hp -= dmg
		if (this.hp == 0) {
			this.dead = true
		}
		this.hurt()
	}

	hurt() {
		this.currentColour = this.hurtColour
		this.hurtCountdown = this.hurtCountdownSteps
	}
}

export default Lamp