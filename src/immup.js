export default function immup(source) {
  return new Immup(source);
}

Object.assign(immup, {
  set(source, path, value) {
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
  },

  del(source, path) {
    return dig(source, path, (o, key) => filter(o, (v, k) => key !== k));
  },

  merge(source, path, value) {
    if (arguments.length === 2) {
      value = path;
      path = null;
    }

    return immup.set(source, path, obj => {
      if (!isPlainObject(obj)) {
        throw new Error(`${path} is not a object`);
      }

      return deepMerge(obj, value);
    });
  },

  mergeList(source, path, value, comparator) {
    return immup.set(source, path, arr => {
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
  },

  append(source, path, ...value) {
    return immup.set(source, path, arr => {
      if (!Array.isArray(arr)) {
        throw new Error(`${path} is not a array`);
      }

      return arr.concat(value);
    });
  },

  prepend(source, path, ...value) {
    return immup.set(source, path, arr => {
      if (!Array.isArray(arr)) {
        throw new Error(`${path} is not a array`);
      }

      return value.concat(arr);
    });
  },
});

export class Immup {
  constructor(source) {
    this.source = source;
  }

  end() {
    return this.source;
  }
}

for (let method in immup) {
  Immup.prototype[method] = function(...args) {
    this.source = immup[method](this.source, ...args);
    return this;
  };
}

// private functions
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

function isPlainObject(obj) {
  return obj instanceof Object && Object.getPrototypeOf(obj) === Object.prototype;
}

function dig(obj, path, callback) {
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

function map(obj, callback) {
  if (Array.isArray(obj)) {
    return obj.map(callback);
  }
  else {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = callback(obj[key], key);
      return acc;
    }, {});
  }
}

function filter(obj, callback) {
  if (Array.isArray(obj)) {
    return obj.filter(callback);
  }
  else {
    return Object.keys(obj).reduce((acc, key) => {
      if (callback(obj[key], key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  }
}

function deepMerge(target, source) {
  if (!isPlainObject(target) || !isPlainObject(source)) {
    return target;
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
