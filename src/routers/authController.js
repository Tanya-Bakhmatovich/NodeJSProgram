import express from 'express';
import { createValidator } from 'express-joi-validation';
import { getToken } from '../services/authService';
import validationSchema from '../services/authValidation';

const router = express.Router();
const validator = createValidator();

router.route('/')
    .post(validator.body(validationSchema), (req, res) => {
        getToken(req, res);
    });

export default router;