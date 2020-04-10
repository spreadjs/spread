var io = require('socket.io-client');

var Store = function(conString, options)
{
	this.logger = {
		events: true,
		internal:true
	};

	if(options.logger) this.logger = options.logger

	this.path = [];

	this.validator = {
	  get: (obj, prop) => {
	    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
	    	this.path.push(prop);
	      return new Proxy(obj[prop], this.validator)
	    } else {
	      return obj[prop]
	    }
	  },
	  set: (obj, prop, value) => {
	  	if(this.logger.internal) console.log('set', obj, prop)
	  	this.path.push(prop);
	    obj[prop] = value;
	    this.set(this.path, value);
	    this.path = [];
	    return true
	  },

	  deleteProperty: (obj, prop, value) => {
	    if(this.logger.internal) console.log('delete', obj, prop)
	  	this.path.push(prop);
	    delete obj[prop];
	    this.remove(this.path, value);
	    this.path = [];
	    return true
	  }
	}

	this.data = new Proxy({}, this.validator);
	this.conn = {};
	this.id = Math.random();

	this.connect = function(conString)
	{
		this.conn = io.connect('http://localhost:3000')

		this.conn.on('connect', () => {
			if(this.logger.events) console.log('connected');
			this.conn.emit('requestSync', {sender:this.id});
		})
	}

	this.connect(conString);


	this.conn.on('requestSync', data => {
		if(this.logger.events) console.log('someone requested a Sync', data)
		if(data.sender == this.id) return;
		this.conn.emit('init', this.data);
	})

	this.conn.on('init', data => {
		if(this.logger.events) console.log('got an init', data)
		this.data = data;
	})




	// react to remote events
	this.conn.on('set', data => {
		if(data.sender == this.id) return;
		if(this.logger.events) console.log('got set', data)
		var ref = this.data;
		data.path.forEach(function(p, i){
			if(i == data.path.length-1) return
			ref = ref[p]
		})

		ref[data.path[data.path.length-1]] = data.value;
		
		if(this.logger.internal) console.log('final', this.data);

	})

	this.conn.on('remove', data => {
		if(data.sender == this.id) return;
		if(this.logger.events) console.log('got remove', data)
		var ref = this.data;
		data.path.forEach(function(p, i){
			if(i == data.path.length-1) return
			ref = ref[p]
		})
		delete ref[data.path[data.path.length-1]]

		if(this.logger.internal) console.log('final', this.data);
	})




	// broadcast events
	this.set = function(path, value) {
		if(this.logger.events) console.log('sending set', path, value);
		this.conn.emit('set', {
			sender: this.id,
			path,
			value
		});
	}


	this.remove = function(path, value) {
		if(this.logger.events) console.log('sending remove', path, value);
		this.conn.emit('remove', {
			sender: this.id,
			path,
			value
		});
	}



	return this.data;
}

module.exports = Store;