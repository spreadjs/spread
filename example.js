const Store = require('./index.js')

let store = new Store(null);

//store.a = 1
store.b = {};
store.b.e=1

delete store.b.e;

store.x = 5

//store.arr = [];

//store.arr.push(2);

console.log(store.x)