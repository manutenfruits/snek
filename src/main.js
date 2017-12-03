import 'babel-polyfill';
import './style.css';

import Game from './model/game';

// Initialize component
document.addEventListener("DOMContentLoaded", () => {
  const boardEl = document.createElement("div");
  boardEl.className = 'board';
  document.body.append(boardEl);

  const game = new Game(boardEl, 20, 20);
  game.start();

  // key handlers
  window.addEventListener('keydown', ({ key }) => {
    switch (key.toLowerCase()) { // In case of caps lock
      case 'arrowup':
      case 'w':
        game.setDirection('U');
        break;
      case 'arrowdown':
      case 's':
        game.setDirection('D');
        break;
      case 'arrowleft':
      case 'a':
        game.setDirection('L');
        break;
      case 'arrowright':
      case 'd':
        game.setDirection('R');
        break;
    }
  })
});
