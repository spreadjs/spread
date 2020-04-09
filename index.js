
var Store = function(conString)
{

	this.data = [];
	this.conn = {};
	this.id = Math.random();

	this.connect = function(conString)
	{
		//...
		this.conn.emit('connect', {id:this.id, data:data});
	}

	if(conString) this.connect(conString);


	this.conn.on('connect', data => {
		if(data.id == this.id) return;
		this.conn.emit('init', this.data);
	})

	this.conn.on('init', data => {
		this.data = data;
	})

	this.conn.on('add', data => {
		this.data.push(data);
	})

	this.conn.on('update', data => {
		this.data.forEach( d => {
			if(JSON.stringify(d) == JSON.stringify(data)) d = data;
		})
	})

	this.conn.on('remove', data => {
		this.data.forEach((d,i) => {
			if(JSON.stringify(d) == JSON.stringify(data)) this.data.splice(i,1);
		})
	})


	this.add = function(data)
	{
		this.conn.emit('add', data);
	}

	this.update = function(data)
	{
		this.conn.emit('update', data);
	}

	this.remove = function(data)
	{
		this.conn.emit('remove', data);
	}
}

Store.add(1,2,)

var object = {};

object.aa = 2