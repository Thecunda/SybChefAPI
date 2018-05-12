var User       = require('../users/user');
var jwt        = require('jsonwebtoken');
var bcrypt 	   = require('bcryptjs');
var config     = require('../../config');
var trace 	   = require('../log/log.controller');
// super secret for creating and controlling tokens
var superSecret = config.secret;

_this = this

exports.authenticate = async function(user){
    var username = user.username
	var password = user.password
    try {
        var user = await User.findOne({username: username}).select('lastName firstName username admin lang hash')
    } catch (e) {
        throw Error('Error while finding User')
    }
	
	if (!user) {
		trace.log('erreur no user found')
		return({ 
			success: false, 
			message: "User unknown (1)" // NO USER FOUND TO BE HANDLED BY CONTROLLER
		});
	}
	
	var validPassword = bcrypt.compareSync(password, user.hash);
	if (!validPassword) {
		trace.log('erreur password incorrect')
		return({ 
			success: false, 
			message: "User unknown (2)" // PASSWORD INCORRECT TO BE HANDLED BY CONTROLLER
		});
	} 
	
	 var connectedUser = ({
		username: user.username, 
        firstName: user.firstName,
        lastName: user.lastName,
        lang: user.lang,		
		admin: user.admin
    })
	
	// if user found and right password
	// token creation
	var token = jwt.sign({
		admin: user.admin,
		username: user.username
	}, superSecret, {
	  expiresIn: 3600 // expires in 1 hour (60 = 1 minute)
	});

	// return the information including token as JSON
	return({ 
		success: true,
		token: token,
		connectedUser,
		message: "Successfull login"
	});
	        
	
		
}

