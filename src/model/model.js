const data = new WeakMap();

export default class Model {
  constructor() {
    data.set(this, {});
  }

  getState() {
    return data.get(this);
  }

  setState(newState) {
    const oldState = this.getState();
    data.set(this, Object.assign(oldState, newState));
  }
}
