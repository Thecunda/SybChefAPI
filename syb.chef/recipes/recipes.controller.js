var RecipeService = require('./recipes.service');
var trace 	   = require('../../syb.core/log/log.controller');
var UserService = require('../../syb.core/users/users.service');

_this = this

exports.getRecipes = async function(req, res, next){
  trace.log("getRecipes API Controller")

  if(mongoError.status){//if mongo fails, return immediatly an error
    return res.status(500).json({status: 500., message: "Database is down"})
  }

  var page = req.query.page ? req.query.page : 1;
  var limit = new Number(req.query.limit ? req.query.limit : 10);
  var offset = (page-1)*(limit-1)
  
  trace.log("Page # " + page + " of "+limit+" recipes: offset "+offset)

  try{
    var recipes = await RecipeService.getRecipes({}, page, limit, offset)
    return res.status(200).json({status: 200, data: recipes, message: "OK"});
  }catch(e){
    return res.status(400).json({status: 400, message: e.message});
  }

}

exports.createRecipe = async function(req, res, next){
	trace.log("Create Recipe API Controller")
	
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}
	
	try{
        var isUserAdmin = await UserService.findUserByUsername(req.headers.special)
		if (!isUserAdmin) {
			return res.status(400).json({status: 400, message: "Only an admin can create a record"})
		}
    }catch(e){
        return res.status(400).json({status: 400, message: "Check admin error : " + e.message})
    }
	
	
	var recipe = {
		type : req.body.recipe.type,
		designation : req.body.recipe.designation.trim(),
		capacity : req.body.recipe.capacity,
		source1 : req.body.recipe.source1,
		source2 : req.body.recipe.source2
    }
	
    try{
        var createdRecipe = await RecipeService.createRecipe(recipe)
        return res.status(201).json({status: 201, data: createdRecipe, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateRecipe = async function(req, res, next){
	trace.log("updateRecipe API Controller")

	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}
	
	try{
        var isUserAdmin = await UserService.findUserByUsername(req.headers.special)
		if (!isUserAdmin) {
			return res.status(400).json({status: 400, message: "Only an admin can modify a record"})
		}
    }catch(e){
        return res.status(400).json({status: 400, message: "Check admin error : " + e.message})
    }

    if(!req.body.recipe._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.recipe._id;

    var recipe = {
        id,
		type: req.body.recipe.type,
		designation: req.body.recipe.designation.trim(),
		capacity: req.body.recipe.capacity,
		source1: req.body.recipe.source1,
		source2: req.body.recipe.source2
    }

    try{
        var updatedRecipe = await RecipeService.updateRecipe(recipe)
        return res.status(200).json({status: 200, data: updatedRecipe, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400., message: "Update error : " + e.message})
    }
}

exports.removeRecipe = async function(req, res, next){
	trace.log("removeRecipe API Controller")

	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}
	
	try{
        var isUserAdmin = await UserService.findUserByUsername(req.headers.special)
		if (!isUserAdmin) {
			return res.status(400).json({status: 400, message: "Only an admin can delete a record"})
		}
    }catch(e){
        return res.status(400).json({status: 400, message: "Create error : " + e.message})
    }

    var id = req.params.id;

    try{
        var deleted = await RecipeService.deleteRecipe(id)
        return res.status(204).json({status: 204, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Check admin error : " + e.message})
    }
}
	
	
	
