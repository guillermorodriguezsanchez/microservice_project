const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/configdb');
// Create an Expres's application
const app = express();

dbConnection();

app.use(express.json());
app.use(cors());


app.get('/', (req,res) => {
    res.json({
        ok:true,
        msg: 'Server active'
    })
});

app.use('/', require('./routes/events'));

app.listen(process.env.PORT, () => {
    console.log('Corriendo en el puerto', process.env.PORT);
});
