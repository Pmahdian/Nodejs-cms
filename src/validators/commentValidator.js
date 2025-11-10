const Joi = require('joi');

const createCommentSChema = Joi.object({
    content : Joi.string()
    .min(1)
    .max(1000)
    .required()
    .messages({
        'string.min' : 'Comment text cannot be empty',
        
    })
})