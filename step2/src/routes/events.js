const { Router } = require('express');
const { addEvent, deleteEvent, getEvents, searchTickets } = require('../controllers/events');

const router = Router();

// Method GET to create the event and show the id of the event
router.get('/addevent', [
], addEvent);

router.get('/deleteevent', [
], deleteEvent);

router.get('/events', [
], getEvents);

router.get('/searchtickets', [
], searchTickets);


module.exports = router;