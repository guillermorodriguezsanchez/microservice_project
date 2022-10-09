const { Schema, model } = require('mongoose');
const tickets = require('./tickets');

// Creating the model of Event
const EventsSchema = Schema({
    name: {
        type: String,
        require: true
    },
    date:{
        type: String,
       
    },
    tickets:{
        type: Number,
      
    },
    nSoldTickets:{
        type: Number,
        default : 0
    },
    nRemainTickets:{
        type: Number,
        default: 20
    }

});

EventsSchema.method('toJSON', function() {
    const { __v, id, ...object } = this.toObject();

    object.uid = id;
    return object;
})

module.exports = model('Event', EventsSchema);