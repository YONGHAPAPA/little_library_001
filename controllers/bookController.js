var Book = require('../models/book');
var async = require('async');

exports.index = function(req, res){
    //res.send("Book Index...");

    async.parallel({
        book_cnt : function(cb){
            Book.countDocuments({},cb);
        }
    }, function(err, results){
        res.render('index', {title:'', error:err, data:results})
    });
}