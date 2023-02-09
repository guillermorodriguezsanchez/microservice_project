const { response } = require('express');
//const Event = require('../../eventsService/models/events');
const Ticket = require('../models/tickets');
const {v4 : uuidv4} = require('uuid');
const Tickets = require('../rabbitConnnect');
//const amqp = require('amqplib/callback_api');
const fs = require('fs');
const amqp = require('amqplib');

const ticketRabbit = new Tickets();

const reserveTicket = async(req, res = response) => {

    // Creating new constants to provide them different variables
    const _id = uuidv4();
    const url = require('url');
    const queryObject = url.parse(req.url, true).query;

    const id_event = queryObject.event;
    const event = queryObject.name;

    
    
    console.log("evento:",typeof(event));


    if(ticketRabbit.consumeMessages(event)){
        const ticket = new Ticket({_id, event});

        await ticket.save();

        console.log("Ticket reserved");
        // Return a json with the id of the event
        res.json({
            ok: true,
            msg: 'reserveTicket',
            _id: ticket._id,
        });
    }
        
    

    

   /* async function consumeEventsQueue() {
    try {
        const conn = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
        const ch = await conn.createChannel();

        const q = 'Events';

        await ch.assertQueue(q, { durable: true });
        console.log("Waiting for messages in %s", q);

        ch.consume(q, (message) => {
        const eventData = JSON.parse(message.content.toString());
        console.log(`Received event:`, eventData);

         // Store the event data in a JSON file
        fs.writeFileSync('events.json', JSON.stringify(eventData), 'utf-8');

        ch.ack(message);
        }, { noAck: false });
    } catch (err) {
        console.error(err);
    }
    }

    consumeEventsQueue();*/

   
    

    /*const eventData = JSON.parse(localStorage.getItem(eventId));

    const ticket = new Ticket(eventData.id, eventData.name);

        await ticket.save();

        console.log("Ticket reserved");
        // Return a json with the id of the event
        res.json({
            ok: true,
            msg: 'reserveTicket',
            _id: ticket._id,
        });*/
    // Connected to RabbitqMq to consume the data of the queue which has been sent it by the producer
    // In that case, controllers/event/addEvent
    /*amqp.connect('amqp://guest:guest@rabbitmq:5672', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        const queue = 'events_queue';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [x] Waiting for messages in %s", queue);

        channel.consume(queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
            // Do something with the message, e.g. store in a file
            let names = [];
            fs.appendFile("data.json", msg.content.toString(), (err) => {
                if (err) throw err;
                let jsonData = JSON.parse(data);
                jsonData.forEach(element => {
                    names.push(element.name);
                });
                console.log(`The data has been stored in the file`);
                fs.writeFile("data.json", JSON.stringify(names), (err) => {
                    if (err) throw err;
                    console.log(`The names have been stored in the variable`);
                });
            });
        }, {
            noAck: true
        });
    });
});
     */
    /*try{

        const ticket = new Ticket({_id, event});

        await ticket.save();

        console.log("Ticket reserved");
        // Return a json with the id of the event
        res.json({
            ok: true,
            msg: 'reserveTicket',
            _id: ticket._id,
        });
    }
          
    catch (error) {
          console.log(error);
          return res.status(400).json({
            ok: false,
            msg: 'Error trying to reserve a ticket.'
          });
        }
    */
}

const deleteTicket = async(req, res = response) => {

    const url = require('url');
    const queryObject = url.parse(req.url, true).query;
    const id = queryObject.id;

    try {

        await Ticket.findByIdAndRemove( id );
            res.json({
                ok: true,
                msg: 'This ticket has been eliminated',
            });    
    } catch (error) {
        console.log(error);

        return res.json({
            ok: false,
            msg: 'Has been a problem with the method delete',
            
        });
    }
}

const getTickets = async(req,res = response ) => {
 
    const [ tickets ] = await Promise.all([
        Ticket.find()
    ]);

    res.json({
        ok:true,
        msg: 'All tickets',
        tickets
    });
}



module.exports = { reserveTicket, deleteTicket, getTickets}