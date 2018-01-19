// @flow
import assert from 'assert';
import immup from '../src';

suite('del', () => {
  test('delete a property without changing the original state', () => {
    let state = { a: 'b', c: { a: 'b' } };
    let result = immup.del(state, 'c.a');
    assert.deepStrictEqual(result, { a: 'b', c: {} });
    assert.notStrictEqual(state, result);
  });

  test('delete a item of array', () => {
    let state = { a: 'b', c: [1, 2, 3] };
    let result = immup.del(state, 'c.1');
    assert.deepStrictEqual(result, { a: 'b', c: [1, 3] });
    assert.notStrictEqual(state, result);
  });

  test('end of path is not defined', () => {
    let state = { a: 1 };
    let result = immup.del(state, 'b');
    assert.deepStrictEqual(result, { a: 1 });
  });

  test('throw error when key of path is not defined', () => {
    assert.throws(() => immup.del({ a: 1 }, 'a.b.c', {}), 'a.b is not a object or array');
    assert.throws(() => immup.set({ a: 1 }, 'a.b.c.d.e', {}), 'a.b is not a object or array');
  });
});
