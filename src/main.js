import 'babel-polyfill';

import Board from './model/board';

// Initialize component
document.addEventListener("DOMContentLoaded", () => {
  const boardEl = document.createElement("div");
  document.body.append(boardEl);

  const board = new Board(20, 20);
  board.attach(boardEl);

  console.log(board);
});
