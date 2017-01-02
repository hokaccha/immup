import isPlainObject from './isPlainObject';

export default function dig(obj, path, callback) {
  let keys = parsePath(path);

  let walk = (o) => {
    let clone;
    let key = keys.shift();

    if (keys.length === 0) {
      return callback(o, Array.isArray(o) ? Number(key) : key);
    }

    if (Array.isArray(o)) {
      clone = o.slice();
    }
    else if (isPlainObject(o)) {
      clone = Object.assign({}, o);
    }
    else {
      let origKeys = parsePath(path);
      let currentKeys = origKeys.slice(0, origKeys.length - keys.length);
      throw new Error(`${currentKeys.join('.')} is not a object or array`);
    }

    clone[key] = walk(o[key]);

    return clone;
  };

  return walk(obj);
}

function parsePath(path) {
  if (Array.isArray(path)) {
    return path.slice();
  }
  else if (typeof path === 'string') {
    return path.split('.');
  }
  else {
    throw new Error(`Invalid path type: ${path}`);
  }
}
