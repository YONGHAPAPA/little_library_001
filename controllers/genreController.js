var Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');
var {body, validationResult} = require('express-validator/check');
var {sanitizeBody} = require('express-validator/filter');


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

exports.genre_create_get = function(req, res, next){
    res.render('genre_create', {title:'Create Genre'})
}

exports.genre_create_post = function(req, res, next){
    sanitizeBody('genre_name').escape();

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.render('genre_create', {title:'Create Genre', errors : errors.array()})
    } else {
        var genre = new Genre({
            name : req.body.genre_name
        });

        genre.save(function(err){
            if(err) return next(err);
            res.redirect(genre.url);
        });
    }
}




