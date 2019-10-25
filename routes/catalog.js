var express = require('express');
var router = express.Router();

//Event Handler Define (S)
var book_controller = require('../controllers/bookController');
//Event Handler Define (E)

router.get('/', book_controller.index);
router.get('/book_all_list', book_controller.book_all_list);
router.get('/book/:id', book_controller.book_detail_info)

module.exports = router;