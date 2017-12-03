import Model from './model';

const getClassesFor = (mode) => ({
  EMPTY: 'tile',
  SNAKE: 'tile tile-snake',
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

  setEmpty() {
    this.setMode('EMPTY');
  }

  setSnake() {
    this.setMode('SNAKE');
  }

  setFruit() {
    this.setMode('FRUIT');
  }
}
