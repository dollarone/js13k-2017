"use strict"

import Circle from './circle.js'

class BigCircle extends Circle {
	constructor(x,y) {
		super(x,y)
		this.maxRadius = 30
	}      
}

export default BigCircle