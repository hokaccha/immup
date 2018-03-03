import { State } from "./types";
import methods from "./methods";
import Immup from "./Immup";

function immup<T extends State>(state: T): Immup<T> {
  return new Immup(state);
}

Object.assign(immup, { Immup }, methods);

export default immup;
