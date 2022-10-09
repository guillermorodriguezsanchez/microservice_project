const { Router } = require('express');
const { addEvent } = require('../controllers/events');

const router = Router();

// Method GET to create the event and show the id of the event
router.get('/addevent', [
], addEvent);

module.exports = router;