var UnitService = require('./units.service');
var trace 	   = require('../../syb.core/log/log.controller');
var UserService = require('../../syb.core/users/users.service');

_this = this

exports.getUnits = async function(req, res, next){
	trace.log("getUnits API Controller")
	
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}

		var page = req.query.page ? req.query.page : 1;
		var limit = req.query.limit ? req.query.limit : 10; 
		var offset = (page-1)*9
		
		trace.log("Page # " + page + " of "+limit+" units")

		try{
			var units = await UnitService.getUnits({}, page, limit, offset)
			return res.status(200).json({status: 200, data: units, message: "OK"});
		}catch(e){
			return res.status(400).json({status: 400, message: e.message});
		}

}

exports.getOneUnits = async function(req, res, next){
	trace.log("getOneUnits API Controller")
	
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}
	
		var idUnitType=req.query.idUnitType
		try{
			var units = await UnitService.getOneUnits(idUnitType)
			return res.status(200).json({status: 200, data: units, message: "OK"});
		}catch(e){
			return res.status(400).json({status: 400, message: e.message});
		}

}

exports.createUnit = async function(req, res, next){
	trace.log("Create Unit API Controller")

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
	
	
	var unit = {
		unitType : req.body.unit.unitType,
		designation : req.body.unit.designation.trim(),
		conversion : req.body.unit.conversion,
    }
	
    try{
        var createdUnit = await UnitService.createUnit(unit)
        return res.status(201).json({status: 201, data: createdUnit, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateUnit = async function(req, res, next){
	trace.log("updateUnit API Controller")

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

    if(!req.body.unit._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.unit._id;

    var unit = {
        id,
		unitType: req.body.unit.unitType,
		designation: req.body.unit.designation.trim(),
		conversion: req.body.unit.conversion
    }

    try{
        var updatedUnit = await UnitService.updateUnit(unit)
        return res.status(200).json({status: 200, data: updatedUnit, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400., message: "Update error : " + e.message})
    }
}

exports.removeUnit = async function(req, res, next){
	trace.log("removeUnit API Controller")

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
        var deleted = await UnitService.deleteUnit(id)
        return res.status(204).json({status:204, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Check admin error : " + e.message})
    }
}
	
	
	
