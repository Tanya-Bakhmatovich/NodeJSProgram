import Joi from 'joi';

const pattern = /(?=.*?[0-9])(?=.*?[A-Za-z]).+/;

export default Joi.object().keys({
    name: Joi.string().required(),
    permission: Joi.array().required()
});