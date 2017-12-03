import 'babel-polyfill';
import './style.css';

import Game from './model/game';

const printText = (txt) => {
  // Shitty DOM, I know
  const textEl = document.createElement('p');
  textEl.className = 'message-text';
  textEl.textContent = txt
  document.body.append(textEl);
}

const initialize = () => {
  const boardEl = document.createElement('div');
  boardEl.className = 'board';
  document.body.append(boardEl);

  const game = new Game({
    element: boardEl,
    width: 20,
    height: 30,
    onLoseGame: score =>
      printText(`Oooops! you lose 😿. Your score is ${score}`),
    onWinGame: () =>
      printText('OMG you actually won!! 🙀'),
  });

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
  });

  game.start();
};

// Initialize component
document.addEventListener("DOMContentLoaded", initialize);
