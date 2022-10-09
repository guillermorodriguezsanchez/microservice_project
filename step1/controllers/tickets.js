const { response } = require('express');
const Event = require('../models/events');
const Ticket = require('../models/tickets');

const reserveTicket = async(req, res = response) => {

    const url = require('url');
    const queryObject = url.parse(req.url, true).query;

    try {
        
        // Save the name of the event
        const nameU = queryObject.name;
        const event = queryObject.event;
        const availableTickets = await Event.findById(event);
        
        if(availableTickets.nRemainTickets <= 0){
            return  res.status(400).json({
                ok: false,
                msg: ' There are not tickets available '
            });
        }
        
        // If the event is not exists yet.
        // A new event is created 
        const ticket = new Ticket(queryObject);

        // Save it to the database
        await ticket.save();

        await Event.findOneAndUpdate({ _id: event }, {
            $set:{
                nSoldTickets: availableTickets.nSoldTickets+1, 
                nRemainTickets: availableTickets.nRemainTickets-1
            }
             
        })

        // Return a json with the id of the event
        res.json({
            ok: true,
            msg: 'reserveTicket',
            id: ticket.id,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error trying to reserve a ticket.'
        });
    }
}

const deleteTicket = async(req, res = response) => {

    const url = require('url');
    const queryObject = url.parse(req.url, true).query;
    const id = queryObject.id;

    try {

        const ticketD = await Ticket.findByIdAndRemove( id );

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
      tickets
    });
}



module.exports = { reserveTicket, deleteTicket, getTickets}