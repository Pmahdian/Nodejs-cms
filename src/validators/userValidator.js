const updateProfileSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(120)
        .optional()
        .messages({
            'string.min': 'Username must be at least 3 characters long',
            'string.max': 'Username cannot be longer than 120 characters'
        }),
        
    email: Joi.string()
        .email() 
        .optional()
        .messages({
            'string.email': 'Please provide a valid email address'
        })
}).min(1);

module.exports = updateProfileSchema;