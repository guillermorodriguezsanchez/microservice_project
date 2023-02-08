const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/configdb');
// Create an Expres's application
const app = express();


// Consul
const consul = require('consul');


  

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
//app.use('/', require('./src/ticketsService/routes/tickets'));

app.listen(process.env.PORT, () => {
    console.log('Running in the port', process.env.PORT);
});

consul.Agent.Service.register({
    name: 'events',
    address: 'localhost',
    port: 3000,
    check: {
      http: 'http://localhost:3000/health',
      interval: '10s'
    }
  }, function(err) {
    if (err) throw new Error(err);
    console.log('registered with Consul');
  });

  consul.catalog.service.nodes('tickets', function(err, result) {
    if (err) throw new Error(err);
    console.log(result);
  });

app.get('/health', function(req, res) {
    res.status(200).send('healthy');
  });

module.exports = app;