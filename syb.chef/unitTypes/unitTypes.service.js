var UnitType = require('./unitTypes');
var trace 	   = require('../../syb.core/log/log.controller');
var moment 	   = require('moment');

_this = this

exports.getUnitTypes = async function(query, page, limit, offset){
	trace.log("getUnitTypes API service")
	if(page!=0){
		var options = {
			limit:limit,
			offset: offset,
			sort : {date: 'desc'}
		}
		try {
			var unitTypes = await UnitType.paginate(query, options)
			return unitTypes;
		} catch (e) {
			throw Error('Error while Paginating UnitTypes = ' + e.message)
		}
	} else {
		try {
			var unitTypes = await UnitType.find({})
			return unitTypes;
		} catch (e) {
			throw Error('Error while getting all unitTypes = ' + e.message)
		}
	}	
}

exports.getOneUnitType = async function(idUnitType){//get only one unitType
	trace.log("getUnitType  API service")
	try {
		var unitType = await UnitType.findOne({designation:idUnitType})
		return unitType;
	} catch (e) {
		throw Error('Error while getting one unitType = ' + e.message)
	}	
}

exports.createUnitType = async function(unitType){
	trace.log("create unitType API service")

    var newUnitType = new UnitType({
		designation : unitType.designation,
		reference : unitType.reference,
		donotremove : unitType.donotremove
    })

    try{
        var savedUnitType = await newUnitType.save()
        return savedUnitType;
    }catch(e){
		if(e.code="E11000"){
			throw Error(e.code)
		} else{
			throw Error(e.message)
		}
    }
}

exports.updateUnitType = async function(unitType){
	trace.log("updateUnitType API service")

    var id = unitType.id
	
	//search UnitType
    try{
        var oldUnitType = await UnitType.findById(id);
    }catch(e){
        throw Error("Service error = "+ e.message)
    }
	// UnitType notfound (should be impossible)
    if(!oldUnitType){
        return false;
    }

	oldUnitType.reference = unitType.reference;
	oldUnitType.donotremove = unitType.donotremove;

    try{
        var savedUnitType = await oldUnitType.save()
        return savedUnitType;
    }catch(e){
        throw Error(e.message);
    }
}

exports.deleteUnitType = async function(id){
    trace.log("deleteUnitType API service : "+id)

	//search UnitType
	try{
        var oldUnitType = await UnitType.findById(id);
    }catch(e){
        throw Error("Find UnitType Service error = "+ e.message)
    }
	// UnitType not found (should be impossible)
    if(!oldUnitType){
        throw Error("Inexisting UnitType")
    }
	// UnitType not removable 
	if (oldUnitType.donotremove==true){
		throw Error("This unitType is set as NOT removable")
	}

	//remove unit type
    try{
        var deleted = await UnitType.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("UnitType Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Remove UnitType Service error = "+ e.message)
    }
	
}



