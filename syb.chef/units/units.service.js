var Unit = require('./units');
var trace 	   = require('../../syb.core/log/log.controller');
var moment 	   = require('moment');

_this = this

exports.getUnits = async function(query, page, limit, offset){
	trace.log("getUnits API service")
		if(page!=0){
			var options = {
				limit:limit,
				offset: offset,
				sort : {date: 'desc'}
			}
			try {
				var units = await Unit.paginate(query, options)
				return units;
			} catch (e) {
				throw Error('Error while Paginating Units = ' + e.message)
			}
		} else {
			try {
				var units = await Unit.find({})
				return units;
			} catch (e) {
				throw Error('Error while getting all units = ' + e.message)
			}
		}
		
}

exports.getOneUnits = async function(idUnitType){//get all units of a type
	trace.log("getUnits API service")

	try {
		var units = await Unit.find({unitType:idUnitType})
		return units;
	} catch (e) {
		throw Error('Error while getting all units = ' + e.message)
	}	
}

exports.getOneUnit = async function(idUnit){//get only one unit
	trace.log("get oneUnit API service")

	try {
		var unit = await Unit.findOne({designation:idUnit})
		return unit;
	} catch (e) {
		throw Error('Error while getting one units = ' + e.message)
	}	
}

exports.createUnit = async function(unit){
	trace.log("create unit API service")
    var newUnit = new Unit({
		unitType : unit.unitType,
		designation : unit.designation,
		conversion : unit.conversion
    })

    try{
        var savedUnit = await newUnit.save()
        return savedUnit;
    }catch(e){
		if(e.code="E11000"){
			throw Error(e.code)
		} else{
			throw Error(e.message)
		}
    }
}

exports.updateUnit = async function(unit){
	trace.log("updateUnit API service")
    var id = unit.id

    try{
        var oldUnit = await Unit.findById(id);
    }catch(e){
        throw Error("Service error = "+ e.message)
    }

    if(!oldUnit){
        return false;
    }
	
	oldUnit.unitType = unit.unitType;
	oldUnit.designation = unit.designation;
	oldUnit.conversion = unit.conversion;
	

    try{
        var savedUnit = await oldUnit.save()
        return savedUnit;
    }catch(e){
        throw Error(e.message);
    }
}

exports.deleteUnit = async function(id){
    trace.log("deleteUnit API service")
    try{
        var deleted = await Unit.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Unit Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error(e.message)
    }
}



