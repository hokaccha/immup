import immup from '../src/immup';
import test from 'ava';

test('chain', t => {
  let state = {
    obj: {
      a: 'b',
      arr: [1, 2, 3],
      foo: { bar: 'baz' },
    },
  };
  let result = immup(state)
    .set('obj.a', 'x')
    .append('obj.arr', 4, 5)
    .prepend('obj.arr', 6, 7)
    .merge('obj.foo', { a: 'b', c: 'd' })
    .merge({ obj2: 'val' })
    .del('obj.foo.c')
    .end();

  t.deepEqual(result, {
    obj: {
      a: 'x',
      arr: [6, 7, 1, 2, 3, 4, 5],
      foo: { bar: 'baz', a: 'b' },
    },
    obj2: 'val',
  });
  t.not(state, result);
});
