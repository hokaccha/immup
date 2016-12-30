import Immup from '../src/immup';
import test from 'ava';

test('push a item without changing the original source', t => {
  let state = { foo: { arr: [1, 2, 3] } };
  let result = Immup.push(state, 'foo.arr', 4);
  t.deepEqual(result, { foo: { arr: [1, 2, 3, 4] } });
  t.not(state, result);
});

test('push items', t => {
  let state = { foo: { arr: [1, 2, 3] } };
  let result = Immup.push(state, 'foo.arr', 4, 5);
  t.deepEqual(result, { foo: { arr: [1, 2, 3, 4, 5] } });
});

test('push a item to the original source', t => {
  let state = [1, 2, 3];
  let result = Immup.push(state, null, 4);
  t.deepEqual(result, [1, 2, 3, 4]);
  t.not(state, result);
});
