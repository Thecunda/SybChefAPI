var express = require('express')

var router = express.Router()
var users = require('../syb.core/users/users.route')
var authenticate = require('../syb.core/authenticate/authenticate.route')

router.use('/users', users);
router.use('/authenticate', authenticate);

//routes to the model   // can be commented after first use
/*
var modeleTypeMats = require('../syb.modele/typeMats/typeMats.route')
var modeleMaterials = require('../syb.modele/materials/materials.route')

router.use('/modeletypeMats', modeleTypeMats);
router.use('/modeleMaterials', modeleMaterials);
*/
//**********************//

//add here your own routes//
var unitTypes = require('../syb.chef/unitTypes/unitTypes.route')
var units = require('../syb.chef/units/units.route')
var ingredients = require('../syb.chef/ingredients/ingredients.route')

var recipes = require('../syb.chef/recipes/recipes.route') //recette (Designation, type (entrée dessert), nbpersonnes)
var recipePrepas = require('../syb.chef/recipePrepas/recipePrepas.route') // étapes de préparation
var recipeCompos = require('../syb.chef/recipeCompos/recipeCompos.route') //compositions 

var menuGroups = require('../syb.chef/menuGroups/menuGroups.route') // groupe de menus = planning des menus pour une période qui servira a faire les courses
var menus = require('../syb.chef/menus/menus.route') // menu pour une date, un moment (midi/soir), une recette, un nombre de convives//
var menuGroupAppros = require('../syb.chef/menuGroupAppros/menuGroupAppros.route') // Liste des courses pour un groupe de menus

router.use('/unitTypes', unitTypes);
router.use('/units', units);
router.use('/ingredients', ingredients);
router.use('/recipes', recipes);
router.use('/recipeCompos', recipeCompos);
router.use('/recipePrepas', recipePrepas);
router.use('/menuGroups', menuGroups);
router.use('/menus', menus);
router.use('/menuGroupAppros', menuGroupAppros);

//************************//

module.exports = router;