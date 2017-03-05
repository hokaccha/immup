// @flow
import type { State, Path } from './types';
import dig from './utils/dig';
import map from './utils/map';

export default function set<T: State>(
  state: T,
  path: Path,
  value: any
): T {
  if (!path) {
    return typeof value === 'function' ? value(state) : state;
  }

  return dig(state, path, (o, key) => {
    if (!(key in o)) {
      return Object.assign({ [key]: value }, o);
    }

    return map(o, (v, k) => {
      if (key === k) {
        return typeof value === 'function' ? value(v) : value;
      }
      else {
        return v;
      }
    });
  });
}
