export default function isPlainObject(obj: any) {
  return (
    obj instanceof Object && Object.getPrototypeOf(obj) === Object.prototype
  );
}
