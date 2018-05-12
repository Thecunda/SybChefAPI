var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var RecipeCompoSchema   = new mongoose.Schema({
	recipe : { type: String, required: true, index: {}},
	ingredient : { type: String, required: true},
	qty : { type: Number, required: true},
	unit : { type: String, required: true}
});

RecipeCompoSchema.index({recipe: 1, ingredient: 1}, {unique: true});

RecipeCompoSchema.plugin(mongoosePaginate)
const RecipeCompo = mongoose.model('recipeCompo', RecipeCompoSchema)

module.exports = RecipeCompo;

