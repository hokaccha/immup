import isPlainObject from './isPlainObject';

export default function deepMerge(target, source) {
  if (!isPlainObject(target) || !isPlainObject(source)) {
    return source;
  }

  return Object.keys(source).reduce((acc, key) => {
    let value;
    if (!isPlainObject(source[key])) {
      value = source[key];
    }
    else if (key in acc) {
      value = deepMerge(acc[key], source[key]);
    }
    else {
      value = Object.assign({}, source[key]);
    }
    return Object.assign({}, acc, { [key]: value });
  }, target);
}
