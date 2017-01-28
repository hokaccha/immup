# immup

immup is a JavaScript module that provides the feature to update deeply nested objects/arrays without changing the original source.

## Installation

```
$ npm install immup
```

## Usage

```javascript
import Immup from 'immup';

let state = {
  foo: {
    bar: 'baz',
  },
};
let nextState = immup.set(state, 'foo.bar', 'x'); //=> { foo: { bar: 'x' } }
assert(state !== nextState);

// update a item of array
let state = {
  todos: [
    { id: 1, title: 'foo', completed: true },
    { id: 2, title: 'bar', completed: false },
    { id: 3, title: 'baz', completed: false },
  ],
};
let index = state.todos.findIndex(item => item.id === 2);
let nextState = immup.set(state, `todos.${index}.completed`, true);
// or
let nextState = immup.merge(state, `todos.${index}`, { completed: true });

// delete element
let nextState = immup.del(state, `todos.${index}`);
```

See [tests](https://github.com/hokaccha/immup/tree/master/test) for more examples.

## Similar modules

- [dot\-prop\-immutable](https://www.npmjs.com/package/dot-prop-immutable)
- [updeep](https://www.npmjs.com/package/updeep)
- [immutability\-helper](https://www.npmjs.com/package/immutability-helper)

## License

MIT
