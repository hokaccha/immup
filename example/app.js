/* @flow */
import immup from 'immup';
console.log(immup);

function add(a, b) {
  return a + b;
}

add(null, 1);

immup.set({ a: 'b' }, 1, 2);
