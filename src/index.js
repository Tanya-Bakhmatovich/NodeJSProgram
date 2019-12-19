import express from 'express';
import uuid from 'uuid';
import validation from './middlewares.js';
import { schema } from './schemas.js';

const app = express();
const router = express.Router();

app.use(express.json());
app.use('/api', router);

const users = [];

router.route('/users')
    .get((req, res) => {
        const { limit = users.length, loginSubstring = '' } = req.query;
        const suggestedList = users.filter(({ login }) => login.includes(loginSubstring))
            .sort((a, b) => {
                if (a.login > b.login) return 1;
                return a.login < b.login ? -1 : 0;
            })
            .slice(0, limit);

        res.json(suggestedList);
    })
    .post(validation(schema), (req, res) => {
        const user = {
            id: uuid.v1(),
            login: req.body.login,
            password: req.body.password,
            age: req.body.age,
            isDeleted: false
        };

        users.push(user);
        res.json(user);
    });

router.route('/users/:id')
    .get((req, res) => {
        const user = users.find(u => u.id === req.params.id);
        if (!user) res.status(404).json({ message: `The user with id = ${req.params.id} was not found` });

        res.json(user);
    })
    .put(validation(schema), (req, res) => {
        const { body, params } = req;
        const user = users.find(u => u.id === params.id);
        if (!user) res.status(404).json({ message: `The user with id = ${params.id} was not found` });
        Object.keys(body).filter(el => body[el]).forEach(el => user[el] = body[el]);

        res.json(user);
    })
    .delete((req, res) => {
        const { params } = req;
        const user = users.find(u => u.id === params.id);
        if (!user) res.status(404).json({ message: `The user with id = ${params.id} was not found` });
        user.isDeleted = true;

        res.json(user);
    });


app.listen(3000, () => console.log('Listening on port 3000...'));
