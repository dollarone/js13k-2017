"use strict"

import Main from './app/main'
import './styles/main.css'
import MainLoop from './app/mainloop.js'

this.game = new Main()
a.onclick=e=>{ this.game.triggerBase() }

MainLoop.setUpdate(this.game.update).setDraw(this.game.render).start();