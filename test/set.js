// @flow
import assert from 'assert';
import immup from '../src';

suite('set', () => {
  test('update changing the original state', () => {
    let state = { a: 'b', c: { a: 'b' } };
    let result = immup.set(state, 'a', 'x');
    assert.deepStrictEqual(result, { a: 'x', c: { a: 'b' } });
    assert.notStrictEqual(state, result);
    assert.strictEqual(state.c, result.c);
  });

  test('update with nested path', () => {
    let state = { a: { b: { c: 'd' } } };
    let result = immup.set(state, 'a.b', { x: 'y' });
    assert.deepStrictEqual(result, { a: { b: { x: 'y' } } });
    assert.notStrictEqual(state, result);
  });

  test('update an array', () => {
    let state = { a: { b: [1, 2, 3] } };
    let result = immup.set(state, 'a.b.1', 100);
    assert.deepStrictEqual(result, { a: { b: [1, 100, 3] } });
    assert.notStrictEqual(state.a.b, result.a.b);
  });

  test('update an item of array', () => {
    let state = { a: { b: [{ id: 1 }, { id: 2 }] } };
    let result = immup.set(state, 'a.b.1.id', 100);
    assert.deepStrictEqual(result, { a: { b: [{ id: 1 }, { id: 100 }] } });
  });

  test('update with callback', () => {
    let state = { a: 1 };
    let result = immup.set(state, 'a', v => v + 1);
    assert.deepStrictEqual(result, { a: 2 });
  });

  test('escape dot', () => {
    let state = { 'f@f': { 'b.c': 'd' } };
    let result = immup.set(state, 'f@f.b\\.c', 'x');
    assert.deepStrictEqual(result, { 'f@f': { 'b.c': 'x' } });
  });

  test('end of path is not defined', () => {
    let state = { a: 'b' };
    let result = immup.set(state, 'c', 'd');
    assert.deepStrictEqual(result, { a: 'b', c: 'd' });
  });

  test('throw error when key of path is not defined', () => {
    assert.throws(() => immup.set({ a: 1 }, 'a.b.c', {}), 'a.b is not a object or array');
    assert.throws(() => immup.set({ a: 1 }, 'a.b.c.d.e', {}), 'a.b is not a object or array');
  });

  test('value is false', () => {
    let state = { a: false };
    let result = immup.set(state, 'a', true);
    assert.deepStrictEqual(result, { a: true });
  });
});
