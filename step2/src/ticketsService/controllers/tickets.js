const { response } = require('express');
//const Event = require('../../eventsService/models/events');
const Ticket = require('../models/tickets');
const {v4 : uuidv4} = require('uuid');
const Tickets = require('../rabbitConnnect');
//const amqp = require('amqplib/callback_api');
const fs = require('fs');
const amqp = require('amqplib');
const { getEventByName } = require('./events');

const ticketRabbit = new Tickets();

const reserveTicket = async(req, res = response) => {

    // Creating new constants to provide them different variables
    const _id = uuidv4();
    const url = require('url');
    const queryObject = url.parse(req.url, true).query;

    const event = queryObject.name;

    await ticketRabbit.consumeMessages(event);
    const nameD = await getEventByName(event);
    console.log("Event from get:", nameD);

    if(nameD === event){
        const ticket = new Ticket({_id, event});

        await ticket.save();

        console.log("Ticket reserved");

        ticketRabbit.publishMessage(nameD);

        // Return a json with the id of the event
        res.json({
            ok: true,
            msg: 'reserveTicket',
            _id: ticket._id,
        });    
    }
        
        
    
    
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