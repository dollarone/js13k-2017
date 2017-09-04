"use strict"

import HiHat from './hihat.js'

class Crash extends HiHat {
	constructor(x,y) {
		super(x,y)
		this.maxRadius = 100
		this.triggerCountdownSteps = 1
	}
}

export default Crash