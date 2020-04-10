# Distributed JavaScript Object

DJSO is a local JavaScript datastructure, that is instantly synced across instances.
It can be used, when building distributed applications, that need local in-memory data for fast access.

```javascript
const store = new Store('ws://...');

store.hello = 'World'; // 'hello' will be set on all instances

delete store.hello; // and will also be deleted on all instances
```

Why?

- Use Plain JavaScript Objects

- Fast, native lookups

- Super simple usage

- Scalable

  

## Get it

`npm install djso`

or

`<script src="djso.js" />`



## Get started

1. Start the socket server
   1. `node server.js`

2. initialise the client
   1. `let store = new Store('ws://')`



## Try it live

1. Spin up the socket server:

`node server.js`

2. Start two or more example instances:

`node example.js`

3. Make changes and see the results

`store.test = {}`

`store.test.a = 2`

`delete store.test.d`