  
import express from 'express';
import sequelize from './data-access/database';
import userRouter from './routers/userControllers';
import groupRouter from './routers/groupControllers';

import User from './models/User';
import { connectTables } from './data-access/tablesConnections';

import { predifinedUsers } from './constants';
import { createUser, updateUser } from './services/usersService';
import { logServiceError, logService, logError } from './services/LogServiceMiddleware';

sequelize.authenticate()
    .then(() => { console.log('Connection has been established successfully.');
        predifinedUsers.forEach(user => {
            User.findOne({ where: { Login: user.Login }})
                .then((existedUser) => {
                    if (existedUser) {
                        updateUser(user, { Login: user.Login });
                    } else{
                        createUser(user);
                    }
                })
        }); 
        
        connectTables();
    })
    .catch(err => { console.error('Unable to connect to the database:', err);});


const app = express();
const PORT = process.execArgv.PORT || 3000;

app.use(express.json());
app.use('/', logService);
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/', logServiceError);

process.on('uncaughtException', (err, req, res) => {
    logError(err.stack);
    res.status(500).send({ error: 'Server error' });
    process.exit(1);
  });

process.on('unhandledRejection', (err) => {
    logError(err);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));