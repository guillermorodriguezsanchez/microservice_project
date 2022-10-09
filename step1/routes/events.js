const { Router } = require('express');
const { addEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// Method GET to create the event and show the id of the event
router.get('/addevent', [
], addEvent);

router.get('/deleteevent', [
], deleteEvent);

module.exports = router;