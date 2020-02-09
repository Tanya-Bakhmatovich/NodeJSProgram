import express from 'express';
import Group from '../models/Group';
import { createValidator } from 'express-joi-validation';
import validationSchema from '../services/groupValidation';
import uuid from 'uuid';

const router = express.Router();
const validator = createValidator();

router.route('/')
    .get((req, res) => Group.findAll()
    .then(groups => res.send(groups))
    .catch(err => console.error(err))
    )

    .post(validator.body(validationSchema), (req, res) => {
        const { name, permission } = req.body;
        Group.create({
            id: uuid.v1(),
            name,
            permission
        })
        .then((gr) => res.send(gr))
        .catch(err => console.error(err));
    });

router.route('/:id')
    .get((req, res) => {
        Group.findAll({ where: { id: req.params.id }})
        .then((group) => res.send(group))
        .catch(() => res.send('Group was not found!'))
    })
    .put(validator.body(validationSchema), (req, res) => {
        const { params, body } = req;
        const { name, permission } = body;
        Group.update({
            name,
            permission
        }, { where: { id: params.id }})
        .then(() => res.send(`Group with ID = ${req.params.id} was updated.`))
        .catch(() => res.send('Group was not updated!'))     
    })
    .delete((req, res) => {
        Group.destroy({ where: { id: req.params.id} })
        .then(() => res.send(`Group with ID = ${req.params.id} was deleted.`))
        .catch(() => res.send('Group was not deleted!'))
    });

export default router;