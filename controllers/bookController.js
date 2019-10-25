var Book = require('../models/book');
var BookInstance = require('../models/bookinstance');
var Author = require('../models/author');
var Genre = require('../models/genre');

var async = require('async');

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

        res.render('book_detail_info', {title:'Detail Info', book:results.book, book_instance:results.book_instance});
    });
}