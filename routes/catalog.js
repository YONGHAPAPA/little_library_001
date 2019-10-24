var express = require('express');
var router = express.Router();

//Event Handler Define (S)
var book_controller = require('../controller/bookController');
//Event Handler Define (E)

router.get('/', book_controller.index);

module.exports = router;  