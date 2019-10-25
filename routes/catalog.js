var express = require('express');
var router = express.Router();

//Event Handler Define (S)
var book_controller = require('../controllers/bookController');
var genre_controller = require('../controllers/genreController');
var author_controller = require('../controllers/authorController');

//Event Handler Define (E)

//Book Route
router.get('/', book_controller.index);
router.get('/book_all_list', book_controller.book_all_list);
router.get('/book/:id', book_controller.book_detail_info);

//Genre Route
router.get('/genre/:id', genre_controller.genre_detail);

//Author Route
router.get('/author_all_list', author_controller.author_all_list);
router.get('/author/:id', author_controller.author_detail)

module.exports = router;