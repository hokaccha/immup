import immup from '../src';
import test from 'ava';

test('merge object without changing the original source', t => {
  let state = { a: 'b', c: { a: 'b' } };
  let result = immup.merge(state, 'c', { x: 'y' });
  t.deepEqual(result, { a: 'b', c: { a: 'b', x: 'y' } });
  t.not(state, result);
});

test('merge object to the original source', t => {
  let state = { a: 'b' };
  let result = immup.merge(state, { c: 'd' });
  t.deepEqual(result, { a: 'b', c: 'd' });
  t.not(state, result);
});

test('merge object recursively', t => {
  let state = { a: { b: null, c: 2 } };
  let result = immup.merge(state, { a: { b: { x: 'y' } } });
  t.deepEqual(result, { a: { b: { x: 'y' }, c: 2 } });
  t.not(state, result);
});
