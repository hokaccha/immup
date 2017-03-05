// @flow
import type { State, Path } from './types';
import set from './set';

export default function append<T: State>(
  source: T,
  path: Path,
  ...value: Array<any>
): T {
  return set(source, path, arr => {
    if (!Array.isArray(arr)) {
      throw new Error('target is not an array');
    }

    return arr.concat(value);
  });
}
