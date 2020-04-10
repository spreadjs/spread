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

  

## Get started

Install:

`npm install djso`

 or

 `<script src="djso.js" />`



## Usage

In order to sync your local data structure, spin up the built-in socket server. The internal communication is done via web sockets.

### Start the socket server

```shell
node server.js
```

### Use the client

```javascript
// initialize
let store = new Store();

// Set any properties on the storage object
store.config = {};
store.config.name = "Peter";
store.config.array = ["one"];
store.config.array.push("two");

// Delete properties
delete store.config.age;

```





## Try it live

1. Spin up the socket server:

`node server.js`

2. Start two or more example instances:

`node example.js`

3. Make changes and see the results

`store.test = {}`

`store.test.a = 2`

`delete store.test.d`