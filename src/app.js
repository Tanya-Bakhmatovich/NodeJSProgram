  
import express from 'express';
import sequelize from './data-access/database';
import router from './routers/controllers';

sequelize.authenticate()
    .then(() => { console.log('Connection has been established successfully.');})
    .catch(err => { console.error('Unable to connect to the database:', err);});


const app = express();
const PORT = process.execArgv.PORT || 3000;

app.use(express.json());
app.use('/users', router);


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));