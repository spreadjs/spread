const Store = require('./index.js')
let store = new Store(null);

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

function newCommand(){
	readline.question(`Command: `, (com) => {
  		console.log(` ${com}!`)
  		eval(com);
  		newCommand()
	})
}
newCommand();
