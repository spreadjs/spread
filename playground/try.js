const Store = require('../spread.js')
let store = new Store('ws://localhost:3001');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

function newCommand(){
	readline.question(`Command: `, (com) => {
  		if(com == 'exit') process.exit(0)
  		try {
  			eval(com);
  		} catch(e)
  		{
  			console.log('Invalid command');
  		}
  		newCommand()
	})
}
newCommand();