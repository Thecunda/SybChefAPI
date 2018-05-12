var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var MenuGroupSchema   = new mongoose.Schema({
	designation : { type: String, required: true, index: {unique:true}},
	ended : { type: Boolean}
});

MenuGroupSchema.plugin(mongoosePaginate)
const MenuGroup = mongoose.model('menuGroup', MenuGroupSchema)

module.exports = MenuGroup;

