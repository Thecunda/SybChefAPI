var MenuGroupService = require('./menuGroups.service');
var trace 	   = require('../../syb.core/log/log.controller');
var UserService = require('../../syb.core/users/users.service');

_this = this

exports.getMenuGroups = async function(req, res, next){
	trace.log("getMenuGroups API Controller")
	
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}

		var page = req.query.page ? req.query.page : 1;
		var limit = req.query.limit ? req.query.limit : 10; 
		var offset = (page-1)*9
		
		trace.log("Page # " + page + " of "+limit+" menuGroups")

		try{
			var menuGroups = await MenuGroupService.getMenuGroups({}, page, limit, offset)
			return res.status(200).json({status: 200, data: menuGroups, message: "OK"});
		}catch(e){
			return res.status(400).json({status: 400, message: e.message});
		}

}

exports.createMenuGroup = async function(req, res, next){
	trace.log("Create MenuGroup API Controller")
	
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}
	
	var menuGroup = {
		designation : req.body.menuGroup.designation.trim(),
		ended : req.body.menuGroup.ended
    }
    try{
        var createdMenuGroup = await MenuGroupService.createMenuGroup(menuGroup)
        return res.status(201).json({status: 201, data: createdMenuGroup, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateMenuGroup = async function(req, res, next){
	trace.log("updateMenuGroup API Controller")

	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}

    if(!req.body.menuGroup._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.menuGroup._id;

    var menuGroup = {
        id,
		ended: req.body.menuGroup.ended
    }

    try{
        var updatedMenuGroup = await MenuGroupService.updateMenuGroup(menuGroup)
        return res.status(200).json({status: 200, data: updatedMenuGroup, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400., message: "Update error : " + e.message})
    }
}

exports.removeMenuGroup = async function(req, res, next){
	trace.log("removeMenuGroup API Controller")

	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}

    var id = req.params.id;

    try{
        var deleted = await MenuGroupService.deleteMenuGroup(id)
        return res.status(204).json({status:204, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Remove error : " + e.message})
    }
}
	
	
	
