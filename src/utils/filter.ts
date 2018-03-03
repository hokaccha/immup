export default function filter(
  obj: any,
  callback: (v: any, k: string | number) => any
) {
  if (Array.isArray(obj)) {
    return obj.filter(callback);
  } else {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      if (callback(obj[key], key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  }
}
