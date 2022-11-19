const { Router } = require('express');
const { addEvent, deleteEvent, getEvents, searchTickets, getEventById } = require('../controllers/events');

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

router.get('/eventOne', [
], getEventById);


module.exports = router;