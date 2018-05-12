var express = require('express')

var router = express.Router()

var MenuGroupController = require('./menuGroups.controller');

router.get('/', MenuGroupController.getMenuGroups)
router.post('/', MenuGroupController.createMenuGroup)
router.put('/', MenuGroupController.updateMenuGroup)
router.delete('/:id',MenuGroupController.removeMenuGroup)

module.exports = router;