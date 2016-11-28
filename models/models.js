var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
	name: String,
	age: Number
});

var model = mongoose.model('Users', UsersSchema);

module.exports = model; 
