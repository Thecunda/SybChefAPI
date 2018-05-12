var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var UnitTypeSchema   = new mongoose.Schema({
	designation : { type: String, required: true, index: {unique:true}},
	reference : { type: String}, //exemple :si designation = volume => reference = litre
	donotremove : { type: Boolean} //interdiction de supprimer (true par défaut)
});

UnitTypeSchema.plugin(mongoosePaginate)
const UnitType = mongoose.model('unitType', UnitTypeSchema)

module.exports = UnitType;

