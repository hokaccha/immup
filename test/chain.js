import Immup from '../src/immup';
import test from 'ava';

test('chain', t => {
  let state = {
    obj: {
      a: 'b',
      arr: [1, 2, 3],
      foo: { bar: 'baz' },
    },
  };
  let result = Immup.chain(state)
    .set('obj.a', 'x')
    .push('obj.arr', 4, 5)
    .unshift('obj.arr', 6, 7)
    .merge('obj.foo', { a: 'b', c: 'd' })
    .delete('obj.foo.c')
    .end();

  t.deepEqual(result, {
    obj: {
      a: 'x',
      arr: [6, 7, 1, 2, 3, 4, 5],
      foo: { bar: 'baz', a: 'b' },
    },
  });
  t.not(state, result);
});