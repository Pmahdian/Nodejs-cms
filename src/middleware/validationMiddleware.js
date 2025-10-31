const validateRequest = (schema) => {
    return (req, res, next) => {
        // Compare req.body data with schema
        const { error } = schema.validate(req.body);

        if (error) {
            // if there is an error, return first error
            return res.status(400).json({
                success : false,
                message : error.details[0].message
            });
        }
        // If there are no errors, go to next step
        next();

    };


};

module.exports = validateRequest;