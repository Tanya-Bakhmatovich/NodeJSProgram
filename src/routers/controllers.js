import express from 'express';
import User from '../models/User';

const router = express.Router();

router.route('/')
    .get((req, res) => User.findAll()
    .then(users => res.send(users))
    .catch(err => console.error(err))
    )

    .post((req, res) => {
        const { age, name, login, password, customId } = req.body;
        User.create({
            Age: age,
            Name: name,
            Login: login,
            Password: password,
            CustomId: customId
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
    .put((req, res) => {
        const { body, params } = req;
        const updatedUser = {};
        Object.keys(body).filter(el => body[el]).forEach(el => updatedUser[el] = body[el]);
        User.update(updatedUser, { where: { id: Number(params.id) }})
        .then(() => res.send(`User with ID = ${req.params.id} was updated.`))
        .catch(() => res.send('User was not updated!'))     
    })
    .delete((req, res) => {
        User.destroy({ where: { id: Number(req.params.id)} })
        .then(() => res.send(`User with ID = ${req.params.id} was deleted.`))
        .catch(() => res.send('User was not deleted!'))
    });

export default router;