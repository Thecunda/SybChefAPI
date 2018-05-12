var Ingredient = require('./ingredients');
var trace 	   = require('../../syb.core/log/log.controller');
var moment 	   = require('moment');

_this = this

exports.getIngredients = async function(query, page, limit, offset){
	trace.log("getIngredients API service")
		if(page!=0){
			var options = {
				limit:limit,
				offset: offset,
				sort : {date: 'desc'}
			}
			try {
				var ingredients = await Ingredient.paginate(query, options)
				return ingredients;
			} catch (e) {
				throw Error('Error while Paginating Ingredients = ' + e.message)
			}
		} else {
			try {
				var ingredients = await Ingredient.find({}).sort([['designation', 1]])
				return ingredients;
			} catch (e) {
				throw Error('Error while getting all ingredients = ' + e.message)
			}
		}
		
}

exports.createIngredient = async function(ingredient){
	trace.log("create ingredient API service")
    var newIngredient = new Ingredient({
		designation : ingredient.designation
    })

    try{
        var savedIngredient = await newIngredient.save()
        return savedIngredient;
    }catch(e){
		if(e.code="E11000"){
			throw Error(e.code)
		} else{
			throw Error(e.message)
		}
    }
}

exports.updateIngredient = async function(ingredient){
	trace.log("updateIngredient API service")
    var id = ingredient.id

    try{
        var oldIngredient = await Ingredient.findById(id);
    }catch(e){
        throw Error("Service error = "+ e.message)
    }

    if(!oldIngredient){
        return false;
    }
	
	oldIngredient.designation = ingredient.designation;
	
    try{
        var savedIngredient = await oldIngredient.save()
        return savedIngredient;
    }catch(e){
        throw Error(e.message);
    }
}

exports.deleteIngredient = async function(id){
    trace.log("deleteIngredient API service")
    try{
        var deleted = await Ingredient.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Ingredient Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error(e.message)
    }
}



