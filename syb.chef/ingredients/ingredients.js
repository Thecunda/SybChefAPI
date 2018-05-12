var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var IngredientSchema   = new mongoose.Schema({
	designation : { type: String, required: true, index: {unique : true}}
});

IngredientSchema.plugin(mongoosePaginate)
const Ingredient = mongoose.model('ingredient', IngredientSchema)

module.exports = Ingredient;

