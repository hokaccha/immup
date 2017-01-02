export default function isPlainObject(obj) {
  return obj instanceof Object && Object.getPrototypeOf(obj) === Object.prototype;
};
