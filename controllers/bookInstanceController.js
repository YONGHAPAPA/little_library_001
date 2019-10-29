var BookInstance = require('../models/bookinstance');
var async = require('async');


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

