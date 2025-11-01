const Joi = require('joi');

const createPostSchema = Joi.object({
    title : Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({ 
        'string.min' : 'Title must be at least 3 characters long.',
        'any.required' : 'Title is required.'
    }),
    content : Joi.string()
    .min(10)
    .required()
    .messages({
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
    .optional(),
    content : Joi.string()
    .min(10)
    .optional(),
    category_id : Joi.number()
    .integer()
    .positive()
    .optional()
}).min(1); //at least one field must be updated


module.exports = {
    createPostSchema,
    updatePostSchema
}
