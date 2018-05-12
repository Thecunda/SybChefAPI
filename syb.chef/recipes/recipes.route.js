var express = require('express')

var router = express.Router()

var RecipeController = require('./recipes.controller');

router.get('/', RecipeController.getRecipes)
router.post('/', RecipeController.createRecipe)
router.put('/', RecipeController.updateRecipe)
router.delete('/:id',RecipeController.removeRecipe)

module.exports = router;