"use strict"

import Soldier from './soldier.js'

class BigSoldier extends Soldier {
	constructor(particleManager) {
		super(particleManager)
    	this.radius = 10
    	this.hp = 60
    	this.unit = "big"
    	this.speed = 1
	}
}

export default BigSoldier