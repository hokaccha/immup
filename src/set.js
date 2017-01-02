import dig from './utils/dig';
import map from './utils/map';

export default function set(source, path, value) {
  if (!path) {
    return typeof value === 'function' ? value(source) : source;
  }

  return dig(source, path, (o, key) => {
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
