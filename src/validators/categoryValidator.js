const Joi = require('joi');

const createCategorySchema = Joi.object({
    name : Joi.string()
    .min(3)
    .max(200)
    .required()
    .messages({
        'string.min' : 'Name must be at least 3 characters long.',
        'any.required' : 'Name is required.'
    }),
    description : Joi.string()
})