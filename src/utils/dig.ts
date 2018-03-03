import { Path } from "../types";
import isPlainObject from "./isPlainObject";

export default function dig(
  obj: any,
  path: Path,
  callback: (o: any, k: any) => any
) {
  let keys = parsePath(path);

  let walk = (o: any) => {
    let clone: any;
    let key = keys.shift();

    if (key === undefined) {
      return callback(o, Array.isArray(o) ? Number(key) : key);
    }

    if (Array.isArray(o)) {
      clone = o.slice();
    } else if (isPlainObject(o)) {
      clone = Object.assign({}, o);
    } else {
      let origKeys = parsePath(path);
      let currentKeys = origKeys.slice(0, origKeys.length - keys.length);
      throw new Error(`${currentKeys.join(".")} is not a object or array`);
    }

    clone[key] = walk(o[key]);

    return clone;
  };

  return walk(obj);
}

function parsePath(path: Path): Array<string> {
  if (typeof path === "string") {
    return (path.match(/(\\\.|[^.])+/g) || []).map(s =>
      s.replace(/\\\./g, ".")
    );
  } else {
    throw new Error(`Invalid path type: ${path}`);
  }
}
