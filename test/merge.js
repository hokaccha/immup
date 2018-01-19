// @flow
import assert from 'assert';
import immup from '../src';

suite('merge', () => {
  test('merge object without changing the original state', () => {
    let state = { a: 'b', c: { a: 'b' } };
    let result = immup.merge(state, 'c', { x: 'y' });
    assert.deepStrictEqual(result, { a: 'b', c: { a: 'b', x: 'y' } });
    assert.notStrictEqual(state, result);
  });

  test('merge object to the original state', () => {
    let state = { a: 'b' };
    let result = immup.merge(state, null, { c: 'd' });
    assert.deepStrictEqual(result, { a: 'b', c: 'd' });
    assert.notStrictEqual(state, result);
  });

  test('merge object recursively', () => {
    let state = { a: { b: null, c: 2 } };
    let result = immup.merge(state, null, { a: { b: { x: 'y' } } });
    assert.deepStrictEqual(result, { a: { b: { x: 'y' }, c: 2 } });
    assert.notStrictEqual(state, result);
  });
});
