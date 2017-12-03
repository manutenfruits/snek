import Tile from './tile';
import Model from './model';

export default class Board extends Model{

  constructor(height, width, snake) {
    super();
    // X goes left, Y goes down
    const board = new Array(width).fill(null)
      .map(() => new Array(height).fill(null)
        .map(() => new Tile()));

    this.setState({ board, snake });
  }

  attach(boardEl) {
    const { board } = this.getState();

    board.forEach(col => {
      const rowEl = document.createElement("div");
      rowEl.className = 'row';

      col.forEach(tile => {
        rowEl.append(tile.getElement());
      });

      boardEl.append(rowEl);
    });
    this.setState({ boardEl });
  }

  render() {
    const { snake, board } = this.getState();

    // Wipe snake from the board
    const body = snake.getPosition();
    body.forEach(([x, y]) => board[x][y].setEmpty());

    // Move snake forward, and draw again
    snake.advance();
    const newBody = snake.getPosition();
    newBody.forEach(([x, y]) => board[x][y].setSnake());
  }
}
