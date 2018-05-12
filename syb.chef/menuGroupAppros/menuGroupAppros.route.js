var express = require('express')

var router = express.Router()

var MenuGroupApproController = require('./menuGroupAppros.controller');

router.get('/makeShoppingList/', MenuGroupApproController.makeShoppingList)

module.exports = router;