import express from 'express';
import { createValidator } from 'express-joi-validation';
import validationSchema from '../services/userValidation';
import { createUser, updateUser, findAllUsers, deleteUser } from '../services/usersService';
import { logServiceError } from '../services/LogServiceMiddleware';

const router = express.Router();
const validator = createValidator();

router.route('/')
    .get((req, res) => findAllUsers()
    .then(users => res.send(users))
    .catch(err => { throw new Error(err) })
    )

    .post(validator.body(validationSchema), (req, res, next) => {
        createUser(req.body)
            .then((us) => res.send(us))
            .catch(() => {
                logServiceError({ message: 'User was not created'}, req, res, next);     
             });
    });

router.route('/:id')
    .get((req, res, next) => {
        findAllUsers({ id: Number(req.params.id) })
            .then((user) => res.send(user))
            .catch(() => {
                logServiceError({ message: 'User does not exist'}, req, res, next);
            })
    })
    .put(validator.body(validationSchema), (req, res, next) => {
        const { params, body } = req;
        updateUser(body, { id: Number(req.params.id) })
            .then(() => res.send(`User with ID = ${params.id} was updated.`))
            .catch(() => {
                logServiceError({ message: 'User was not updated'}, req, res, next);
            })     
    })
    .delete((req, res, next) => {
        deleteUser({ id: Number(req.params.id) })
            .then(() => res.send(`User with ID = ${req.params.id} was deleted.`))
            .catch(() => {
                logServiceError({ message: 'User was not deleted'}, req, res, next);
            })
    });

export default router;