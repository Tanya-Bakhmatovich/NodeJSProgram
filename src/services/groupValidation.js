import Joi from 'joi';

const permissions = ['READ', 'DELETE', 'SHARE', 'WRITE', 'UPLOAD_FILES'];

export default Joi.object().keys({
    name: Joi.string().required(),
    permission: Joi.array().items(Joi.string().valid(...permissions)).required(),
});