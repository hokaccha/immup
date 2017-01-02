import methods from './methods';
import Immup from './Immup';

function immup(source) {
  return new Immup(source);
}

Object.assign(immup, { Immup }, methods);

export default immup;
