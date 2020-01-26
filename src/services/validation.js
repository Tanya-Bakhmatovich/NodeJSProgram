import Joi from 'joi';

export default Joi.object().keys({
    login: Joi.string().regex(/(?=.*?[0-9])(?=.*?[A-Za-z]).+/).required(),
    password: Joi.string().alphanum().regex(/(?=.*?[0-9])(?=.*?[A-Za-z]).+/).required(),
    age: Joi.number().min(4).max(120).required()
});