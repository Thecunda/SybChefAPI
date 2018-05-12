var MenuService = require('./menus.service');
var trace 	   = require('../../syb.core/log/log.controller');
var UserService = require('../../syb.core/users/users.service');

_this = this

exports.getMenus = async function(req, res, next){
	trace.log("getMenus API Controller")
	
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}

		var page = req.query.page ? req.query.page : 1;
		var limit = req.query.limit ? req.query.limit : 10; 
		var offset = (page-1)*9
		
		trace.log("Page # " + page + " of "+limit+" menus")

		try{
			var menus = await MenuService.getMenus({}, page, limit, offset)
			return res.status(200).json({status: 200, data: menus, message: "OK"});
		}catch(e){
			return res.status(400).json({status: 400, message: e.message});
		}

}

exports.getOneMenus = async function(req, res, next){
	trace.log("getOneMenus API Controller")
	
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}
		var idMenuGroup = req.query.idMenuGroup
		
		try{
			var menus = await MenuService.getOneMenus(idMenuGroup)
			return res.status(200).json({status: 200, data: menus, message: "OK"});
		}catch(e){
			return res.status(400).json({status: 400, message: e.message});
		}
}

exports.createMenu = async function(req, res, next){
	trace.log("Create Menu API Controller")
	
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}
	
	var menu = {
		menuGroup : req.body.menu.menuGroup,
		date : req.body.menu.date.trim(),
		recipe : req.body.menu.recipe,
		nb : req.body.menu.nb,
    }
	
    try{
        var createdMenu = await MenuService.createMenu(menu)
        return res.status(201).json({status: 201, data: createdMenu, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateMenu = async function(req, res, next){
	trace.log("updateMenu API Controller")

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

    if(!req.body.menu._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.menu._id;

    var menu = {
        id,
		menuGroup: req.body.menu.menuGroup,
		date: req.body.menu.date,
		recipe: req.body.menu.recipe,
		nb: req.body.menu.nb
    }

    try{
        var updatedMenu = await MenuService.updateMenu(menu)
        return res.status(200).json({status: 200, data: updatedMenu, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400., message: "Update error : " + e.message})
    }
}

exports.removeMenu = async function(req, res, next){
	trace.log("removeMenu  API Controller")

	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}

    var id = req.params.id;

    try{
        var deleted = await MenuService.deleteMenu(id)
        return res.status(204).json({status:204, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Delete error : " + e.message})
    }
}
	
	
	
