var UserService = require('./users.service')
var trace 	   = require('../log/log.controller');

_this = this

try {
	var users = UserService.count()
}catch(e){
	console.log(e.message);
}

exports.getUsers = async function(req, res, next){
	trace.log("getUsers User API Controller")

	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}
	
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10; 
	var offset = (page-1)*9
	
    trace.log("Page # " + page + " of "+limit+" users")

    try{
        var users = await UserService.getUsers({}, page, limit, offset)
        return res.status(200).json({status: 200, data: users, message: "OK"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createUser = async function(req, res, next){
	trace.log("Create User API Controller")

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

	var user = {
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,		
		hash: req.body.hash,
		lang: req.body.lang,
		admin: req.body.admin
    }
    try{
        var createdUser = await UserService.createUser(user)
        return res.status(201).json({status: 201, data: createdUser, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateUser = async function(req, res, next){
	trace.log("updateUser User API Controller")
 
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}
	
	try{
        var isUserAdmin = await UserService.findUserByUsername(req.headers.special)
		if (!isUserAdmin) {
			return res.status(400).json({status: 400, message: "Only an admin can update a record"})
		}
    }catch(e){
        return res.status(400).json({status: 400, message: "Check admin error : " + e.message})
    }

   if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    var user = {
        id,
		username: req.body.username ? req.body.username : null,
		firstName: req.body.firstName ? req.body.firstName : null,
		lastName: req.body.lastName ? req.body.lastName : null,
		hash: req.body.hash ? req.body.hash : null,
		lang: req.body.lang ? req.body.lang : null,
		admin: req.body.admin ? req.body.admin : null,
    }

    try{
        var updatedUser = await UserService.updateUser(user)
        return res.status(200).json({status: 200, data: updatedUser, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400., message: "Create error : " + e.message})
    }
}

exports.removeUser = async function(req, res, next){
	trace.log("removeUser User API Controller")

	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}

	try{
        var isUserAdmin = await UserService.findUserByUsername(req.headers.special)
		if (!isUserAdmin) {
			return res.status(400).json({status: 400, message: "Only an admin can remove a record"})
		}
    }catch(e){
        return res.status(400).json({status: 400, message: "Check admin error : " + e.message})
    }
	
    var id = req.params.id;

    try{
        var deleted = await UserService.deleteUser(id)
        return res.status(204).json({status:204, message: "OK"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Create error : " + e.message})
    }

}