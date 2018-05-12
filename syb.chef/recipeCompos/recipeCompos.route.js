var express = require('express')

var router = express.Router()

var RecipeCompoController = require('./recipeCompos.controller');

router.get('/', RecipeCompoController.getRecipeCompos)
router.get('/oneRecipeCompo/', RecipeCompoController.getOneRecipeCompos)
router.post('/', RecipeCompoController.createRecipeCompo)
router.put('/', RecipeCompoController.updateRecipeCompo)
router.delete('/:id',RecipeCompoController.removeRecipeCompo)

module.exports = router;