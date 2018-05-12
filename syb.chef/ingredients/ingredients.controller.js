var IngredientService = require('./ingredients.service');
var trace 	   = require('../../syb.core/log/log.controller');
var UserService = require('../../syb.core/users/users.service');

_this = this

exports.getIngredients = async function(req, res, next){
	trace.log("getIngredients API Controller")
	
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}

		var page = req.query.page ? req.query.page : 1;
		var limit = req.query.limit ? req.query.limit : 10; 
		var offset = (page-1)*9
		
		trace.log("Page # " + page + " of "+limit+" ingredients")

		try{
			var ingredients = await IngredientService.getIngredients({}, page, limit, offset)
			return res.status(200).json({status: 200, data: ingredients, message: "OK"});
		}catch(e){
			return res.status(400).json({status: 400, message: e.message});
		}

}

exports.createIngredient = async function(req, res, next){
	trace.log("Create Ingredient API Controller")
	
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
	
	
	var ingredient = {
		designation : req.body.ingredient.designation.trim()
    }
	
    try{
        var createdIngredient = await IngredientService.createIngredient(ingredient)
        return res.status(201).json({status: 201, data: createdIngredient, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateIngredient = async function(req, res, next){
	trace.log("updateIngredient API Controller")

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

    if(!req.body.ingredient._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.ingredient._id;

    var ingredient = {
        id,
		
		designation: req.body.ingredient.designation.trim()
		
    }

    try{
        var updatedIngredient = await IngredientService.updateIngredient(ingredient)
        return res.status(200).json({status: 200, data: updatedIngredient, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400., message: "Update error : " + e.message})
    }
}

exports.removeIngredient = async function(req, res, next){
	trace.log("removeIngredient API Controller")

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
        var deleted = await IngredientService.deleteIngredient(id)
        return res.status(204).json({status:204, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Check admin error : " + e.message})
    }
}
	
	
	
