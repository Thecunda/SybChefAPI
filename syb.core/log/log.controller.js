var config     = require('../../config');

exports.log = function(infoText){
	if (config.ENV!='prod'){
		console.log(infoText)
	}
}

