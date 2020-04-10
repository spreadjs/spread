# Distributed JavaScript Object

DJSO is a local JavaScript datastructure, that is synced across instances.

```
const store = new Store();

store.hello = 'World';

store.test = 1;

delete store.test;
```

## Try it

1. Spin up the socket server:

`node server.js`

2. Start two or more example instances:

`node example.js`

3. Make changes and see the results

`store.test = {}`

`store.test.a = 2`

`delete store.test.d`