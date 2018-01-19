// @flow
import assert from 'assert';
import immup from '../src';

suite('prepend', () => {
  test('prepend a item without changing the original state', () => {
    let state = { foo: { arr: [1, 2, 3] } };
    let result = immup.prepend(state, 'foo.arr', 4);
    assert.deepStrictEqual(result, { foo: { arr: [4, 1, 2, 3] } });
    assert.notStrictEqual(state, result);
  });

  test('prepend items', () => {
    let state = { foo: { arr: [1, 2, 3] } };
    let result = immup.prepend(state, 'foo.arr', 4, 5);
    assert.deepStrictEqual(result, { foo: { arr: [4, 5, 1, 2, 3] } });
  });

  test('prepend a item to the original state', () => {
    let state = [1, 2, 3];
    let result = immup.prepend(state, null, 4);
    assert.deepStrictEqual(result, [4, 1, 2, 3]);
    assert.notStrictEqual(state, result);
  });
});
