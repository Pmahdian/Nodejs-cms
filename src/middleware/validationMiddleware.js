const validateRequest = (schema) => {
    return (req, res, next) => {
        // Compare req.body data with schema
        const { error } = schema.validate(req.body);

    }


}