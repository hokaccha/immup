// @flow
import type { State, Path } from './types';
import dig from './utils/dig';
import filter from './utils/filter';

export default function del<T: State>(
  state: T,
  path: Path
): T {
  return dig(state, path, (o, key) => filter(o, (v, k) => key !== k));
}
