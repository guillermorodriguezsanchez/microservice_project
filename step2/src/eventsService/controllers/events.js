const { response } = require('express');
const Event = require('../models/events');
const {v4 : uuidv4} = require('uuid');
const amqp = require('amqplib/callback_api');
const { Connection, Channel, Message } = require('amqp-ts') ;
const Eventos = require('../rabbitConnect');

const eventosrabbit = new Eventos();
const addEvent = async(req, res = response) => {

    const url = require('url');
    const queryObject = url.parse(req.url, true).query;


    try {
        
        // Save the name of the event
        const _id = uuidv4();
        const name = queryObject.name;
        const date = queryObject.date;
        const tickets = queryObject.tickets;
        const nRemainTickets = tickets;
        // Finding the name in the database
        const existNameEvent = await Event.findOne({ name: name });
        // Checking if the name of the event is already in the database
        if (existNameEvent) {
            return res.status(400).json({
                ok: false,
                msg: 'Name of this event exists'
            });
        }
        
        // If the event is not exists yet.
        // A new event is created 
        const event = new Event({ _id, name, date , tickets, nRemainTickets});

        const data = {
            _id: event._id,
            name: event.name
        }

        // Save it to the database
        await event.save();

        /*// Connect to RabbitMQ
        amqp.connect('amqp://guest:guest@rabbitmq:5672', (err, conn) => {
          if (err) throw new Error(err);
          conn.createChannel((err, ch) => {
            if (err) throw new Error(err);
            const q = 'events_queue';
            const eventData = { id: event._id, name: event.name, date: event.date, nRemainTickets: event.nRemainTickets };
            // Send the event to the queue
            ch.sendToQueue(q, Buffer.from(JSON.stringify(eventData)));
            console.log(`Event ${event.name} sent to the queue`);
          });
        });*/
          
        eventosrabbit.publishMessage(event);
        // Return a json with the id of the event
        res.json({
            ok: true,
            msg: 'addEvent',
            id: event._id,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error trying to add an event.'
        });
    }
}

const getEventById = async (req, res = response) => {

    const url = require('url');
    const queryObject = url.parse(req.url, true).query;

    const id = queryObject.id;
    const name = queryObject.name;
    
    try {

        const evenExist = await Event.findOne({ _id: id });
        if(evenExist){
            res.json({
                ok:true,
                msg:"An event has founded",
                event : evenExist
            })
        }
        
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: "An error has appeared"
        })
    }


}



const deleteEvent = async(req, res = response) => {

    const url = require('url');
    const queryObject = url.parse(req.url, true).query;
    const id = queryObject.id;

    console.log(id);

    try {

        await Event.findByIdAndRemove( id );

            res.json({
                ok: true,
                msg: 'This event has been eliminated',
            });

        
    } catch (error) {
        console.log(error);

        return res.json({
            ok: false,
            msg: 'Has been a problem with the method delete',
            
        });
    }
    


}

const consume = async() => {
    const name = await eventosrabbit.consumeMessages();
    console.log("nameConsumido:",name)

    return name;
}

const getEvents = async(req,res = response ) => {
 

    const name = await consume();
    
    if(name){

        const availableTickets = await Event.findOne({name: name});

        await Event.findOneAndUpdate({ name: name }, {
            $set:{
                nSoldTickets: availableTickets.nSoldTickets+1, 
                nRemainTickets: availableTickets.nRemainTickets-1
            }
         
        })
    }
    
    

    const [ events ] = await Promise.all([
        Event.find()
    ]);

    
   

    res.json({
        ok:true,
        msg: 'All events',
        events
    });
}

const searchTickets = async(req, res = response) => {
    
    const url = require('url');
    const queryObject = url.parse(req.url, true).query;

    
    const tickets = await Event.find({
        $or: [{ date: queryObject.date }],
        $and: [{ nRemainTickets: { $gt: queryObject.tickets}}]
    });

    res.json({
        ok:true,
        results: tickets
    });

}


module.exports = { addEvent, getEventById , deleteEvent, getEvents, searchTickets }