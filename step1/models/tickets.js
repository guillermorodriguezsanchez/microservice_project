const { Schema, model } = require('mongoose');

// Creating the model of Event
const TicketsSchema = Schema({
    name: {
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
    }

});

TicketsSchema.method('toJSON', function() {
    const { __v, id, ...object } = this.toObject();

    object.uid = id;
    return object;
})

module.exports = model('Ticket', TicketsSchema);