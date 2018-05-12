var UnitTypeService = require('./unitTypes.service');
var trace 	   = require('../../syb.core/log/log.controller');
var UserService = require('../../syb.core/users/users.service');

_this = this

exports.getUnitTypes = async function(req, res, next){
	trace.log("getUnitTypes API Controller")
	
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}

		var page = req.query.page ? req.query.page : 1;
		var limit = req.query.limit ? req.query.limit : 10; 
		var offset = (page-1)*9
		
		trace.log("Page # " + page + " of "+limit+" unitTypes")

		try{
			var unitTypes = await UnitTypeService.getUnitTypes({}, page, limit, offset)
			return res.status(200).json({status: 200, data: unitTypes, message: "OK"});
		}catch(e){
			return res.status(400).json({status: 400, message: e.message});
		}

}

exports.createUnitType = async function(req, res, next){
	trace.log("Create UnitType API Controller")

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
	
	
	var unitType = {
		designation : req.body.unitType.designation.trim(),
		reference : req.body.unitType.reference.trim(),
		donotremove : req.body.unitType.donotremove
    }

    try{
        var createdUnitType = await UnitTypeService.createUnitType(unitType)
        return res.status(201).json({status: 201, data: createdUnitType, message: "OK"})
    }catch(e){ 
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateUnitType = async function(req, res, next){
	trace.log("updateUnitType API Controller")

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

    if(!req.body.unitType._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.unitType._id;

    var unitType = {
        id,
		reference: req.body.unitType.reference.trim(),
		donotremove : req.body.unitType.donotremove
    }

    try{
        var updatedUnitType = await UnitTypeService.updateUnitType(unitType)
        return res.status(200).json({status: 200, data: updatedUnitType, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400., message: "Update error : " + e.message})
    }
}

exports.removeUnitType = async function(req, res, next){
	trace.log("removeUnitType API Controller")

	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}
	
	try{
        var isUserAdmin = await UserService.findUserByUsername(req.headers.special)
		if (!isUserAdmin) {
			return res.status(400).json({status: 400, message: "Only an admin can delete a record"})
		}
    }catch(e){
        return res.status(400).json({status: 400, message: "Check admin error : " + e.message})
    }

    var id = req.params.id;

    try{
        var deleted = await UnitTypeService.deleteUnitType(id)
        return res.status(204).json({status:204, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Remove error : " + e.message})
    }
}
	
	
	
