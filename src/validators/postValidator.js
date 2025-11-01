const Joi = require('joi');

const createPostSchema = Joi.object({
    title : Joi.string()
    .min(3)
    .max(255)
    .required()
    .message({ 
        'string.min' : 'Title must be at least 3 characters long.',
        'any.required' : 'Title is required.'
    }),
    content : Joi.string()
    .min(10)
    .required()
    .message({
        'string.min' : 'Content must be at least 10 characters long.',
        'any.required' : 'Content is required'
    }),
    category_id : Joi.number()
    .integer()
    .positive()
    .optional()

});


const updatePostSchema = Joi.object({
    title : Joi.string()
    .min(3)
    .max(255)
    .optional
})