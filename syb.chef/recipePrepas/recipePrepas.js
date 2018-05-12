var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var RecipePrepaSchema   = new mongoose.Schema({
	recipe : { type: String, required: true, index: {}},
	stepNumber : { type: Number, required: true, index: {}},
	etape : { type: String, required: true}
});

RecipePrepaSchema.index({recipe: 1, stepNumber: 1}, {unique: true});

RecipePrepaSchema.plugin(mongoosePaginate)
const RecipePrepa = mongoose.model('recipePrepa', RecipePrepaSchema)

module.exports = RecipePrepa;

