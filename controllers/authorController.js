var Author = require('../models/author');
var Book = require('../models/book');
var async = require('async');

exports.author_all_list = function(req, res, next){
    async.parallel({
        authors : function(cb){
            Author.find().exec(cb);
        } 
        
    }, function(err, results){
        if(err) return next(err);
        res.render('author_list', {title:'Author List', data:results});       
    });
}


exports.author_detail = function(req, res, next){
    async.parallel({
        author : function(cb){
            Author.findById(req.params.id).exec(cb);
        }, 
        books : function(cb){
            Book.find({'author':req.params.id}).exec(cb);
        }
    }, function(err, results){
        if(err) return next(err);

        if(results.author == null){
            var err = new Error('Author not found.');
            err.status = 404;
            return next(err);
        }

        res.render('author_detail_info', {title:'Author Info', data:results});
    });
}