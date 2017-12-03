import Tile from './tile';
import Model from './model';

export default class Board extends Model{

  constructor(height, width) {
    super();
    // X goes left, Y goes down
    const board = new Array(width).fill(null)
      .map(() => new Array(height).fill(null)
        .map(() => new Tile()));

    this.setState({ board, snakeTiles: [], fruitTile: null });
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

  drawFruit([x, y]) {
    const { fruitTile, board } = this.getState();

    if (fruitTile && fruitTile.isFruit()) {
      // Wipe old fruit
      fruitTile.wipe();
    }

    const tile = board[x][y];
    tile.setFruit();
    this.setState({ fruitTile: tile });
  }

  drawSnake(snake) {
    const { snakeTiles, board } = this.getState();

    // Wipe snake from the board
    snakeTiles
      .filter(tile => tile.isSnake())
      .forEach(tile => tile.wipe());

    // Draw new snake
    const newTiles = snake.getPosition().map(([x, y]) => board[x][y]);
    newTiles.forEach(tile => tile.setSnake());

    this.setState({ snakeTiles: newTiles });
  }
}
