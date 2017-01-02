import immup from '../src';
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

test('end of path is not defined', t => {
  let state = { a: 1 };
  let result = immup.del(state, 'b');
  t.deepEqual(result, { a: 1 });
});

test('throw error when key of path is not defined', t => {
  t.throws(() => immup.del({ a: 1 }, 'a.b.c', {}), 'a.b is not a object or array');
  t.throws(() => immup.set({ a: 1 }, 'a.b.c.d.e', {}), 'a.b is not a object or array');
});
