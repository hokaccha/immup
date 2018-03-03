import { State, Path } from "./types";
import methods from "./methods";

export default class Immup<T extends State> {
  state: T;

  constructor(state: T) {
    this.state = state;
  }

  set(path: Path, value: any): this {
    this.state = methods.set(this.state, path, value);
    return this;
  }

  del(path: Path): this {
    this.state = methods.del(this.state, path);
    return this;
  }

  merge(path: Path, value: any): this {
    this.state = methods.merge(this.state, path, value);
    return this;
  }

  append(path: Path, ...value: Array<any>): this {
    this.state = methods.append(this.state, path, ...value);
    return this;
  }

  prepend(path: Path, ...value: Array<any>): this {
    this.state = methods.prepend(this.state, path, ...value);
    return this;
  }

  end(): T {
    return this.state;
  }
}
