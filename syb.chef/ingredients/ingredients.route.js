var express = require('express')

var router = express.Router()

var IngredientController = require('./ingredients.controller');

router.get('/', IngredientController.getIngredients)
router.post('/', IngredientController.createIngredient)
router.put('/', IngredientController.updateIngredient)
router.delete('/:id',IngredientController.removeIngredient)

module.exports = router;