// @flow
import type { State } from './types';
import methods from './methods';
import Immup from './Immup';

function immup<T: State>(state: T): Immup<T> {
  return new Immup(state);
}

function isImmup(obj: any): boolean {
  return obj instanceof Immup;
}

Object.assign(immup, { isImmup }, methods);

export type { Immup };
export default immup;
