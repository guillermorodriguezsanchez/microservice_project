const { response } = require('express');
const Event = require('../models/events');

const addEvent = async(req, res = response) => {

    const url = require('url');
    const queryObject = url.parse(req.url, true).query;

    try {
        
        // Save the name of the event
        const nameU = queryObject.name;

        // Finding the name in the database
        const existNameEvent = await Event.findOne({ name: nameU });
        // Checking if the name of the event is already in the database
        if (existNameEvent) {
            return res.status(400).json({
                ok: false,
                msg: 'Name of this event exists'
            });
        }
        
        // If the event is not exists yet.
        // A new event is created 
        const event = new Event(queryObject);

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


module.exports = { addEvent}