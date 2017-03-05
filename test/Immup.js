// @flow
import immup, { Immup } from '../src';
import test from 'ava';

test('Immup', t => {
  t.truthy(immup({}) instanceof Immup);
});
