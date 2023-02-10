const { Schema, model } = require('mongoose');

// Creating the model of Event
const EventsSchema = Schema({
    _id:{
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    date:{
        type: String,
       
    }

});

EventsSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Event', EventsSchema);