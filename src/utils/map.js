export default function map(obj, callback) {
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
