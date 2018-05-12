var express = require('express')

var router = express.Router()

var RecipePrepaController = require('./recipePrepas.controller');

router.get('/', RecipePrepaController.getRecipePrepas)
router.get('/oneRecipePrepa/', RecipePrepaController.getOneRecipePrepas)
router.post('/', RecipePrepaController.createRecipePrepa)
router.put('/', RecipePrepaController.updateRecipePrepa)
router.delete('/:id',RecipePrepaController.removeRecipePrepa)

module.exports = router;