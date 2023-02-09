const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/configdb');
// Create an Expres's application
const app = express();

const Consul = require('consul');
const consul = new Consul({host:'consul', port: '8500'});

// register consul
async function registerService() {
    try {
      await consul.agent.service.register({
        name: "eventService",
        address: "eventService",
        port: 3000
      });
      console.log('Successfully registered with Consul');
    } catch (error) {
      console.error('Error registering with Consul:', error);
    }
}
  

  

dbConnection();

// register consul


app.use(express.json());
app.use(cors());

registerService();

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



module.exports = app;