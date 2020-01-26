import express from 'express';
import User from '../models/User';
import { createValidator } from 'express-joi-validation';
import validationSchema from '../services/validation';

const router = express.Router();
const validator = createValidator();

router.route('/')
    .get((req, res) => User.findAll()
    .then(users => res.send(users))
    .catch(err => console.error(err))
    )

    .post(validator.body(validationSchema), (req, res) => {
        const { age, login, password } = req.body;
        User.create({
            Age: age,
            Login: login,
            Password: password
        })
        .then((us) => res.send(us))
        .catch(err => console.error(err));
    });

router.route('/:id')
    .get((req, res) => {
        User.findAll({ where: { id: Number(req.params.id) }})
        .then((user) => res.send(user))
        .catch(() => res.send('User was not deleted!'))
    })
    .put(validator.body(validationSchema), (req, res) => {
        const { params, body } = req;
        const { age, login, password } = body;
        User.update({
            Age: age,
            Login: login,
            Password: password,
        }, { where: { id: Number(params.id) }})
        .then(() => res.send(`User with ID = ${req.params.id} was updated.`))
        .catch(() => res.send('User was not updated!'))     
    })
    .delete((req, res) => {
        User.destroy({ where: { id: Number(req.params.id)} })
        .then(() => res.send(`User with ID = ${req.params.id} was deleted.`))
        .catch(() => res.send('User was not deleted!'))
    });

export default router;