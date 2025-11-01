const Joi = require('joi');

const creatPostSchema = Joi.object({
    title : Joi.string()
    .min(3)
    .max(255)
    .required()
    .message({ 
        'string.min' : 'Title must be at least 3 characters long.',
        'any.required' : 'Title is required.'
    })
})