# immup

Update deeply nested objects/arrays without changing the original source.

## Installation

```
$ npm install immup
```

## API

### immup.set(state, path, value: any)

```javascript
import immup from 'immup';

let state = {
  foo: {
    a: 'b',
    c: 'd',
  },
  x: 'y',
};
let nextState = immup.set(state, 'foo.a', 'new value');
// =>
// {
//   foo: {
//     a: 'new value',
//     c: 'd',
//   },
//   x: 'y',
// }

// The original object is not updated.
assert(state !== nextState);
assert(state.foo.a === 'b');
```

#### Update an item of array

```javascript
import immup from 'immup';

let state = {
  todos: [
    { id: 1, title: 'foo', completed: true },
    { id: 2, title: 'bar', completed: false },
    { id: 3, title: 'baz', completed: false },
  ]
};

let targetId = 3;
let index = state.todos.findIndex(todo => todo.id === targetId);
immup.set(state, `todos.${index}.title`, 'new title');
// =>
// {
//   todos: [
//     { id: 1, title: 'foo', completed: true },
//     { id: 2, title: 'bar', completed: false },
//     { id: 3, title: 'new title', completed: false },
//   ]
// }
```

#### Passing function

```javascript
import immup from 'immup';

let state = {
  todos: [
    { title: 'foo', completed: true },
    { title: 'bar', completed: false },
    { title: 'baz', completed: false },
  ]
};

// toggle completed
immup.set(state, 'todos.2.completed', v => !!v);
// =>
// {
//   todos: [
//     { title: 'foo', completed: true },
//     { title: 'bar', completed: false },
//     { title: 'baz', completed: true },
//   ]
// }
```

### immup.del(state, path)

Delete a property/element from state.

```javascript
import immup from 'immup';

let state = {
  todos: [
    { title: 'foo', completed: true },
    { title: 'bar', completed: false },
    { title: 'baz', completed: false },
  ]
};

immup.del(state, 'todos.1');
// =>
// {
//   todos: [
//     { title: 'foo', completed: true },
//     { title: 'baz', completed: false },
//   ]
// }

immup.del(state, 'todos.1.completed');
// =>
// {
//   todos: [
//     { title: 'foo', completed: true },
//     { title: 'bar' },
//     { title: 'baz', completed: false },
//   ]
// }
```

### immup.merge(state, path, value)

Merge object deeply.

```javascript
import immup from 'immup';

let state = {
  todos: [
    { title: 'foo', completed: true },
    { title: 'bar', completed: false, extra: { a: 'b', x: 'y' } },
    { title: 'baz', completed: false },
  ]
};

immup.merge(state, 'todos.1', { completed: true, extra: { x: 'new value' } });
// =>
// {
//   todos: [
//     { title: 'foo', completed: true },
//     { title: 'bar', completed: true, extra: { a: 'b', x: 'new value' } },
//     { title: 'baz', completed: false },
//   ]
// }
```

### immup.append(state, path, ...values)

```javascript
import immup from 'immup';

let state = {
  todos: [
    { title: 'foo', completed: true },
    { title: 'bar', completed: false },
    { title: 'baz', completed: false },
  ]
};

let newTodo1 = { title: 'new1', completed: false };
let newTodo2 = { title: 'new2', completed: false };
immup.append(state, 'todos', newTodo1, newTodo2);
// =>
// {
//   todos: [
//     { title: 'foo', completed: true },
//     { title: 'bar', completed: false },
//     { title: 'baz', completed: false },
//     { title: 'new1', completed: false },
//     { title: 'new2', completed: false },
//   ]
// }
```

### immup.prepend(state, path, ...values)

```javascript
import immup from 'immup';

let state = {
  todos: [
    { title: 'foo', completed: true },
    { title: 'bar', completed: false },
    { title: 'baz', completed: false },
  ]
};

let newTodo1 = { title: 'new1', completed: false };
let newTodo2 = { title: 'new2', completed: false };
immup.prepend(state, 'todos', newTodo1, newTodo2);
// =>
// {
//   todos: [
//     { title: 'new1', completed: false },
//     { title: 'new2', completed: false },
//     { title: 'foo', completed: true },
//     { title: 'bar', completed: false },
//     { title: 'baz', completed: false },
//   ]
// }
```

### immup(state)

Return instance of `Immup` that is chainable object.

```javascript
import immup from 'immup';

let state = {
  todos: [
    { title: 'foo', completed: true },
    { title: 'bar', completed: false },
    { title: 'baz', completed: false },
  ]
};

// Call `end()` to recieve the state.
immup(state)
  .del('todos.1')
  .append('todos', { title: 'new', completed: true })
  .merge('todos.0', { completed: false })
  .end();
// =>
// {
//   todos: [
//     { title: 'foo', completed: false },
//     { title: 'baz', completed: false },
//     { title: 'new', completed: true },
//   ],
// }
```

### immup.isImmup(obj)

```javascript
import immup from 'immup';

immup.isImmup(immup(state)); //=> true
immup.isImmup(immup); //=> false
immup.isImmup(state); //=> false
```

## Similar modules

- [dot\-prop\-immutable](https://www.npmjs.com/package/dot-prop-immutable)
- [updeep](https://www.npmjs.com/package/updeep)
- [immutability\-helper](https://www.npmjs.com/package/immutability-helper)

## License

MIT
