export default function map(
  obj: any,
  callback: (v: any, k: string | number) => any
) {
  if (Array.isArray(obj)) {
    return obj.map(callback);
  } else {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      acc[key] = callback(obj[key], key);
      return acc;
    }, {});
  }
}
