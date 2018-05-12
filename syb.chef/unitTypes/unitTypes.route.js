var express = require('express')

var router = express.Router()

var UnitTypeController = require('./unitTypes.controller');

router.get('/', UnitTypeController.getUnitTypes)
router.post('/', UnitTypeController.createUnitType)
router.put('/', UnitTypeController.updateUnitType)
router.delete('/:id/:designation',UnitTypeController.removeUnitType)

module.exports = router;