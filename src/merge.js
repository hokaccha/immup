// @flow
import type { State, Path } from './types';
import set from './set';
import isPlainObject from './utils/isPlainObject';
import deepMerge from './utils/deepMerge';

declare function merge<T: State>(source: T, path: Path, value: any): T;
declare function merge<T: State>(source: T, value: any): T;

export default function merge(source, path, value) {
  if (arguments.length === 2) {
    value = path;
    path = null;
  }

  return set(source, path, obj => {
    if (!isPlainObject(obj)) {
      throw new Error('target is not an object');
    }

    return deepMerge(obj, value);
  });
}
