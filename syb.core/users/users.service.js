var bodyParser = require('body-parser');
var User       = require('./user');
var jwt        = require('jsonwebtoken');
var bcrypt 	   = require('bcryptjs');
var config     = require('../../config');
var trace 	   = require('../log/log.controller');
// super secret for creating tokens
var superSecret = config.secret;

_this = this



exports.count = async function(query, page, limit){
	trace.log("Count Users user API service")
   
    try {
        var nbusers = await User.count({admin: true})
        if (nbusers==0){//there is no administrator
			var newUser = new User({//create default administrator
				username: "admin", 
				firstName: "to be replaced",
				lastName: "after admin creation",		
				hash: bcrypt.hashSync("admin", 10),
				lang: "en",
				admin: true
			})
			try{
				var savedUser = await newUser.save()
			}catch(e){
				throw console.log(e.message)
			}
			console.log("Create default administrator (admin/admin)")
		} else {
			console.log(nbusers + " administrators ")
		}
    } catch (e) {
        throw Error('Error while counting Users = ' + e.message)
    }
}

exports.getUsers = async function(query, page, limit, offset){
	trace.log("getUsers user API service")
    var options = {
        limit:limit,
		offset: offset,
		sort: {username: 'asc'}
    }
    try {
        var users = await User.paginate(query, options)
        return users;
    } catch (e) {
        throw Error('Error while Paginating Users = ' + e.message)
    }
}

exports.createUser = async function(user){
	trace.log("create user API service")
    var newUser = new User({
		username: user.username, 
        firstName: user.firstName,
        lastName: user.lastName,		
		hash: bcrypt.hashSync(user.hash, 10),
		lang: user.lang,
		admin: user.admin
    })

    try{
        var savedUser = await newUser.save()
        return savedUser;
    }catch(e){
		console.log(e.code)
       if(e.code=="11000"){
			throw Error(e.code)
		} else{
			throw Error(e.message)
		}
    }
}

exports.updateUser = async function(user){
	trace.log("updateUser user API service")
    var id = user.id

    try{
        var oldUser = await User.findById(id);
    }catch(e){
        throw Error("Service error = "+ e.message)
    }

    if(!oldUser){
        return false;
    }
	
    oldUser.firstName = user.firstName
    oldUser.lastName = user.lastName
	if (user.hash){
		oldUser.hash = bcrypt.hashSync(user.hash, 10)
	}
	oldUser.lang = user.lang
	oldUser.admin = user.admin

    try{
        var savedUser = await oldUser.save()
        return savedUser;
    }catch(e){
        throw Error(e.message);
    }
}

exports.deleteUser = async function(id){
    trace.log("deleteUser user API service")
    try{
        var deleted = await User.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("User Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error(e.message)
    }
}

exports.findUserByUsername = async function(username){
	trace.log("findUserByUsername user API service")

    try{
        var user = await User.findOne({username: username});
    }catch(e){
        throw Error("Service error = "+ e.message)
    }

    if ((!user) || (!user.admin)){
        return false;
    } else {
		return true;
	}

}

