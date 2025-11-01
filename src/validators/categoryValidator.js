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
    .min(10)
    .max(200)
    .optional()
    .message({
        'string.min' : 'description must be at least 10 characters long.'
    })
});