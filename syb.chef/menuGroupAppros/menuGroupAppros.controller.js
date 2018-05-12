var MenuGroupApproService = require('./menuGroupAppros.service');
var MenuService = require('../menus/menus.service');
var RecipeService = require('../recipes/recipes.service');
var RecipeCompoService = require('../recipeCompos/recipeCompos.service');
var UnitService = require('../units/units.service');
var UnitTypeService = require('../unitTypes/unitTypes.service');
var trace 	   = require('../../syb.core/log/log.controller');
var UserService = require('../../syb.core/users/users.service');

_this = this

exports.makeShoppingList = async function(req, res, next){
	trace.log("makeShoppingList  API Controller")
	
	if(mongoError.status){//if mongo fails, return immediatly an error
		return res.status(500).json({status: 500., message: "Database is down"})
	}
	
	var idMenuGroup=req.query.idMenuGroup
	//get MenuGroupApproList if exist
	try{
		var menuGroupAppros = await MenuGroupApproService.getOneMenuGroupAppros(idMenuGroup)
	}catch(e){
		return res.status(400).json({status: 400, message: "error during find MenuGroupAppros List"});
	}
	//delete MenuGroupApproList
	if (menuGroupAppros.length>0){
		try{
			var deleted = await MenuGroupApproService.deleteMenuGroupAppro(idMenuGroup)
		}catch(e){
			return res.status(400).json({status: 400, message: "error during delete of MenuGroupAppros List"})
		}
	} 
	
	//get menuList
	try{
		var menus = await MenuService.getOneMenus(idMenuGroup)
	}catch(e){
		return res.status(400).json({status: 400, message: "makeShoppingList error during delete get Menus List"});
	}
	
	//createMenuGroupApproList
	for(var i= 0; i < menus.length; i++){
		
		var recipe=menus[i].recipe
		var nbp=menus[i].nb
		//get nb person for a recipe
		try{
			var existingRecipe = await RecipeService.getOneRecipe(recipe)
			var nb=existingRecipe[0].capacity
		} catch(e){
			return res.status(400).json({status: 400, message: "makeShoppingList error during delete ingredient of a Menu"});
		}
		//get ingredient list for a recipe
		try{
			var recipeCompos = await RecipeCompoService.getOneRecipeCompos(recipe)
		} catch(e){
			return res.status(400).json({status: 400, message: "makeShoppingList error during delete ingredient of a Menu"});
		}
		for(var j= 0; j < recipeCompos.length; j++){
			
			//search unit to get reference conversion
			var unit=recipeCompos[j].unit
			try{
				var existingUnit = await UnitService.getOneUnit(unit)
			} catch(e){
				return res.status(400).json({status: 400, message:"makeShoppingList error during get unit"});
			}
			if (existingUnit){
				var conversion=existingUnit.conversion//if conversion=0 => no use of aggregation on a reference
				if (conversion!='0'){
					var unitType=existingUnit.unitType
					//search unit type to get reference
					try{
						var existingUnitType = await UnitTypeService.getOneUnitType(unitType)
					} catch(e){
						console.log(e.message)
						return res.status(400).json({status: 400, message:"makeShoppingList error during get unit type"});
					}
					var unit=existingUnitType.reference
				} else {
					conversion = 1 
				}
			} else {
				conversion = 1 
			}
			
			//prepare menuGroupAppro
			var menuGroupAppro = {
				menuGroup : idMenuGroup,
				ingredient : recipeCompos[j].ingredient,
				qty : (+recipeCompos[j].qty)*(+nbp/+nb)*conversion,
				unit : unit
			}
			
			//load old value of menuGroupAppro
			try{
				var existingMenuGroupAppro = await MenuGroupApproService.getOneMenuGroupAppro(menuGroupAppro)
			} catch(e){
				return res.status(400).json({status: 400, message:"makeShoppingList error during get existingMenuGroupAppro"});
			}
			
			if (existingMenuGroupAppro.length>0){//if exists, add qty
				var tot=((+recipeCompos[j].qty)*(+nbp/+nb)*conversion)+existingMenuGroupAppro[0].qty
				var menuGroupAppro = {

					menuGroup : idMenuGroup,
					ingredient : recipeCompos[j].ingredient,
					qty : tot,
					unit : unit
				}
			}
			
			//create MenuGroupAppro
			try{
				var createdMenuGroupAppro = await MenuGroupApproService.createMenuGroupAppro(menuGroupAppro)
			} catch(e){
				return res.status(400).json({status: 400, message: "makeShoppingList error during create MenuGroupAppro"})
			}
		}
	} 

	//loadMenuGroupApproList
	try{
		trace.log("makeShoppingList loadMenuGroupApproList")
		var menuGroupAppros = await MenuGroupApproService.getOneMenuGroupAppros(idMenuGroup)
		return res.status(200).json({status: 200, data: menuGroupAppros, message: "OK"});
	}catch(e){
		return res.status(400).json({status: 400, message: "makeShoppingList error during create get final menuGroupAppro"});
	}
}


	
	
	
