import Model from './model';

import Board from './board';
import Snake from './snake';

export default class Game extends Model {
  constructor(element, height, width) {
    super();

    const snake = new Snake(0, 0, height - 1, width - 1, 3);
    const board = new Board(height, width, snake);

    board.attach(element);
    this.setState({ board, snake });
  }

  setDirection(direction) {
    const { snake } = this.getState();
    snake.setDirection(direction);
  }

  start() {
    const { board } = this.getState();
    setInterval(() => {
      board.render();
    }, 100);
  }
}
