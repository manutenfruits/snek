import Model from './model';

const getClassesFor = (mode) => ({
  EMPTY: 'tile',
  SNAKE: 'tile tile-snake',
  HEAD: 'tile tile-head',
  FRUIT: 'tile tile-fruit',
}[mode]);

export default class Tile extends Model {
  constructor() {
    super();
    const element = document.createElement('div');
    const mode = 'EMPTY';
    element.className = getClassesFor(mode);

    this.setState({ element, mode });
  }

  getElement() {
    return this.getState().element;
  }

  setMode(newMode) {
    const { mode, element } = this.getState();
    if (mode !== newMode) {
      element.className = getClassesFor(newMode);
      this.setState({ mode: newMode });
    }
  }

  isSnake() {
    return ['SNAKE', 'HEAD'].includes(this.getState().mode);
  }

  isFruit() {
    return this.getState().mode === 'FRUIT';
  }

  wipe() {
    this.setMode('EMPTY');
  }

  setSnake() {
    this.setMode('SNAKE');
  }

  setHead() {
    this.setMode('HEAD');
  }

  setFruit() {
    this.setMode('FRUIT');
  }
}
