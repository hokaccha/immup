import Immup from '../src/immup';
import test from 'ava';

test('unshift a item without changing the original source', t => {
  let state = { foo: { arr: [1, 2, 3] } };
  let result = Immup.unshift(state, 'foo.arr', 4);
  t.deepEqual(result, { foo: { arr: [4, 1, 2, 3] } });
  t.not(state, result);
});

test('unshift items', t => {
  let state = { foo: { arr: [1, 2, 3] } };
  let result = Immup.unshift(state, 'foo.arr', 4, 5);
  t.deepEqual(result, { foo: { arr: [4, 5, 1, 2, 3] } });
});

test('unshift a item to the original source', t => {
  let state = [1, 2, 3];
  let result = Immup.unshift(state, null, 4);
  t.deepEqual(result, [4, 1, 2, 3]);
  t.not(state, result);
});
