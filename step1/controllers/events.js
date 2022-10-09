const { response } = require('express');
const Event = require('../models/events');
const tickets = require('../models/tickets');

const addEvent = async(req, res = response) => {

    const url = require('url');
    const queryObject = url.parse(req.url, true).query;

    try {
        
        // Save the name of the event
        const name = queryObject.name;
        const date = queryObject.date;
        const tickets = queryObject.tickets;
        const nRemainTickets = tickets;
        console.log(name);
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
        const event = new Event({ name, date , tickets, nRemainTickets});

        // Save it to the database
        await event.save();

        // Return a json with the id of the event
        res.json({
            ok: true,
            msg: 'addEvent',
            id: event.id,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error trying to add an event.'
        });
    }
}

const deleteEvent = async(req, res = response) => {

    const url = require('url');
    const queryObject = url.parse(req.url, true).query;
    const id = queryObject.id;

    console.log(id);

    try {

        //const idExist = event.findOne(id);

        /*if(!idExist){
            return res.status(400).json({
                ok: true,
                msg: 'The event does not exist'
            });
        }*/

        const eventD = await Event.findByIdAndRemove( id );

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

const getEvents = async(req,res = response ) => {
 
    const [ events ] = await Promise.all([
        Event.find()
    ]);

    console.log(events);

    res.json({
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
        results: tickets
    });

}


module.exports = { addEvent, deleteEvent, getEvents, searchTickets }