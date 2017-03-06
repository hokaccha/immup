// @flow
import immup from '../src';
import test from 'ava';

test('append a item without changing the original state', t => {
  let state = { foo: { arr: [1, 2, 3] } };
  let result = immup.append(state, 'foo.arr', 4);
  t.deepEqual(result, { foo: { arr: [1, 2, 3, 4] } });
  t.not(state, result);
});

test('append items', t => {
  let state = { foo: { arr: [1, 2, 3] } };
  let result = immup.append(state, 'foo.arr', 4, 5);
  t.deepEqual(result, { foo: { arr: [1, 2, 3, 4, 5] } });
});

test('append a item to the original state', t => {
  let state = [1, 2, 3];
  let result = immup.append(state, null, 4);
  t.deepEqual(result, [1, 2, 3, 4]);
  t.not(state, result);
});
