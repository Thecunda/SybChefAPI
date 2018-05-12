var MenuGroup = require('./menuGroups');
var Menu = require('../menus/menus'); //required to delete menu inside the menu group
var MenuGroupAppro = require('../menuGroupAppros/menuGroupAppros');
var trace 	   = require('../../syb.core/log/log.controller');
var moment 	   = require('moment');

_this = this

exports.getMenuGroups = async function(query, page, limit, offset){
	trace.log("getMenuGroups API service")
	if(page!=0){
		var options = {
			limit:limit,
			offset: offset,
			sort : {date: 'desc'}
		}
		try {
			var menuGroups = await MenuGroup.paginate(query, options)
			return menuGroups;
		} catch (e) {
			throw Error('Error while Paginating MenuGroups = ' + e.message)
		}
	} else {
		try {
			var menuGroups = await MenuGroup.find({})
			return menuGroups;
		} catch (e) {
			throw Error('Error while getting all menuGroups = ' + e.message)
		}
	}	
}

exports.createMenuGroup = async function(menuGroup){
	trace.log("create menuGroup API service")
    var newMenuGroup = new MenuGroup({
		designation : menuGroup.designation,
		ended : menuGroup.ended
    })

    try{
        var savedMenuGroup = await newMenuGroup.save()
        return savedMenuGroup;
    }catch(e){
		if(e.code="E11000"){
			throw Error(e.code)
		} else{
			throw Error(e.message)
		}
    }
}

exports.updateMenuGroup = async function(menuGroup){
	trace.log("updateMenuGroup API service")
    var id = menuGroup.id

    try{
        var oldMenuGroup = await MenuGroup.findById(id);
    }catch(e){
        throw Error("Service error = "+ e.message)
    }

    if(!oldMenuGroup){
        return false;
    }
	
	oldMenuGroup.ended = menuGroup.ended;

	

    try{
        var savedMenuGroup = await oldMenuGroup.save()
        return savedMenuGroup;
    }catch(e){
        throw Error(e.message);
    }
}

exports.deleteMenuGroup = async function(id){
    trace.log("deleteMenuGroup API service")
	
	//search MenuGroup
	try{
        var oldMenuGroup = await MenuGroup.findById(id);
    }catch(e){
        throw Error("Find MenuGroup Service error = "+ e.message)
    }
	
	// MenuGroup not found (should be impossible)
    if(!oldMenuGroup){
        throw Error("Inexisting MenuGroup")
    }
	// UnitType not removable 
	if (oldMenuGroup.ended==false){
		throw Error("This MenuGgroup is set as NOT ended")
	}
	
	var designation = oldMenuGroup.designation
    
	
	//remove list of menus
	try{
        var deleted = await Menu.remove({menuGroup: designation});
    }catch(e){
        throw Error("Service error = "+ e.message)
    }
	
	//remove shopping list
	try{
        var deleted = await MenuGroupAppro.remove({menuGroup: designation});
    }catch(e){
        throw Error("Service error = "+ e.message)
    }
	
	//remove menugroup
	try{
        var deleted = await MenuGroup.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("MenuGroup Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error(e.message)
    }
}



