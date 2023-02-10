const { response } = require('express');
const Event = require('../models/events');
const {v4 : uuidv4} = require('uuid');

const addEvent = async(nameE, dateE) => {

    try {
        
        // Save the name of the event
        const _id = uuidv4();
        const name = nameE;
        const date = dateE;
        // Finding the name in the database
        const existNameEvent = await Event.findOne({ name: name });
        // Checking if the name of the event is already in the database
        if (existNameEvent) {
           
            console.log("The event already exists");
            return false;
        }
        
        // If the event is not exists yet.
        // A new event is created 
        const event = new Event({ _id, name, date});

        // Save it to the database
        await event.save();

    } catch (error) {
        console.log(error);
        return error;
    }
}

const getEventByName = async (name) => {

    const nameEvent = name;
    
    try {

        const evenExist = await Event.findOne({ name: nameEvent });
        console.log("event:",evenExist)
        if(evenExist){
            
            return evenExist.name;
        }
        
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: "An error has appeared"
        })
    }


}

module.exports = {addEvent, getEventByName}