  
import express from 'express';
import sequelize from './data-access/database';
import userRouter from './routers/userControllers';
import groupRouter from './routers/groupControllers';

import User from './models/User';
import Group from './models/Group';
import { predifinedUsers } from './constants';
import { createUser, updateUser, f } from './services/usersService';

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
        Group.hasMany(User, { foreignKey: 'group_id' });
        User.belongsTo(Group, { foreignKey: 'group_id' });
        
        // UserGroup.hasMany(User, { foreignKey: 'id'});
        // UserGroup.hasMany(Group);
    })
    .catch(err => { console.error('Unable to connect to the database:', err);});


const app = express();
const PORT = process.execArgv.PORT || 3000;

app.use(express.json());
app.use('/users', userRouter);
app.use('/groups', groupRouter);


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));