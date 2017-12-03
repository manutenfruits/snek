import Tile from './tile';
import Model from './model';

export default class Board extends Model{

  constructor(height, width) {
    super();
    // X goes left, Y goes down
    const board = new Array(width).fill(null)
      .map(() => new Array(height).fill(null)
        .map(() => new Tile()));

    this.setState({
      board
    })
  }

  attach(boardEl) {
    const { board } = this.getState();

    board.forEach(col => col.forEach(tile => {
      boardEl.append(tile.getElement());
    }))
    this.setState({ boardEl });
  }

  render() {

  }
}
