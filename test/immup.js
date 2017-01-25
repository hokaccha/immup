import immup, { Immup } from '../src/immup';
import test from 'ava';

test('immup', t => {
  t.truthy(immup({}) instanceof Immup);
});
