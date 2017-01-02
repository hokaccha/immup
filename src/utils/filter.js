export default function filter(obj, callback) {
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

