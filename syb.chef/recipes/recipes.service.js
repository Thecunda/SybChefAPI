var Recipe = require('./recipes');
var trace 	   = require('../../syb.core/log/log.controller');
var moment 	   = require('moment');

_this = this

exports.getRecipes = async function(query, page, limit, offset){
  trace.log("getRecipes API service page "+page+" limit "+limit)
  if(page!=0){
    var options = {
      limit: limit,
      offset: offset,
      sort : {designation: 'asc'}
    }
    try {
      var recipes = await Recipe.paginate(query, options)
      return recipes;
    } catch (e) {
      throw Error('Error while Paginating Recipes = ' + e.message)
    }
  } else {
    try {
      var recipes = await Recipe.find({})
      return recipes;
    } catch (e) {
      throw Error('Error while getting all recipes = ' + e.message)
    }
  }
  
}

exports.createRecipe = async function(recipe){
	trace.log("create recipe API service")
    var newRecipe = new Recipe({
		type : recipe.type,
		designation : recipe.designation,
		capacity : recipe.capacity,
		source1 : recipe.source1,
		source2 : recipe.source2
    })

    try{
        var savedRecipe = await newRecipe.save()
        return savedRecipe;
    }catch(e){
		if(e.code="E11000"){
			throw Error(e.code)
		} else{
			throw Error(e.message)
		}
    }
}

exports.updateRecipe = async function(recipe){
	trace.log("updateRecipe API service")
    var id = recipe.id

    try{
        var oldRecipe = await Recipe.findById(id);
    }catch(e){
        throw Error("Service error = "+ e.message)
    }

    if(!oldRecipe){
        return false;
    }
	
	oldRecipe.type = recipe.type;
	oldRecipe.designation = recipe.designation;
	oldRecipe.capacity = recipe.capacity;
	oldRecipe.source1 = recipe.source1;
	oldRecipe.source2 = recipe.source2;
	

    try{
        var savedRecipe = await oldRecipe.save()
        return savedRecipe;
    }catch(e){
        throw Error(e.message);
    }
}

exports.deleteRecipe = async function(id){
    trace.log("deleteRecipe  API service")
    try{
        var deleted = await Recipe.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Recipe Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error(e.message)
    }
}

exports.getOneRecipe = async function(idRecipe){ //search for one recipe
	trace.log("getOnerecipe API service")	
	try {
		var existingRecipe = await Recipe.find({designation: idRecipe})
		return existingRecipe;
	} catch (e) {
		throw Error('Error while getting all menuGroupAppros = ' + e.message)
	}		
}



