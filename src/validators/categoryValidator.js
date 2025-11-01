const Joi = require('joi');

const createCategorySchema = Joi.object({
    name : Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
        'string.min' : 'Name must be at least 3 characters long.',
        'any.required' : 'Name is required.'
    })
})