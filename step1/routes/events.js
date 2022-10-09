const { Router } = require('express');
const { addEvent } = require('../controllers/events');

const router = Router();

// Method POST to create an event with some parameters
router.post('/addevent', [
], addEvent);

module.exports = router;