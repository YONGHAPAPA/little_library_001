var Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');


exports.genre_all_list = function(req, res, next){
    Genre.find({}, 'name').exec(function(err, results){
        if(err) return next(err);
        res.render('genre_list', {title:'Genre All List', data:results});
    });
}

exports.genre_detail = function(req, res, next){
    
    async.parallel({
        genre : function(cb){
            Genre.findById(req.params.id).exec(cb);
        }, 
        books : function(cb){
            Book.find({'genre':req.params.id}).exec(cb);
        }
    }, function(err, results){
        if(err) return next(err);

        if(results.genre == null){
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }

        res.render('genre_detail', {title:'Genre Detail Info', data:results})
    });
}




