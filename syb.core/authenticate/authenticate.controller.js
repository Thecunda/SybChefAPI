var AuthenticateService = require('./authenticate.service')
var trace 	   = require('../log/log.controller');

_this = this

exports.authenticate = async function(req, res, next){
	
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}
	
    var username = req.body.username;
    trace.log('authenticate.controller')
	if(!req.body.username){
        return res.status(400).json({status: 400., message: "username must be present"})
    }
	
	if(!req.body.password){
        return res.status(400).json({status: 400., message: "password must be present"})
    }

    var user = {
		username: req.body.username ? req.body.username : null,
		password: req.body.password ? req.body.password : null
    }

	try{
        var logSuccess = await AuthenticateService.authenticate(user)
		if (logSuccess.success == true){
			return res.status(200).json({status: 200, data: logSuccess, message: "Succesfully Logged"});
		} else {
			return res.status(401).json({status: 401, data: logSuccess, message: logSuccess.message});
		}
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
	
}

