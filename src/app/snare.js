"use strict"

import HiHat from './hihat.js'

class Snare extends HiHat {
	constructor(x,y) {
		super(x,y)
		this.maxRadius = 15
	}      
}

export default Snare