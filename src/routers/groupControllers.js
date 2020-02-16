import express from 'express';
import { createValidator } from 'express-joi-validation';
import uuid from 'uuid';
import { createGroup, updateGroup, findAllGroups, deleteGroup } from '../services/groupServices';
import validationSchema from '../services/groupValidation';

const router = express.Router();
const validator = createValidator();

router.route('/')
    .get((req, res) => findAllGroups()
    .then(groups => res.send(groups))
    .catch(err => console.error(err))
    )

    .post(validator.body(validationSchema), (req, res) => {
        createGroup(req.body)
            .then((gr) => res.send(gr))
            .catch(err => console.error(err));
    });

router.route('/:id')
    .get((req, res) => {
        findAllGroups({ id: req.params.id })
            .then((group) => res.send(group))
            .catch(() => res.send('Group was not found!'))
    })
    .put(validator.body(validationSchema), (req, res) => {
        const { params, body } = req;
        updateGroup(body, { id: params.id })
            .then(() => res.send(`Group with ID = ${req.params.id} was updated.`))
            .catch(() => res.send('Group was not updated!'))     
    })
    .delete((req, res) => {
        deleteGroup({ id: req.params.id})
            .then(() => res.send(`Group with ID = ${req.params.id} was deleted.`))
            .catch(() => res.send('Group was not deleted!'))
    });

export default router;