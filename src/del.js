// @flow
import type { State, Path } from './types';
import dig from './utils/dig';
import filter from './utils/filter';

export default function del<T: State>(
  source: T,
  path: Path
): T {
  return dig(source, path, (o, key) => filter(o, (v, k) => key !== k));
}
