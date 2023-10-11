const Joi = require('joi')
const mongoose = require('mongoose')

const PostSchema = mongoose.Schema(
    {
        title: {type: String, reqire:true},
        content: {type: String, reqire:true},
        datePosted: {type: String},
        departmentCode: {type: String, reqire:true},
    }
)

const Post = mongoose.model('post', PostSchema)

function validatePost(post){
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        content: Joi.string().min(3).max(1000).required(),
        datePosted: Joi.string().min(3).max(10),
        departmentCode: Joi.string().min(3).max(50).required(),
    });
    return schema.validate(post) 
}


module.exports = {Post, validatePost}