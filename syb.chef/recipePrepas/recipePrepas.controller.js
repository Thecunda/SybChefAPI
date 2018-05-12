var RecipePrepaService = require('./recipePrepas.service');
var trace 	   = require('../../syb.core/log/log.controller');
var UserService = require('../../syb.core/users/users.service');

_this = this

exports.getRecipePrepas = async function(req, res, next){
	trace.log("getRecipePrepas API Controller")
	
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}

		var page = req.query.page ? req.query.page : 1;
		var limit = req.query.limit ? req.query.limit : 10; 
		var offset = (page-1)*9
		
		trace.log("Page # " + page + " of "+limit+" recipePrepas")

		try{
			var recipePrepas = await RecipePrepaService.getRecipePrepas({}, page, limit, offset)
			return res.status(200).json({status: 200, data: recipePrepas, message: "OK"});
		}catch(e){
			return res.status(400).json({status: 400, message: e.message});
		}
}

exports.getOneRecipePrepas = async function(req, res, next){
	trace.log("getOneRecipePrepas API Controller")
	
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}
		var idRecipe=req.query.idRecipe
		try{
			var recipePrepas = await RecipePrepaService.getOneRecipePrepas(idRecipe)
			return res.status(200).json({status: 200, data: recipePrepas, message: "OK"});
		}catch(e){
			return res.status(400).json({status: 400, message: e.message});
		}
}

exports.createRecipePrepa = async function(req, res, next){
	trace.log("Create RecipePrepa API Controller")
	
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
	
	
	var recipePrepa = {
		recipe : req.body.recipePrepa.recipe,
		stepNumber : req.body.recipePrepa.stepNumber,
		etape : req.body.recipePrepa.etape.trim()

    }
	
    try{
        var createdRecipePrepa = await RecipePrepaService.createRecipePrepa(recipePrepa)
        return res.status(201).json({status: 201, data: createdRecipePrepa, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateRecipePrepa = async function(req, res, next){
	trace.log("updateRecipePrepa API Controller")

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

    if(!req.body.recipePrepa._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.recipePrepa._id;

    var recipePrepa = {
        id,
		recipe: req.body.recipePrepa.recipe,
		stepNumber: req.body.recipePrepa.stepNumber,
		etape: req.body.recipePrepa.etape.trim()

    }

    try{
        var updatedRecipePrepa = await RecipePrepaService.updateRecipePrepa(recipePrepa)
        return res.status(200).json({status: 200, data: updatedRecipePrepa, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400., message: "Update error : " + e.message})
    }
}

exports.removeRecipePrepa = async function(req, res, next){
	trace.log("removeRecipePrepa API Controller")

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
        var deleted = await RecipePrepaService.deleteRecipePrepa(id)
        return res.status(204).json({status:204, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Check admin error : " + e.message})
    }
	
}
	
	
	
