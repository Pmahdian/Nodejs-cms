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
        }),

        emial : Joi.string()
        .email()
        .required()
        .message({
            'string.email' : 'Please enter a valid email.'
        }),

        password : Joi.string()
            .min(6)
            .required()
        
    });

    const loginSchema = Joi.object({
        email : Joi.string().email(). required(),
        password : Joi.string().required()
    })