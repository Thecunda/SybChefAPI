var RecipeCompoService = require('./recipeCompos.service');
var trace 	   = require('../../syb.core/log/log.controller');
var UserService = require('../../syb.core/users/users.service');

_this = this

exports.getRecipeCompos = async function(req, res, next){
	trace.log("getRecipeCompos  API Controller")
	
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}

		var page = req.query.page ? req.query.page : 1;
		var limit = req.query.limit ? req.query.limit : 10; 
		var offset = (page-1)*9
		
		trace.log("Page # " + page + " of "+limit+" recipeCompos")

		try{
			var recipeCompos = await RecipeCompoService.getRecipeCompos({}, page, limit, offset)
			return res.status(200).json({status: 200, data: recipeCompos, message: "OK"});
		}catch(e){
			return res.status(400).json({status: 400, message: e.message});
		}

}

exports.getOneRecipeCompos = async function(req, res, next){
	trace.log("getOneRecipeCompos  API Controller")
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}
		var idRecipe=req.query.idRecipe
		try{
			var recipeCompos = await RecipeCompoService.getOneRecipeCompos(idRecipe)
			return res.status(200).json({status: 200, data: recipeCompos, message: "OK"});
		}catch(e){
			return res.status(400).json({status: 400, message: e.message});
		}

}

exports.createRecipeCompo = async function(req, res, next){
	trace.log("Create RecipeCompo API Controller")
	
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
	
	
	var recipeCompo = {
		recipe : req.body.recipeCompo.recipe.trim(),
		ingredient : req.body.recipeCompo.ingredient,
		qty : req.body.recipeCompo.qty,
		unit : req.body.recipeCompo.unit,
    }

    try{
        var createdRecipeCompo = await RecipeCompoService.createRecipeCompo(recipeCompo)
        return res.status(201).json({status: 201, data: createdRecipeCompo, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateRecipeCompo = async function(req, res, next){
	trace.log("updateRecipeCompo API Controller")

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

    if(!req.body.recipeCompo._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.recipeCompo._id;

    var recipeCompo = {
        id,
		recipe: req.body.recipeCompo.recipe.trim(),
		ingredient: req.body.recipeCompo.ingredient,
		qty: req.body.recipeCompo.qty,
		unit: req.body.recipeCompo.unit,
    }

    try{
        var updatedRecipeCompo = await RecipeCompoService.updateRecipeCompo(recipeCompo)
        return res.status(200).json({status: 200, data: updatedRecipeCompo, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400., message: "Update error : " + e.message})
    }
}

exports.removeRecipeCompo = async function(req, res, next){
	trace.log("removeRecipeCompo API Controller")

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
        var deleted = await RecipeCompoService.deleteRecipeCompo(id)
        return res.status(204).json({status:204, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Check admin error : " + e.message})
    }
}
	
	
	
