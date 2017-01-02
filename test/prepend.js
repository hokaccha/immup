import immup from '../src';
import test from 'ava';

test('prepend a item without changing the original source', t => {
  let state = { foo: { arr: [1, 2, 3] } };
  let result = immup.prepend(state, 'foo.arr', 4);
  t.deepEqual(result, { foo: { arr: [4, 1, 2, 3] } });
  t.not(state, result);
});

test('prepend items', t => {
  let state = { foo: { arr: [1, 2, 3] } };
  let result = immup.prepend(state, 'foo.arr', 4, 5);
  t.deepEqual(result, { foo: { arr: [4, 5, 1, 2, 3] } });
});

test('prepend a item to the original source', t => {
  let state = [1, 2, 3];
  let result = immup.prepend(state, null, 4);
  t.deepEqual(result, [4, 1, 2, 3]);
  t.not(state, result);
});
