if (module.hot)
	module.hot.accept()


import '../styles/all.scss'

import React from 'react';
import ReactDOM from 'react-dom';

import { Game } from './game.js'

const game = document.getElementById('game')
if (game) {
	ReactDOM.render(
		<Game />, game
	)
}


