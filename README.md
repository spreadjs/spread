# Distributed JavaScript Object

DJSO is a local JavaScript datastructure, that is instantly synced across instances.
It can be used, when building distributed applications, that need local in-memory data for fast access.

```javascript
const store = new Store('ws://...'); 

store.hello = 'World'; 
delete store.hello;
```

Why?

- Use Plain JavaScript Objects

- Fast, native lookups

- Super simple usage

- Scalable

  

## Get started

Install:

```shell
npm i dsjo
```

 or

```html
<script src="djso.js" />
```



## Usage

In order to sync your local data structure, spin up the built-in socket server. The internal communication is done via web sockets.

### Start the socket server

```shell
node server.js
```

### Use the client

```javascript
// Initialize. All instances share the same websocket connection
let store = new Store('ws://your_server');

// Set any properties on the storage object
store.config = {};
store.config.name = "Peter";
store.config.array = ["one"];
store.config.array.push("two");

// Delete properties
delete store.config.age;

```



## How it works

Technically the process is pretty simple. The Storage object is being monitored using a JS Proxy. Every change will instantly be emitted to the server, where is gets broadcasted to all connected instances. On each instance, the incoming operation is applied, keeping the storage object in sync.

Wen a new instance joins the group, it automatically requests the current state of the storage object. Any other instance will then send a copy of the data object to the new instance.



## Try it live

1. Spin up the socket server:

`node server.js`

2. Start two or more example instances:

`node example.js`

3. Make changes and see the results

`store.test = {}`

`store.test.a = 2`

`delete store.test.d`