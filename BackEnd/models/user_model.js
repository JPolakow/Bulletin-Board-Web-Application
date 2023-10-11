const Joi = require('joi')
const mongoose = require('mongoose')

const userschema = mongoose.Schema(
    {
        fname: {type: String, reqire:true},
        sname: {type: String, reqire:true},
        username: {type: String, reqire:true},
        email: {type: String, reqire:true},
        password: {type: String, reqire:true}
    }
);

const User = mongoose.model('User', userschema)

function validateUser(user){
    const schema = Joi.object({
        fname: Joi.string().min(1).max(50).required(),
        sname: Joi.string().min(1).max(50).required(),
        username: Joi.string().min(4).max(50).required(),
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(6).max(45).required()
    });
    return schema.validate(user);
}

module.exports = {User, validateUser}