import immup from '../src/immup';
import test from 'ava';

test('merge object in array', t => {
  let state = { l: [{ id: 1, val: 'a' }, { id: 2, val: 'b' }] };
  let result = immup.mergeList(state, 'l', [{ id: 3, a: 'b' }, { id: 2, c: 'd' }], (a, b) => a.id === b.id);
  t.deepEqual(result, { l: [{ id: 3, a: 'b' }, { id: 2, val: 'b', c: 'd' }] });
  t.not(state, result);
});
