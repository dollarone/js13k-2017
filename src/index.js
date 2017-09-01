"use strict"

import Main from './app/main'
import './styles/main.css'
import MainLoop from './app/mainloop.js'

let game = new Main()

MainLoop.setUpdate(game.update).setDraw(game.render).start();