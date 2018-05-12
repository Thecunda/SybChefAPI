var RecipeCompo = require('./recipeCompos');
var trace 	   = require('../../syb.core/log/log.controller');
var moment 	   = require('moment');

_this = this

exports.getRecipeCompos = async function(query, page, limit, offset){
	trace.log("getRecipeCompos API service")
		if(page!=0){
			var options = {
				limit:limit,
				offset: offset,
				sort : {date: 'desc'}
			}
			try {
				var recipeCompos = await RecipeCompo.paginate(query, options)
				return recipeCompos;
			} catch (e) {
				throw Error('Error while Paginating RecipeCompos = ' + e.message)
			}
		} else {
			try {
				var recipeCompos = await RecipeCompo.find({})
				return recipeCompos;
			} catch (e) {
				throw Error('Error while getting all recipeCompos = ' + e.message)
			}
		}
		
}

exports.getOneRecipeCompos = async function(idRecipe){
	trace.log("getOneRecipeCompos API service")
	try {
		var recipeCompos = await RecipeCompo.find({recipe:idRecipe})
		return recipeCompos;
	} catch (e) {
		throw Error('Error while getting one recipeCompos = ' + e.message)
	}
}

exports.createRecipeCompo = async function(recipeCompo){
	trace.log("create recipeCompo API service")
    var newRecipeCompo = new RecipeCompo({
		recipe : recipeCompo.recipe,
		ingredient : recipeCompo.ingredient,
		qty : recipeCompo.qty,
		unit : recipeCompo.unit
    })

    try{
        var savedRecipeCompo = await newRecipeCompo.save()
        return savedRecipeCompo;
    }catch(e){
		if(e.code="E11000"){
			throw Error(e.code)
		} else{
			throw Error(e.message)
		}
    }
}

exports.updateRecipeCompo = async function(recipeCompo){
	trace.log("updateRecipeCompo API service")
    var id = recipeCompo.id

    try{
        var oldRecipeCompo = await RecipeCompo.findById(id);
    }catch(e){
        throw Error("Service error = "+ e.message)
    }

    if(!oldRecipeCompo){
        return false;
    }
	
	oldRecipeCompo.recipe = recipeCompo.recipe;
	oldRecipeCompo.ingredient = recipeCompo.ingredient;
	oldRecipeCompo.qty = recipeCompo.qty;
	oldRecipeCompo.unit = recipeCompo.unit;
	

    try{
        var savedRecipeCompo = await oldRecipeCompo.save()
        return savedRecipeCompo;
    }catch(e){
        throw Error(e.message);
    }
}

exports.deleteRecipeCompo = async function(id){
    trace.log("deleteRecipeCompo API service")
    try{
        var deleted = await RecipeCompo.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("RecipeCompo Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error(e.message)
    }
}



