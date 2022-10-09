const { Schema, model } = require('mongoose');

// Creating the model of Event
const EventsSchema = Schema({
    name: {
        type: String,
        require: true
    },
    date:{
        type: String,
        require: true
    },
    tickets:{
        type: Number,
        require: true
    }

});

EventsSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Event', EventsSchema);