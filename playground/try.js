const Store = require('../index.js')
let store = new Store(null);

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