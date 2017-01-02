import methods from './methods';

export default class Immup {
  constructor(source) {
    this.source = source;
  }

  end() {
    return this.source;
  }
}

for (let name in methods) {
  Immup.prototype[name] = function(...args) {
    this.source = methods[name](this.source, ...args);
    return this;
  };
}
