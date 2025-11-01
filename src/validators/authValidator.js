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
            'string.max' : 'Username cannot be longer than 30 ckaracters',
            'any.required' : 'Username is required.'
        }),

        email : Joi.string()
        .email()
        .required()
        .message({
            'string.email' : 'Please provide a valid email address.',
            'any.required' : 'Email is required'
        }),

        password : Joi.string()
            .min(6)
            .max(100)
            .required()
            .message({
                'string.min' : 'Password must be at least 6 characters long.',
                'any.required' : 'Password is required.'
            })
            
        
    });

    const loginSchema = Joi.object({
        email : Joi.string().email(). required(),
        password : Joi.string().required()
    });

    module.exports = {
        registerSchema,
        loginSchema
    };