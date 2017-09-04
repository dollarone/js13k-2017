"use strict"

import HiHat from './hihat.js'

class Bass extends HiHat {
	constructor(x,y) {
		super(x,y)
		this.maxRadius = 30
	}      
}

export default Bass