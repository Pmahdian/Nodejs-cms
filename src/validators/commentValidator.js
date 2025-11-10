const Joi = require('joi');

const createCommentSChema = Joi.object({
    content : Joi.string()
    .min(1)
    .max(1000)
    .required()
    .messages({
        'string.min': 'Comment text cannot be empty',
        'string.max': 'Comment text cannot exceed 1000 characters',
        'any.required': 'Comment text is required'
    })
});

module.exports = {
    createCommentSchema
};