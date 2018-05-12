var express = require('express')

var router = express.Router()

var UnitController = require('./units.controller');

router.get('/', UnitController.getUnits)
router.get('/oneUnitType/', UnitController.getOneUnits)
router.post('/', UnitController.createUnit)
router.put('/', UnitController.updateUnit)
router.delete('/:id',UnitController.removeUnit)

module.exports = router;