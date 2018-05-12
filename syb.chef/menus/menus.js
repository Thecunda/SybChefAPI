var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var MenuSchema   = new mongoose.Schema({
	menuGroup : { type: String, required: true, index: {}},
	date : { type: String, required: true, index: {}},
	recipe : { type: String, required: true, index: {}},
	nb : { type: Number}
});

MenuSchema.plugin(mongoosePaginate)
const Menu = mongoose.model('menu', MenuSchema)

module.exports = Menu;

