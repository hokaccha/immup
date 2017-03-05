// @flow
import type { State, Path } from './types';
import set from './set';
import isPlainObject from './utils/isPlainObject';
import deepMerge from './utils/deepMerge';

export default function merge<T: State>(
  source: T,
  path: Path,
  value: any
): T {
  return set(source, path, obj => {
    if (!isPlainObject(obj)) {
      throw new Error('target is not an object');
    }

    return deepMerge(obj, value);
  });
}
