import immup from '../src';
import test from 'ava';

test('update changing the original source', t => {
  let state = { a: 'b', c: { a: 'b' } };
  let result = immup.set(state, 'a', 'x');
  t.deepEqual(result, { a: 'x', c: { a: 'b' } });
  t.not(state, result);
  t.is(state.c, result.c);
});

test('update with nested path', t => {
  let state = { a: { b: { c: 'd' } } };
  let result = immup.set(state, 'a.b', { x: 'y' });
  t.deepEqual(result, { a: { b: { x: 'y' } } });
  t.not(state, result);
});

test('update a array', t => {
  let state = { a: { b: [1, 2, 3] } };
  let result = immup.set(state, 'a.b.1', 100);
  t.deepEqual(result, { a: { b: [1, 100, 3] } });
  t.not(state.a.b, result.a.b);
});

test('update a item of array', t => {
  let state = { a: { b: [{ id: 1 }, { id: 2 }] } };
  let result = immup.set(state, 'a.b.1.id', 100);
  t.deepEqual(result, { a: { b: [{ id: 1 }, { id: 100 }] } });
});

test('update with callback', t => {
  let state = { a: 1 };
  let result = immup.set(state, 'a', v => v + 1);
  t.deepEqual(result, { a: 2 });
});

test('keys as array', t => {
  let state = { a: { 'b.c': 'd' } };
  let result = immup.set(state, ['a', 'b.c'], 'x');
  t.deepEqual(result, { a: { 'b.c': 'x' } });
});

test('end of path is not defined', t => {
  let state = { a: 'b' };
  let result = immup.set(state, 'c', 'd');
  t.deepEqual(result, { a: 'b', c: 'd' });
});

test('throw error when key of path is not defined', t => {
  t.throws(() => immup.set({ a: 1 }, 'a.b.c', {}), 'a.b is not a object or array');
  t.throws(() => immup.set({ a: 1 }, 'a.b.c.d.e', {}), 'a.b is not a object or array');
});

test('value is false', t => {
  let state = { a: false };
  let result = immup.set(state, 'a', true);
  t.deepEqual(result, { a: true });
});
