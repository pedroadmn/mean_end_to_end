var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	age: Number
});

var model = mongoose.model('Users', UserSchema);

module.exports = model; 
