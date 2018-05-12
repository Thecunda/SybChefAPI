var express = require('express')

var router = express.Router()

var AuthenticateController = require('./authenticate.controller');

router.post('/', AuthenticateController.authenticate)
module.exports = router;