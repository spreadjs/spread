const Store = require('./index.js')

let store = new Store();

//store.a = 1
store.b = {};
store.b.e=1

delete store.b.e;

store.x = 5

console.log(store.x)