import Model from './model';

export default class Snake extends Model {

  constructor(x, y, xMax, yMax, length) {
    super();
    this.setState({
      length,
      direction: 'D',
      max: [xMax, yMax],
      body: Array(length).fill([x, y]),
    });
  }

  isHorizontal(direction) {
    return ['L', 'R'].includes(direction);
  }

  setDirection(newDirection) {
    // Ignore reverse direction, or same one
    const wasHorizontal = this.isHorizontal(this.getState().direction);
    const isHorizontal = this.isHorizontal(newDirection);

    // Poor man's XOR
    if (wasHorizontal ? !isHorizontal : isHorizontal) {
      this.setState({ direction: newDirection });
    }
  }

  getPosition() {
    return this.getState().body;
  }

  advance() {
    const { body } = this.getState();
    body.pop();
    body.unshift(this.getNewHead());
  }

  grow() {
    // Duplicates tail
    const { body } = this.getState();
    body.push(body[body.length - 1]);
  }

  getNewHead() {
    const {
      direction,
      body: [[x, y]],
      max: [xMax, yMax],
    } = this.getState();

    switch (direction) {
      case 'U':
        return [x === 0 ? xMax : x - 1, y];
      case 'D':
        return [x === xMax ? 0 : x + 1, y];
      case 'L':
        return [x, y === 0 ? yMax : y - 1];
      case 'R':
        return [x, y === yMax ? 0 : y + 1];
      default:
        throw Error(`'${direction}' is not a valid direction.`);
    }
  }
}
