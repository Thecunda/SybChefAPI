var Menu = require('./menus');
var trace 	   = require('../../syb.core/log/log.controller');
var moment 	   = require('moment');

_this = this

exports.getMenus = async function(query, page, limit, offset){
	trace.log("getMenus API service")
		if(page!=0){
			var options = {
				limit:limit,
				offset: offset,
				sort : {date: 'desc'}
			}
			try {
				var menus = await Menu.paginate(query, options)
				return menus;
			} catch (e) {
				throw Error('Error while Paginating Menus = ' + e.message)
			}
		} else {
			try {
				var menus = await Menu.find({})
				return menus;
			} catch (e) {
				throw Error('Error while getting all menus = ' + e.message)
			}
		}
		
}

exports.getOneMenus = async function(idMenuGroup){
	trace.log("getOneMenus API service")
		
	try {
		var menus = await Menu.find({menuGroup:idMenuGroup})
		return menus;
	} catch (e) {
		throw Error('Error while getting all menus = ' + e.message)
	}
}

exports.createMenu = async function(menu){
	trace.log("create API service")
    var newMenu = new Menu({
		menuGroup : menu.menuGroup,
		date : menu.date,
		recipe : menu.recipe,
		nb : menu.nb,
    })

    try{
        var savedMenu = await newMenu.save()
        return savedMenu;
    }catch(e){
		if(e.code="E11000"){
			throw Error(e.code)
		} else{
			throw Error(e.message)
		}
    }
}

exports.updateMenu = async function(menu){
	trace.log("updateMenu API service")
    var id = menu.id

    try{
        var oldMenu = await Menu.findById(id);
    }catch(e){
        throw Error("Service error = "+ e.message)
    }

    if(!oldMenu){
        return false;
    }
	
	oldMenu.date = menu.date;
	oldMenu.recipe = menu.recipe;
	oldMenu.nb = menu.nb;
	

    try{
        var savedMenu = await oldMenu.save()
        return savedMenu;
    }catch(e){
        throw Error(e.message);
    }
}

exports.deleteMenu = async function(id){
    trace.log("deleteMenu API service")
    try{
        var deleted = await Menu.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Menu Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error(e.message)
    }
}



