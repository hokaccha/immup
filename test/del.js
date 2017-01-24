import immup from '../src/immup';
import test from 'ava';

test('delete a property without changing the original source', t => {
  let state = { a: 'b', c: { a: 'b' } };
  let result = immup.del(state, 'c.a');
  t.deepEqual(result, { a: 'b', c: {} });
  t.not(state, result);
});

test('delete a item of array', t => {
  let state = { a: 'b', c: [1, 2, 3] };
  let result = immup.del(state, 'c.1');
  t.deepEqual(result, { a: 'b', c: [1, 3] });
  t.not(state, result);
});
