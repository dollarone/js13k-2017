"use strict"

import Circle from './circle.js'

class BigCircle extends Circle {
      constructor(x,y) {
            super(x,y)
            this.maxRadius = 30
            this.update = this.update.bind(this)
            this.render = this.render.bind(this)
	}

      
}

export default BigCircle