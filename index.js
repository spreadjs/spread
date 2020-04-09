var io = require('socket.io-client');

var Store = function(conString)
{

	this.data = [];
	this.conn = {};
	this.id = Math.random();

	this.connect = function(conString)
	{
		this.conn = io.connect('http://localhost:3000')

		this.conn.on('connect', () => {
			console.log('connected');
			this.conn.emit('requestSync', {sender:this.id});
		})
		
	}

	this.connect(conString);


	// local operations
	this._add = function(data)
	{
		this.data.push(data);
	}

	this._update = function(data)
	{
		this.data.forEach( d => {
			if(JSON.stringify(d) == JSON.stringify(data)) d = data;
		})
	}

	this._remove = function(data){
		this.data.forEach((d,i) => {
			if(JSON.stringify(d) == JSON.stringify(data)) this.data.splice(i,1);
		})
	}


	this.conn.on('requestSync', data => {
		console.log('someone requested a Sync', data)
		if(data.sender == this.id) return;
		this.conn.emit('init', this.data);
	})

	this.conn.on('init', data => {
		console.log('got an init', data)
		this.data = data;
	})


	// remote operation listeners
	this.conn.on('add', data => {
		if(data.sender == this.id) return;
		this._add(data.payload);
	})

	this.conn.on('update', data => {
		if(data.sender == this.id) return;
		this._update(data.payload);
	})

	this.conn.on('remove', data => {
		if(data.sender == this.id) return;
		this._remove(data.payload)
	})


	// natice operations
	this.add = function(data) {
		this._add(data);
		this.conn.emit('add', {
			sender: this.id,
			payload: data
		});
	}

	this.update = function(data) {
		this._update(data);
		this.conn.emit('update', {
			sender: this.id,
			payload: data
		});
	}

	this.remove = function(data) {
		this._remove(data);
		this.conn.emit('remove', {
			sender: this.id,
			payload: data
		});
	}
}

module.exports = Store;