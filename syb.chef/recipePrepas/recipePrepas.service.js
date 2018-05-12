var RecipePrepa = require('./recipePrepas');
var trace 	   = require('../../syb.core/log/log.controller');
var moment 	   = require('moment');

_this = this

exports.getRecipePrepas = async function(query, page, limit, offset){
	trace.log("getRecipePrepas API service")
		if(page!=0){
			var options = {
				limit:limit,
				offset: offset,
				sort : {date: 'desc'}
			}
			try {
				var recipePrepas = await RecipePrepa.paginate(query, options)
				return recipePrepas;
			} catch (e) {
				throw Error('Error while Paginating RecipePrepas = ' + e.message)
			}
		} else {
			try {
				var recipePrepas = await RecipePrepa.find({})
				return recipePrepas;
			} catch (e) {
				throw Error('Error while getting all recipePrepas = ' + e.message)
			}
		}
		
}

exports.getOneRecipePrepas = async function(idRecipe){
	trace.log("getOneRecipePrepas API service")
	try {
		var recipePrepas = await RecipePrepa.find({recipe:idRecipe})
		return recipePrepas;
	} catch (e) {
		throw Error('Error while getting all recipePrepas = ' + e.message)
	}
}

exports.createRecipePrepa = async function(recipePrepa){
	trace.log("create recipePrepa API service")
    var newRecipePrepa = new RecipePrepa({
		recipe : recipePrepa.recipe,
		stepNumber : recipePrepa.stepNumber,
		etape : recipePrepa.etape

    })

    try{
        var savedRecipePrepa = await newRecipePrepa.save()
        return savedRecipePrepa;
    }catch(e){
		if(e.code="E11000"){
			throw Error(e.code)
		} else{
			throw Error(e.message)
		}
    }
}

exports.updateRecipePrepa = async function(recipePrepa){
	trace.log("updateRecipePrepa API service")
    var id = recipePrepa.id

    try{
        var oldRecipePrepa = await RecipePrepa.findById(id);
    }catch(e){
        throw Error("Service error = "+ e.message)
    }

    if(!oldRecipePrepa){
        return false;
    }
	
	oldRecipePrepa.recipe = recipePrepa.recipe;
	oldRecipePrepa.stepNumber = recipePrepa.stepNumber;
	oldRecipePrepa.etape = recipePrepa.etape;

	

    try{
        var savedRecipePrepa = await oldRecipePrepa.save()
        return savedRecipePrepa;
    }catch(e){
        throw Error(e.message);
    }
}

exports.deleteRecipePrepa = async function(id){
    trace.log("deleteRecipePrepa API service")
    try{
        var deleted = await RecipePrepa.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("RecipePrepa Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error(e.message)
    }
}



