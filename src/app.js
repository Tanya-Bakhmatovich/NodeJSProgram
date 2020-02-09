  
import express from 'express';
import sequelize from './data-access/database';
import userRouter from './routers/controllers';
import groupRouter from './routers/groupControllers';

import User from './models/User';
import Group from './models/Group';
import UserGroup from './models/UserGroup';



sequelize.authenticate()
    .then(() => { console.log('Connection has been established successfully.');
        User.belongsTo(UserGroup);
        Group.belongsTo(UserGroup);
        UserGroup.hasMany(User);
        UserGroup.hasMany(Group);
    })
    .catch(err => { console.error('Unable to connect to the database:', err);});


const app = express();
const PORT = process.execArgv.PORT || 3000;

app.use(express.json());
app.use('/users', userRouter);
app.use('/groups', groupRouter);


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));