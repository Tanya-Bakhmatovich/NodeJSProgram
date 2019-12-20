function errorResponse(schemaErrors) {
    const errors = schemaErrors.map((error) => error.type.includes('regex') ?
        `${error.message.split(' ')[0]} should contain at least 1 letter and 1 number` : error.message);

    return {
        status: '400',
        errors
    };
}

export default (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error && error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            return next();
        }
    };
};

