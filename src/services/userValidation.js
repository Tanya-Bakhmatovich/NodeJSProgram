import Joi from 'joi';
import { commonPattern } from '../constants';

export default Joi.object().keys({
    login: Joi.string().regex(commonPattern).required(),
    password: Joi.string().alphanum().regex(commonPattern).required(),
    age: Joi.number().min(4).max(120).required(),
    group_id: Joi.string()
});