var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var MenuGroupApproSchema   = new mongoose.Schema({
	menuGroup : { type: String, required: true, index: {}},
	ingredient : { type: String, required: true, index: {}},
	qty : { type: Number},
	unit : { type: String}
});

MenuGroupApproSchema.plugin(mongoosePaginate)
const MenuGroupAppro = mongoose.model('menuGroupAppro', MenuGroupApproSchema)

module.exports = MenuGroupAppro;

