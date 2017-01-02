import set from './set';

export default function prepend(source, path, ...value) {
  return set(source, path, arr => {
    if (!Array.isArray(arr)) {
      throw new Error(`${path} is not a array`);
    }

    return value.concat(arr);
  });
};
