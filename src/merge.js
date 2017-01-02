import set from './set';
import isPlainObject from './utils/isPlainObject';
import deepMerge from './utils/deepMerge';

export default function merge(source, path, value) {
  if (arguments.length === 2) {
    value = path;
    path = null;
  }

  return set(source, path, obj => {
    if (!isPlainObject(obj)) {
      throw new Error(`${path} is not a object`);
    }

    return deepMerge(obj, value);
  });
};
