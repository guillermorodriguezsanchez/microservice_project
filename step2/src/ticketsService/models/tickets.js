const { Schema, model } = require('mongoose');

// Creating the model of Event
const TicketsSchema = Schema({
    _id:{
        type: String,
        require: true
    },
    event: {
        type: String,
        require: true,
    },
    date:{
        type: Date,
        default: Date.now
    }
});

TicketsSchema.method('toJSON', function() {
    const { __v, id, ...object } = this.toObject();

    object.uid = id;
    return object;

})

module.exports = model('Ticket', TicketsSchema);