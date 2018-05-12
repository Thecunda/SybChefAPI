var MenuGroupAppro = require('./menuGroupAppros');
var trace 	   = require('../../syb.core/log/log.controller');
var moment 	   = require('moment');

_this = this

exports.getOneMenuGroupAppro = async function(menuGroupAppro){ //search for one menuGroupAppro
	trace.log("getOneMenuGroupAppros  API service")	
	try {
		var existingMenuGroupAppro = await MenuGroupAppro.find({menuGroup: menuGroupAppro.menuGroup,ingredient: menuGroupAppro.ingredient,unit:menuGroupAppro.unit})
		return existingMenuGroupAppro;
	} catch (e) {
		throw Error('Error while getting all menuGroupAppros = ' + e.message)
	}		
}

exports.getOneMenuGroupAppros = async function(idMenuGroup){//search all menuGroupAppros of a MenuGroup
	trace.log("getOneMenuGroupAppros  API service")	
	try {
		var menuGroupAppros = await MenuGroupAppro.find({menuGroup:idMenuGroup}).sort([['ingredient', 1]])
		return menuGroupAppros;
	} catch (e) {
		throw Error('Error while getting all menuGroupAppros = ' + e.message)
	}		
}

exports.createMenuGroupAppro = async function(menuGroupAppro){
	trace.log("create menuGroupAppro API service")
	var menuGroup = menuGroupAppro.menuGroup
	var ingredient = menuGroupAppro.ingredient
	//var qty = Math.round(menuGroupAppro.qty*10)/10 toPrecision(2)
	var qty = menuGroupAppro.qty.toPrecision(2)
	var unit = menuGroupAppro.unit
	   
	var query = { menuGroup: menuGroup,ingredient: ingredient,unit: unit };
    try{
        var savedMenuGroupAppro = await MenuGroupAppro.findOneAndUpdate(query, { $set: {qty:qty}}, {upsert:true, new: true})
		return savedMenuGroupAppro; 
	} catch(e){
		if(e.code="E11000"){
			throw Error(e.code)
		} else{
			throw Error(e.message)
		}
    }
	 
}

exports.deleteMenuGroupAppro = async function(idMenuGroup){
    trace.log("deleteMenuGroupAppro  API service")
    try{
        var deleted = await MenuGroupAppro.remove({menuGroup: idMenuGroup})
        if(deleted.result.n === 0){
            throw Error("MenuGroupAppro Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error(e.message)
    }
}



