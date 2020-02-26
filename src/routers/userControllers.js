import express from 'express';
import { createValidator } from 'express-joi-validation';
import validationSchema from '../services/userValidation';
import { createUser, updateUser, findAllUsers, deleteUser } from '../services/usersService';

const router = express.Router();
const validator = createValidator();

router.route('/')
    .get((req, res) => findAllUsers()
    .then(users => res.send(users))
    .catch(err => new Error(err))
    )

    .post(validator.body(validationSchema), (req, res) => {
        createUser(req.body)
            .then((us) => res.send(us))
            .catch(err => new Error(err));
    });

router.route('/:id')
    .get((req, res) => {
        findAllUsers({ id: Number(req.params.id) })
            .then((user) => res.send(user))
            .catch((err) => {
                new Error(err);
                res.send('User does not exist!')
            })
    })
    .put(validator.body(validationSchema), (req, res) => {
        const { params, body } = req;
        updateUser(body, { id: Number(req.params.id) })
            .then(() => res.send(`User with ID = ${params.id} was updated.`))
            .catch((err) => {
                new Error(err);
                res.send('User was not updated!')
            })     
    })
    .delete((req, res) => {
        deleteUser({ id: Number(req.params.id) })
            .then(() => res.send(`User with ID = ${req.params.id} was deleted.`))
            .catch((err) => {
                new Error(err);
                res.send('User was not deleted!')
            })
    });

export default router;