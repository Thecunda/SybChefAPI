var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
var bcrypt 		 = require('bcryptjs');

var UserSchema   = new mongoose.Schema({
	username: { type: String, required: true, index: { unique: true }},
	firstName: String,
    lastName: String,
	hash: { type: String, required: true, select: false }, // without specific requirement during a search the password will never be sent 
    lang: String,
	admin: { type: Boolean },
	
});

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;
