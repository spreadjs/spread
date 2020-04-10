const Store = require('./index.js')

let store = new Store(null, {logger:{events:true}});

//store.a = 1
store.b = {};
store.b.e=1

delete store.b.e;

store.x = 5

console.log(store.x)