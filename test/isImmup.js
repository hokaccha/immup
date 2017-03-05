// @flow
import type Immup from '../src';
import immup from '../src';
import test from 'ava';

test('Immup', t => {
  let im: Immup<Object> = immup({});
  t.truthy(immup.isImmup(im));
});
