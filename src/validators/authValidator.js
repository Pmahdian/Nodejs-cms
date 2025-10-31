const Joi = require('joi');

const registerSchema = Joi.object(
    {
        username : Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.alphanum' :'Username can only cantain letters and numbers.',
            'string.min' : 'Username must be at least 3 characters.',
            'any.required' : 'Username is required.'
        })
    }
)