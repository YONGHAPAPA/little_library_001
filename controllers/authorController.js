var Author = require('../models/author');
var Book = require('../models/book');
var async = require('async');
const {body, validationResult} = require('express-validator');
const {sanitizeBody} = require('express-validator');

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

exports.author_create_get = function(req, res, next){
    res.render('create_author_form', {title:'Create Author'})
}

exports.author_create_post = function(req, res, next){
    sanitizeBody('first_name').escape(); 
    sanitizeBody('family_name').escape(); 
    sanitizeBody('date_of_birth').escape();
    sanitizeBody('date_of_death').escape();

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.render('create_author_form', {title:'Create Author', errors:errors.array()});
    } else {
        var author = new Author({
            first_name : req.body.first_name, 
            family_name : req.body.family_name, 
            date_of_birth : req.body.date_of_birth, 
            date_of_death : req.body.date_of_death
        });

        author.save(function(err){
            if(err) return next(err);
            res.redirect(author.url);
        });
    }
}