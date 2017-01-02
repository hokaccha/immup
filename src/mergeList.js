import set from './set';
import deepMerge from './utils/deepMerge';

export default function mergeList(source, path, value, comparator) {
  return set(source, path, arr => {
    if (!Array.isArray(arr)) {
      throw new Error(`${path} is not a array`);
    }

    return value.map(v => {
      let target = arr.filter(v2 => comparator(v, v2))[0];
      if (target === undefined) {
        return v;
      }
      else {
        return deepMerge(target, v);
      }
    });
  });
};
