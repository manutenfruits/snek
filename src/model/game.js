import Model from './model';

import Board from './board';
import Snake from './snake';

export default class Game extends Model {
  constructor({ element, height, width, onLoseGame, onWinGame }) {
    super();

    const snake = new Snake(0, 0, 3);
    const board = new Board(height, width, snake);
    const fruit = this.getFruit({ height, width, snake });

    board.attach(element);
    this.setState({
      height, width,
      board, snake, fruit,
      onLoseGame, onWinGame,
    });
  }

  getFruit({ height, width, snake } = this.getState()) {
    // Get a map of all values
    const map = new Array(width).fill(null)
      .map((a, x) => new Array(height).fill(null)
        .map((b, y) => ({ x, y, valid: true })));

    // Filter out pixels taken by the snake
    snake.getPosition().forEach(([x, y]) => map[x][y].valid = false);

    // Flatten array and filter out unneeded
    const coords = map
      .reduce((arr, cols) => [...arr, ...cols])
      .filter(i => i.valid);
    const randomIdx = Math.floor(Math.random() * coords.length);
    const pos = coords[randomIdx];

    return [pos.x, pos.y];
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

  loseGame(score) {
    const { interval, onLoseGame } = this.getState();
    clearInterval(interval);
    onLoseGame(score);
  }

  winGame() {
    const { interval, onWinGame } = this.getState();
    clearInterval(interval);
    onWinGame();
  }

  render() {
    const state = this.getState();
    const { board, snake, height, width } = state;
    let { fruit } = state;

    snake.advance();

    // Detect if snake ate fruit
    const [head, ...body] = snake.getPosition();
    if (head[0] === fruit[0] && head[1] === fruit[1]) {
      snake.grow();

      if (snake.getSize() === height * width) {
        this.winGame();
        return;
      }

      // Get a new fruit
      fruit = this.getFruit();
      this.setState({ fruit });
    }

    board.drawFruit(fruit);

    // Detect if snake collided with itself, or walls
    const selfCollision = body.some(part =>
      (part[0] === head[0] && part[1] === head[1]));
    const wallCollision = head[0] < 0 || head[0] >= width
      || head[1] < 0 || head[1] > height;

    if (selfCollision || wallCollision) {
      this.loseGame(snake.getSize());
    } else {
      board.drawSnake(snake);
    }
  }
}
