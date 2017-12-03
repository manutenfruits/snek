import Model from './model';

import Board from './board';
import Snake from './snake';

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default class Game extends Model {
  constructor(element, height, width) {
    super();

    const snake = new Snake(0, 0, height - 1, width - 1, 15);
    const board = new Board(height, width, snake);
    const fruit = this.getFruit({ height, width });

    board.attach(element);
    this.setState({ height, width, board, snake, fruit });
  }

  getFruit({ height, width } = this.getState()) {
    return [getRandom(0, width), getRandom(0, height)];
  }

  setDirection(direction) {
    const { snake } = this.getState();
    snake.setDirection(direction);
  }

  start() {
    setInterval(this.render.bind(this), 100);
  }

  render() {
    const { board, snake, fruit } = this.getState();

    snake.advance();
    board.drawFruit(fruit);
    board.drawSnake(snake);

  }
}
