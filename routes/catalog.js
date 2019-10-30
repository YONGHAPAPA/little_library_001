var express = require('express');
var router = express.Router();

//Event Handler Define (S)
var book_controller = require('../controllers/bookController');
var genre_controller = require('../controllers/genreController');
var author_controller = require('../controllers/authorController');
var bookInstance_controller = require('../controllers/bookInstanceController');

//Event Handler Define (E)

//Book Route
router.get('/', book_controller.index);
router.get('/book_all_list', book_controller.book_all_list);
router.get('/book/create', book_controller.book_create_get);
router.post('/book/create', book_controller.book_create_post);
router.get('/book/:id', book_controller.book_detail_info);

//Genre Route
router.get('/genre_all_list', genre_controller.genre_all_list);
router.get('/genre/create', genre_controller.genre_create_get);
router.post('/genre/create', genre_controller.genre_create_post);
router.get('/genre/:id', genre_controller.genre_detail);


//Author Route
router.get('/author_all_list', author_controller.author_all_list);
router.get('/author/create', author_controller.author_create_get);
router.post('/author/create', author_controller.author_create_post)
router.get('/author/:id', author_controller.author_detail);



//Book Instance
router.get('/bookInstance_all_list', bookInstance_controller.bookInstance_all_list);
router.get('/bookinstance/create', bookInstance_controller.bookInstance_create_get);
router.post('/bookinstance/create', bookInstance_controller.bookInstance_create_post);
router.get('/bookInstance/:id', bookInstance_controller.bookInstance_detail_info);





module.exports = router;