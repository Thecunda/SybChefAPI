var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var RecipeSchema   = new mongoose.Schema({
	designation : { type: String, required: true, index: {unique : true}},
	type : { type: String},
	capacity : { type: Number},
	source1 : { type: String},
	source2 : { type: String}
});

RecipeSchema.plugin(mongoosePaginate)
const Recipe = mongoose.model('recipe', RecipeSchema)

module.exports = Recipe;

