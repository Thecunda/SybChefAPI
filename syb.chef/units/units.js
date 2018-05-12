var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var UnitSchema   = new mongoose.Schema({
	designation : { type: String, required: true, index: {unique : true}},
	unitType : { type: String, required: true, index: {}},
	conversion : { type: Number}
});

UnitSchema.plugin(mongoosePaginate)
const Unit = mongoose.model('unit', UnitSchema)

module.exports = Unit;

