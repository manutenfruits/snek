import Model from './model';

import Board from './board';
import Snake from './snake';

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default class Game extends Model {
  constructor(element, height, width) {
    super();

    const snake = new Snake(0, 0, height - 1, width - 1, 30);
    const board = new Board(height, width, snake);
    const fruit = this.getFruit({ height, width, snake });

    board.attach(element);
    this.setState({ height, width, board, snake, fruit });
  }

  getFruit({ height, width, snake } = this.getState()) {
    let fruitIsInSnake = true;
    let pos;

    while (fruitIsInSnake) {
      pos = [getRandom(0, width - 1), getRandom(0, height - 1)];
      fruitIsInSnake = snake.getPosition()
        .some(([x, y]) => x === pos[0] && y === pos[1]);
    }

    return pos;
  }

  setDirection(direction) {
    const { snake } = this.getState();
    snake.setDirection(direction);
  }

  start() {
    this.setState({
      interval: setInterval(this.render.bind(this), 100),
    });
  }

  pause() {
    const { interval } = this.getState();
    clearInterval(interval);
  }

  render() {
    const state = this.getState();
    const { board, snake } = state;
    let { fruit } = state;

    snake.advance();

    board.drawSnake(snake);

    // Detect if snake ate fruit
    const [head, ...body] = snake.getPosition();
    if (head[0] === fruit[0] && head[1] === fruit[1]) {
      snake.grow();
      // Get a new fruit
      fruit = this.getFruit();
      this.setState({ fruit });
    }

    board.drawFruit(fruit);

    // Detect if snake collided with itself
    const collision = body.some(part =>
      (part[0] === head[0] && part[1] === head[1]));

    if (collision) {
      this.pause();
      alert('you lose!');
    }
  }
}
