var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var moment = require("moment");

var schema = new Schema({
    first_name : {type:String, required:true, max:100}, 
    family_name : {type:String, required:true, max:100}, 
    date_of_birth : {type:Date}, 
    date_of_death : {type:Date}
});


schema.virtual('name').get(function(){
    return this.first_name + " " + this.family_name;
});


schema.virtual('birtahDate').get(function(){
    return this.date_of_birth ? moment(this.date_of_birth).format('MMMM Do, YYYY') : '';
});

schema.virtual('deathDate').get(function(){
    return this.date_of_death ? moment(this.date_of_death).format('MMMM Do, YYYY') : '';
});

schema.virtual('lifespan').get(function(){
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

schema.virtual('url').get(function(){
    return "/catalog/author/" + this._id;
});

module.exports = mongoose.model('Author', schema);