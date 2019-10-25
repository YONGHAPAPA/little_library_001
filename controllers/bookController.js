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