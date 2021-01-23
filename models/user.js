const mongo=require('mongoose');
const uniqueVlidator=require('mongoose-unique-validator');

const schema=mongo.Schema({
    email:{type: String, required:true, unique:true},
    password: {type:String, required:true}
});

schema.plugin(uniqueVlidator);
module.exports=mongo.model('User', schema);