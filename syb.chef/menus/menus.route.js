var express = require('express')

var router = express.Router()

var MenuController = require('./menus.controller');

router.get('/', MenuController.getMenus)
router.get('/getOneMenus/', MenuController.getOneMenus)
router.post('/', MenuController.createMenu)
router.put('/', MenuController.updateMenu)
router.delete('/:id',MenuController.removeMenu)

module.exports = router;