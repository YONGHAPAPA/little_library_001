var BookInstance = require('../models/bookinstance');
var Book = require('../models/book');
var async = require('async');
var {body, validationResult} = require('express-validator');
var {sanitizeBody} = require('express-validator');


exports.bookInstance_all_list = function(req, res, next){
    //res.send('bookInstance_all_list');
    BookInstance.find().populate('book').exec(function(err, results){
        if(err) return next(err);
        res.render('bookinstance_list', {title:'Book Instance List', data:results});
    });
}


exports.bookInstance_detail_info = function(req, res, next){

    BookInstance.findById(req.params.id).populate('book').exec(function(err, result){
        if(err) return next(err);

        if(result == null){
            var err = new Error('Book copy not found.');
            err.status = 404;
            return next(err);
        }

        res.render('bookinstance_detail_info', {title:'Book Instance Detail Info', data:result});
    });
}

exports.bookInstance_create_get = function(req, res, next){
    Book.find().exec(function(err, result){
        res.render('bookinstance_create', {title:'Create Book Instance', errors:err, books:result});
    });
}

exports.bookInstance_create_post = function(req, res, next){
    sanitizeBody('book').escape();
    sanitizeBody('imprint').escape();
    sanitizeBody('due_back').escape();
    sanitizeBody('status').escape();

    var bookinstance = new BookInstance({
        book:req.body.book, 
        imprint:req.body.imprint, 
        due_back:req.body.due_back, 
        status : req.body.status
    });

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        Book.find().exec(function(err, result){
            res.render('bookinstance_create', {title:'Create Book Instance', books:result, errors:errors.array()})
        });
    } else {
        bookinstance.save(function(err){
            if(err) return next(err);
            res.redirect(bookinstance.url);
        });
    }
}

