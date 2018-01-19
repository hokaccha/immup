// @flow
import assert from 'assert';
import immup from '../src';

suite('append', () => {
  test('append a item without changing the original state', () => {
    let state = { foo: { arr: [1, 2, 3] } };
    let result = immup.append(state, 'foo.arr', 4);
    assert.deepStrictEqual(result, { foo: { arr: [1, 2, 3, 4] } });
    assert.notStrictEqual(state, result);
  });

  test('append items', () => {
    let state = { foo: { arr: [1, 2, 3] } };
    let result = immup.append(state, 'foo.arr', 4, 5);
    assert.deepStrictEqual(result, { foo: { arr: [1, 2, 3, 4, 5] } });
  });

  test('append a item to the original state', () => {
    let state = [1, 2, 3];
    let result = immup.append(state, null, 4);
    assert.deepStrictEqual(result, [1, 2, 3, 4]);
    assert.notStrictEqual(state, result);
  });
});
