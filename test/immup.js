import Immup from '../src/immup';
import test from 'ava';

let state = {
  str: 'foo',
  arr: [1, 2, 3],
  obj: {
    nestedArr: [
      { id: 1, name: 'x' },
      { id: 2, name: 'y' },
    ],
    nestedObj: {
      foo: 'bar',
    },
  },
};

test('Immup', t => {
  t.is(typeof Immup, 'function');
});
