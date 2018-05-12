var express = require('express')

var router = express.Router()

var UserController = require('./users.controller');

router.get('/', UserController.getUsers)
router.post('/', UserController.createUser)
router.put('/', UserController.updateUser)
router.delete('/:id',UserController.removeUser)

module.exports = router;