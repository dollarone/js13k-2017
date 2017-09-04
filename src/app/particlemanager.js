"use strict"

import Particle from './particle.js'

class ParticleManager {
	constructor() {

		this.totalParticles = 100
		this.particles = []
		for(let i = 0; i < this.totalParticles; i++) {
			this.particles.push(new Particle())
		}
		this.update = this.update.bind(this)
		this.render = this.render.bind(this)
	}

	update() {
		for(let i = 0; i < this.totalParticles; i++) {
			if (this.particles[i].dead == false) {
				this.particles[i].update()
			}
		}
	}

	render() {
		for(let i = 0; i < this.totalParticles; i++) {
			if (this.particles[i].dead == false) {
				this.particles[i].render()
			}
		}
	}

	explode(x, y, amount, speed, lifeTime) {
		let found = 0
		let i = 0
		while (found < amount) {
			if (this.particles[i].dead == true) {
				this.particles[i].x = x
				this.particles[i].y = y
				this.particles[i].direction = found / amount * 180
				this.particles[i].speed = speed
				this.particles[i].lifeTime = lifeTime
				this.particles[i].dead = false
				
				found += 1
			}
			i += 1
		}

	}
}

export default ParticleManager