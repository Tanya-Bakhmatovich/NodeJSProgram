import Joi from 'joi';
import { commonPattern } from '../constants';

export default Joi.object().keys({
    login: Joi.string().regex(commonPattern).required(),
    password: Joi.string().alphanum().regex(commonPattern).required()
});