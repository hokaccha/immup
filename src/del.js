import dig from './utils/dig';
import filter from './utils/filter';

export default function del(source, path) {
  return dig(source, path, (o, key) => filter(o, (v, k) => key !== k));
}
