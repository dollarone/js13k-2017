"use strict"

class Soldier {
	constructor() {
      let canvas = document.getElementById('a')
      this.context = canvas.getContext('2d')
      this.x = -1
      this.y = canvas.height / 2
      this.radius = 3
      this.update = this.update.bind(this)
      this.render = this.render.bind(this)
      this.step = 0
      this.dead = false
	}

	update() {
	  this.step++
	  this.x+= 0.1
	}

	render() {
		if (this.dead == false) {
	      this.context.beginPath()
	      this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
	      this.context.fillStyle = '#733'
	      this.context.fill()
	    }


	}
}

export default Soldier