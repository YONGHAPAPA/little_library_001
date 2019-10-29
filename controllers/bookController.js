var Book = require('../models/book');
var BookInstance = require('../models/bookinstance');
var Author = require('../models/author');
var Genre = require('../models/genre');
var async = require('async');
const {body, validationResult} = require('express-validator/check')
const {sanitizeBody} = require('express-validator/filter');

exports.index = function(req, res){
    
    //샘플로 텍스트 찍어보기 
    //res.send("Book Index..."); 

    //각 Collection 별로 Count 
    async.parallel({
        book_cnt : function(cb){
            Book.countDocuments({},cb);
        }, 
        book_instance_cnt : function(cb){
            BookInstance.countDocuments({}, cb);
        }, 
        book_instance_available_cnt : function(cb){
            BookInstance.countDocuments({status:'Available'}, cb);
        }, 
        author_cnt : function(cb){
            Author.countDocuments({}, cb);
        }, 
        genre_cnt : function(cb){
            Genre.countDocuments({}, cb);
        }

    }, function(err, results){
        res.render('index', {title:'little library', error:err, data:results})
    });
}

exports.book_all_list = function(req, res, next){
    //res.send("Book List");
    Book.find({}, 'title author').populate('author').exec(function(err, results){
        if(err) return next(err);
        res.render('book_list', {title:'All Book List', data:results});
    });
}


exports.book_detail_info = function(req, res, next){
    async.parallel({
        book : function(cb){
            Book.findById(req.params.id)
            .populate('author')
            .populate('genre')
            .exec(cb);
        }, 
        book_instance : function(cb){
            BookInstance.find({'book':req.params.id}).exec(cb);
        }
    }, function(err, results){
        if(err) return next(err);

        if(results.book == null){
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }

        res.render('book_detail_info', {title:'Detail Info', data:results});
    });
}


exports.book_create_get = function(req, res, next){

    async.parallel({
        authors : function(cb){
            Author.find().exec(cb);
        }, 
        genres : function(cb){
            Genre.find().exec(cb);
        }
    }, function(err, result){
        if(err) return next(err);
        res.render('book_create', {title:'Create Book', result:result})
    });
}

exports.book_create_post = function(req, res, next){

   /*
   Genre 내용확인
   for(var i=0; i<req.body.genre.length;i++){
        console.log(req.body.genre[i]);
    }
   */

   if(typeof req.body.genre === 'undefined'){
        req.body.genre = [];
   }

   sanitizeBody('*').escape();
   const errors = validationResult(req);

   var book = new Book({
       title : req.body.title, 
       summary : req.body.summary, 
       isbn : req.body.isbn, 
       author : req.body.author, 
       genre : req.body.genre
   });

   if(!errors.isEmpty()){
       res.render('book_create', {title:'Create Book', errors:errors.array()})
   } else {
       book.save(function(err){
           if(err) return next(err);
           res.redirect(book.url);
       });
   }
}