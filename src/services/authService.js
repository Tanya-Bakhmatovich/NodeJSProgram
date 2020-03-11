import jwt from 'jsonwebtoken';
import User from '../models/User';

export const getToken = (req, res) => {
    const { login, password } = req.body;
    User.findOne({ where: { Login: login, Password: password }})
            .then((existedUser) => {
                if (existedUser) {
                   let token = jwt.sign({}, 'secret', { expiresIn: 3600 });
                   res.send(token);
                } else {
                   res.status(403).send({ success: false, message: 'Bad login/password combination.' });
                }
            })
}